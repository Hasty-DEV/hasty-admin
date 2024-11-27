import { CouponRepository } from '../../../data/repositories/Coupons.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { ListCoupon, ListedCoupon } from '../../entities/Coupon.entity';

export type ListReq = ListCoupon;

export type ListRes = Promise<
  Result<ListedCoupon, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type ListOneCouponsUseCase = UseCase<ListReq, ListRes>;

export class ListOneCouponsUseCaseImpl implements ListOneCouponsUseCase {
  constructor(private repository: CouponRepository) {}

  async execute(req: ListReq): ListRes {
    const { result } = await this.repository.listOne(req);

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(ListedCoupon.fromModel(result.data));
  }
}
