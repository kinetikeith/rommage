import { Buffer } from "buffer";
import { sortBy } from "lodash-es";

import BaseRom, { RomType } from "./BaseRom";
import NesRom from "./NesRom";
import SnesRom from "./SnesRom";
import GbRom from "./GbRom";
import GbaRom from "./GbaRom";

export default class Rom extends BaseRom {
  static type = RomType.Generic;
  constructor(buffer: Buffer) {
    super(buffer);
  }

  static fromBuffer(buffer: Buffer): BaseRom {
    const candidates = [NesRom, SnesRom, GbRom, GbaRom].map((TypeRom) => {
      const rom = TypeRom.fromBuffer(buffer);
      return { rom, validity: rom.validity };
    });
    const candidatesSorted = sortBy(candidates, "validity");
    const bestCandidate = candidatesSorted.pop();

    if (bestCandidate !== undefined) {
      if (bestCandidate.validity > 0) return bestCandidate.rom;
    }

    return new Rom(buffer);
  }
}
