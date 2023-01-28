import { Buffer } from "buffer";

export function trim(value: string, char: string) {
  const clipIndex = value.indexOf(char);
  if (clipIndex >= 0) return value.substring(0, clipIndex);
  return value;
}

export function trimNull(value: string) {
  return trim(value, "\x00");
}

export function trimSpace(value: string) {
  return trim(value, " ");
}

export function padNull(value: string, n: number) {
  return value.padEnd(n, "\x00");
}

// https://stackoverflow.com/a/64808910
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function range(a: number, b: number | undefined = undefined, step = 1) {
  const start = b === undefined ? 0 : a;
  const stop = b === undefined ? a : b;
  return Array.from({ length: Math.ceil((stop - start) / step) }).map(
    (_, i) => start + i * step
  );
}

export function keysAsHex<T>(obj: { [key: string]: T }) {
  const map = new Map<number, T>();
  for (const [key, value] of Object.entries(obj)) {
    map.set(Number.parseInt(key, 16), value);
  }

  return map;
}

export function readVUInt(buffer: Buffer, offset: number): [number, number] {
  let value = 0,
    shift = 0;

  for (let i = 0; i < 7; i++) {
    const octet = buffer.readUInt8(offset);
    offset += 1;
    if (octet & 0x80) {
      value += (octet & 0x7f) << shift;
      break;
    }
    value += (octet | 0x80) << shift;
    shift += 7;
  }

  return [value, offset];
}

export function readVInt(buffer: Buffer, offset: number): [number, number] {
  let value;
  [value, offset] = readVUInt(buffer, offset);
  return [(value & 1 ? -1 : +1) * (value >> 1), offset];
}
