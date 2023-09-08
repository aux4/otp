const Otp = require("../..");
const { getOtpFilePath, readFile } = require("../util/FileUtils");

async function otpUrlExecutor(params) {
  const file = getOtpFilePath(await params.file);
  const content = await readFile(file);

  const name = await params.name;

  const options = content[name];
  const otp = new Otp(options);

  console.log(otp.getUrl());
}

module.exports = { otpUrlExecutor };
