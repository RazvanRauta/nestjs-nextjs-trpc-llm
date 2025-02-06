import { Injectable } from '@nestjs/common';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@server/config/config.type';

@Injectable()
export class ToolsService {
  private readonly searchService: TavilySearchResults;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    const apiKey = this.configService.get('tools.tavilyApiKey', {
      infer: true,
    });

    this.searchService = new TavilySearchResults({ apiKey });
  }

  async getProfileUrlTavily(name: string): Promise<string> {
    //  Searches for a LinkedIn profile using Tavily
    const res = (await this.searchService.invoke(`${name}`)) as string;
    return res;
  }
}
