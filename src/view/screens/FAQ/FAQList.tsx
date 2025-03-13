import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RemoteDataSource } from '../../../data/datasource/Remote.datasource';
import { FAQRepositoryImpl } from '../../../data/repositories/FAQ.repository';
import { ROUTES } from '../../routes/Routes';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function FAQList() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const repository = new FAQRepositoryImpl(new RemoteDataSource());

  useEffect(() => {
    async function fetchFAQs() {
      setLoading(true);
      const { result } = await repository.listAllFAQ();
      if (result.type === 'SUCCESS') {
        setFaqs(result.data);
      }
      setLoading(false);
    }
    fetchFAQs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Lista de FAQs</h1>
      {loading ? (
        <p className="text-center text-gray-500">Carregando...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 border border-gray-300">Pergunta</th>
              <th className="p-3 border border-gray-300">Categoria</th>
              <th className="p-3 border border-gray-300">Ação</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id} className="text-center border border-gray-300">
                <td className="p-3 border border-gray-300">{faq.question}</td>
                <td className="p-3 border border-gray-300">{faq.category}</td>
                <td className="p-3 border border-gray-300">
                  <button
                    onClick={() => navigate(ROUTES.faq.viewFAQ.call())}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
