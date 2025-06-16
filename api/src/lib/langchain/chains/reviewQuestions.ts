import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  JsonOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  temperature: 0,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Você é um revisor técnico especializado na formulação de questões do ENEM.",
  ],
  [
    "user",
    `
        Sua tarefa é revisar o seguinte conjunto de questões no formato JSON, seguindo as orientações abaixo:

        1. **Coerência conceitual:**  
            - Verifique se o enunciado é cientificamente correto.  
            - Caso haja incoerência (ex.: transformação isobárica com variação de pressão), corrija o enunciado ou sinalize claramente como "INCONSISTENTE" e explique o motivo.
        2. **Validação de cálculos:**  
            - Sempre que houver cálculos, refaça-os e corrija a alternativa correta se necessário.  
            - Ajuste os valores do enunciado ou das alternativas se identificar erros, garantindo coerência entre eles.  
            - Se o erro for irrecuperável, sinalize a questão como "INVIÁVEL" e explique.

        3. **Clareza e ortografia:**  
            - Corrija erros ortográficos ou gramaticais.  
            - Adapte termos técnicos ao uso mais adequado (ex.: "ótico" → "óptico").

        4. **Justificativa pedagógica:**  
            - Explique claramente o motivo da alternativa correta, com base conceitual ou cálculo.   
        5. **Formato de saída:**
            - Retorne o JSON corrigido.
            - Para questões com problemas que não puder corrigir, acrescente um campo adicional: 
              "obervacao": "INCONSISTENTE: explique o motivo" OU "INVIAVEL": explique o motivo
        Aqui estão as questões a revisar:

        {questoes}
        Retorne apenas o JSON corrigido.
    `,
  ],
]);

const parser = new JsonOutputParser();
export async function reviewQuestions(questoes: Record<string, any>) {
  const chain = prompt.pipe(model).pipe(parser);

  const response = await chain.invoke({ questoes: JSON.stringify(questoes) });
  return response;
}
