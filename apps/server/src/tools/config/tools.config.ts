import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { ToolsConfig } from './tools-config.type';
import validateConfig from '@server/common/validators/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  TAVILY_API_KEY: string;
}

export default registerAs<ToolsConfig>('tools', (): ToolsConfig => {
  validateConfig<EnvironmentVariablesValidator>(
    process.env,
    EnvironmentVariablesValidator,
  );
  return {
    tavilyApiKey: process.env.TAVILY_API_KEY || '',
  };
});
