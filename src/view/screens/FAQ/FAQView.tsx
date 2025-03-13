import { useEffect, useState } from 'react';
import { RemoteDataSource } from '../../../data/datasource/Remote.datasource';
import { FAQRepositoryImpl } from '../../../data/repositories/FAQ.repository';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQView() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
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

  const groupedFAQs = faqs.reduce(
    (acc, faq) => {
      if (!acc[faq.category]) acc[faq.category] = [];
      acc[faq.category].push(faq);
      return acc;
    },
    {} as Record<string, FAQ[]>,
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">
        Perguntas Frequentes
      </h1>
      {loading ? (
        <p className="text-center text-gray-500">Carregando...</p>
      ) : (
        <div className="space-y-4">
          {Object.keys(groupedFAQs).map((category) => (
            <div
              key={category}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category ? null : category,
                  )
                }
                className="w-full text-left px-4 py-2 bg-blue-600 text-white font-bold"
              >
                {category}
              </button>
              {expandedCategory === category && (
                <div className="p-4 bg-gray-100">
                  {groupedFAQs[category].map((faq) => (
                    <div key={faq.id} className="mb-3">
                      <button
                        onClick={() =>
                          setExpandedQuestion(
                            expandedQuestion === faq.id ? null : faq.id,
                          )
                        }
                        className="w-full text-left font-semibold text-blue-700 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                      >
                        {faq.question}
                      </button>
                      {expandedQuestion === faq.id && (
                        <p className="mt-2 px-4 py-2 bg-white border border-gray-200 rounded-md">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
