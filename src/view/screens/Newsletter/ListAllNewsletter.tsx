import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { ListedNewsletter } from '../../../domain/entities/Newsletter.entity';
import { UseCases } from '../../../domain/usecases/UseCases';
import { Loader } from '../../components/Loader';

export function ListAllNewsletter() {
  const [newsletters, setNewsletters] = useState<ListedNewsletter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNewsletter = async () => {
    setLoading(true);
    try {
      const { result } = await UseCases.newsletter.listAll.execute();

      if (result.type === 'ERROR') {
        console.log(result);
        alert('ERRO AO BUSCAR NEWSLETTER');
        return;
      }

      setNewsletters(result.data);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    setLoading(true);
    try {
      const ws = XLSX.utils.json_to_sheet(
        newsletters.map((newsletter) => ({
          Email: newsletter.email,
          Ativo: newsletter.isActive ? 'Sim' : 'Não',
        })),
      );

      const headerStyle = {
        font: { bold: true, color: { rgb: 'FFFFFF' } },
        fill: { fgColor: { rgb: '4F81BD' } },
        alignment: { horizontal: 'center' },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } },
        },
      };

      const dataStyle = {
        alignment: { horizontal: 'left' },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } },
        },
      };

      const headers = ws['A1:B1'];
      if (headers) {
        headers.forEach((cell: XLSX.CellObject) => {
          cell.s = headerStyle;
        });
      }

      const ref = ws['!ref'];
      if (ref) {
        const range = XLSX.utils.decode_range(ref);
        for (let row = range.s.r + 1; row <= range.e.r; row++) {
          for (let col = range.s.c; col <= range.e.c; col++) {
            const cell = ws[XLSX.utils.encode_cell({ r: row, c: col })];
            if (cell) {
              cell.s = dataStyle;
            }
          }
        }
      }

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Newsletters');
      XLSX.writeFile(wb, 'newsletters.xlsx');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletter();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <h1 className="text-2xl font-bold text-center pb-2">
        Listagem de Newsletter
      </h1>

      <div className="text-center mb-4">
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Baixar em Excel
        </button>
      </div>

      <div className="pt-4 overflow-x-auto">
        <table className="min-w-full table-auto rounded-sm border-separate border-spacing-0">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-300">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-300">
                Ativo
              </th>
            </tr>
          </thead>
          <tbody>
            {newsletters.map((newsletter) => (
              <tr key={newsletter.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-4 text-sm border-t border-gray-200">
                  {newsletter.email}
                </td>
                <td className="px-4 py-4 text-sm border-t border-gray-200">
                  {newsletter.isActive ? 'Sim' : 'Não'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
