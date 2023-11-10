const crypto = require("crypto");
const base32 = require("thirty-two");

class Otp {
  constructor(options) {
    this.options = { ...options };
    this.options.name = (options.name || options.issuer || "otp").replace(/\s/, "");
    this.options.issuer = options.issuer;
    this.options.algorithm = options.algorithm || "sha1";
    this.options.secret = options.secret || this.generateSecret(this.options.input);
    this.options.digits = isNaN(options.digits) ? 6 : options.digits;
    this.options.epoch = isNaN(options.epoch) ? 0 : options.epoch;
    this.options.period = isNaN(options.period) ? 30 : options.period;
    this.options.window = isNaN(options.window) ? 0 : options.window;

    this.name = this.options.name;

    if (!isValidSecret(this.options.secret)) {
      throw new Error("Invalid secret");
    }
  }

  getUrl() {
    const url = new URL(`otpauth://totp/${this.options.name}`);
    url.searchParams.set("secret", this.options.secret);
    url.searchParams.set("issuer", this.options.issuer);

    if (this.options.algorithm !== "sha1") {
      url.searchParams.set("algorithm", this.options.algorithm);
    }

    if (this.options.digits !== 6) {
      url.searchParams.set("digits", this.options.digits);
    }

    if (this.options.period !== 30) {
      url.searchParams.set("period", this.options.period);
    }

    return url.toString();
  }

  generate() {
    const currentTime = Date.now();
    const counter = BigInt(Math.floor(currentTime / 1000 / this.options.period));
    return generateTOTP(counter, this.options.secret, this.options.algorithm, this.options.digits);
  }

  verify(code) {
    return verifyTOTP(
      code,
      this.options.counter,
      this.options.secret,
      this.options.algorithm,
      this.options.digits,
      this.options.period,
      this.options.window
    );
  }

  generateSecret(input) {
    let secret = crypto.randomBytes(10).toString("base64");
    if (input) {
      secret += input;
    }
    return base32.encode(secret).toString("utf-8");
  }

  static parse(url) {
    const urlObj = new URL(url);

    if (urlObj.protocol !== "otpauth:") {
      throw new Error("Invalid URL format 1");
    }

    const name = urlObj.pathname.substring(1);
    const issuer = urlObj.searchParams.get("issuer");
    const algorithm = urlObj.searchParams.get("algorithm") || "sha1";
    const secret = urlObj.searchParams.get("secret");
    const digits = urlObj.searchParams.get("digits") || 6;
    const period = urlObj.searchParams.get("period") || 30;

    return new Otp({ name, issuer, algorithm, secret, digits, period });
  }
}

function generateTOTP(counter, secret, algorithm, digits) {
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
  return leftPad(binaryCode % 10 ** digits);
}

function verifyTOTP(inputOTP, counter, secret, algorithm, digits, period, window) {
  if (typeof inputOTP !== "string" || !/^\d+$/.test(inputOTP)) {
    throw new TypeError("Invalid input OTP format");
  }

  const currentTime = Date.now();
  const currentCounter = BigInt(Math.floor(currentTime / 1000 / period));
  for (let i = -window; i <= window; i++) {
    const counter = currentCounter + BigInt(i);
    const otp = generateTOTP(counter, secret, algorithm, digits);
    if (leftPad(parseInt(inputOTP, 10)) === otp) {
      return true;
    }
  }
  return false;
}

function isValidSecret(secret) {
  return /^[A-Z2-7]+=*$/.test(secret);
}

function leftPad(value, length) {
  const stringValue = `${value}`;
  return "0".repeat(length - stringValue.length) + stringValue;
}

module.exports = Otp;
