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
    src: "/manus-storage/bio-3d-bioethics-cells_cb93b139.png",
    alt: "Modelo científico 3D de células humanas em cultura, em uma placa de laboratório, associado à pesquisa responsável.",
    label: "Modelo científico 3D",
  },
  "dna-rna": {
    src: "/manus-storage/bio-3d-dna-rna_cb5c880a.png",
    alt: "Modelo científico 3D de uma dupla hélice de DNA e uma fita de RNA em ambiente de laboratório.",
    label: "Modelo científico 3D",
  },
  replication: {
    src: "/manus-storage/bio-3d-replication_194881f2.png",
    alt: "Modelo científico 3D de uma forquilha de replicação do DNA com novas fitas sendo formadas.",
    label: "Modelo científico 3D",
  },
  transcription: {
    src: "/manus-storage/bio-3d-dna-rna_cb5c880a.png",
    alt: "Modelo científico 3D de DNA e RNA, representando a transferência de informação genética durante a transcrição.",
    label: "Modelo científico 3D",
  },
  trna: {
    src: "/manus-storage/bio-3d-translation_4dd49a21.png",
    alt: "Modelo científico 3D de um ribossomo, RNA mensageiro e RNA transportador durante a tradução.",
    label: "Modelo científico 3D",
  },
  translation: {
    src: "/manus-storage/bio-3d-translation_4dd49a21.png",
    alt: "Modelo científico 3D de um ribossomo realizando a síntese de uma cadeia de aminoácidos a partir do RNA mensageiro.",
    label: "Modelo científico 3D",
  },
  "discursive-ethics": {
    src: "/manus-storage/bio-3d-bioethics-cells_cb93b139.png",
    alt: "Modelo científico 3D de células humanas em cultura, associado a ética, consentimento e privacidade em pesquisa.",
    label: "Modelo científico 3D",
  },
  "discursive-dna": {
    src: "/manus-storage/bio-3d-dna-rna_cb5c880a.png",
    alt: "Modelo científico 3D comparando DNA em dupla hélice e RNA em fita simples.",
    label: "Modelo científico 3D",
  },
  "discursive-expression": {
    src: "/manus-storage/bio-3d-translation_4dd49a21.png",
    alt: "Modelo científico 3D da tradução genética com ribossomo, RNA e cadeia proteica em formação.",
    label: "Modelo científico 3D",
  },
};

export function getQuestionVisual(questionId: string) {
  return QUESTION_VISUALS[questionId];
}
