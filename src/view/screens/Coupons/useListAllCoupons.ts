import { useState, useEffect } from "react";
import { ListedCoupon } from "../../../domain/entities/Coupon.entity";
import { UseCases } from "../../../domain/usecases/UseCases";

export function useListAllCoupons() {
    const [coupons, setCoupons] = useState<ListedCoupon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const { result } = await UseCases.coupon.listAll.execute();
  
        if (result.type === 'ERROR') {
          alert('ERRO AO BUSCAR CUPONS');
          return;
        }
  
        setCoupons(result.data);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCoupons();
    }, []);
  
    return {
      loading,
      coupons,
    };
  }