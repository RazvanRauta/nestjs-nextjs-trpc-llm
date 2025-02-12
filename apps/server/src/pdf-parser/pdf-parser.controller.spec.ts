import { Test, TestingModule } from '@nestjs/testing';
import { PdfParserController } from './pdf-parser.controller';
import { PdfParserService } from './pdf-parser.service';

describe('PdfParserController', () => {
  let controller: PdfParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfParserController],
      providers: [PdfParserService],
    }).compile();

    controller = module.get<PdfParserController>(PdfParserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
