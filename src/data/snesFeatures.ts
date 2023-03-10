const featureMap = new Map<number, string[]>([
  [0x00, ["ROM"]],
  [0x01, ["ROM", "RAM"]],
  [0x02, ["ROM", "RAM", "Battery"]],
  [0x03, ["ROM", "DSP"]],
  [0x04, ["ROM", "RAM", "DSP"]],
  [0x05, ["ROM", "RAM", "Battery", "DSP"]],
  [0x13, ["ROM", "EXPRAM", "MARIO Chip 1"]],
  [0x25, ["ROM", "RAM", "Battery", "OBC-1"]],
  [0x32, ["ROM", "RAM", "Battery", "SA1"]],
  [0x34, ["ROM", "RAM", "SA1"]],
  [0x35, ["ROM", "RAM", "Battery", "SA1"]],
  [0x36, ["ROM", "Battery", "SA-1"]],
  [0x43, ["ROM", "S-DD1"]],
  [0x45, ["ROM", "RAM", "Battery", "S-DD1"]],
  [0x55, ["ROM", "RAM", "Battery", "S-RTC"]],
  [0xe3, ["ROM", "LR35902"]],
  [0xe5, ["ROM", "BS-X"]],
  [0x1a, ["ROM", "RAM", "Battery", "GSU-2-SP1"]],
]);

export { featureMap };
