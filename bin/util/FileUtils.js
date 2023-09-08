const path = require("path");
const os = require("os");
const fs = require("fs");
const fsp = require("fs/promises");
const FileNotFoundError = require("../error/FileNotFoundError");
const InvalidFileError = require("../error/InvalidFileError");

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

  await fsp.writeFile(filePath, JSON.stringify(content), { encoding: "utf8" });
}

async function readFile(path) {
  const exists = fs.existsSync(path);
  if (!exists) {
    throw new FileNotFoundError(path);
  }

  const file = await fsp.readFile(path, { encoding: "utf8" });

  try {
    return JSON.parse(file);
  } catch (e) {
    throw new InvalidFileError(path);
  }
}

module.exports = { getOtpFilePath, writeFile, readFile };
