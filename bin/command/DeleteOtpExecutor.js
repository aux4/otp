const { getOtpFilePath, readFile, writeFile } = require("../util/FileUtils");

async function deleteOtpExecutor(params) {
  const file = getOtpFilePath(await params.file);
  const content = await readFile(file);

  const name = await params.name;

  delete content[name];
  await writeFile(file, content);
}

module.exports = { deleteOtpExecutor };
