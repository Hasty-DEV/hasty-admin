import { CouponRepository } from '../../../data/repositories/Coupons.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { InsertCoupon, InsertedCoupon } from '../../entities/Coupon.entity';

export type InsertReq = InsertCoupon;
export type InsertRes = Promise<
  Result<
    InsertedCoupon,
    | { code: 'BAD_REQUEST' }
    | { code: 'ALREADY_EXISTS' }
    | { code: 'SERIALIZATION' }
    | DefaultResultError
  >
>;

export type InsertCouponUseCase = UseCase<InsertReq, InsertRes>;

export class InsertCouponUseCaseImpl implements InsertCouponUseCase {
  constructor(private repository: CouponRepository) {}

  async execute(req: InsertReq): InsertRes {
    const { result } = await this.repository.insert(InsertCoupon.toModel(req));

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        case 'BAD_REQUEST':
          return Result.Error({ code: 'BAD_REQUEST' });
        case 'ALREADY_EXISTS':
          return Result.Error({ code: 'ALREADY_EXISTS' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success({});
  }
}
