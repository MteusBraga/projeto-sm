"use client";

import { useState } from "react";

type Alternativa = "A" | "B" | "C" | "D" | "E";

interface Question {
  id: string;
  disciplina: string;
  assunto: string;
  enunciado: string;
  alternativas: Record<Alternativa, string>;
}

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const [selected, setSelected] = useState<Alternativa | null>(null);

  const handleSelect = (alt: Alternativa) => {
    setSelected(alt);
  };

  return (
    <div className="border border-base-300 rounded-md p-4 bg-base shadow-sm max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-sm  mb-2">
        <span className="font-semibold">{question.id}</span>
        <span className="">|</span>
        <span>{question.disciplina}</span>
        <span className="">|</span>
        <span>{question.assunto}</span>
      </div>

      <div className="text-sm  mb-4 whitespace-pre-line">
        {question.enunciado}
      </div>

      <ul className="flex flex-col gap-2">
        {(Object.keys(question.alternativas) as Alternativa[]).map((alt) => (
          <li
            key={alt}
            onClick={() => handleSelect(alt)}
            className={`border rounded-md p-3 text-sm cursor-pointer transition
              ${
                selected === alt
                  ? "border-blue-600 bg-base-300"
                  : "border-base-300 hover:bg-base-300 gray-50"
              }
            `}
          >
            <span className="font-semibold mr-2">{alt})</span>
            {question.alternativas[alt]}
          </li>
        ))}
      </ul>

      <button
        className="mt-6 bg-orange-500 text-sm px-6 py-2 rounded hover:bg-orange-primary transition"
        disabled={!selected}
      >
        Responder
      </button>
    </div>
  );
}
