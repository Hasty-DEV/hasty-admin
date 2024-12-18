import { AuthRepository } from '../../../data/repositories/Auth.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { LoggedUser, SignIn } from '../../entities/Auth.entity';

export type SignInReq = SignIn;
export type SignInRes = Promise<Result<LoggedUser, DefaultResultError>>;

export type SignInUseCase = UseCase<SignInReq, SignInRes>;

export class SignInUseCaseImpl implements SignInUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(req: SignInReq): SignInRes {
    const { result } = await this.repository.signIn({
      email: req.email,
      password: req.password,
    });

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(LoggedUser.fromModel(result.data));
  }
}
