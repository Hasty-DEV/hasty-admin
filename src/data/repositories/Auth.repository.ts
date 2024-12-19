import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { DefaultResultError, Result } from '../../utils/Result';
import { FirebaseDatasourceImpl } from '../datasource/Firebase.datasource';
import { LoggedUserModel, SignInModel } from '../model/Auth.model';

export type SignInReq = SignInModel;
export type SignInRes = Promise<Result<LoggedUserModel, DefaultResultError>>;

export type SignInGoogleReq = object;
export type SignInGoogleRes = Promise<
  Result<LoggedUserModel, DefaultResultError>
>;

export interface AuthRepository {
  signIn(req: SignInReq): SignInRes;
  googleSignIn(req: SignInGoogleReq): SignInGoogleRes;
}

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private provider: FirebaseDatasourceImpl) {}

  @ExceptionHandler()
  async signIn(req: SignInReq): SignInRes {
    const result = await this.provider.signInWithEmailAndPassword({
      email: req.email,
      password: req.password,
    });

    const token = await result.user.getIdToken();

    return Result.Success({ token });
  }

  @ExceptionHandler()
  async googleSignIn(): SignInRes {
    const result = await this.provider.signInWithGoogle();

    const token = await result.user.getIdToken();

    return Result.Success({ token });
  }
}
