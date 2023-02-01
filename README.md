# RomMage

RomMage gives you the ability to manipulate ROM files. It supports:

- ROM Type detection
- Patching (using IPS, UPS, and BPS formats)
- Header Modification (for NES, SNES, GB, GBC, and GBA ROMs)

Node.js and the browser are supported. Written in Typescript.

## Installation

```
$ npm install --save rommage
```

## Examples

### ROM type detection

```javascript
import { readFile } from "fs/promises";
import { Rom, RomType } from "rommage";

// Alternatively, require syntax may be used:
// const { Rom, RomType } = require("rommage");

const romBuffer = await readFile("./someFile.gbc");
const rom = Rom.fromBuffer(romBuffer);
console.log(rom.type === RomType.Gb);
```

### Rom patching

```javascript
import { Patch, PatchType } from "rommage";
const patchBuffer = await readFile("./someFileMod.ups");
const patch = Patch.fromBuffer(patchBuffer);
console.log(patch.type === PatchType.Ups);

patch.applyTo(romBuffer);
```

### Header modification

```javascript
console.log(rom.validity);

console.log(rom.header.logo.isValid);
rom.header.logo.togglePixel(1, 5);
console.log(rom.header.logo.isValid);

console.log(rom.header.version);
console.log(rom.header.title);
```




### Accessing specific rom type

```javascript
import { GbRom } from "rommage/GbRom";

const gbRom = GbRom.fromBuffer(romBuffer);
console.log(rom.validity); // -> 4
```
