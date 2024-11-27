import { Loader } from '../../components/Loader';
import { useCouponDetails } from './useCouponDetails';

export function CouponDetails() {
  const { coupon, loading } = useCouponDetails();

  if (!coupon.value) {
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
            <p className="text-xl">{coupon.value.code}</p>
          </div>

          <div>
            <strong className="text-lg">Valor de Desconto:</strong>
            <p className="text-xl">
              {coupon.value.discountValue}
              {coupon.value.discountType === 'percentage' ? '%' : 'R$'}
            </p>
          </div>

          {coupon.value.validUntil && (
            <div>
              <strong className="text-lg">Válido Até:</strong>
              <p className="text-xl">{coupon.value.validUntil}</p>
            </div>
          )}

          {coupon.value.minPurchaseValue && (
            <div>
              <strong className="text-lg">Valor Mínimo de Compra:</strong>
              <p className="text-xl">{coupon.value.minPurchaseValue} R$</p>
            </div>
          )}

          {coupon.value.maxDiscountValue && (
            <div>
              <strong className="text-lg">Valor Máximo de Desconto:</strong>
              <p className="text-xl">{coupon.value.maxDiscountValue} R$</p>
            </div>
          )}

          {coupon.value.usageLimit && (
            <div>
              <strong className="text-lg">Limite de Uso:</strong>
              <p className="text-xl">{coupon.value.usageLimit}</p>
            </div>
          )}

          <div>
            <strong className="text-lg">Contagem de Uso:</strong>
            <p className="text-xl">{coupon.value.usedCount}</p>
          </div>

          <div>
            <strong className="text-lg">Ativo:</strong>
            <p className="text-xl">{coupon.value.isActive ? 'Sim' : 'Não'}</p>
          </div>
        </div>
        <div className="w-full">
          <button
            type="button"
            className="w-full bg-blue-600 text-white px-6 py-4 rounded-sm"
            onClick={() => coupon.toggleStatus(coupon.id ?? '')}
          >
            Trocar Status
          </button>
        </div>
      </div>
    </>
  );
}
