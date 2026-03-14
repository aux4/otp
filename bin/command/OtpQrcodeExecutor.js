import qrcode from "qrcode-terminal";
import { getOtp } from "../util/OtpUtils.js";

async function otpQrcodeExecutor(params) {
  const otp = await getOtp(params);

  const large = params.large;

  return new Promise((resolve) => {
    qrcode.generate(otp.getUrl(), { small: large === false || large === "false" }, qrcodeOutput => {
      console.log(qrcodeOutput);
      resolve();
    });
  });
}

export { otpQrcodeExecutor };
