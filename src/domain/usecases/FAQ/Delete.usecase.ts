import { FAQRepository } from '../../../data/repositories/FAQ.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';

export type DeleteFAQReq = { id: string };
export type DeleteFAQRes = Promise<
  Result<{ message: string }, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export class DeleteFAQUseCaseImpl
  implements UseCase<DeleteFAQReq, DeleteFAQRes>
{
  constructor(private repository: FAQRepository) {}

  async execute(req: DeleteFAQReq): DeleteFAQRes {
    const { result } = await this.repository.deleteFAQ(req);

    if (result.type === 'ERROR') {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(result.data);
  }
}
