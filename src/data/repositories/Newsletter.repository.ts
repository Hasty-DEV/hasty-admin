import { z } from 'zod';
import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { DefaultResultError, Result } from '../../utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import { ListedNewsletterModel } from '../model/Newsletter.model';

export type ListALLReq = object;
export type ListALLRes = Promise<
  Result<
    ListedNewsletterModel[],
    { code: 'SERIALIZATION' } | DefaultResultError
  >
>;

export interface NewsletterRepository {
  listAll(req: ListALLReq): ListALLRes;
}

export class NewsletterRepositoryImpl implements NewsletterRepository {
  constructor(private api: RemoteDataSource) {}

  @ExceptionHandler()
  async listAll(): ListALLRes {
    const result = await this.api.get({
      url: `/newsletter/list-all`,
      model: z.array(ListedNewsletterModel),
    });

    if (!result) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(result);
  }
}
