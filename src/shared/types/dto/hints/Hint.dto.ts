export type HintType = String;

export interface HintDto {
  type: HintType;
  [key: string]: any;
}

export interface BlasonDepHintDto extends HintDto {
  type: "blason-departement-hint";
}

export interface BlasonComHintDto extends HintDto {
  type: "blason-commune-hint";
}

export interface DrapeauDepHintDto extends HintDto {
  type: "drapeau-departement-hint";
}
