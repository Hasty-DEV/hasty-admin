import { z } from 'zod';

/** Modelo de inserção – usado como body da requisição para criar/atualizar */
export class InsertFAQModel {
  question!: string;
  answer!: string;
  category!: string;
}

/** Schema para a FAQ inserida, que é a resposta do back-end após criação/atualização */
export const InsertedFAQModel = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().min(1),
  createdAt: z.string(), // ISO string
  updatedAt: z.string(),
});

/** Modelo para listagem individual de FAQ */
export class FAQModel {
  id!: string;
  question!: string;
  answer!: string;
  category!: string;
  createdAt!: string;
  updatedAt!: string;
}

/** Schema para listagem individual */
export const FAQSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/** Schema para listagem de todas as FAQs – neste exemplo, a API retorna um array simples */
export const ListedAllFAQModel = z.array(FAQSchema);

/** Schema para a resposta de deleção */
export const DeletedFAQModel = z.object({
  message: z.string(),
});

export type InsertedFAQModelType = z.infer<typeof InsertedFAQModel>;
