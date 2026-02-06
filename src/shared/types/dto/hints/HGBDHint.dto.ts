export type HGBDHintDirection = "haut" | "gauche" | "bas" | "droite";

export type HGBDHintMethodGenerationDirection =
  | "from-starting-pos"
  | "from-ending-pos";

export interface HGBDHintDto {
  type: "haut-gauche-bas-droite-hint";
  direction: HGBDHintDirection;
  methodGenerationDirection: HGBDHintMethodGenerationDirection;
}
