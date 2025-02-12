import { Controller, Get } from '@nestjs/common';
import { PdfParserService } from './pdf-parser.service';
import { PDFParserOutputType } from './parsers/pdf-output.parser';

@Controller('pdf-parser')
export class PdfParserController {
  constructor(private readonly pdfParserService: PdfParserService) {}

  @Get()
  async parsePdf(): Promise<PDFParserOutputType[]> {
    return await this.pdfParserService.parseMultiplePdfs();
  }
}
