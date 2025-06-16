"use client";

import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";

const disciplinas = ["Matemática", "Português", "Biologia"];
const anos = ["1 Ano", "2 Ano", "3 Ano"];
const dificuldades = ["Fácil", "Médio", "Difícil"];
const assuntosPorDisciplinaEAno: Record<string, Record<string, string[]>> = {
  Matematica: {
    "1 Ano": ["Conjuntos", "Funções", "Equações"],
    "2 Ano": ["Trigonometria", "Polinômios"],
    "3 Ano": ["Probabilidade", "Estatística"],
  },
  Portugues: {
    "1 Ano": ["Ortografia", "Crase"],
    "2 Ano": ["Interpretação", "Figuras de linguagem"],
    "3 Ano": ["Redação", "Gramática avançada"],
  },
  Biologia: {
    "1 Ano": ["Citologia", "Genética"],
    "2 Ano": ["Fisiologia", "Botânica"],
    "3 Ano": ["Ecologia", "Evolução"],
  },
};

function DropdownCheckbox({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block w-48">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-base-200 text-left p-2 rounded border border-base-300"
      >
        {label}
      </button>
      {open && (
        <div className="absolute mt-1 w-full max-h-60 overflow-auto z-10 bg-base-100 border border-base-300 rounded shadow">
          {options.map((opt) => (
            <label
              key={opt}
              className="block px-3 py-1 hover:bg-base-200 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onChange(opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FiltroAvancado() {
  const [filtros, setFiltros] = useState<Record<string, string[]>>({
    Disciplina: [],
    Ano: [],
    Assunto: [],
    Dificuldade: [],
  });

  useEffect(() => {}, []);

  const toggleFiltro = (categoria: string, valor: string) => {
    setFiltros((prev) => {
      const atual = prev[categoria] || [];
      const novo = atual.includes(valor)
        ? atual.filter((v) => v !== valor)
        : [...atual, valor];

      // Zera os assuntos se disciplina ou ano mudar
      if (categoria === "Disciplina" || categoria === "Ano") {
        return { ...prev, [categoria]: novo, Assunto: [] };
      }

      return { ...prev, [categoria]: novo };
    });
  };

  const limparTudo = () => {
    setFiltros({ Disciplina: [], Ano: [], Assunto: [] });
  };

  const assuntosDisponiveis = () => {
    const disciplinasSelecionadas = filtros.Disciplina.map((d) =>
      d.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    ); // Remove acentos

    const anosSelecionados = filtros.Ano;

    const assuntos = new Set<string>();
    disciplinasSelecionadas.forEach((disciplina) => {
      anosSelecionados.forEach((ano) => {
        const lista = assuntosPorDisciplinaEAno[disciplina]?.[ano] || [];
        lista.forEach((a) => assuntos.add(a));
      });
    });

    return Array.from(assuntos);
  };

  const removerFiltro = (categoria: string, valor: string) => {
    setFiltros((prev) => {
      const atualizado = {
        ...prev,
        [categoria]: prev[categoria].filter((v) => v !== valor),
      };

      // Se disciplina ou ano forem removidos, também limpar assuntos
      if (categoria === "Disciplina" || categoria === "Ano") {
        atualizado.Assunto = [];
      }

      return atualizado;
    });
  };

  return (
    <div className="bg-base-100 border border-base-300 rounded p-4 space-y-4 shadow max-w-4xl">
      <div className="flex flex-wrap gap-4">
        <DropdownCheckbox
          label="Disciplina"
          options={disciplinas}
          selected={filtros.Disciplina}
          onChange={(v) => toggleFiltro("Disciplina", v)}
        />
        <DropdownCheckbox
          label="Ano"
          options={anos}
          selected={filtros.Ano}
          onChange={(v) => toggleFiltro("Ano", v)}
        />
        <DropdownCheckbox
          label="Assunto"
          options={assuntosDisponiveis()}
          selected={filtros.Assunto}
          onChange={(v) => toggleFiltro("Assunto", v)}
        />
        <DropdownCheckbox
          label="Dificuldade"
          options={dificuldades}
          selected={filtros.Dificuldade}
          onChange={(v) => toggleFiltro("Dificuldade", v)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(filtros).map(([cat, vals]) => {
          if (vals.length === 0) {
            return;
          }

          return (
            <span
              key={`${cat}`}
              className="bg-base-300 px-2 py-1 rounded text-sm flex items-center flex-wrap"
            >
              {cat}:
              {vals.map((val) => (
                <span className="flex items-center px-2 py-1">
                  {val}
                  <button
                    onClick={() => removerFiltro(cat, val)}
                    className="ml-1 rounded-full border"
                  >
                    <BiX size={14} />
                  </button>
                </span>
              ))}
            </span>
          );
        })}
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={limparTudo} className="btn btn-sm btn-outline">
          Limpar Tudo
        </button>
        <button className="btn btn-sm bg-orange-600 text-white">Filtrar</button>
      </div>
    </div>
  );
}
