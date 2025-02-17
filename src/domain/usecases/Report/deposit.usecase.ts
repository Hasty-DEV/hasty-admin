import { ReportRepository } from '../../../data/repositories/Report.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { ReportedDeposit } from '../../entities/Report.entity';

export type ListReq = object;
export type ListRes = Promise<
  Result<ReportedDeposit[], { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type ReportDepositUseCase = UseCase<ListReq, ListRes>;

export class ReportDepositUseCaseImpl implements ReportDepositUseCase {
  constructor(private repository: ReportRepository) {}

  async execute(): ListRes {
    const { result } = await this.repository.deposit({});

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(
      result.data.map((item) => ReportedDeposit.fromModel(item)),
    );
  }
}
