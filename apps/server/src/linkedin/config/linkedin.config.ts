import { registerAs } from '@nestjs/config';
import { LinkedinConfig } from './linkedin-config.type';
import validateConfig from '@server/common/validators/validate-config';
import { IsString } from 'class-validator';

class EnvironmentVariablesValidator {
  @IsString()
  SCRAPE_API_URL: string;

  @IsString()
  SCRAPE_API_KEY: string;
}

export default registerAs<LinkedinConfig>('linkedin', (): LinkedinConfig => {
  validateConfig<EnvironmentVariablesValidator>(
    process.env,
    EnvironmentVariablesValidator,
  );
  return {
    scrapeApiUrl: process.env.SCRAPE_API_URL || '',
    scrapeApiKey: process.env.SCRAPE_API_KEY || '',
  };
});
