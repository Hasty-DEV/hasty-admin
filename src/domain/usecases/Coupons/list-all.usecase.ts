import { CouponRepository } from '../../../data/repositories/Coupons.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { ListAllCoupons, ListedCoupon } from '../../entities/Coupon.entity';

export type ListReq = ListAllCoupons;

export type ListRes = Promise<
  Result<ListedCoupon[], { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type ListAllCouponsUseCase = UseCase<ListReq, ListRes>;

export class ListAllCouponsUseCaseImpl implements ListAllCouponsUseCase {
  constructor(private repository: CouponRepository) {}

  async execute(): ListRes {
    const { result } = await this.repository.listAll({});

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(
      result.data.map((item) => ListedCoupon.fromModel(item)),
    );
  }
}
