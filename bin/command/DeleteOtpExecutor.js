import { getOtpFilePath, readFile, writeFile } from "../util/FileUtils.js";

async function deleteOtpExecutor(params) {
  const file = getOtpFilePath(params.file);
  const content = await readFile(file);

  const name = params.name;
  if (!name) {
    throw new Error("name is required");
  }

  if (!content[name]) {
    throw new Error(`OTP with name ${name} does not exist`);
  }

  delete content[name];
  await writeFile(file, content);
}

export { deleteOtpExecutor };
