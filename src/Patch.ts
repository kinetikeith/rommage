import { Buffer } from "buffer";
import { sortBy } from "lodash-es";

import { BasePatch, PatchType } from "./BasePatch";
import { IpsPatch } from "./IpsPatch";
import { UpsPatch } from "./UpsPatch";
import { BpsPatch } from "./BpsPatch";

export { PatchType };

export class Patch extends BasePatch {
  static type = PatchType.Unknown;

  static fromBuffer(buffer: Buffer): BasePatch {
    const candidates = [IpsPatch, UpsPatch, BpsPatch].map((TypePatch) => {
      const patch = new TypePatch(buffer);
      return { patch, validity: patch.validity };
    });
    const candidatesSorted = sortBy(candidates, "validity");
    const bestCandidate = candidatesSorted.pop();

    if (bestCandidate !== undefined) {
      if (bestCandidate.validity > 0) return bestCandidate.patch;
    }

    return new Patch(buffer);
  }
}
