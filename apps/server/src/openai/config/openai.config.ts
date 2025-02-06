import { registerAs } from '@nestjs/config';
import validateConfig from '@server/common/validators/validate-config';
import { IsString } from 'class-validator';
import { OpenAiConfig } from './openai-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  OPENAI_API_KEY: string;

  @IsString()
  OPENAI_API_MODEL: string;
}

export default registerAs<OpenAiConfig>('openai', (): OpenAiConfig => {
  validateConfig<EnvironmentVariablesValidator>(
    process.env,
    EnvironmentVariablesValidator,
  );
  return {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_API_MODEL || '',
  };
});
