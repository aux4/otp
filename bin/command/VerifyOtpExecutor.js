const { getOtpFilePath, readFile } = require("../util/FileUtils");
const Otp = require("../../index");
const { getOtp } = require("../util/OtpUtils");

async function verifyOtpExecutor(params) {
  const otp = await getOtp(params);

  const valid = otp.verify(await params.otp);
  console.log(valid);

  process.exit(valid ? 0 : 1);
}

module.exports = { verifyOtpExecutor };
