import { z } from 'zod';
import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { DefaultResultError, Result } from '../../utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import {
  InsertCouponModel,
  InsertedCouponModel,
  ListAllCouponsModel,
  ListedCouponModel,
} from '../model/Coupons.model';

export type InsertReq = InsertCouponModel;
export type InsertRes = Promise<
  Result<
    InsertedCouponModel,
    | { code: 'BAD_REQUEST' }
    | { code: 'ALREADY_EXISTS' }
    | { code: 'SERIALIZATION' }
    | DefaultResultError
  >
>;

export type ListALLReq = ListAllCouponsModel;
export type ListALLRes = Promise<
  Result<ListedCouponModel[], { code: 'SERIALIZATION' } | DefaultResultError>
>;

export interface CouponRepository {
  listAll(req: ListALLReq): ListALLRes;
  insert(req: InsertReq): InsertRes;
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

  @ExceptionHandler()
  async insert(req: InsertReq): InsertRes {
    const result = await this.api.post({
      url: `/coupons/insert`,
      model: InsertedCouponModel,
      body: req,
    });

    if (!result) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(result);
  }
}
