import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  InsertCoupon,
  InsertCouponSchema,
} from '../../../domain/entities/Coupon.entity';
import { UseCases } from '../../../domain/usecases/UseCases';

export function useCouponForm() {
  const [loading, setLoading] = useState<boolean>(false);

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
      const { result } = await UseCases.coupon.insert.execute(data);

      if(result.type === "ERROR") {
        switch(result.error.code) {
          case "ALREADY_EXISTS":
            alert("CUPOM JÁ EXISTE!");
            return;
          default: 
          alert("ERRO AO CRIAR O CUPOM");
        return;
        }
        
      }

      alert("CUPOM CRIADO COM SUCESSO");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    form: {
      errors,
      register,
      onsubmit: handleSubmit(onSubmit),
    },
  };
}
