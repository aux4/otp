const crypto = require("crypto");
const base32 = require("hi-base32");

class Otp {
  constructor(options) {
    this.options = { ...options };
    this.options.name = `${options.name || "OTP-Authentication"}`.split(/[^\w|_@]/).join("");
    this.options.algorithm = options.algorithm || "sha1";
    this.options.keySize = options.keySize === 128 ? 128 : 64;
    this.options.length = isNaN(options.length) ? 6 : options.length;
    this.options.secret = options.secret || this.generateSecret(this.options.keySize, this.options.input);
    this.options.epoch = isNaN(options.epoch) ? 0 : options.epoch;
    this.options.interval = isNaN(options.interval) ? 30 : options.interval;
    this.options.window = isNaN(options.window) ? 0 : options.window;

    if (!isValidSecret(this.options.secret)) {
      throw new Error("Invalid secret");
    }
  }

  getUrl() {
    return `otpauth://totp/${encodeURIComponent(this.options.name)}?secret=${encodeURIComponent(this.options.secret)}`;
  }

  generate() {
    const currentTime = Date.now();
    const counter = BigInt(Math.floor(currentTime / 1000 / this.options.interval));
    return generateTOTP(counter, this.options.secret, this.options.algorithm, this.options.length);
  }

  verify(code) {
    return verifyTOTP(
      code,
      this.options.counter,
      this.options.secret,
      this.options.algorithm,
      this.options.length,
      this.options.interval,
      this.options.window
    );
  }

  generateSecret(keySize, input) {
    let secret = crypto.randomBytes(10).toString("base64");
    if (input) {
      secret += input;
    }
    return base32.encode(secret);
  }
}

function generateTOTP(counter, secret, algorithm, length) {
  const key = base32.decode(secret);
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64BE(counter);
  const hmac = crypto.createHmac(algorithm, key);
  hmac.update(buffer);
  const digest = hmac.digest();
  const offset = digest[digest.length - 1] & 0xf;
  const binaryCode =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);
  return binaryCode % 10 ** length;
}

function verifyTOTP(inputOTP, counter, secret, algorithm, length, interval, window) {
  if (typeof inputOTP !== "string" || !/^\d+$/.test(inputOTP)) {
    throw new TypeError("Invalid input OTP format");
  }

  const currentTime = Date.now();
  const currentCounter = BigInt(Math.floor(currentTime / 1000 / interval));
  for (let i = -window; i <= window; i++) {
    const counter = currentCounter + BigInt(i);
    const otp = generateTOTP(counter, secret, algorithm, length);
    if (parseInt(inputOTP, 10) === otp) {
      return true;
    }
  }
  return false;
}

function isValidSecret(secret) {
  return /^[A-Z2-7]+=*$/.test(secret);
}

module.exports = Otp;
