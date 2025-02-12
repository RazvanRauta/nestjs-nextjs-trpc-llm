import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';

export const InvoiceOutputParserSchema = z.object({
  vendor: z.string().nullable().optional().describe('The vendor name'),
  recipient: z.string().nullable().optional().describe('The recipient name'),
  recipientAddress: z
    .string()
    .nullable()
    .optional()
    .describe('The recipient address'),
  billingAccount: z
    .string()
    .nullable()
    .optional()
    .describe('The billing account'),
  invoiceNumber: z
    .string()
    .nullable()
    .optional()
    .describe('The invoice number'),
  invoiceDate: z
    .string()
    .nullable()

    .optional()
    .describe('The invoice date in the format YYYY-MM-DD'),
  dueDate: z
    .string()
    .nullable()

    .optional()
    .describe('The due date in the format YYYY-MM-DD'),
  totalAmount: z.string().nullable().optional().describe('The total amount'),
  totalNetAmount: z
    .string()
    .nullable()

    .optional()
    .describe('The total net amount'),
  billingPeriod: z
    .object({
      startDate: z
        .string()
        .nullable()

        .optional()
        .describe('The start date in the format YYYY-MM-DD'),
      endDate: z
        .string()
        .nullable()

        .optional()
        .describe('The end date in the format YYYY-MM-DD'),
    })
    .nullable()

    .optional()
    .describe('The billing period'),
  currency: z.string().optional().describe('The currency'),
  items: z
    .array(
      z.object({
        description: z
          .string()
          .nullable()
          .optional()
          .describe('The item description'),
        quantity: z.string().nullable().optional().describe('The quantity'),
        unitPrice: z.string().nullable().optional().describe('The unit price'),
        amount: z.string().nullable().optional().describe('The amount'),
      }),
    )
    .nullable()

    .optional()
    .describe('The list of invoice items'),
});

export const pdfOutputParser = StructuredOutputParser.fromZodSchema(
  InvoiceOutputParserSchema,
);

export type PDFParserOutputType = z.infer<typeof InvoiceOutputParserSchema>;
