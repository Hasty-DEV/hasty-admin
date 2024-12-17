import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useState } from 'react';
import { FaEnvelope, FaGoogle, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../data/datasource/Firebase.datasource';
import AuthImage from '../../assets/AuthImage.svg';
import Logo from '../../assets/logo/logo-light.svg';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== rePassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img src={Logo} alt="Logo" />
              </Link>
              <p className="2xl:px-20">
                Crie sua conta para acessar os melhores recursos.
              </p>

              <span className="mt-15 inline-block">
                <img src={AuthImage} alt="Imagem de autenticação" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">
                Comece gratuitamente
              </span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Cadastre-se no TailAdmin
              </h2>

              <form onSubmit={handleSubmit}>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Nome
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Digite seu nome completo"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span className="absolute right-4 top-4">
                      <FaUser className="text-gray-500" size={22} />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Digite seu e-mail"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="absolute right-4 top-4">
                      <FaEnvelope className="text-gray-500" size={22} />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Digite sua senha"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="absolute right-4 top-4">
                      <FaLock className="text-gray-500" size={22} />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Repetir Senha
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Repita sua senha"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                    />
                    <span className="absolute right-4 top-4">
                      <FaLock className="text-gray-500" size={22} />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Criar conta"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                >
                  <FaGoogle className="text-blue-500" size={20} />
                  Inscreva-se com o Google
                </button>

                <div className="mt-6 text-center">
                  <p>
                    Já tem uma conta?{' '}
                    <Link to="/sign-in" className="text-primary">
                      Faça login
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
