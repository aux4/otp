const { getOtpFilePath, readFile } = require("../util/FileUtils");
const Otp = require("../../index");
const qrcode = require("qrcode-terminal");

async function otpQrcodeExecutor(params) {
  const file = getOtpFilePath(await params.file);
  const content = await readFile(file);

  const name = await params.name;
  const large = await params.large;

  const options = content[name];
  const otp = new Otp(options);

  qrcode.generate(otp.getUrl(), { small: large === false || large === "false" }, qrcode => {
    console.log(qrcode);
  });
}

module.exports = { otpQrcodeExecutor };
