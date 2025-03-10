import { z } from 'zod';
import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { DefaultResultError, Result } from '../../utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import {
  ReportedDepositModel,
  ReportedDepositPaginationModel,
} from '../model/Report.model';

export type ReportDepositPaginatedReq = {
  page: number;
  pageSize: number;
  status?: 'paid' | 'expired' | 'pending' | 'canceled';
  startAt?: string;
  endAt?: string;
};
export type ReportDepositPaginatedRes = Promise<
  Result<
    ReportedDepositPaginationModel,
    { code: 'SERIALIZATION' } | { code: 'NOT_FOUND' } | DefaultResultError
  >
>;

export type ReportDepositRes = Promise<
  Result<
    ReportedDepositModel[],
    { code: 'SERIALIZATION' } | { code: 'NOT_FOUND' } | DefaultResultError
  >
>;

export interface ReportRepository {
  deposit(): ReportDepositRes;
  depositPaginated(req: ReportDepositPaginatedReq): ReportDepositPaginatedRes;
}

export class ReportRepositoryImpl implements ReportRepository {
  constructor(private api: RemoteDataSource) {}

  @ExceptionHandler()
  async deposit(): ReportDepositRes {
    const result = await this.api.get({
      url: `/report/deposit`,
      model: z.array(ReportedDepositModel),
    });

    if (!result) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(result);
  }

  @ExceptionHandler()
  async depositPaginated(
    req: ReportDepositPaginatedReq,
  ): ReportDepositPaginatedRes {
    const params = new URLSearchParams();
    params.append('page', String(req.page));
    params.append('pageSize', String(req.pageSize));

    if (req.status) {
      params.append('status', req.status);
    }

    if (req.startAt) {
      params.append('startAt', req.startAt);
    }

    if (req.endAt) {
      params.append('endAt', req.endAt);
    }

    const result = await this.api.get({
      url: `/report/deposit/pagination?${params.toString()}`,
      model: ReportedDepositPaginationModel,
    });

    if (!result) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(result);
  }
}
