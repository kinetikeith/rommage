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
import { detectRomType } from "rommage";

// Alternatively, require syntax may be used:
// const detectRomType = require("rommage").detectRomType;

const fileBuffer = await readFile("./someFile.gbc");
const romType = detectRomType(fileBuffer);
console.log(romType === RomType.Gb); // -> true
```

### Rom patching
```javascript
import { UpsPatch } from "rommage";
const patchBuffer = await readFile("./someFileMod.ups");
const patch = new UpsPatch(patchBuffer);

patch.applyTo(fileBuffer);
```

### Header modification
```javascript
import { GbRom } from "rommage";
const rom = GbRom.fromBuffer(fileBuffer);

console.log(rom.header.logo.isValid); // -> true
rom.header.logo.togglePixel(1, 5);
console.log(rom.header.logo.isValid); // -> false

console.log(rom.header.version); // -> 1
console.log(rom.header.title); // -> "MY TITLE"
```
