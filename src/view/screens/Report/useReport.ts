import { useCallback, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { ReportedDeposit } from '../../../domain/entities/Report.entity';
import { UseCases } from '../../../domain/usecases/UseCases';

export function useReport() {
  const [deposits, setDeposits] = useState<ReportedDeposit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<
    'paid' | 'expired' | 'pending' | 'canceled' | undefined
  >(undefined);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchDeposit = useCallback(async () => {
    setLoading(true);
    try {
      const params: {
        page: number;
        pageSize: number;
        status?: 'paid' | 'expired' | 'pending' | 'canceled';
        startAt?: string;
        endAt?: string;
      } = {
        page: currentPage,
        pageSize: itemsPerPage,
      };

      if (statusFilter !== undefined) {
        params.status = statusFilter;
      }
      if (startDate !== undefined) {
        params.startAt = startDate;
      }
      if (endDate !== undefined) {
        params.endAt = endDate;
      }

      const { result } = await UseCases.report.deposit.execute(params);

      if (result.type === 'ERROR') {
        console.error(result);
        alert('Erro ao buscar depósitos.');
        return;
      }
      setDeposits(result.data.data);
      setTotalPages(result.data.totalPages ?? 1);
    } catch (error) {
      console.error('Erro ao buscar depósitos:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, startDate, endDate, statusFilter]);

  useEffect(() => {
    fetchDeposit();
  }, [currentPage, startDate, endDate, statusFilter, fetchDeposit]);

  const exportToExcel = () => {
    setLoading(true);
    try {
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        alert('A data final deve ser posterior à data inicial.');
        return;
      }
      if (deposits.length === 0) {
        alert('Nenhum depósito encontrado com os filtros selecionados.');
        return;
      }

      const dataToExport = deposits.map((deposit) => ({
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
      XLSX.utils.book_append_sheet(wb, ws, 'Deposits');
      XLSX.writeFile(wb, 'deposits.xlsx');
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    loading,
    exportToExcel,
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
