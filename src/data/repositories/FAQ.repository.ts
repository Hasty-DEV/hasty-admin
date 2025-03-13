import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { Result } from '../../utils/Result';
import { InsertFAQModel, InsertedFAQModelType } from '../model/FAQ.model';

export type InsertFAQReq = InsertFAQModel;
export type InsertFAQRes = Promise<
  Result<InsertedFAQModelType, { code: 'SERIALIZATION' }>
>;

export type ListFAQReq = void;
export type ListFAQRes = Promise<
  Result<InsertedFAQModelType[], { code: 'SERIALIZATION' }>
>;

export type UpdateFAQReq = { id: string } & InsertFAQModel;
export type UpdateFAQRes = Promise<
  Result<InsertedFAQModelType, { code: 'SERIALIZATION' }>
>;

export type DeleteFAQReq = { id: string };
export type DeleteFAQRes = Promise<
  Result<{ message: string }, { code: 'SERIALIZATION' }>
>;

export interface FAQRepository {
  createFAQ(req: InsertFAQReq): InsertFAQRes;
  listAllFAQ(): ListFAQRes;
  updateFAQ(req: UpdateFAQReq): UpdateFAQRes;
  deleteFAQ(req: DeleteFAQReq): DeleteFAQRes;
}
const API_URL_ALFRED = String(import.meta.env.VITE_API_ALFRED);
export class FAQRepositoryImpl implements FAQRepository {
  constructor() {}

  @ExceptionHandler()
  async createFAQ(req: InsertFAQReq): InsertFAQRes {
    const response = await fetch(`${API_URL_ALFRED}/faq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    const result = await response.json();
    console.log('Resposta da API:', result);
    return Result.Success(Array.isArray(result) ? result : result.data);
  }

  @ExceptionHandler()
  async listAllFAQ(): ListFAQRes {
    const response = await fetch(`${API_URL_ALFRED}/faq`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    const result = await response.json();

    // Garante que result.data seja sempre um array
    const faqList = Array.isArray(result.result.data)
      ? result.result.data
      : [result.result.data]; // Converte em array se for um único objeto

    return Result.Success(faqList);
  }
  @ExceptionHandler()
  async updateFAQ(req: UpdateFAQReq): UpdateFAQRes {
    const response = await fetch(`${API_URL_ALFRED}/faq/${req.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    const result = await response.json();
    return Result.Success(result);
  }

  @ExceptionHandler()
  async deleteFAQ(req: DeleteFAQReq): DeleteFAQRes {
    const response = await fetch(`${API_URL_ALFRED}/faq/${req.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    const result = await response.json();
    return Result.Success(result);
  }
}
