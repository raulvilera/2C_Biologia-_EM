import { z } from "zod";

export const questionTypeSchema = z.enum(["objective", "discursive"]);
export type QuestionType = z.infer<typeof questionTypeSchema>;

export type FixedQuestion = {
  id: string;
  type: QuestionType;
  unit: string;
  topic: string;
  context: string;
  prompt: string;
  options: readonly [string, string, string, string];
  correctIndex: number;
  guidance: string;
};

export type StoredQuestion = Omit<FixedQuestion, "correctIndex" | "options"> & {
  number: number;
  correctOption: "A" | "B" | "C" | "D";
  options: { id: "A" | "B" | "C" | "D"; text: string }[];
};

export type StoredActivity = {
  id: string;
  studentId: string;
  studentNumber: number;
  studentName: string;
  studentRa: string;
  studentDigit: string;
  studentEmail: string;
  questions: StoredQuestion[];
  createdAt: string;
};

export const submittedAnswerSchema = z.object({
  questionNumber: z.number().int().min(1).max(10),
  answer: z.string().trim().min(1).max(6000),
});

export type SubmittedAnswer = z.infer<typeof submittedAnswerSchema>;

/** Banco pedagógico fixo: nenhuma questão é gerada por IA em tempo de execução. */
export const FIXED_QUESTIONS: readonly FixedQuestion[] = [
  {
    id: "bioethics-consent", type: "objective", unit: "Aula 1 · Bioética", topic: "Células HeLa e bioética",
    context: "Células humanas podem contribuir para pesquisas importantes, mas sua utilização exige responsabilidade científica e social.",
    prompt: "Qual atitude representa um uso eticamente responsável de amostras biológicas humanas em pesquisa?",
    options: ["Obter consentimento, proteger a privacidade e informar como a amostra será utilizada.", "Utilizar qualquer amostra disponível se a pesquisa puder gerar lucro.", "Dispensar explicações porque o material deixa de pertencer ao doador após a coleta.", "Divulgar os dados pessoais do doador para tornar o estudo transparente."],
    correctIndex: 0, guidance: "Bioética envolve autonomia, consentimento, privacidade e uso responsável do conhecimento científico.",
  },
  {
    id: "bioethics-review", type: "objective", unit: "Aula 1 · Bioética", topic: "Biotecnologia e bioética",
    context: "Uma equipe deseja cultivar células humanas para testar um medicamento antes de utilizá-lo em pessoas. O projeto será analisado por um comitê de ética.",
    prompt: "Por que a análise ética é importante antes da realização dessa pesquisa?",
    options: ["Porque avalia benefícios, riscos, justiça e respeito às pessoas envolvidas.", "Porque impede qualquer pesquisa que utilize células humanas.", "Porque substitui a revisão científica dos resultados.", "Porque garante que o medicamento terá efeito em todos os pacientes."],
    correctIndex: 0, guidance: "A análise ética orienta decisões responsáveis e protege direitos e interesses coletivos.",
  },
  {
    id: "dna-rna", type: "objective", unit: "Aula 2 · Material genético", topic: "DNA e RNA",
    context: "Dois modelos moleculares são comparados: um armazena a informação hereditária de modo estável e o outro participa diretamente de sua expressão.",
    prompt: "Qual comparação entre DNA e RNA está correta?",
    options: ["O DNA possui desoxirribose e timina; o RNA possui ribose e uracila.", "O DNA possui ribose e uracila; o RNA possui desoxirribose e timina.", "DNA e RNA são formados apenas por aminoácidos.", "DNA e RNA têm sempre duas fitas idênticas e não participam da síntese proteica."],
    correctIndex: 0, guidance: "DNA contém desoxirribose e timina; RNA contém ribose e uracila.",
  },
  {
    id: "replication", type: "objective", unit: "Aula 2 · Material genético", topic: "Replicação do DNA",
    context: "Antes de uma célula se dividir, seu DNA é copiado. Cada molécula nova mantém parte da estrutura original e inclui uma fita recém-formada.",
    prompt: "Essa descrição corresponde ao modelo de replicação do DNA chamado de",
    options: ["semiconservativo, pois cada molécula formada contém uma fita antiga e uma fita nova.", "conservativo, pois a molécula original permanece inteira e a cópia não recebe material antigo.", "aleatório, pois os nucleotídeos são unidos sem relação com a sequência molde.", "tradutório, pois os ribossomos montam novas fitas de DNA."],
    correctIndex: 0, guidance: "Na replicação semiconservativa, cada DNA novo preserva uma fita parental.",
  },
  {
    id: "transcription", type: "objective", unit: "Aula 3 · Expressão gênica", topic: "Transcrição",
    context: "Um trecho de DNA é usado como molde para produzir uma molécula que levará a informação genética até o local de produção de proteínas.",
    prompt: "O processo descrito é a transcrição e seu principal produto é",
    options: ["uma molécula de RNA mensageiro complementar à fita molde de DNA.", "uma proteína pronta formada pela união de aminoácidos no núcleo.", "uma nova molécula de DNA produzida no ribossomo.", "um lipídio que transporta o código genético até a membrana."],
    correctIndex: 0, guidance: "Na transcrição, a informação de um gene é copiada do DNA para o RNA.",
  },
  {
    id: "trna", type: "objective", unit: "Aula 3 · Expressão gênica", topic: "Tipos de RNA",
    context: "A síntese de proteínas depende da participação coordenada de diferentes moléculas de RNA.",
    prompt: "Qual associação entre um tipo de RNA e sua função está correta?",
    options: ["RNA transportador: leva aminoácidos até o ribossomo durante a tradução.", "RNA mensageiro: forma diretamente a membrana celular antes da tradução.", "RNA ribossômico: copia o DNA durante a replicação.", "RNA transportador: armazena permanentemente todos os genes."],
    correctIndex: 0, guidance: "O RNA transportador leva aminoácidos ao ribossomo conforme os códons do RNA mensageiro.",
  },
  {
    id: "translation", type: "objective", unit: "Aula 4 · Síntese proteica", topic: "Tradução e síntese de proteínas",
    context: "No citoplasma, um ribossomo percorre uma molécula de RNA mensageiro enquanto moléculas de RNA transportador entregam aminoácidos em uma ordem determinada.",
    prompt: "Qual é o resultado direto desse processo de tradução?",
    options: ["A formação de uma cadeia de aminoácidos que pode constituir uma proteína.", "A duplicação completa do DNA para formar dois núcleos celulares.", "A troca da timina do DNA por uracila para produzir outra fita de DNA.", "A destruição dos ribossomos para interromper a expressão gênica."],
    correctIndex: 0, guidance: "A tradução organiza aminoácidos em uma cadeia polipeptídica.",
  },
  {
    id: "discursive-ethics", type: "discursive", unit: "Aula 1 · Bioética", topic: "Células HeLa, biotecnologia e bioética",
    context: "Células humanas contribuem para estudos sobre doenças e vacinas, mas seu uso precisa respeitar direitos e dignidade das pessoas.",
    prompt: "Explique por que consentimento informado e privacidade são princípios importantes em pesquisas com células humanas. Relacione sua resposta a um possível benefício científico.",
    options: ["", "", "", ""], correctIndex: 0, guidance: "Relacione autonomia, privacidade, dignidade e benefício científico responsável.",
  },
  {
    id: "discursive-dna", type: "discursive", unit: "Aula 2 · Material genético", topic: "DNA, RNA e expressão gênica",
    context: "DNA e RNA são ácidos nucleicos relacionados, mas não têm a mesma estrutura nem exercem as mesmas funções na célula.",
    prompt: "Compare DNA e RNA indicando uma diferença estrutural e uma diferença funcional. Em seguida, explique como ambos se relacionam com a produção de proteínas.",
    options: ["", "", "", ""], correctIndex: 0, guidance: "Cite diferenças estruturais e a passagem da informação do DNA para o RNA e para as proteínas.",
  },
  {
    id: "discursive-expression", type: "discursive", unit: "Aula 4 · Síntese proteica", topic: "Transcrição, tradução e síntese de proteínas",
    context: "A expressão de um gene envolve etapas conectadas: uma informação presente no DNA é transcrita em RNA e depois traduzida no ribossomo.",
    prompt: "Descreva, em sequência, o que ocorre na transcrição e na tradução. Inclua os papéis do RNA mensageiro, do ribossomo e dos aminoácidos.",
    options: ["", "", "", ""], correctIndex: 0, guidance: "Descreva DNA como molde, RNA mensageiro, leitura no ribossomo e união de aminoácidos.",
  },
];

