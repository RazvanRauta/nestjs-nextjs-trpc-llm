import { z } from 'zod';
import { StructuredOutputParser } from '@langchain/core/output_parsers';

const OutputParserSchema = z.object({
  summary: z.string().describe("A summary of the person's profile"),
  facts: z.array(z.string()).describe('Two interesting facts about the person'),
});

export const outputParser =
  StructuredOutputParser.fromZodSchema(OutputParserSchema);
