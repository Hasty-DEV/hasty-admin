import { FAQRepository } from '../../../data/repositories/FAQ.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { InsertFAQ } from '../../entities/FAQ.entity';

export type InsertFAQReq = InsertFAQ;
export type InsertFAQRes = Promise<
  Result<
    object,
    | { code: 'BAD_REQUEST' }
    | { code: 'ALREADY_EXISTS' }
    | { code: 'SERIALIZATION' }
    | DefaultResultError
  >
>;

export class InsertFAQUseCaseImpl
  implements UseCase<InsertFAQReq, InsertFAQRes>
{
  constructor(private repository: FAQRepository) {}

  async execute(req: InsertFAQReq): InsertFAQRes {
    const { result } = await this.repository.createFAQ(InsertFAQ.toModel(req));

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        // Aqui você pode tratar outros erros específicos se necessário.
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success({});
  }
}
