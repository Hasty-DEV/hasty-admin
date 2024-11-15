import { Loader } from "../../components/Loader";
import { useListAllCoupons } from "./useListAllCoupons";

export function ListAllCoupons() {
    const { coupons, loading } = useListAllCoupons();

  return (
    <>
      {loading && <Loader />}
      <div className="pt-20 px-8 overflow-x-auto">
        <table className="min-w-full table-auto rounded-sm">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Código
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Valor de Desconto
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Válido Até
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Valor Mínimo de Compra
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Valor Máximo de Desconto
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Limite de Uso
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Contagem de Uso
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Ativo
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-4 text-sm">{coupon.code}</td>
                <td className="px-4 py-4 text-sm">
                  {coupon.discountValue}
                  {coupon.discountType === 'percentage' && '%'}
                </td>
                <td className="px-4 py-4 text-sm">
                  {coupon.validUntil ?? '-'}
                </td>
                <td className="px-4 py-4 text-sm">
                  {coupon.minPurchaseValue ?? '-'}
                </td>
                <td className="px-4 py-4 text-sm">
                  {coupon.maxDiscountValue ?? '-'}
                </td>
                <td className="px-4 py-4 text-sm">
                  {coupon.usageLimit ?? '-'}
                </td>
                <td className="px-4 py-4 text-sm">{coupon.usedCount}</td>
                <td className="px-4 py-4 text-sm">
                  {coupon.isActive ? 'Sim' : 'Não'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}