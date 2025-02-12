import { AgentAction, AgentFinish } from '@langchain/core/agents';
import { PromptTemplate } from '@langchain/core/prompts';
import { DynamicTool, Tool } from '@langchain/core/tools';
import { renderTextDescription } from 'langchain/tools/render';
import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { AllConfigType } from '@server/config/config.type';
import { ConfigService } from '@nestjs/config';

type AgentStep = [AgentAction, string];

@Injectable()
export class GetTextLengthService {
  constructor(private configService: ConfigService<AllConfigType>) {}

  async getTextLength(text: string): Promise<number> {
    const tools: Tool[] = [
      new DynamicTool({
        name: 'get_text_length',
        description: 'Returns the length of a text by characters',
        func: (txt: string) => this.getTextLengthTool(txt),
        returnDirect: false,
      }),
    ];

    const template = `Answer the following questions as best you can. You have access to the following tools:

    {tools}
    
    Use the following format:
    
    Question: the input question you must answer
    Thought: you should always think about what to do
    Action: the action to take, should be one of [{tool_names}]
    Action Input: the input to the action
    Observation: the result of the action
    ... (this Thought/Action/Action Input/Observation can repeat N times)
    Thought: I now know the final answer
    Final Answer: the final answer to the original input question
    
    Begin!
    
    Question: {input}
    Thought: {agent_scratchpad}
    `;

    const prompt = new PromptTemplate({
      template: template,
      inputVariables: ['input', 'agent_scratchpad'],
      partialVariables: {
        tools: renderTextDescription(tools),
        tool_names: tools.map((t) => t.name).join(', '),
      },
    });

    // Initialize the LLM
    const llm = new ChatOpenAI({
      apiKey: this.configService.get('openai.apiKey', { infer: true }),
      temperature: 0,
      model: this.configService.get('openai.model', { infer: true }),
      stop: ['\nObservation', 'Observation'],
    });

    const intermediateSteps: AgentStep[] = [];

    // First agent step
    let agentStep = (await prompt.pipe(llm).invoke({
      input: `What is the length of the word: ${text}`,
      agent_scratchpad: intermediateSteps
        .map((step) => `${step[0].log}\nObservation: ${step[1]}`)
        .join('\n'),
    })) as unknown as AgentAction | AgentFinish;

    if ('tool' in agentStep) {
      const toolName = agentStep.tool;
      const toolToUse = this.findToolByName(tools, toolName) as DynamicTool;
      const toolInput = agentStep.toolInput as string;
      const observation = (await toolToUse.func(toolInput)) as string;
      console.log(`observation=${observation}`);
      intermediateSteps.push([agentStep, String(observation)]);
    }

    // Second agent step
    agentStep = (await prompt.pipe(llm).invoke({
      input: `What is the length of the word: ${text}`,
      agent_scratchpad: intermediateSteps
        .map((step) => `${step[0].log}\nObservation: ${step[1]}`)
        .join('\n'),
    })) as unknown as AgentAction | AgentFinish;

    if ('returnValues' in agentStep) {
      console.log('### AgentFinish ###');
      console.log(agentStep.returnValues);
      return agentStep.returnValues[0] as number;
    }

    return 0;
  }

  private findToolByName(tools: Tool[], toolName: string): Tool {
    const tool = tools.find((t) => t.name === toolName);
    if (!tool) {
      throw new Error(`Tool with name ${toolName} not found`);
    }
    return tool;
  }

  // Tool function to get the length of a text
  private async getTextLengthTool(text: string): Promise<number> {
    console.log(`getTextLength enter with text=${text}`);
    const trimmedText = text.trim().replace(/^'|^"|'|"$/g, ''); // Remove quotes and newlines

    await new Promise((resolve) => setTimeout(resolve, 0));
    return trimmedText.length;
  }
}
