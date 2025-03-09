import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { DefaultResultError, Result } from '../../utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import { ReportedDepositPaginationModel } from '../model/Report.model';

export type ReportDepositReq = {
  page: number;
  pageSize: number;
  status?: 'paid' | 'expired' | 'pending' | 'canceled';
  startAt?: string;
  endAt?: string;
};
export type ReportDepositRes = Promise<
  Result<
    ReportedDepositPaginationModel,
    { code: 'SERIALIZATION' } | DefaultResultError
  >
>;

export interface ReportRepository {
  deposit(req: ReportDepositReq): ReportDepositRes;
}

export class ReportRepositoryImpl implements ReportRepository {
  constructor(private api: RemoteDataSource) {}

  @ExceptionHandler()
  async deposit(req: ReportDepositReq): ReportDepositRes {
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
