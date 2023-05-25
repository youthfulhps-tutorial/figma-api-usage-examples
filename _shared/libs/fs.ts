import fs from "fs";
import path from "path";

export const writeFileSyncRecursive = (filename: string, content = "") => {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, content, "utf-8");
};

export const mkdirSyncRecursive = (directory: string) => {
  fs.mkdirSync(directory, { recursive: true });
};
