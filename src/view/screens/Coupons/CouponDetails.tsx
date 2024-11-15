import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListedCoupon } from '../../../domain/entities/Coupon.entity';
import { UseCases } from '../../../domain/usecases/UseCases';
import { Loader } from '../../components/Loader';

export function CouponDetails() {
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

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchCoupon(id);
  }, [id]);

  if (!coupon) {
    return <div className="text-red-500">Cupom não encontrado.</div>;
  }

  return (
    <>
      {loading && <Loader />}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center pb-6">
          Detalhes do Cupom
        </h1>
        <div className="py-4">
          <div>
            <strong className="text-lg">Código:</strong>
            <p className="text-xl">{coupon.code}</p>
          </div>

          <div>
            <strong className="text-lg">Valor de Desconto:</strong>
            <p className="text-xl">
              {coupon.discountValue}
              {coupon.discountType === 'percentage' ? '%' : 'R$'}
            </p>
          </div>

          {coupon.validUntil && (
            <div>
              <strong className="text-lg">Válido Até:</strong>
              <p className="text-xl">{coupon.validUntil}</p>
            </div>
          )}

          {coupon.minPurchaseValue && (
            <div>
              <strong className="text-lg">Valor Mínimo de Compra:</strong>
              <p className="text-xl">{coupon.minPurchaseValue} R$</p>
            </div>
          )}

          {coupon.maxDiscountValue && (
            <div>
              <strong className="text-lg">Valor Máximo de Desconto:</strong>
              <p className="text-xl">{coupon.maxDiscountValue} R$</p>
            </div>
          )}

          {coupon.usageLimit && (
            <div>
              <strong className="text-lg">Limite de Uso:</strong>
              <p className="text-xl">{coupon.usageLimit}</p>
            </div>
          )}

          <div>
            <strong className="text-lg">Contagem de Uso:</strong>
            <p className="text-xl">{coupon.usedCount}</p>
          </div>

          <div>
            <strong className="text-lg">Ativo:</strong>
            <p className="text-xl">{coupon.isActive ? 'Sim' : 'Não'}</p>
          </div>
        </div>
        <div className="w-full">
          <button
            type="button"
            className="w-full bg-blue-600 text-white px-6 py-4 rounded-sm"
          >
            Trocar Status
          </button>
        </div>
      </div>
    </>
  );
}
