const { getOtpFilePath, readFile } = require("../util/FileUtils");

async function listOtpExecutor(params) {
  const file = getOtpFilePath(await params.file);
  const content = await readFile(file);

  const availableOtps = Object.keys(content).sort();
  availableOtps.forEach(otp => console.log(`  - ${otp.yellow}`));
}

module.exports = { listOtpExecutor };
