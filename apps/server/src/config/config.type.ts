import { ToolsConfig } from '@server/tools/config/tools-config.type';
import { AppConfig } from './app-config.type';
import { LinkedinConfig } from '@server/linkedin/config/linkedin-config.type';
import { OpenAiConfig } from '@server/openai/config/openai-config.type';

export type AllConfigType = {
  app: AppConfig;
  tools: ToolsConfig;
  linkedin: LinkedinConfig;
  openai: OpenAiConfig;
};
