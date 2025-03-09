import {
  Calendar,
  Hash,
  Percent,
  RefreshCw,
  ToggleLeft as Toggle,
} from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Loader } from '../../components/Loader';
import { useCouponDetails } from './useCouponDetails';

export function CouponDetails() {
  const { coupon, loading } = useCouponDetails();

  if (!coupon.value) {
    return (
      <>
        {loading && <Loader />}
        {!loading && <div className="text-red-500">Cupom não encontrado.</div>}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">
                Detalhes do Cupom
              </h1>
              <Badge
                variant={coupon.value.isActive ? 'success' : 'error'}
                text={coupon.value.isActive ? 'Ativo' : 'Inativo'}
              />
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Hash className="w-4 h-4" />
                  <span className="text-sm font-medium">Código</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {coupon.value.code}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Percent className="w-4 h-4" />
                  <span className="text-sm font-medium">Valor de Desconto</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {coupon.value.discountValue}%
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Válido de</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(coupon.value.validFrom).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Válido até</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(
                    coupon.value.validUntil ?? Date.now(),
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-medium">Uso</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {coupon.value.usedCount}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Toggle className="w-4 h-4" />
                  <span className="text-sm font-medium">Status</span>
                </div>
                <button
                  onClick={() => coupon.toggleStatus(coupon.id ?? '')}
                  className={`mt-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      coupon.value.isActive
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                >
                  {coupon.value.isActive ? 'Desativar Coupon' : 'Ativar Coupon'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
