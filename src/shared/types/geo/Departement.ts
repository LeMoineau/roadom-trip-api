export interface Departement {
  code: DepartementCode;
  name: DepartementName;
  libelle: string;
}

export type DepartementCode = string;
export type DepartementName = `FR-${string}`;
