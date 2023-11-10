const { getOtp } = require("../util/OtpUtils");

async function otpUrlExecutor(params) {
  const otp = await getOtp(params);
  console.log(otp.getUrl());
}

module.exports = { otpUrlExecutor };
