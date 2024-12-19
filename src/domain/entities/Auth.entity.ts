import { LoggedUserModel, SignInModel } from '../../data/model/Auth.model';

export class SignIn {
  email!: string;
  password!: string;

  public static fromModel(model: SignInModel): SignIn {
    const entity = new SignIn();

    entity.email = model.email;

    entity.password = model.password;

    return entity;
  }
}

export class LoggedUser {
  token!: string;

  public static fromModel(model: LoggedUserModel): LoggedUser {
    const entity = new LoggedUser();

    entity.token = model.token;

    return entity;
  }
}
