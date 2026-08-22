export type QuestionVisual = {
  src: string;
  alt: string;
  label: string;
  credit?: { label: string; href: string };
};

export const QUESTION_VISUALS: Record<string, QuestionVisual> = {
  "bioethics-consent": {
    src: "/manus-storage/hela-cells-nih-1200_f9085c75.webp",
    alt: "Micrografia fluorescente de células HeLa, com filamentos celulares vermelhos, microtúbulos em ciano e núcleos em azul.",
    label: "Imagem científica real",
    credit: { label: "Micrografia de células HeLa · NIGMS/NIH", href: "https://nigms.nih.gov/image-gallery/3521" },
  },
  "bioethics-review": {
    src: "/manus-storage/hela-cells-nih-1200_f9085c75.webp",
    alt: "Micrografia fluorescente de células HeLa, usada como referência visual para pesquisa com células humanas.",
    label: "Imagem científica real",
    credit: { label: "Micrografia de células HeLa · NIGMS/NIH", href: "https://nigms.nih.gov/image-gallery/3521" },
  },
  "dna-rna": {
    src: "/manus-storage/bio-3d-dna-rna_cb5c880a.png",
    alt: "Modelo científico 3D de uma dupla hélice de DNA e uma fita de RNA em ambiente de laboratório.",
    label: "Modelo científico 3D",
  },
  replication: {
    src: "/manus-storage/bio-3d-dna-rna_cb5c880a.png",
    alt: "Modelo científico 3D de uma molécula de DNA, usado para observar a estrutura que é copiada durante a replicação.",
    label: "Modelo molecular 3D",
  },
  transcription: {
    src: "/manus-storage/bio-3d-dna-rna_cb5c880a.png",
    alt: "Modelo científico 3D de DNA e RNA, representando a transferência de informação genética durante a transcrição.",
    label: "Modelo científico 3D",
  },
  trna: {
    src: "/manus-storage/bio-3d-dna-rna_cb5c880a.png",
    alt: "Modelo molecular 3D de DNA e RNA, relacionado aos tipos de RNA que participam da produção de proteínas.",
    label: "Modelo molecular 3D",
  },
  translation: {
    src: "/manus-storage/bio-3d-dna-rna_cb5c880a.png",
    alt: "Modelo molecular 3D de DNA e RNA, relacionado à leitura da informação genética durante a tradução.",
    label: "Modelo molecular 3D",
  },
  "discursive-ethics": {
    src: "/manus-storage/hela-cells-nih-1200_f9085c75.webp",
    alt: "Micrografia fluorescente de células HeLa, relacionada a ética, consentimento e privacidade em pesquisa celular.",
    label: "Imagem científica real",
    credit: { label: "Micrografia de células HeLa · NIGMS/NIH", href: "https://nigms.nih.gov/image-gallery/3521" },
  },
  "discursive-dna": {
    src: "/manus-storage/bio-3d-dna-rna_cb5c880a.png",
    alt: "Modelo científico 3D comparando DNA em dupla hélice e RNA em fita simples.",
    label: "Modelo científico 3D",
  },
  "discursive-expression": {
    src: "/manus-storage/bio-3d-dna-rna_cb5c880a.png",
    alt: "Modelo molecular 3D de DNA e RNA, relacionado às etapas de transcrição e tradução da informação genética.",
    label: "Modelo molecular 3D",
  },
};

export function getQuestionVisual(questionId: string) {
  return QUESTION_VISUALS[questionId];
}
