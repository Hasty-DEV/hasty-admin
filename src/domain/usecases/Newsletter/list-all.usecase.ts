import { NewsletterRepository } from '../../../data/repositories/Newsletter.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { ListedNewsletter } from '../../entities/Newsletter.entity';

export type ListReq = object;

export type ListRes = Promise<
  Result<ListedNewsletter[], { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type ListAllNewsletterUseCase = UseCase<ListReq, ListRes>;

export class ListAllNewsletterUseCaseImpl implements ListAllNewsletterUseCase {
  constructor(private repository: NewsletterRepository) {}

  async execute(): ListRes {
    const { result } = await this.repository.listAll({});

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(
      result.data.map((item) => ListedNewsletter.fromModel(item)),
    );
  }
}
