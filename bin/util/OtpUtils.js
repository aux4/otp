import { getOtpFilePath, readFile, writeFile } from "./FileUtils.js";
import Otp from "../../index.js";

async function getOtp(params) {
  const file = getOtpFilePath(params.file);
  const content = await readFile(file);

  const name = params.name;
  if (!name) {
    throw new Error("name is required");
  }

  if (!content[name]) {
    throw new Error(`OTP with name ${name} does not exist`);
  }

  const otpUrl = content[name];
  return Otp.parse(otpUrl);
}

async function saveOtp(params, otp) {
  const file = getOtpFilePath(params.file);
  let content;

  try {
    content = await readFile(file);
  } catch (e) {
    content = {};
  }

  const name = params.name;
  if (name) {
    otp.name = name;
  }

  if (content[otp.name]) {
    throw new Error(`OTP ${otp.name} already exists`);
  }

  content[otp.name] = otp.getUrl();
  await writeFile(file, content);
}

export { getOtp, saveOtp };
