import { HintDto } from "../../types/dto/hints/Hint.dto";

export abstract class Hint {
  constructor() {}

  abstract toDto(): HintDto;
}

export interface InitilizableHint {
  init(): Promise<void>;
}
