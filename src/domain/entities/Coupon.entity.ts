import { ListedCouponModel } from "../../data/model/Coupons.model";

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
