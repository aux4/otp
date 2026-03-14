import { getOtp } from "../util/OtpUtils.js";

async function verifyOtpExecutor(params) {
  const otp = await getOtp(params);

  const valid = otp.verify(params.otp);
  console.log(valid);

  if (!valid) {
    throw new Error("invalid OTP");
  }
}

export { verifyOtpExecutor };
