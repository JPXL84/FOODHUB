import fs from "fs";
import path from "path";

export function writeJson<T>(fileName: string, data: T): void {
  const filePath = path.join(__dirname, "..", "data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
