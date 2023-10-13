const { getOtpFilePath, readFile, writeFile } = require("./FileUtils");
const Otp = require("../../index");

async function getOtp(params) {
  const file = getOtpFilePath(await params.file);
  const content = await readFile(file);

  const name = await params.name;
  if (!name) {
    throw new Error("name is required");
  }

  if (!content[name]) {
    throw new Error(`OTP with name ${name} does not exist`);
  }

  const otpUrl = content[name];
  return Otp.parse(otpUrl);
}

async function saveOpt(params, otp) {
  const file = getOtpFilePath(await params.file);
  let content;

  try {
    content = await readFile(file);
  } catch (e) {
    content = {};
  }

  const name = await params.name;
  if (name) {
    otp.name = name;
  }

  if (content[otp.name]) {
    throw new Error(`OTP ${otp.name} already exists`);
  }

  content[otp.name] = otp.getUrl();
  await writeFile(file, content);
}

module.exports = { getOtp, saveOpt };
