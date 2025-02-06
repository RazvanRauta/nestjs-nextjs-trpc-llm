import { AgentsService } from '@server/agents/agents.service';
import { AllConfigType } from '@server/config/config.type';
import { ScrapeProfileService } from '@server/linkedin/scrape-profile.service';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RunnableSequence } from '@langchain/core/runnables';
import { IceBreakerDTO } from './dto/ice-breaker.dto';
import { outputParser } from './parsers/output.parser';
import { Person } from '@server/linkedin/interfaces/scrape-result';

@Injectable()
export class IceBreakerService {
  constructor(
    private readonly agentService: AgentsService,
    private readonly scrapeProfileService: ScrapeProfileService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async iceBreakWith(name: string): Promise<IceBreakerDTO> {
    try {
      const linkedinProfileUrl = await this.agentService.lookup(name);
      if (!linkedinProfileUrl) {
        return {
          result: { summary: "Sorry, I can't find any results", facts: [] },
          linkedinProfileUrl: '',
          linkedInData: {} as Person,
        };
      }
      const linkedInData =
        await this.scrapeProfileService.scrapeLinkedInProfile(
          linkedinProfileUrl,
        );

      const summaryTemplate = `given the LinkedIn profile information: {information} about a person, I want you to create:
    1. A summary of the person's profile
    2. Two interesting facts about the person 
    
    \n {format_instructions}
    `;

      const summaryPromptTemplate = new PromptTemplate({
        inputVariables: ['information'],
        template: summaryTemplate,
        partialVariables: {
          format_instructions: outputParser.getFormatInstructions(),
        },
      });

      const llm = new ChatOpenAI({
        apiKey: this.configService.get('openai.apiKey', { infer: true }),
        temperature: 0,
        model: this.configService.get('openai.model', { infer: true }),
      });

      const chain = RunnableSequence.from([
        summaryPromptTemplate,
        llm,
        outputParser,
      ]);

      const result = await chain.invoke({ information: linkedInData });

      return {
        result,
        linkedinProfileUrl,
        linkedInData,
      };
    } catch (error) {
      console.error('Error in iceBreakWith', error);
      return {
        result: { summary: "Sorry, I can't find any results", facts: [] },
        linkedinProfileUrl: '',
        linkedInData: {} as Person,
      };
    }
  }
}
