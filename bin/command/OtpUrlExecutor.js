import { getOtp } from "../util/OtpUtils.js";

async function otpUrlExecutor(params) {
  const otp = await getOtp(params);
  console.log(otp.getUrl());
}

export { otpUrlExecutor };
