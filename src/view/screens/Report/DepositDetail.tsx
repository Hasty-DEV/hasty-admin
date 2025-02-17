import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { useReport } from './useReport';

export function DepositDetail() {
  const { depositId } = useParams<{ depositId: string }>();
  const { deposits, loading } = useReport();

  if (loading) {
    return <Loader />;
  }

  const deposit = deposits.find((d) => d.transactionId === depositId);

  if (!deposit) {
    return <div className="text-center mt-4">Depósito não encontrado.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Depósito</h1>
      <p>
        <strong>ID da Transação:</strong> {deposit.transactionId}
      </p>
      <p>
        <strong>Telefone:</strong> {deposit.phone}
      </p>
      <p>
        <strong>Status:</strong> {deposit.status}
      </p>
      <p>
        <strong>Data da Transação:</strong> {deposit.transactionDate}
      </p>
      <p>
        <strong>Valor em BTC:</strong> {deposit.valueBTC}
      </p>
      <p>
        <strong>Valor em BRL:</strong> {deposit.valueBRL}
      </p>
    </div>
  );
}
