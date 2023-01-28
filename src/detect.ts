import { Buffer } from "buffer";
import { sortBy } from "lodash-es";

import GbRom from "./GbRom";
import GbaRom from "./GbaRom";
import NesRom from "./NesRom";
import SnesRom from "./SnesRom";

import IpsPatch from "./IpsPatch";
import UpsPatch from "./UpsPatch";
import BpsPatch from "./BpsPatch";

export type Patch = IpsPatch | UpsPatch | BpsPatch;

export enum RomType {
  Generic = -1,
  Gb,
  Gba,
  Nes,
  Snes,
}

export enum PatchType {
  Unknown = -1,
  Ips,
  Ups,
  Bps,
}

export function detectRomType(buffer: Buffer, ext: string): RomType {
  const roms = [
    {
      validity: GbRom.fromBuffer(buffer).validity,
      type: RomType.Gb,
      ext: [".gb", ".gbc"],
    },
    {
      validity: GbaRom.fromBuffer(buffer).validity,
      type: RomType.Gba,
      ext: [".gba"],
    },
    {
      validity: NesRom.fromBuffer(buffer).validity,
      type: RomType.Nes,
      ext: [".nes"],
    },
    {
      validity: SnesRom.fromBuffer(buffer).validity,
      type: RomType.Snes,
      ext: [".sfc"],
    },
  ];

  const bestRom = sortBy(
    roms,
    (rom) => rom.validity + (rom.ext.includes(ext) ? 2 : -2)
  ).pop();

  if (bestRom === undefined) return RomType.Generic;
  else if (bestRom.validity > 0) return bestRom.type;

  return RomType.Generic;
}

export function bufferToPatch(buffer: Buffer): Patch | undefined {
  const ipsPatch = new IpsPatch(buffer);
  if (ipsPatch.validityScore > 0) return ipsPatch;

  const upsPatch = new UpsPatch(buffer);
  if (upsPatch.validityScore > 0) return upsPatch;

  const bpsPatch = new BpsPatch(buffer);
  if (bpsPatch.validityScore > 0) return bpsPatch;
}
