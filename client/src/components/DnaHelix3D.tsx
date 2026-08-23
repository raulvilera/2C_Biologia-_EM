type BasePair = {
  left: "A" | "T" | "C" | "G";
  right: "A" | "T" | "C" | "G";
  bonds: 2 | 3;
};

export const DNA_BASE_PAIRS: BasePair[] = [
  { left: "A", right: "T", bonds: 2 },
  { left: "C", right: "G", bonds: 3 },
  { left: "T", right: "A", bonds: 2 },
  { left: "G", right: "C", bonds: 3 },
  { left: "A", right: "T", bonds: 2 },
  { left: "C", right: "G", bonds: 3 },
  { left: "T", right: "A", bonds: 2 },
  { left: "G", right: "C", bonds: 3 },
  { left: "A", right: "T", bonds: 2 },
  { left: "C", right: "G", bonds: 3 },
  { left: "T", right: "A", bonds: 2 },
  { left: "G", right: "C", bonds: 3 },
  { left: "A", right: "T", bonds: 2 },
  { left: "C", right: "G", bonds: 3 },
];

export function DnaHelix3D() {
  return (
    <div className="hero-dna-visual" role="img" aria-label="Modelo tridimensional rotativo de DNA com duas fitas, açúcares, grupos fosfato, pares de bases A-T e C-G e ligações de hidrogênio">
      <div className="hero-dna-ambient" aria-hidden="true" />
      <div className="hero-dna-stage" aria-hidden="true">
        <div className="hero-dna-model">
          {DNA_BASE_PAIRS.map((pair, index) => {
            const angle = index * 31;
            const height = (index - (DNA_BASE_PAIRS.length - 1) / 2) * 24;
            return (
              <div
                className="hero-dna-pair"
                key={`${pair.left}${pair.right}-${index}`}
                style={{ transform: `translate3d(-50%, -50%, 0) translateY(${height}px) rotateY(${angle}deg)` }}
              >
                <span className="hero-dna-phosphate hero-dna-phosphate-left" />
                <span className="hero-dna-sugar hero-dna-sugar-left" />
                <span className={`hero-dna-base hero-dna-base-${pair.left.toLowerCase()}`}>{pair.left}</span>
                <span className={`hero-dna-bonds hero-dna-bonds-${pair.bonds}`}><i /><i /><i /></span>
                <span className={`hero-dna-base hero-dna-base-${pair.right.toLowerCase()}`}>{pair.right}</span>
                <span className="hero-dna-sugar hero-dna-sugar-right" />
                <span className="hero-dna-phosphate hero-dna-phosphate-right" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="hero-dna-copy">
        <p>Estrutura em 3D</p>
        <strong>DNA</strong>
        <span>Fosfato · Açúcar · Pares A–T e C–G</span>
      </div>
    </div>
  );
}
