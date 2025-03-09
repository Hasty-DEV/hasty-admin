import {
  Calendar,
  DollarSign,
  Hash,
  Percent,
  Ticket,
  Users,
} from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { Loader } from '../../components/Loader';
import { useCouponForm } from './useCouponForm';

export function CouponForm() {
  const { loading, form } = useCouponForm();

  return (
    <>
      {loading && <Loader />}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Ticket className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Criar Novo Cupom
              </h1>
            </div>
            <FormProvider {...form.value}>
              <form onSubmit={form.onsubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Cupom
                    </label>
                    <select
                      {...form.register('type')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="alfred">ALFRED</option>
                      <option value="diyseclab">DIY SEC LAB</option>
                    </select>
                    {form.errors.type && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.errors.type.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Código
                      </div>
                    </label>
                    <input
                      type="text"
                      {...form.register('code')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Digite o Código do Cupom"
                    />
                    {form.errors.code && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.errors.code.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        Tipo de Desconto
                      </div>
                    </label>
                    <select
                      {...form.register('discountType')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="percentage">Porcentagem</option>
                      <option value="fixedAmount">Valor Fixo</option>
                    </select>
                    {form.errors.discountType && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.errors.discountType.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Valor do Desconto
                      </div>
                    </label>
                    <input
                      type="number"
                      {...form.register('discountValue')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Digite o Valor de Desconto"
                    />
                    {form.errors.discountValue && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.errors.discountValue.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor De Compra Mínimo
                    </label>
                    <input
                      type="number"
                      {...form.register('minPurchaseValue')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Digite o Valor de Compra Minimo"
                    />
                    {form.errors.minPurchaseValue && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.errors.minPurchaseValue.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor Máximo de Desconto
                    </label>
                    <input
                      type="number"
                      {...form.register('maxDiscountValue')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Digite o Valor Máximo de Desconto"
                    />
                    {form.errors.maxDiscountValue && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.errors.maxDiscountValue.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Limite de Uso
                      </div>
                    </label>
                    <input
                      type="number"
                      {...form.register('usageLimit')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Digite o Limite de Uso"
                    />
                    {form.errors.usageLimit && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.errors.usageLimit.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contagem de Uso
                    </label>
                    <input
                      type="number"
                      {...form.register('usedCount')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Digite a Contagem de Uso"
                    />
                    {form.errors.usedCount && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.errors.usedCount.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Válido de
                      </div>
                    </label>
                    <input
                      type="date"
                      {...form.register('validFrom')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {form.errors.validFrom && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.errors.validFrom.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Válido até
                      </div>
                    </label>
                    <input
                      type="date"
                      {...form.register('validUntil')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {form.errors.validUntil && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.errors.validUntil.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  >
                    Criar Cupom
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
}
