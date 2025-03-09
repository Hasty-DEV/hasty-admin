import { z } from 'zod';
import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { DefaultResultError, Result } from '../../utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import {
  InsertCouponModel,
  InsertedCouponModel,
  ListCouponsModel,
  ListedCouponModel,
  ToggleCouponStatusModel,
  ToggledCouponStatusModel,
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

export type ListALLReq = {
  page: number;
  limit: number;
};
export type ListALLRes = Promise<
  Result<ListedCouponModel[], { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type ListOneReq = ListCouponsModel;
export type ListOneRes = Promise<
  Result<ListedCouponModel, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type ToggleStatusReq = ToggleCouponStatusModel;
export type ToggleStatusRes = Promise<
  Result<
    ToggledCouponStatusModel,
    { code: 'SERIALIZATION' } | DefaultResultError
  >
>;

export interface CouponRepository {
  toggleStatus(req: ToggleStatusReq): ToggleStatusRes;
  listAll(req: ListALLReq): ListALLRes;
  listOne(req: ListOneReq): ListOneRes;
  insert(req: InsertReq): InsertRes;
}

export class CouponRepositoryImpl implements CouponRepository {
  constructor(private api: RemoteDataSource) {}

  @ExceptionHandler()
  async toggleStatus(req: ToggleStatusReq): ToggleStatusRes {
    const result = await this.api.patch({
      url: `/coupons/toggle-status`,
      model: ToggledCouponStatusModel,
      body: req,
    });

    if (!result) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(result);
  }

  @ExceptionHandler()
  async listAll(req: ListALLReq): ListALLRes {
    const result = await this.api.get({
      url: `/coupons/list-all?page=${req.page}&limit=${req.limit}`,
      model: z.array(ListedCouponModel),
    });

    if (!result) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(result);
  }

  @ExceptionHandler()
  async listOne(req: ListOneReq): ListOneRes {
    const result = await this.api.get({
      url: `/coupons/list/${req.id}`,
      model: ListedCouponModel,
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
