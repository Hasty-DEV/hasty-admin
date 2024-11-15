import { format, isValid, parse } from 'date-fns';
import {
  InsertCouponModel,
  ListedCouponModel,
} from '../../data/model/Coupons.model';
import { z } from 'zod';

export const InsertCouponSchema = z.object({
  code: z.string().min(1),
  discountType: z.enum(['percentage', 'fixedAmount']),
  discountValue: z.string().min(1).transform(val => Number(val)),
  minPurchaseValue: z.string().optional().nullable().transform(val => Number(val)),
  maxDiscountValue: z.string().optional().nullable().transform(val => Number(val)),
  usageLimit: z.string().optional().transform(val => Number(val)),
  usedCount: z.string().min(0).transform(val => Number(val)),
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
    const model = new InsertCouponModel();

    model.code = entity.code;

    model.discountType = entity.discountType;

    model.discountValue = entity.discountValue;

    if (entity.minPurchaseValue === 0) {
      model.minPurchaseValue = null;
    }

    if (entity.minPurchaseValue !== 0) {
      model.minPurchaseValue = entity.minPurchaseValue;
    }

    if (entity.maxDiscountValue === 0) {
      model.maxDiscountValue = null;
    }

    if (entity.maxDiscountValue !== 0) {
      model.maxDiscountValue = entity.maxDiscountValue;
    }

    if (entity.usageLimit === 0) {
      model.usageLimit = null;
    }

    if (entity.usageLimit !== 0) {
      model.usageLimit = entity.usageLimit;
    }

    model.usedCount = entity.usedCount;

    model.isActive = true;

    model.validFrom = this.formatDate(entity.validFrom);

    if (entity.validUntil) {
      model.validUntil = this.formatDate(entity.validUntil);
    }

    if (!entity.validUntil || entity.validUntil === '') {
      model.validUntil = null;
    }

    return model;
  }
}

export class InsertedCoupon {}

export class ListAllCoupons {}

export class ListedCoupon {
  code!: string;
  discountType!: 'percentage' | 'fixedAmount';
  discountValue!: number;
  validUntil?: string;
  minPurchaseValue?: number;
  maxDiscountValue?: number;
  usageLimit?: number;
  usedCount!: number;
  isActive?: boolean;

  public static fromModel(model: ListedCouponModel): ListedCoupon {
    const entity = new ListedCoupon();

    entity.code = model.code;

    entity.discountType = model.discountType;

    entity.validUntil = model.validUntil;

    entity.discountValue = model.discountValue;

    entity.isActive = model.isActive;

    entity.maxDiscountValue = model.maxDiscountValue;

    entity.minPurchaseValue = model.minPurchaseValue;

    entity.usageLimit = model.usageLimit;

    entity.usedCount = model.usedCount;

    return entity;
  }
}
