import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAQRepositoryImpl } from '../../../data/repositories/FAQ.repository';
import { InsertFAQ } from '../../../domain/entities/FAQ.entity';
import { ROUTES } from '../../routes/Routes';

export default function FAQCreate() {
  const [categories, setCategories] = useState<string[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const repository = new FAQRepositoryImpl();

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const response = await repository.listAllFAQ();

      if (response.result.type === 'SUCCESS') {
        console.log('Dados da API:', response.result); // Debugging

        // Corrige a estrutura para sempre obter um array
        const faqList = Array.isArray(response.result.data)
          ? response.result.data
          : [response.result.data]; // Converte objeto único em array

        if (!Array.isArray(faqList)) {
          console.error('Erro: FAQ não é um array', faqList);
          setLoading(false);
          return;
        }

        const uniqueCategories = Array.from(
          new Set(faqList.map((faq) => faq.category)),
        );
        setCategories(uniqueCategories);
      } else {
        console.error('Erro na resposta da API', response.result);
      }

      setLoading(false);
    }
    fetchCategories();
  }, []);

  async function handleSubmit() {
    setLoading(true);
    const categoryToUse = newCategory.trim() ? newCategory : selectedCategory;
    if (!question || !answer || !categoryToUse) return;

    const newFAQ = new InsertFAQ();
    newFAQ.question = question;
    newFAQ.answer = answer;
    newFAQ.category = categoryToUse;

    const { result } = await repository.createFAQ(newFAQ);
    setLoading(false);
    if (result.type === 'SUCCESS') {
      navigate(ROUTES.faq.listAll.path);
    }
  }

  return (
    <div
      style={{
        padding: '24px',
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {loading && <p>Carregando...</p>}
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: '#1E40AF',
        }}
      >
        Criar Nova FAQ
      </h1>
      <input
        placeholder="Pergunta"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #93C5FD',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      />
      <input
        placeholder="Resposta"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #93C5FD',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #93C5FD',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        placeholder="Ou digite uma nova categoria"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #93C5FD',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#1E40AF',
          color: 'white',
          borderRadius: '4px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Criar
      </button>
    </div>
  );
}
