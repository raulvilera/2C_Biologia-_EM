export type QuestionVisual = {
  src: string;
  alt: string;
  label: string;
  credit?: { label: string; href: string };
};

export const QUESTION_VISUALS: Record<string, QuestionVisual> = {
  "bioethics-consent": {
    src: "/manus-storage/bioethics-consent-hela-fluorescence_d29b31c5.jpg",
    alt: "Micrografia fluorescente real de células HeLa, com filamentos celulares, microtúbulos e núcleos visíveis.",
    label: "Micrografia real de células humanas",
    credit: { label: "Células HeLa · NIGMS/NIH", href: "https://nigms.nih.gov/image-gallery/3521" },
  },
  "bioethics-review": {
    src: "/manus-storage/bioethics-review-human-cell_d314c47e.jpg",
    alt: "Imagem microscópica real de uma célula humana cultivada, evidenciando membrana, citoesqueleto e núcleo.",
    label: "Pesquisa celular real",
    credit: { label: "Células humanas · NIGMS/NIH", href: "https://nigms.nih.gov/image-gallery" },
  },
  "dna-rna": {
    src: "/manus-storage/dna-rna-hybrid-structure_47307883.jpeg",
    alt: "Estrutura experimental de um híbrido DNA-RNA, com as duas cadeias de ácidos nucleicos visíveis.",
    label: "Estrutura experimental DNA-RNA",
    credit: { label: "PDB 124D · RCSB Protein Data Bank", href: "https://www.rcsb.org/structure/124D" },
  },
  replication: {
    src: "/manus-storage/dna-replication-polymerase_efa36def.jpg",
    alt: "Modelo estrutural experimental de DNA polimerase ligada ao DNA, enzima responsável pela cópia do material genético.",
    label: "DNA polimerase em ação",
    credit: { label: "DNA Polymerase · PDB-101/RCSB", href: "https://pdb101.rcsb.org/motm/113" },
  },
  transcription: {
    src: "/manus-storage/transcription-rna-polymerase_a79238cb.jpeg",
    alt: "Estrutura experimental de RNA polimerase transcrevendo informação genética a partir de uma fita de DNA.",
    label: "RNA polimerase em transcrição",
    credit: { label: "PDB 30FH · RCSB Protein Data Bank", href: "https://www.rcsb.org/structure/30FH" },
  },
  trna: {
    src: "/manus-storage/trna-transfer-rna_d9c468c8.jpg",
    alt: "Estrutura experimental de RNA transportador mostrando a região anticódon e a ligação ao aminoácido.",
    label: "RNA transportador",
    credit: { label: "Transfer RNA · PDB-101/RCSB", href: "https://pdb101.rcsb.org/motm/15" },
  },
  translation: {
    src: "/manus-storage/translation-ribosome-trna_5c97f9b1.jpeg",
    alt: "Estrutura experimental de um ribossomo com moléculas de RNA transportador durante a tradução genética.",
    label: "Ribossomo e tRNAs",
    credit: { label: "PDB 3J78 · RCSB Protein Data Bank", href: "https://www.rcsb.org/structure/3J78" },
  },
  "discursive-ethics": {
    src: "/manus-storage/discursive-ethics-hela-electron_ad5fa8b3.jpg",
    alt: "Micrografia eletrônica real de célula HeLa, relacionada a pesquisas com células humanas e responsabilidade ética.",
    label: "Microscopia eletrônica real",
    credit: { label: "Células HeLa · NIGMS/NIH", href: "https://nigms.nih.gov/image-gallery/3521" },
  },
  "discursive-dna": {
    src: "/manus-storage/discursive-dna-rna-hybrid_32df411c.jpeg",
    alt: "Estrutura experimental de um duplex híbrido de DNA e RNA, destacando as semelhanças e diferenças entre os ácidos nucleicos.",
    label: "Híbrido molecular DNA-RNA",
    credit: { label: "PDB 1AC3 · RCSB Protein Data Bank", href: "https://www.rcsb.org/structure/1AC3" },
  },
  "discursive-expression": {
    src: "/manus-storage/discursive-expression-ribosome_4109ca84.jpg",
    alt: "Comparação de estruturas reais de ribossomos, os complexos celulares que leem RNA mensageiro e formam proteínas.",
    label: "Estruturas reais de ribossomos",
    credit: { label: "Ribosome Diversity · PDB-101/RCSB", href: "https://pdb101.rcsb.org/" },
  },
};

export function getQuestionVisual(questionId: string) {
  return QUESTION_VISUALS[questionId];
}
