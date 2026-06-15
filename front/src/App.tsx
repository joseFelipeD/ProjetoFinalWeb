import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { professorInicial, relatorioInicial, turmasIniciais, observacoesIniciais } from './data/seedData';
import { Dashboard } from './pages/Dashboard';
import { GerarRelatorio } from './pages/GerarRelatorio';
import { Historico } from './pages/Historico';
import { Login } from './pages/Login';
import { NovaObservacao } from './pages/NovaObservacao';
import { Perfil } from './pages/Perfil';
import { RelatorioIAPage } from './pages/RelatorioIA';
import { Turmas } from './pages/Turmas';
import type { NovaObservacaoInput, NovaTurmaInput, Observacao, Page, Turma } from './types';

const cores: Turma['cor'][] = ['azul', 'roxo', 'verde', 'ciano'];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [turmas, setTurmas] = useState<Turma[]>(turmasIniciais);
  const [observacoes, setObservacoes] = useState<Observacao[]>(observacoesIniciais);

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addObservacao(input: NovaObservacaoInput) {
    const novaObservacao: Observacao = {
      id: Date.now(),
      ...input
    };
    setObservacoes((atuais) => [novaObservacao, ...atuais]);
  }

  function deleteObservacao(id: number) {
    const confirmar = window.confirm('Deseja excluir esta observação?');
    if (confirmar) {
      setObservacoes((atuais) => atuais.filter((obs) => obs.id !== id));
    }
  }

  function addTurma(input: NovaTurmaInput) {
    const novaTurma: Turma = {
      id: Date.now(),
      ...input,
      cor: cores[turmas.length % cores.length]
    };
    setTurmas((atuais) => [...atuais, novaTurma]);
  }

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <AppLayout currentPage={currentPage} professor={professorInicial} onNavigate={navigate} onLogout={() => setIsLoggedIn(false)}>
      {currentPage === 'dashboard' && <Dashboard turmas={turmas} observacoes={observacoes} onNavigate={navigate} />}
      {currentPage === 'turmas' && <Turmas turmas={turmas} observacoes={observacoes} onAddTurma={addTurma} />}
      {currentPage === 'nova-observacao' && <NovaObservacao turmas={turmas} observacoes={observacoes} onAddObservacao={addObservacao} />}
      {currentPage === 'historico' && <Historico turmas={turmas} observacoes={observacoes} onDelete={deleteObservacao} />}
      {currentPage === 'gerar-relatorio' && <GerarRelatorio turmas={turmas} onNavigate={navigate} />}
      {currentPage === 'relatorio-ia' && <RelatorioIAPage relatorio={relatorioInicial} turmas={turmas} />}
      {currentPage === 'perfil' && <Perfil professor={professorInicial} turmas={turmas} observacoes={observacoes} />}
    </AppLayout>
  );
}
