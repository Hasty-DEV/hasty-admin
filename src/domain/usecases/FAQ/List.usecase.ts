import { FAQRepository } from '../../../data/repositories/FAQ.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { FAQEntity } from '../../entities/FAQ.entity';

export type ListFAQReq = void;
export type ListFAQRes = Promise<
  Result<FAQEntity[], { code: 'SERIALIZATION' } | DefaultResultError>
>;

export class ListFAQUseCaseImpl implements UseCase<ListFAQReq, ListFAQRes> {
  constructor(private repository: FAQRepository) {}

  async execute(): ListFAQRes {
    const { result } = await this.repository.listAllFAQ();

    if (result.type === 'ERROR') {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    const faqs = result.data.map((faq) => FAQEntity.fromModel(faq));
    return Result.Success(faqs);
  }
}
