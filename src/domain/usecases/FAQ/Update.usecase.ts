import { FAQRepository } from '../../../data/repositories/FAQ.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { FAQEntity, InsertFAQ } from '../../entities/FAQ.entity';

export type UpdateFAQReq = { id: string } & InsertFAQ;
export type UpdateFAQRes = Promise<
  Result<FAQEntity, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export class UpdateFAQUseCaseImpl
  implements UseCase<UpdateFAQReq, UpdateFAQRes>
{
  constructor(private repository: FAQRepository) {}

  async execute(req: UpdateFAQReq): UpdateFAQRes {
    const { result } = await this.repository.updateFAQ(req);

    if (result.type === 'ERROR') {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(FAQEntity.fromModel(result.data));
  }
}
