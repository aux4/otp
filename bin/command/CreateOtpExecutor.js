const Otp = require("../..");
const { readFile, writeFile, getOtpFilePath } = require("../util/FileUtils");
async function createOtpExecutor(params) {
  const otp = new Otp({
    name: await params.name,
    secret: await params.secret,
    input: await params.input,
    length: await params.length,
    interval: await params.interval,
    window: await params.window
  });

  const options = { ...otp.options };
  delete options.input;

  const file = getOtpFilePath(await params.file);
  let content;

  try {
    content = await readFile(file);
  } catch (e) {
    content = {};
  }

  if (content[options.name]) {
    throw new Error(`OTP ${options.name} already exists`);
  }

  content[options.name] = options;
  await writeFile(file, content);
}

module.exports = { createOtpExecutor };
