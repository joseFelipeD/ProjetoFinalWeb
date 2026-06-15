import { useCallback, useEffect, useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { useAuth } from './contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { GerarRelatorio } from './pages/GerarRelatorio';
import { Historico } from './pages/Historico';
import { Login } from './pages/Login';
import { NovaObservacao } from './pages/NovaObservacao';
import { Perfil } from './pages/Perfil';
import { RelatorioIAPage } from './pages/RelatorioIA';
import { Turmas } from './pages/Turmas';
import { criarTurma, listarTurmas } from './services/turmas';
import { criarObservacao, excluirObservacao, listarObservacoes } from './services/observacoes';
import type { NovaObservacaoInput, NovaTurmaInput, Observacao, Page, Turma } from './types';

export default function App() {
  const { professor, isAuthenticated, carregando, sair } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [observacoes, setObservacoes] = useState<Observacao[]>([]);

  const carregarDados = useCallback(async () => {
    const [turmasApi, observacoesApi] = await Promise.all([
      listarTurmas(),
      listarObservacoes()
    ]);
    setTurmas(turmasApi);
    setObservacoes(observacoesApi);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      carregarDados().catch((erro) => console.error('Falha ao carregar dados:', erro));
    }
  }, [isAuthenticated, carregarDados]);

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function addObservacao(input: NovaObservacaoInput) {
    await criarObservacao(input);
    await carregarDados();
  }

  async function deleteObservacao(id: number) {
    if (window.confirm('Deseja excluir esta observação?')) {
      await excluirObservacao(id);
      await carregarDados();
    }
  }

  async function addTurma(input: NovaTurmaInput) {
    await criarTurma(input);
    await carregarDados();
  }

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-500">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated || !professor) {
    return <Login />;
  }

  return (
    <AppLayout currentPage={currentPage} professor={professor} onNavigate={navigate} onLogout={sair}>
      {currentPage === 'dashboard' && <Dashboard turmas={turmas} observacoes={observacoes} onNavigate={navigate} />}
      {currentPage === 'turmas' && <Turmas turmas={turmas} observacoes={observacoes} onAddTurma={addTurma} />}
      {currentPage === 'nova-observacao' && <NovaObservacao turmas={turmas} observacoes={observacoes} onAddObservacao={addObservacao} />}
      {currentPage === 'historico' && <Historico turmas={turmas} observacoes={observacoes} onDelete={deleteObservacao} />}
      {currentPage === 'gerar-relatorio' && <GerarRelatorio turmas={turmas} onNavigate={navigate} />}
      {currentPage === 'relatorio-ia' && <RelatorioIAPage turmas={turmas} />}
      {currentPage === 'perfil' && <Perfil professor={professor} turmas={turmas} observacoes={observacoes} />}
    </AppLayout>
  );
}
