// The World Today - 25 November 2026 news image.
// Copies the pre-rendered entry.png next to this file into the output
// directory, verifying it is a whole, valid PNG of the expected size.
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576;
const MAX_DIMENSION = 1024;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

const bytes = readFileSync(source);
if (bytes.length === 0 || bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, must be 1..${MAX_BYTES}`);
}
if (!bytes.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)) {
  throw new Error("entry.png does not start with the PNG magic bytes");
}
// PNG header: width and height are the first two 32-bit big-endian values
// after the 8-byte signature and the 4-byte IHDR length + 4-byte type.
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width === 0 || height === 0 || width > MAX_DIMENSION || height > MAX_DIMENSION) {
  throw new Error(`entry.png is ${width}x${height}, must be at most ${MAX_DIMENSION}x${MAX_DIMENSION}`);
}
const sha256 = createHash("sha256").update(bytes).digest("hex");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
// Re-read what was actually written and check it byte for byte: a copy
// that differs from the source must fail loudly instead of passing silently.
const copied = readFileSync(target);
if (!copied.equals(bytes)) {
  throw new Error(`${target} does not match entry.png after copying`);
}
const copiedHash = createHash("sha256").update(copied).digest("hex");
if (copiedHash !== sha256) {
  throw new Error(`sha256 mismatch after copy: ${copiedHash} != ${sha256}`);
}
const written = copied.length;
console.log(`wrote ${target} (${width}x${height}, ${written} bytes, sha256 ${sha256})`);
