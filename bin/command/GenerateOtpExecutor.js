const ncp = require("copy-paste");
const { getOtp } = require("../util/OtpUtils");

async function generateOtpExecutor(params) {
  const otp = await getOtp(params);

  const code = otp.generate();
  console.log(code);

  const noCopy = await params["no-copy"];
  if (noCopy === true || noCopy === "true") {
    return;
  }

  ncp.copy(code);
}

module.exports = { generateOtpExecutor };
