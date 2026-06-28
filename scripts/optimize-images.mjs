import sharp from "sharp"
import { readdirSync, statSync, renameSync } from "fs"
import { join, parse } from "path"

const imgDir = "public/images"
const maxWidth = 1200
const quality = 80

const files = readdirSync(imgDir).filter(f => /\.jpe?g$/i.test(f))

for (const f of files) {
  const input = join(imgDir, f)
  const before = statSync(input).size

  const tmp = join(imgDir, "_" + f)
  const img = sharp(input)
  const meta = await img.metadata()
  const width = Math.min(meta.width || maxWidth, maxWidth)

  await img
    .resize(width, undefined, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(tmp)

  const after = statSync(tmp).size
  renameSync(tmp, input)

  const pct = ((1 - after / before) * 100).toFixed(1)
  console.log(`${f}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (-${pct}%)`)
}

console.log("Done!")
