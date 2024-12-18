import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignIn } from '../../../../domain/entities/Auth.entity';
import { UseCases } from '../../../../domain/usecases/UseCases';

export function useSignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>();
  const [error, setErrorState] = useState<string | null>(null);

  const onSubmit = async (data: SignIn) => {
    try {
      const { result } = await UseCases.auth.signIn.execute(data);

      if (result.type === 'ERROR') {
        return;
      }

      if (result.data.token) {
        console.log(result.data.token);
        alert('Usuário autenticado com sucesso');
        navigate('/');
      }
    } catch (error) {
      setErrorState('Erro ao autenticar. Verifique suas credenciais.');
      console.error('Erro ao autenticar', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { result } = await UseCases.auth.googleSignIn.execute();

      if (result.type === 'ERROR') {
        return;
      }
      if (result.data.token) {
        console.log(result.data.token);
        alert('Usuário autenticado com Google com sucesso');
        navigate('/');
      }
    } catch (error) {
      setErrorState('Erro ao autenticar com Google.');
      console.error('Erro ao autenticar com Google', error);
    }
  };

  return {
    error,
    errors,
    register,
    handleGoogleSignIn,
    onsubmit: handleSubmit(onSubmit),
  };
}
