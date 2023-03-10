const chrSizeMap = new Map<number, number[]>([
  [0x0, [8]],
  [0x1, [16]],
  [0x2, [32]],
  [0x3, [64]],
  [0x4, [128, 256]],
]);

export { chrSizeMap };
