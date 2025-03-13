import { z } from 'zod';
import { FAQSchema, InsertFAQModel } from '../../data/model/FAQ.model';

/** Entidade para inserção/atualização de FAQ */
export class InsertFAQ {
  question!: string;
  answer!: string;
  category!: string;

  public static toModel(entity: InsertFAQ): InsertFAQModel {
    return {
      question: entity.question,
      answer: entity.answer,
      category: entity.category,
    };
  }
}

/** Entidade que representa uma FAQ conforme retornada pela API */
export class FAQEntity {
  id!: string;
  question!: string;
  answer!: string;
  category!: string;
  createdAt!: string;
  updatedAt!: string;

  public static fromModel(model: z.infer<typeof FAQSchema>): FAQEntity {
    const entity = new FAQEntity();
    entity.id = model.id;
    entity.question = model.question;
    entity.answer = model.answer;
    entity.category = model.category;
    entity.createdAt = model.createdAt;
    entity.updatedAt = model.updatedAt;
    return entity;
  }
}
