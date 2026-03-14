import Otp from "../../index.js";
import { saveOtp } from "../util/OtpUtils.js";

async function importOtpExecutor(params) {
  const otp = Otp.parse(params.url);
  await saveOtp(params, otp);
}

export { importOtpExecutor };
