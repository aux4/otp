import path from "path";
import os from "os";
import fs from "fs";
import fsp from "fs/promises";
import FileNotFoundError from "../error/FileNotFoundError.js";
import InvalidFileError from "../error/InvalidFileError.js";

function getOtpFilePath(filePath) {
  if (filePath.startsWith("~/")) {
    return path.join(os.homedir(), filePath.slice(2));
  }
  return filePath;
}

async function writeFile(filePath, content) {
  const directory = path.dirname(filePath);
  const exists = fs.existsSync(directory);
  if (!exists) {
    await fsp.mkdir(directory, { recursive: true });
  }

  await fsp.writeFile(filePath, JSON.stringify(content), { encoding: "utf8", mode: 0o600 });
}

async function readFile(filePath) {
  const exists = fs.existsSync(filePath);
  if (!exists) {
    throw new FileNotFoundError(filePath);
  }

  const file = await fsp.readFile(filePath, { encoding: "utf8" });

  try {
    return JSON.parse(file);
  } catch (e) {
    throw new InvalidFileError(filePath);
  }
}

export { getOtpFilePath, writeFile, readFile };
