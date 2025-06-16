import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/dist/output_parsers";

const model = new ChatOpenAI({ temperature: 0.5 });

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "Você é um professor que explica respostas do ENEM."],
  [
    "user",
    `Analise a resposta do aluno à seguinte questão:
{questao}

Resposta do aluno: {resposta}

Explique se está certa ou errada e justifique com clareza.`,
  ],
]);

export async function gerarFeedback(questao: object, resposta: string) {
  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  const output = await chain.invoke({
    questao: JSON.stringify(questao),
    resposta,
  });
  return output;
}
