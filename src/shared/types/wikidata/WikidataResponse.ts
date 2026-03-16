export interface WikidataResponse {
  entities: {
    [key: string]: WikidataEntity;
  };
}

export interface WikidataEntity {
  type: string;
  id: string;
  claims: { [key: string]: WikidataClaim[] };
}

export interface WikidataClaim {
  mainsnak: WikidataSnak;
  type: string;
  id: string;
  rank: "normal" | "preferred";
  qualifiers?: {
    [key: string]: WikidataSnak[];
  };
  "qualifiers-order"?: string[];
  references?: [
    {
      hash: string;
      snaks: {
        [key: string]: WikidataSnak[];
      };
      "snaks-order": string[];
    },
  ];
}

export interface WikidataSnak {
  snaktype: string;
  property: string;
  hash: string;
  datavalue: WikidataDataValue;
  datatype: string;
}

export type WikidataDataValue = {
  value: any;
  type: string;
};
