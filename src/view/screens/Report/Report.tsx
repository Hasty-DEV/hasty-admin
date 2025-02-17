import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { useReport } from './useReport';

export function Report() {
  const {
    loading,
    exportToExcel,
    currentDeposits,
    handlePageChange,
    currentPage,
    totalPages,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    statusFilter,
    setStatusFilter,
  } = useReport();

  const getPaginationPages = (current: number, total: number) => {
    const pagesSet = new Set<number>();
    pagesSet.add(1);
    pagesSet.add(total);
    pagesSet.add(current);
    for (let i = 1; i <= 3; i++) {
      if (current + i < total) {
        pagesSet.add(current + i);
      }
    }
    const sortedPages = Array.from(pagesSet).sort((a, b) => a - b);
    const pagesWithEllipsis: (number | string)[] = [];

    sortedPages.forEach((page, index) => {
      pagesWithEllipsis.push(page);
      if (index < sortedPages.length - 1 && sortedPages[index + 1] - page > 1) {
        pagesWithEllipsis.push('...');
      }
    });
    return pagesWithEllipsis;
  };

  const paginationItems = getPaginationPages(currentPage, totalPages);

  return (
    <>
      {loading && <Loader />}
      <h1 className="text-2xl font-bold text-center pb-2">
        Reporte de Depósitos
      </h1>

      <div className="text-center mb-4">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data Inicial
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="ml-2 mt-1 p-1 border rounded-md"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data Final
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="ml-2 mt-1 p-1 border rounded-md"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="ml-2 mt-1 p-1 border rounded-md"
              >
                <option value="">Todos</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="canceled">Canceled</option>
              </select>
            </label>
          </div>
        </div>
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Baixar em Excel
        </button>
      </div>

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
            {currentDeposits.map((deposit) => (
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

          {paginationItems.map((item, index) =>
            item === '...' ? (
              <span key={index} className="px-3 py-1 mx-1">
                {item}
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(item as number)}
                className={`px-3 py-1 mx-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  item === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {item}
              </button>
            ),
          )}

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