function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

/** Gerador determinístico por acesso: mantém a prévia e o envio do mesmo estudante na mesma ordem. */
export function createSeededRandom(seed: string): () => number {
  let state = 2166136261;
  for (const character of seed) {
    state ^= character.charCodeAt(0);
    state = Math.imul(state, 16777619);
  }
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildActivity(input: { id: string; studentId: string; studentNumber: number; studentName: string; studentRa: string; studentDigit: string; studentEmail: string; random?: () => number }): StoredActivity {
  const labels = ["A", "B", "C", "D"] as const;
  const questions = shuffle(FIXED_QUESTIONS, input.random).map((fixed, questionIndex) => {
    const { correctIndex, ...questionBase } = fixed;
    if (fixed.type === "discursive") {
      return { ...questionBase, number: questionIndex + 1, options: [], correctOption: "A" as const };
    }
    const randomized = shuffle(fixed.options.map((text, originalIndex) => ({ text, originalIndex })), input.random);
    const shuffledCorrectIndex = randomized.findIndex(option => option.originalIndex === correctIndex);
    return {
      ...questionBase,
      number: questionIndex + 1,
      options: randomized.map((option, index) => ({ id: labels[index], text: option.text })),
      correctOption: labels[shuffledCorrectIndex],
    };
  });
  return { id: input.id, studentId: input.studentId, studentNumber: input.studentNumber, studentName: input.studentName, studentRa: input.studentRa, studentDigit: input.studentDigit, studentEmail: input.studentEmail, questions, createdAt: new Date().toISOString() };
}

export function toPublicActivity(activity: StoredActivity) {
  return {
    id: activity.id,
    studentId: activity.studentId,
    studentName: activity.studentName,
    createdAt: activity.createdAt,
    questions: activity.questions.map(({ correctOption, guidance, ...question }) => {
      const { correctIndex: _correctIndex, ...publicQuestion } = question as typeof question & { correctIndex?: number };
      return publicQuestion;
    }),
  };
}

export function gradeObjectiveAnswers(activity: StoredActivity, answers: SubmittedAnswer[]) {
  const answerMap = new Map(answers.map(answer => [answer.questionNumber, answer.answer.trim().toUpperCase()]));
  const objectiveQuestions = activity.questions.filter(question => question.type === "objective");
  const results = objectiveQuestions.map(question => ({
    questionNumber: question.number,
    correct: answerMap.get(question.number) === question.correctOption,
    selectedOption: answerMap.get(question.number) ?? "",
  }));
  return { correct: results.filter(result => result.correct).length, total: objectiveQuestions.length, results };
}

export function buildAppsScriptPayload(activity: StoredActivity, answers: SubmittedAnswer[], grade: ReturnType<typeof gradeObjectiveAnswers>) {
  const answerMap = new Map(answers.map(answer => [answer.questionNumber, answer.answer.trim()]));
  return {
    action: "submitBiologyActivity",
    attemptId: activity.id,
    studentName: activity.studentName,
    studentNumber: activity.studentNumber,
    studentRa: activity.studentRa,
    studentDigit: activity.studentDigit,
    studentEmail: activity.studentEmail,
    submittedAt: new Date().toISOString(),
    activityVersion: "2serie-c-3bimestre-fixa-v1",
    grade: `${grade.correct}/${grade.total}`,
    objectiveScore: grade.correct,
    syncStatus: "SYNCED",
    answers: activity.questions.map(question => ({
      questionNumber: question.number,
      type: question.type === "objective" ? "multiple_choice" : "discursive",
      answer: answerMap.get(question.number) ?? "",
    })),
    objectiveKey: activity.questions.filter(question => question.type === "objective").map(question => ({ questionNumber: question.number, correctOption: question.correctOption })),
  };
}
