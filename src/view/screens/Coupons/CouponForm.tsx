import { useCouponForm } from './useCouponForm';

export function CouponForm() {
  const { form, selectedType, setSelectedType } = useCouponForm();

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-center pb-2">
        Formulário de Cupom
      </h1>
      <select
        id="couponType"
        value={selectedType}
        onChange={(e) =>
          setSelectedType(e.target.value as 'alfred' | 'diyseclab')
        }
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Selecione o tipo de cupom</option>
        <option value="alfred">Alfred</option>
        <option value="diyseclab">DIY Sec Lab</option>
      </select>
      <form
        onSubmit={form.onsubmit}
        className="grid grid-cols-12 gap-x-4 gap-y-6"
      >
        <div className="col-span-12">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Código
          </label>
          <input
            id="code"
            type="text"
            {...form.register('code')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {form.errors.code && (
            <p className="text-red-500 text-sm">{form.errors.code.message}</p>
          )}
        </div>

        <div className="col-span-6">
          <label
            htmlFor="discountType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Desconto
          </label>
          <select
            id="discountType"
            {...form.register('discountType')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="percentage">Porcentagem</option>
            <option value="fixedAmount">Valor Fixo</option>
          </select>
          {form.errors.discountType && (
            <p className="text-red-500 text-sm">
              {form.errors.discountType.message}
            </p>
          )}
        </div>

        <div className="col-span-6">
          <label
            htmlFor="discountValue"
            className="block text-sm font-medium text-gray-700"
          >
            Valor do Desconto
          </label>
          <input
            id="discountValue"
            type="number"
            {...form.register('discountValue')}
            min="0" // Adiciona a restrição de números >= 0
            step="any"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {form.errors.discountValue && (
            <p className="text-red-500 text-sm">
              {form.errors.discountValue.message}
            </p>
          )}
        </div>

        <div className="col-span-6">
          <label
            htmlFor="minPurchaseValue"
            className="block text-sm font-medium text-gray-700"
          >
            Valor Mínimo de Compra
          </label>
          <input
            id="minPurchaseValue"
            type="number"
            {...form.register('minPurchaseValue')}
            min="0"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {form.errors.minPurchaseValue && (
            <p className="text-red-500 text-sm">
              {form.errors.minPurchaseValue.message}
            </p>
          )}
        </div>

        <div className="col-span-6">
          <label
            htmlFor="maxDiscountValue"
            className="block text-sm font-medium text-gray-700"
          >
            Valor Máximo de Desconto
          </label>
          <input
            id="maxDiscountValue"
            type="number"
            {...form.register('maxDiscountValue')}
            min="0"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {form.errors.maxDiscountValue && (
            <p className="text-red-500 text-sm">
              {form.errors.maxDiscountValue.message}
            </p>
          )}
        </div>

        <div className="col-span-6">
          <label
            htmlFor="usageLimit"
            className="block text-sm font-medium text-gray-700"
          >
            Limite de Uso
          </label>
          <input
            id="usageLimit"
            type="number"
            {...form.register('usageLimit')}
            min="0"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {form.errors.usageLimit && (
            <p className="text-red-500 text-sm">
              {form.errors.usageLimit.message}
            </p>
          )}
        </div>

        <div className="col-span-6">
          <label
            htmlFor="usedCount"
            className="block text-sm font-medium text-gray-700"
          >
            Contagem de Usos
          </label>
          <input
            id="usedCount"
            type="number"
            {...form.register('usedCount')}
            min="0"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {form.errors.usedCount && (
            <p className="text-red-500 text-sm">
              {form.errors.usedCount.message}
            </p>
          )}
        </div>

        <div className="col-span-6">
          <label
            htmlFor="validFrom"
            className="block text-sm font-medium text-gray-700"
          >
            Válido a partir de
          </label>
          <input
            id="validFrom"
            type="date"
            {...form.register('validFrom')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {form.errors.validFrom && (
            <p className="text-red-500 text-sm">
              {form.errors.validFrom.message}
            </p>
          )}
        </div>

        <div className="col-span-6">
          <label
            htmlFor="validUntil"
            className="block text-sm font-medium text-gray-700"
          >
            Válido até
          </label>
          <input
            id="validUntil"
            type="date"
            {...form.register('validUntil')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {form.errors.validUntil && (
            <p className="text-red-500 text-sm">
              {form.errors.validUntil.message}
            </p>
          )}
        </div>

        <div className="col-span-12 flex justify-center">
          <button
            type="submit"
            className="w-full px-6 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
