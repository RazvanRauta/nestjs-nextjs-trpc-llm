import { Injectable } from '@nestjs/common';

import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import {
  pdfOutputParser,
  PDFParserOutputType,
} from './parsers/pdf-output.parser';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@server/config/config.type';

@Injectable()
export class PdfParserService {
  constructor(private readonly configService: ConfigService<AllConfigType>) {}

  async parsePdf(): Promise<PDFParserOutputType> {
    const pdfPath = resolve(__dirname, '../assets/invoice2.pdf');
    const pdfBase64 = readFileSync(pdfPath, 'base64');

    const llm = new ChatGoogleGenerativeAI({
      apiKey: this.configService.getOrThrow('pdfParser.apiKey', {
        infer: true,
      }),
      temperature: 0.3,
      model: 'gemini-2.0-flash',
      streaming: true,
    });

    const response = await llm.pipe(pdfOutputParser).invoke([
      ['system', 'Use the provided documents to answer the question'],
      [
        'user',
        [
          {
            type: 'application/pdf',
            data: pdfBase64,
          },
          {
            type: 'text',
            text: `Extract all related invoice data and a list of invoice items from the provided PDF file.
               \n ${pdfOutputParser.getFormatInstructions()}
               `,
          },
        ],
      ],
    ]);

    return response;
  }

  async parseMultiplePdfs(): Promise<PDFParserOutputType[]> {
    const folderPath = resolve(__dirname, '../assets');
    const files = readdirSync(folderPath)
      .filter((file) => file.endsWith('.pdf'))
      .map((file) => resolve(folderPath, file));

    try {
      const results = await Promise.all(
        files.map((file) => this.parseSinglePdf(file)),
      );

      return results;
    } catch (error) {
      console.error('Error parsing PDFs:', error);
      throw error;
    }
  }

  private async parseSinglePdf(filePath: string): Promise<PDFParserOutputType> {
    const pdfBase64 = readFileSync(filePath, 'base64');

    const llm = new ChatGoogleGenerativeAI({
      apiKey: this.configService.getOrThrow('pdfParser.apiKey', {
        infer: true,
      }),
      temperature: 0.3,
      model: 'gemini-2.0-flash',
    });

    return llm.pipe(pdfOutputParser).invoke([
      ['system', 'Use the provided documents to answer the question'],
      [
        'user',
        [
          {
            type: 'application/pdf',
            data: pdfBase64,
          },
          {
            type: 'text',
            text: `Extract all related invoice data and a list of invoice items from the provided PDF file.
               \n ${pdfOutputParser.getFormatInstructions()}
               `,
          },
        ],
      ],
    ]);
  }
}
