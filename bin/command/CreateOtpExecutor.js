const Otp = require("../..");
const { saveOpt } = require("../util/OtpUtils");

async function createOtpExecutor(params) {
  const otp = new Otp({
    name: await params.name,
    issuer: await params.issuer,
    algorithm: await params.algorithm,
    secret: await params.secret,
    input: await params.input,
    digits: await params.digits,
    period: await params.period,
    window: await params.window
  });

  await saveOpt(params, otp);
}

module.exports = { createOtpExecutor };
