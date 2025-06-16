export interface Alternativas {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
}

export interface OutputQuestions {
  pergunta: string;
  alternativas: Alternativas;
  correta: keyof Alternativas; // 'A' | 'B' | 'C' | 'D' | 'E'
  justificativa: string;
}
