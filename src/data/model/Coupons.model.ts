import { z } from 'zod';

export class InsertCouponModel {
  code!: string;
  discountType!: 'percentage' | 'fixedAmount';
  discountValue!: number;
  minPurchaseValue?: number | null;
  maxDiscountValue?: number | null;
  usageLimit?: number | null;
  usedCount!: number;
  isActive?: boolean;
  validFrom!: string;
  validUntil?: string | null;
}

export const InsertedCouponModel = z.object({
  id: z.string().min(1),
});
export type InsertedCouponModel = z.infer<typeof InsertedCouponModel>;

export class ListCouponsModel {
  id!: string;
}

export const ListedCouponModel = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  discountType: z.enum(['percentage', 'fixedAmount']),
  discountValue: z.number(),
  validFrom: z.string(),
  validUntil: z.string().optional(),
  minPurchaseValue: z.number().optional(),
  maxDiscountValue: z.number().optional(),
  usageLimit: z.number().optional(),
  usedCount: z.number(),
  isActive: z.boolean(),
});
export type ListedCouponModel = z.infer<typeof ListedCouponModel>;

export const ListedAllCouponsModel = z.object({
  data: z.array(ListedCouponModel),
  page: z.number().nullable(),
  limit: z.number().nullable(),
  totalPages: z.number().nullable(),
});
export type ListedAllCouponsModel = z.infer<typeof ListedAllCouponsModel>;

export class ToggleCouponStatusModel {
  id!: string;
}

export const ToggledCouponStatusModel = z.object({
  code: z.string().min(1),
  isActive: z.boolean(),
});
export type ToggledCouponStatusModel = z.infer<typeof ToggledCouponStatusModel>;
