const { getOtpFilePath, readFile } = require("../util/FileUtils");
const Otp = require("../../index");

async function generateOtpExecutor(params) {
  const file = getOtpFilePath(await params.file);
  const content = await readFile(file);

  const name = await params.name;

  const options = content[name];
  const otp = new Otp(options);

  console.log(otp.generate());
}

module.exports = { generateOtpExecutor };
