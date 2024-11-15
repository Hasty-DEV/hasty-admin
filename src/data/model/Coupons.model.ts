import { z } from "zod";

export class ListAllCouponsModel {}

export const ListedCouponModel = z.object({
    code: z.string().min(1),
    discountType: z.enum(['percentage','fixedAmount']),
    discountValue: z.number(),
    validUntil: z.string().optional(),
    minPurchaseValue: z.number().optional(),
    maxDiscountValue:  z.number().optional(),
    usageLimit:  z.number().optional(),
    usedCount: z.number(),
    isActive: z.boolean(),
});
export type ListedCouponModel = z.infer<typeof ListedCouponModel>;
