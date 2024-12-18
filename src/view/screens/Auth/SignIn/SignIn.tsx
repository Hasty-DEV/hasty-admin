import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthImage from '../../../assets/AuthImage.svg';
import Logo from '../../../assets/logo/logo-light.svg';
import { useSignIn } from './useSignIn';

export function SignIn() {
  const { error, errors, register, onsubmit, handleGoogleSignIn } = useSignIn();

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="border border-stroke bg-white shadow-default">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img src={Logo} alt="Logo" />
              </Link>

              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>

              <span className="mt-15 inline-block">
                <img src={AuthImage} alt="Imagem de autenticação" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Comece de graça</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Entre no HastyDev
              </h2>

              <form onSubmit={onsubmit}>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email é obrigatório',
                      })}
                      placeholder="Digite seu email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      {...register('password', {
                        required: 'Senha é obrigatória',
                      })}
                      placeholder="Digite sua senha"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Entrar"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mb-5 text-center">
                  <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="w-full flex items-center justify-center bg-blue-500 p-4 text-white rounded-lg"
                  >
                    <FaGoogle size={20} className="mr-2" />
                    Entrar com Google
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Não tem uma conta?{' '}
                    <Link to="/sign-up" className="text-primary">
                      Cadastre-se
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
