import Otp from "../../index.js";
import { saveOtp } from "../util/OtpUtils.js";

async function createOtpExecutor(params) {
  const otp = new Otp({
    name: params.name,
    issuer: params.issuer,
    algorithm: params.algorithm,
    secret: params.secret,
    input: params.input,
    digits: params.digits,
    period: params.period,
    window: params.window
  });

  await saveOtp(params, otp);
}

export { createOtpExecutor };
