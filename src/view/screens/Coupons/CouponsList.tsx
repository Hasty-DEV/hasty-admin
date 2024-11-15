import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { ROUTES } from '../../routes/Routes';
import { useCouponsList } from './useCouponsList';

export function CouponsList() {
  const { coupons, loading } = useCouponsList();

  return (
    <>
      {loading && <Loader />}
      <h1 className="text-2xl font-bold text-center pb-2">Listagem de Cupom</h1>
      <div className="pt-4 overflow-x-auto">
        <table className="min-w-full table-auto rounded-sm border-separate border-spacing-0">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-300">
                Código
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-300">
                Valor de Desconto
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-300">
                Contagem de Uso
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-300">
                Ativo
              </th>
              <th className="px-4 py-3 border-b border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-4 text-sm border-t border-gray-200">
                  {coupon.code}
                </td>
                <td className="px-4 py-4 text-sm border-t border-gray-200">
                  {coupon.discountValue}
                  {coupon.discountType === 'percentage' && '%'}
                </td>
                <td className="px-4 py-4 text-sm border-t border-gray-200">
                  {coupon.usedCount}
                </td>
                <td className="px-4 py-4 text-sm border-t border-gray-200">
                  {coupon.isActive ? 'Sim' : 'Não'}
                </td>
                <td className="px-4 py-4 text-sm border-t border-gray-200">
                  <Link
                    to={ROUTES.coupons.details.call(coupon.id)}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Ações
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
