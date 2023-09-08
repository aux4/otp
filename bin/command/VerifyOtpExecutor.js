const { getOtpFilePath, readFile } = require("../util/FileUtils");
const Otp = require("../../index");

async function verifyOtpExecutor(params) {
  const file = getOtpFilePath(await params.file);
  const content = await readFile(file);

  const name = await params.name;

  const options = content[name];
  const otp = new Otp(options);

  const valid = otp.verify(await params.otp);
  console.log(valid);

  process.exit(valid ? 0 : 1);
}

module.exports = { verifyOtpExecutor };
