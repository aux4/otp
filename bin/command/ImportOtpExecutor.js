const Otp = require("../..");
const { saveOpt } = require("../util/OtpUtils");
async function importOtpExecutor(params) {
  const otp = Otp.parse(await params.url);
  await saveOpt(params, otp);
}

module.exports = { importOtpExecutor };
