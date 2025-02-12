import { Module } from '@nestjs/common';
import { GetTextLengthService } from './get-text-length.service';

@Module({
  providers: [GetTextLengthService],
  exports: [GetTextLengthService],
})
export class GetTextLengthModule {}
