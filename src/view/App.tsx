import { useEffect, useState } from "react";
import { ListedCoupon } from "../domain/entities/Coupon.entity";
import { UseCases } from "../domain/usecases/UseCases";

function useCoupons() {
    const [coupons, setCoupons] = useState<ListedCoupon[]>([])
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const { result } = await UseCases.coupon.listAll.execute();

            if (result.type === "ERROR") {
                alert("ERRO AO BUSCAR CUPONS")
                return;
            }

            setCoupons(result.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        fetchCoupons();
    }, [])

    return {
        loading,
        coupons
    }
}


export function App() {
    const { coupons, loading } = useCoupons()

    return (
        <>
        {loading && <> Carregando... </>}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Código</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Valor de Desconto</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Válido Até</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Valor Mínimo de Compra</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Valor Máximo de Desconto</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Limite de Uso</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Contagem de Uso</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Ativo</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-4 text-sm">{coupon.code}</td>
                  <td className="px-4 py-4 text-sm">{coupon.discountValue}{coupon.discountType === "percentage" && '%'}</td>
                  <td className="px-4 py-4 text-sm">{coupon.validUntil ?? '-'}</td>
                  <td className="px-4 py-4 text-sm">{coupon.minPurchaseValue ?? '-'}</td>
                  <td className="px-4 py-4 text-sm">{coupon.maxDiscountValue ?? '-'}</td>
                  <td className="px-4 py-4 text-sm">{coupon.usageLimit ?? '-'}</td>
                  <td className="px-4 py-4 text-sm">{coupon.usedCount}</td>
                  <td className="px-4 py-4 text-sm">{coupon.isActive ? 'Sim' : 'Não'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
    );
}