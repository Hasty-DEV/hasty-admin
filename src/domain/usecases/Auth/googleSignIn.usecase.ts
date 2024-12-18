import { AuthRepository } from '../../../data/repositories/Auth.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { LoggedUser } from '../../entities/Auth.entity';

export type SignInGoogleReq = object;
export type SignInGoogleRes = Promise<Result<LoggedUser, DefaultResultError>>;

export type GoogleSignInUseCase = UseCase<SignInGoogleReq, SignInGoogleRes>;

export class GoogleSignInUseCaseImpl implements GoogleSignInUseCase {
  constructor(private repository: AuthRepository) {}

  async execute(): SignInGoogleRes {
    const { result } = await this.repository.googleSignIn({});

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(LoggedUser.fromModel(result.data));
  }
}
