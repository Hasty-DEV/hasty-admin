import { useEffect, useState } from 'react';
import { ListedCoupon } from '../../../domain/entities/Coupon.entity';
import { UseCases } from '../../../domain/usecases/UseCases';

export function useCouponsList() {
  const [coupons, setCoupons] = useState<ListedCoupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  // const [totalPages, setTotalPages] = useState<number>(1);

  const fetchCoupons = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const { result } = await UseCases.coupon.listAll.execute({ page, limit });

      if (result.type === 'ERROR') {
        alert('ERRO AO BUSCAR CUPONS');
        return;
      }

      setCoupons(result.data);

      // if (result.totalPages) {
      //   setTotalPages(result.totalPages);
      // }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons(currentPage, limit);
  }, [currentPage, limit]);

  return {
    loading,
    coupons,
    currentPage,
    // totalPages,
    setCurrentPage,
    setLimit,
  };
}
