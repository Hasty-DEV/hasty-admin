import { z } from 'zod';
import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { DefaultResultError, Result } from '../../utils/Result';
import { ListAllCouponsModel, ListedCouponModel } from '../model/Coupons.model';
import { RemoteDataSource } from '../Remote.datasource';

export type ListALLReq = ListAllCouponsModel;

export type ListALLRes = Promise<
  Result<ListedCouponModel[], { code: 'SERIALIZATION' } | DefaultResultError>
>;

export interface CouponRepository {
  listAll(req: ListALLReq): ListALLRes;
}

export class CouponRepositoryImpl implements CouponRepository {
  constructor(private api: RemoteDataSource) {}

  @ExceptionHandler()
  async listAll(): ListALLRes {
    const result = await this.api.get({
      url: `/coupons/list-all`,
      model: z.array(ListedCouponModel),
    });

    if (!result) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(result);
  }
}
