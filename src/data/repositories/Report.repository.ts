import { z } from 'zod';
import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { DefaultResultError, Result } from '../../utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import { ReportedDepositModel } from '../model/Report.model';

export type ReportDepositReq = object;
export type ReportDepositRes = Promise<
  Result<ReportedDepositModel[], { code: 'SERIALIZATION' } | DefaultResultError>
>;

export interface ReportRepository {
  deposit(req: ReportDepositReq): ReportDepositRes;
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
}
