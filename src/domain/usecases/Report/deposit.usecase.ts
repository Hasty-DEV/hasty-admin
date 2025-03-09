import { ReportRepository } from '../../../data/repositories/Report.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { ReportedDepositPagination } from '../../entities/Report.entity';

export type ListReq = {
  page: number;
  pageSize: number;
  status?: 'paid' | 'expired' | 'pending' | 'canceled';
  startAt?: string;
  endAt?: string;
};
export type ListRes = Promise<
  Result<
    ReportedDepositPagination,
    { code: 'SERIALIZATION' } | DefaultResultError
  >
>;

export type ReportDepositUseCase = UseCase<ListReq, ListRes>;

export class ReportDepositUseCaseImpl implements ReportDepositUseCase {
  constructor(private repository: ReportRepository) {}

  async execute(req: ListReq): ListRes {
    const { result } = await this.repository.deposit({
      page: req.page,
      pageSize: req.pageSize,
      status: req.status,
      endAt: req.endAt,
      startAt: req.startAt,
    });

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(ReportedDepositPagination.fromModel(result.data));
  }
}
