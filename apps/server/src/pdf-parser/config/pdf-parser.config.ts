import { registerAs } from '@nestjs/config';
import validateConfig from '@server/common/validators/validate-config';
import { IsString } from 'class-validator';
import { PdfParserConfig } from './pdf-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  GOOGLE_API_KEY: string;
}

export default registerAs<PdfParserConfig>('pdfParser', (): PdfParserConfig => {
  validateConfig<EnvironmentVariablesValidator>(
    process.env,
    EnvironmentVariablesValidator,
  );
  return {
    apiKey: process.env.GOOGLE_API_KEY || '',
  };
});
