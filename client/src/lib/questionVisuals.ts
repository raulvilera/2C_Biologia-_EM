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
    src: "/manus-storage/transcription-rna-laboratory-1600_89043b1d.jpg",
    alt: "Imagem real de laboratório que registra uma técnica de visualização da atividade de RNA em tecido biológico.",
    label: "Visualização real de atividade de RNA",
    credit: { label: "Pesquisa de RNA · Yale News", href: "https://news.yale.edu/" },
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
    src: "/manus-storage/discursive-ethics-cell-research-1600_ceed01b8.jpg",
    alt: "Fotografia real de pesquisadora em laboratório de células-tronco, relacionada ao cuidado ético no uso de células humanas.",
    label: "Pesquisa celular em laboratório",
    credit: { label: "Pesquisa com células · NIH Stem Cell Information", href: "https://stemcells.nih.gov/" },
  },
  "discursive-dna": {
    src: "/manus-storage/discursive-dna-gel-electrophoresis-1600_0d47ad22.jpg",
    alt: "Fotografia real de um gel de agarose com bandas de DNA separadas por eletroforese.",
    label: "Eletroforese de DNA real",
    credit: { label: "DNA em gel de agarose · Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:DNA_Agarose_gel_electrophoresis.jpg" },
  },
  "discursive-expression": {
    src: "/manus-storage/discursive-expression-protein-electron-1600_daf5bd1c.jpg",
    alt: "Imagem real de uma proteína observada com microscopia eletrônica, relacionada ao produto da expressão gênica.",
    label: "Proteína em microscopia eletrônica",
    credit: { label: "Imagem de proteína · Berkeley Lab", href: "https://newscenter.lbl.gov/" },
  },
};

export function getQuestionVisual(questionId: string) {
  return QUESTION_VISUALS[questionId];
}
