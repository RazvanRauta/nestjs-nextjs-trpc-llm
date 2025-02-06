import { AllConfigType } from '@server/config/config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { ScrapeResult } from './interfaces/scrape-result';

export interface LinkedInProfile {
  [key: string]: any;
}

@Injectable()
export class ScrapeProfileService {
  constructor(private configService: ConfigService<AllConfigType>) {}

  async scrapeLinkedInProfile(
    url: string,
    mock: boolean = false,
  ): Promise<LinkedInProfile> {
    let response: AxiosResponse<ScrapeResult>;

    if (mock) {
      const linkedinProfileUrl =
        'https://gist.githubusercontent.com/emarco177/859ec7d786b45d8e3e3f688c6c9139d8/raw/5eaf8e46dc29a98612c8fe0c774123a7a2ac4575/eden-marco-scrapin.json';
      response = await axios.get<ScrapeResult>(linkedinProfileUrl, {
        timeout: 10000,
      });
    } else {
      const apiEndpoint = this.configService.getOrThrow(
        'linkedin.scrapeApiUrl',
        {
          infer: true,
        },
      );
      const scrapinApiKey = this.configService.getOrThrow(
        'linkedin.scrapeApiKey',
        {
          infer: true,
        },
      );

      response = await axios.get<ScrapeResult>(apiEndpoint, {
        params: {
          apikey: scrapinApiKey,
          linkedInUrl: url,
        },
        timeout: 10000,
      });
    }

    const data = response.data.person || {};

    // Filter out empty values and certifications
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        const isEmpty =
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'object' &&
            Object.keys(value as Record<string, any>).length === 0);
        return !isEmpty && key !== 'certifications';
      }),
    );

    return filteredData;
  }
}
