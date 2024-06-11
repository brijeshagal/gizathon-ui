function logit(x: number): number {
  return Math.log(x / (1 - x));
}

export function postProcessBinaryPred(result: number): number {
  result = result + logit(0.7459341);
  const finalScore = 1 / (1 + Math.exp(-result));

  return finalScore * 100; // in precentage
}
