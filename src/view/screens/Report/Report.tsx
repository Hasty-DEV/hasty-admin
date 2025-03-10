import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { useReport } from './useReport';

type FilterFormValues = {
  startDate?: string;
  endDate?: string;
  status?: string;
};

export function Report() {
  const {
    loading,
    exportToExcel,
    deposits,
    handlePageChange,
    currentPage,
    totalPages,
    setStartDate,
    setEndDate,
    setStatusFilter,
  } = useReport();

  const form = useForm<FilterFormValues>();

  const startDateValue = useWatch({ control: form.control, name: 'startDate' });
  const endDateValue = useWatch({ control: form.control, name: 'endDate' });
  const statusValue = useWatch({ control: form.control, name: 'status' });

  useEffect(() => {
    const start = startDateValue === '' ? undefined : startDateValue;
    const end = endDateValue === '' ? undefined : endDateValue;
    const status = statusValue === '' ? undefined : statusValue;

    setStartDate(start);
    setEndDate(end);
    setStatusFilter(
      status as 'paid' | 'expired' | 'pending' | 'canceled' | undefined,
    );
  }, [
    startDateValue,
    endDateValue,
    statusValue,
    setStartDate,
    setEndDate,
    setStatusFilter,
  ]);

  const paginationItems = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {loading && <Loader />}
      <h1 className="text-2xl font-bold text-center pb-2">
        Reporte de Depósitos
      </h1>

      <FormProvider {...form}>
        <form className="text-center mb-4">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data Inicial
                <input
                  type="date"
                  {...form.register('startDate')}
                  className="ml-2 mt-1 p-1 border rounded-md"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data Final
                <input
                  type="date"
                  {...form.register('endDate')}
                  className="ml-2 mt-1 p-1 border rounded-md"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
                <select
                  {...form.register('status')}
                  className="ml-2 mt-1 p-1 border rounded-md"
                >
                  <option value="">Todos</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">Canceled</option>
                  <option value="expired">Expired</option>
                </select>
              </label>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={exportToExcel}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Baixar em Excel
            </button>
          </div>
        </form>
      </FormProvider>

      <div className="pt-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 border border-gray-300">
                ID da Transação
              </th>
              <th className="px-4 py-3 border border-gray-300">Telefone</th>
              <th className="px-4 py-3 border border-gray-300">Status</th>
              <th className="px-4 py-3 border border-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <tr key={deposit.transactionId} className="hover:bg-gray-100">
                <td className="px-4 py-3 border border-gray-300">
                  {deposit.transactionId}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {deposit.phone}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {deposit.status}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  <Link
                    to={`/report/${deposit.transactionId}`}
                    state={{ deposit }}
                    className="text-blue-500 hover:underline"
                  >
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-wrap justify-center items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Anterior
          </button>

          {paginationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(item)}
              className={`px-3 py-1 mx-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                item === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Próximo
          </button>
        </div>
      </div>
    </>
  );
}
