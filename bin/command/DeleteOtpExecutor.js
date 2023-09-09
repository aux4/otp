const { getOtpFilePath, readFile, writeFile } = require("../util/FileUtils");

async function deleteOtpExecutor(params) {
  const file = getOtpFilePath(await params.file);
  const content = await readFile(file);

  const name = await params.name;
  if (!name) {
    throw new Error("name is required");
  }

  if (!content[name]) {
    throw new Error(`OTP with name ${name} does not exist`);
  }

  delete content[name];
  await writeFile(file, content);
}

module.exports = { deleteOtpExecutor };
