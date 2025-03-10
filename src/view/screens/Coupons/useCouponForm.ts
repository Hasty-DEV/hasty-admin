import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  InsertCoupon,
  InsertCouponSchema,
} from '../../../domain/entities/Coupon.entity';

export function useCouponForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const API_URL = String(import.meta.env.VITE_API_URL);
  const API_URL_ALFRED = String(import.meta.env.VITE_API_ALFRED);

  const form = useForm<InsertCoupon>({
    resolver: zodResolver(InsertCouponSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: InsertCoupon) => {
    setLoading(true);
    try {
      const apiUrl =
        form.getValues('type') === 'alfred' ? API_URL_ALFRED : API_URL;

      if (!apiUrl) {
        throw new Error('API URL não definida');
      }

      console.log('URL da API:', apiUrl);
      console.log('Dados do formulário antes de transformar:', data);

      const transformedData = InsertCoupon.toModel(data);

      if (
        !transformedData.validUntil ||
        transformedData.validUntil.trim() === ''
      ) {
        transformedData.validUntil = '2125-02-05';
      }

      const response = await fetch(`${apiUrl}/coupons/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...transformedData, isActive: true }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Resposta da API:', result);

      if (result.type === 'ERROR') {
        console.error('Erro retornado pela API:', result);
        switch (result.error.code) {
          case 'ALREADY_EXISTS':
            alert('CUPOM JÁ EXISTE!');
            return;
          default:
            alert('ERRO AO CRIAR O CUPOM');
            return;
        }
      }

      alert('CUPOM CRIADO COM SUCESSO');
    } catch (error) {
      console.error('Erro ao enviar o cupom:', error);
      alert('Erro ao enviar o cupom.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    form: {
      value: form,
      errors,
      register,
      onsubmit: handleSubmit(onSubmit),
    },
  };
}
