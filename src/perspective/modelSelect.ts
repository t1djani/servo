export interface ModelChoice {
  verifier: string;
  crossModel: boolean;
}

/**
 * §7d : un vérificateur tourne sur le modèle le plus DISTANT du producteur
 * disponible (réduit le biais partagé). Sinon, fallback même modèle
 * (la posture adverse + la tranche de contexte différente font le reste).
 * `available` est attendu ORDONNÉ par distance décroissante au producteur
 * (le plus distant d'abord) ; on prend le premier ≠ producteur = le plus distant.
 * NB : construire cet ordre « par distance » depuis les modèles réellement
 * dispo dans l'environnement est le travail de l'appelant (câblage P2), hors P1.
 */
export function selectVerifierModel(producer: string, available: string[]): ModelChoice {
  const other = available.find((m) => m !== producer);
  if (other) return { verifier: other, crossModel: true };
  return { verifier: producer, crossModel: false };
}
