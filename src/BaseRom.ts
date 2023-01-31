import { Buffer } from "buffer";

export enum RomType {
  Generic = -1,
  Nes,
  Snes,
  Gb,
  Gba,
}

export class BaseRom {
  static type: RomType = RomType.Generic;
  _buffer: Buffer;

  constructor(buffer: Buffer) {
    this._buffer = buffer;
  }

  get type(): RomType {
    return Object.getPrototypeOf(this).constructor.type;
  }
}
