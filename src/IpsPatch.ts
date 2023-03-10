import { Buffer } from "buffer";
import { min, max } from "lodash-es";

import { BasePatch, PatchType } from "./BasePatch";

interface Chunk {
  offset: number;
  length: number;
  buffer: () => Buffer;
}

export class IpsPatch extends BasePatch {
  static type = PatchType.Ips;
  constructor(buffer: Buffer) {
    super(buffer);
  }

  get validity() {
    return this.magic === "PATCH" ? 1 : 0;
  }

  get magic() {
    return this._buffer.toString("ascii", 0, 5);
  }

  *getChunks(): Iterable<Chunk> {
    let patchIndex = 0x05;

    while (true) {
      const chunkOffset =
        (this._buffer.readUInt8(patchIndex) << 16) |
        (this._buffer.readUInt8(patchIndex + 0x01) << 8) |
        this._buffer.readUInt8(patchIndex + 0x02);
      if (chunkOffset === 0x454f46) return; // EOF encountered
      const chunkLength = this._buffer.readUInt16BE(patchIndex + 0x03);
      if (chunkLength === 0) {
        // chunkLength of 0 denotes a run of the same value (RLE)
        const runLength = this._buffer.readUInt16BE(patchIndex + 0x05);
        const runByte = this._buffer.readUInt8(patchIndex + 0x07);
        yield {
          offset: chunkOffset,
          length: runLength,
          buffer: () => Buffer.alloc(runLength, runByte),
        };

        patchIndex += 0x08;
      } else {
        // Otherwise, it's a normal chunk.
        const chunkIndex = patchIndex + 0x05;
        yield {
          offset: chunkOffset,
          length: chunkLength,
          buffer: () =>
            this._buffer.subarray(chunkIndex, chunkIndex + chunkLength),
        };

        patchIndex += chunkLength + 0x05;
      }
    }
  }

  get chunks() {
    return Array.from(this.getChunks());
  }

  get nChunks() {
    return this.chunks.length;
  }

  get begin(): number {
    return min(this.chunks.map((chunk) => chunk.offset)) || 0;
  }

  get end(): number {
    return max(this.chunks.map((chunk) => chunk.offset + chunk.length)) || 0;
  }

  applyTo(buffer: Buffer): Buffer {
    let resBuffer = buffer;
    const chunks = this.chunks;
    const end = max(chunks.map((chunk) => chunk.offset + chunk.length)) || 0;

    if (end > buffer.length) {
      resBuffer = Buffer.alloc(end);
      buffer.copy(resBuffer);
    }

    for (const chunk of chunks) {
      chunk.buffer().copy(resBuffer, chunk.offset);
    }

    return resBuffer;
  }

  get info() {
    return {
      nChunks: this.nChunks,
      begin: this.begin,
      end: this.end,
    };
  }
}
