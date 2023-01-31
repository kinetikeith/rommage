import { Buffer } from "buffer";

export enum PatchType {
  Unknown = -1,
  Ips,
  Ups,
  Bps,
}

export class BasePatch {
  static type: PatchType = PatchType.Unknown;
  _buffer: Buffer;

  constructor(buffer: Buffer) {
    this._buffer = buffer;
  }

  get type(): PatchType {
    return Object.getPrototypeOf(this).constructor.type;
  }

  get validity(): number {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyTo(buffer: Buffer): Buffer {
    throw new Error("Unable to apply patch of unknown type!");
  }
}
