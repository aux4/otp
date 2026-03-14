import ncp from "copy-paste";
import { getOtp } from "../util/OtpUtils.js";

async function generateOtpExecutor(params) {
  const otp = await getOtp(params);

  const code = otp.generate();
  console.log(code);

  if (params.noCopy === true || params.noCopy === "true") {
    return;
  }

  ncp.copy(code);
}

export { generateOtpExecutor };
