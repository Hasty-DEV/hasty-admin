import { z } from 'zod';

export const ReportedDepositModel = z.object({
  id: z.string().min(1),
  transactionId: z.string().min(1),
  phone: z.string(),
  coldWallet: z.string(),
  network: z.string(),
  paymentMethod: z.string(),
  documentId: z.string().nullable(),
  transactionDate: z.string(),
  cupom: z.string().optional().nullable(),
  valueBRL: z.number(),
  valueBTC: z.number(),
  status: z.string(),
  discountType: z.string().optional(),
  discountValue: z.number().optional(),
  valueCollected: z.number().optional(),
});
export type ReportedDepositModel = z.infer<typeof ReportedDepositModel>;
