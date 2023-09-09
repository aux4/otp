const { getOtpFilePath, readFile } = require("../util/FileUtils");
const Otp = require("../../index");
const qrcode = require("qrcode-terminal");
const { getOtp } = require("../util/OtpUtils");

async function otpQrcodeExecutor(params) {
  const otp = await getOtp(params);

  const large = await params.large;

  qrcode.generate(otp.getUrl(), { small: large === false || large === "false" }, qrcode => {
    console.log(qrcode);
  });
}

module.exports = { otpQrcodeExecutor };
