import colors from "colors";
import { getOtpFilePath, readFile } from "../util/FileUtils.js";

async function listOtpExecutor(params) {
  const file = getOtpFilePath(params.file);
  let content;

  try {
    content = await readFile(file);
  } catch (e) {
    return;
  }

  const availableOtps = Object.keys(content).sort();
  availableOtps.forEach(otp => console.log(`  - ${otp.yellow}`));
}

export { listOtpExecutor };
