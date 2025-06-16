import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({ temperature: 0 });

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Você é um professor e pesquisador especilista em gerar questões de {disciplinas} complexas no estilo ENEM.",
  ],
  [
    "user",
    `Crie {quantidade} questão de {disciplinas}, com nível {dificuldades} sobre os temas {assuntos}. 
    Cada questão deve conter:
    - Um comando claro e reflexivo.
    - Alternativas múltiplas (A, B, C, D, E), sendo apenas uma correta.
    - A indicação da alternativa correta.
    - Uma justificativa explicativa da resposta
    
    Retorne o resultado em JSON no seguinte formato:
    [
        {{
            "pergunta": "Texto da pergunta",
            "alternativas": {{
            "A": "Alternativa A",
            "B": "Alternativa B",
            "C": "Alternativa C",
            "D": "Alternativa D",
            "E": "Alternativa E"
        }},
            "correta": "B",
            "justificativa": "Explicação da alternativa correta."
        }}
    ]`,
  ],
]);

const parser = new JsonOutputParser();

export async function generateQuestion(params: {
  disciplinas: string[];
  dificuldades: string[];
  assuntos: string[];
  quantidade: number;
}) {
  const chain = promptTemplate.pipe(model).pipe(parser);

  const response = await chain.invoke(params);
  return response;
}
