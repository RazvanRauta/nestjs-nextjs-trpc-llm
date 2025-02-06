import { AllConfigType } from '@server/config/config.type';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamicTool } from '@langchain/core/tools';
import { ToolsService } from '@server/tools/tools.service';
import { pull } from 'langchain/hub';
import { createReactAgent, AgentExecutor } from 'langchain/agents';

@Injectable()
export class AgentsService {
  constructor(
    private configService: ConfigService<AllConfigType>,
    private toolsService: ToolsService,
  ) {}

  async lookup(name: string): Promise<string | null> {
    const template = `given the full name {name_of_person}, I want you to get me a link to their Linkedin profile Page.
    Your answer should be a valid Linkedin URL, the link should not be in a markdown format, and remove the country related elements from the link.
    `;
    const promptTemplate = new PromptTemplate({
      template,
      inputVariables: ['name_of_person'],
    });
    const input = await promptTemplate.format({ name_of_person: name });

    const agentExecutor = await this.getAgentExecutor();
    const result = await agentExecutor.invoke({
      input,
    });

    if (!result.output || !('output' in result)) {
      return null;
    }

    const url = result.output as string;
    return url;
  }

  private async getAgentExecutor() {
    const llm = new ChatOpenAI({
      apiKey: this.configService.get('openai.apiKey', { infer: true }),
      temperature: 0,
      model: this.configService.get('openai.model', { infer: true }),
    });

    const tools = [
      new DynamicTool({
        name: 'Crawl Google 4 Linkedin profile page',
        func: (name: string) => this.toolsService.getProfileUrlTavily(name),
        description:
          'useful for when you need to get the Linkedin profile page of a person',
      }),
      new DynamicTool({
        name: 'Test if a URL is a Linkedin profile URL',
        func: (url: string) => this.toolsService.testLinkedInProfileUrl(url),
        description:
          'useful for when you need to verify a Linkedin profile URL',
      }),
      new DynamicTool({
        name: 'Clean Linkedin URL',
        func: (url: string) => this.toolsService.cleanLinkedInUrl(url),
        description: 'useful for when you need to clean a Linkedin profile URL',
      }),
    ];

    const prompt = await pull<PromptTemplate>('hwchase17/react');
    const agent = await createReactAgent({
      llm,
      tools,
      prompt,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
      verbose: false,
    });

    return agentExecutor;
  }
}
