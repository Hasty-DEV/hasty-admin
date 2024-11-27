import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListedCoupon } from '../../../domain/entities/Coupon.entity';
import { UseCases } from '../../../domain/usecases/UseCases';

export function useCouponDetails() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<ListedCoupon>();

  const fetchCoupon = async (id: string) => {
    setLoading(true);
    try {
      const { result } = await UseCases.coupon.listOne.execute({ id });

      if (result.type === 'ERROR') {
        alert('ERRO AO BUSCAR CUPOM');
        return;
      }

      setCoupon(result.data);
    } finally {
      setLoading(false);
    }
  };

  const toggleCouponStatus = async (id: string) => {
    if (!coupon) return;

    setLoading(true);
    try {
      const { result } = await UseCases.coupon.toggleStatus.execute({ id });

      if (result.type === 'ERROR') {
        alert('ERRO AO BUSCAR CUPOM');
        return;
      }

      setCoupon({
        ...coupon,
        isActive: result.data.isActive,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchCoupon(id);
  }, [id]);

  return {
    loading,
    coupon: {
      id: id,
      value: coupon,
      listDetails: fetchCoupon,
      toggleStatus: toggleCouponStatus,
    },
  };
}
