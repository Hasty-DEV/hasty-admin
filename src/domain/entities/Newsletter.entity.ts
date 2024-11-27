import { ListedNewsletterModel } from '../../data/model/Newsletter.model';

export class ListedNewsletter {
  id!: string;
  email!: string;
  isActive?: boolean;

  public static fromModel(model: ListedNewsletterModel): ListedNewsletter {
    const entity = new ListedNewsletter();

    entity.id = model.id;

    entity.email = model.email;

    entity.isActive = model.isActive;

    return entity;
  }
}
