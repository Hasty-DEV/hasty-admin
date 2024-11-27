import { CouponRepository } from '../../../data/repositories/Coupons.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import {
  ToggleCouponStatus,
  ToggledCouponStatus,
} from '../../entities/Coupon.entity';

export type ToggleStatusReq = ToggleCouponStatus;

export type ToggleStatusRes = Promise<
  Result<ToggledCouponStatus, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type ToggleCouponStatusUseCase = UseCase<
  ToggleStatusReq,
  ToggleStatusRes
>;

export class ToggleCouponStatusUseCaseImpl
  implements ToggleCouponStatusUseCase
{
  constructor(private repository: CouponRepository) {}

  async execute(req: ToggleStatusReq): ToggleStatusRes {
    const { result } = await this.repository.toggleStatus({ id: req.id });

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(ToggledCouponStatus.fromModel(result.data));
  }
}
