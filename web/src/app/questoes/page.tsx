import FiltroQuestoes from "@/components/FiltroQuestoes";
import QuestionCard from "@/components/QuestionCard";

export default function Questoes() {
  const question = {
    id: "Q3355528",
    disciplina: "Direito Processual Penal",
    assunto:
      "Inquérito Policial, Das Provas, Nulidades no Processo Penal (+ assuntos)",
    enunciado: `Em uma ação penal por roubo majorado, o juiz, ao proferir a sentença condenatória, fundamentou sua decisão em elementos informativos colhidos exclusivamente durante o inquérito policial [...] Com base nessa situação, assinale a alternativa correta:`,
    alternativas: {
      A: "A sentença é válida, pois o inquérito policial pode ser usado como única prova em casos de silêncio do acusado.",
      B: "A sentença é nula, pois não se pode fundamentar a condenação exclusivamente em elementos colhidos na fase inquisitorial.",
      C: "A sentença é válida, já que a vítima foi regularmente intimada e o acusado exerceu seu direito ao silêncio.",
      D: "A sentença é nula apenas se o réu provar que teria se defendido melhor caso as provas tivessem sido colhidas em juízo.",
      E: "A sentença é válida se o juiz tiver certeza da autoria, independentemente da origem das provas.",
    },
  };
  return (
    <>
      <div className="flex flex-col gap-4 my-4">
        <FiltroQuestoes></FiltroQuestoes>
        <QuestionCard question={question}></QuestionCard>
        <QuestionCard question={question}></QuestionCard>
        <QuestionCard question={question}></QuestionCard>
        <QuestionCard question={question}></QuestionCard>
      </div>
    </>
  );
}
