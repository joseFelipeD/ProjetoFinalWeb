import { useMemo, useState } from 'react';
import type { CategoriaObservacao, Observacao } from '../types';

export function useObservacaoFilters(observacoes: Observacao[]) {
  const [busca, setBusca] = useState('');
  const [turmaId, setTurmaId] = useState('todas');
  const [categoria, setCategoria] = useState<CategoriaObservacao | 'todas'>('todas');

  const filtradas = useMemo(() => {
    return observacoes.filter((obs) => {
      const textoOk = obs.titulo.toLowerCase().includes(busca.toLowerCase()) || obs.descricao.toLowerCase().includes(busca.toLowerCase());
      const turmaOk = turmaId === 'todas' || obs.turmaId === Number(turmaId);
      const categoriaOk = categoria === 'todas' || obs.categoria === categoria;
      return textoOk && turmaOk && categoriaOk;
    });
  }, [observacoes, busca, turmaId, categoria]);

  return { busca, setBusca, turmaId, setTurmaId, categoria, setCategoria, filtradas };
}
