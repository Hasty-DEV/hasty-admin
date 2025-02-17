import { parse } from 'date-fns';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { ReportedDeposit } from '../../../domain/entities/Report.entity';
import { UseCases } from '../../../domain/usecases/UseCases';

export function useReport() {
  const [deposits, setDeposits] = useState<ReportedDeposit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const itemsPerPage = 10;

  const fetchDeposit = async () => {
    setLoading(true);
    try {
      const { result } = await UseCases.report.deposit.execute();

      if (result.type === 'ERROR') {
        console.error(result);
        alert('ERRO AO BUSCAR DEPOSIT');
        return;
      }

      setDeposits(result.data);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredDeposits = () => {
    return deposits.filter((deposit) => {
      const depositDate = parse(
        deposit.transactionDate,
        'dd/MM/yyyy',
        new Date(),
      );

      let meetsDate = true;
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        meetsDate = depositDate >= start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        meetsDate = meetsDate && depositDate <= end;
      }

      let meetsStatus = true;
      if (statusFilter) {
        meetsStatus = deposit.status === statusFilter;
      }

      return meetsDate && meetsStatus;
    });
  };

  const exportToExcel = () => {
    setLoading(true);
    try {
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        alert('A data final deve ser posterior à data inicial.');
        return;
      }

      const filteredDeposits = getFilteredDeposits();

      if (filteredDeposits.length === 0) {
        alert('Nenhum depósito encontrado com os filtros selecionados.');
        return;
      }

      const dataToExport = filteredDeposits.map((deposit) => ({
        'ID da Transação': deposit.transactionId,
        Telefone: deposit.phone,
        Carteira: deposit.coldWallet,
        'Rede Selecionada': deposit.network,
        'Método de Pagamento': deposit.paymentMethod,
        'CPF/CNPJ': deposit.documentId,
        'Data da Transação': deposit.transactionDate,
        Cupom: deposit.coupon,
        'Valor em BTC': deposit.valueBTC,
        'Valor em BRL': deposit.valueBRL,
        Status: deposit.status,
        Desconto: `${deposit.discountValue}%`,
        'Valor Recolhido': deposit.valueCollected,
      }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Deposit');
      XLSX.writeFile(wb, 'deposit.xlsx');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposit();
  }, []);

  const filteredDeposits = getFilteredDeposits();
  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
  const currentDeposits = filteredDeposits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    loading,
    exportToExcel,
    currentDeposits,
    deposits,
    handlePageChange,
    currentPage,
    totalPages,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    statusFilter,
    setStatusFilter,
  };
}
