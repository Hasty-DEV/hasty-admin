import { format, isValid, parse } from 'date-fns';
import { z } from 'zod';
import {
  InsertCouponModel,
  ListedCouponModel,
  ToggledCouponStatusModel,
} from '../../data/model/Coupons.model';

export const InsertCouponSchema = z.object({
  code: z.string().min(1),
  discountType: z.enum(['percentage', 'fixedAmount']),
  discountValue: z
    .string()
    .min(1)
    .transform((val) => Number(val)),
  minPurchaseValue: z
    .string()
    .optional()
    .nullable()
    .transform((val) => Number(val)),
  maxDiscountValue: z
    .string()
    .optional()
    .nullable()
    .transform((val) => Number(val)),
  usageLimit: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  usedCount: z
    .string()
    .min(0)
    .transform((val) => Number(val)),
  isActive: z.boolean().optional(),
  validFrom: z.string().min(1),
  validUntil: z.string().optional().nullable(),
});

export class InsertCoupon {
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

  private static formatDate(dateString: string): string {
    const parsedDate = parse(dateString, 'yyyy/MM/dd', new Date());

    if (!isValid(parsedDate)) {
      const correctedDate = parse(dateString, 'yyyy-MM-dd', new Date());

      if (isValid(correctedDate)) {
        return format(correctedDate, 'yyyy-MM-dd');
      }

      return 'Data inválida';
    }

    return format(parsedDate, 'yyyy-MM-dd');
  }

  public static toModel(entity: InsertCoupon): InsertCouponModel {
    const couponModel = new InsertCouponModel();

    couponModel.code = entity.code;
    couponModel.discountType = entity.discountType;
    couponModel.discountValue = entity.discountValue;
    couponModel.minPurchaseValue = entity.minPurchaseValue || null;
    couponModel.maxDiscountValue = entity.maxDiscountValue || null;
    couponModel.usageLimit = entity.usageLimit || null;
    couponModel.usedCount = entity.usedCount;
    couponModel.isActive = true;
    couponModel.validFrom = this.formatDate(entity.validFrom);
    couponModel.validUntil =
      entity.validUntil && entity.validUntil.trim() !== ''
        ? this.formatDate(entity.validUntil)
        : '2125-02-05';

    return couponModel;
  }
}

export class InsertedCoupon {}

export class ListCoupon {
  id!: string;
}

export class ListedCoupon {
  id!: string;
  code!: string;
  discountType!: 'percentage' | 'fixedAmount';
  discountValue!: number;
  validFrom!: string;
  validUntil?: string;
  minPurchaseValue?: number;
  maxDiscountValue?: number;
  usageLimit?: number;
  usedCount!: number;
  isActive?: boolean;

  public static fromModel(couponModel: ListedCouponModel): ListedCoupon {
    const entity = new ListedCoupon();

    entity.id = couponModel.id;
    entity.code = couponModel.code;
    entity.discountType = couponModel.discountType;
    entity.validFrom = couponModel.validFrom;
    entity.validUntil = couponModel.validUntil;
    entity.discountValue = couponModel.discountValue;
    entity.isActive = couponModel.isActive;
    entity.maxDiscountValue = couponModel.maxDiscountValue;
    entity.minPurchaseValue = couponModel.minPurchaseValue;
    entity.usageLimit = couponModel.usageLimit;
    entity.usedCount = couponModel.usedCount;

    return entity;
  }
}

export class ToggleCouponStatus {
  id!: string;
}

export class ToggledCouponStatus {
  code!: string;
  isActive!: boolean;

  public static fromModel(
    couponModel: ToggledCouponStatusModel,
  ): ToggledCouponStatus {
    const entity = new ToggledCouponStatus();
    entity.code = couponModel.code;
    entity.isActive = couponModel.isActive;
    return entity;
  }
}
