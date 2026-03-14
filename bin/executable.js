#!/usr/bin/env node

import { createOtpExecutor } from "./command/CreateOtpExecutor.js";
import { importOtpExecutor } from "./command/ImportOtpExecutor.js";
import { listOtpExecutor } from "./command/ListOtpExecutor.js";
import { deleteOtpExecutor } from "./command/DeleteOtpExecutor.js";
import { generateOtpExecutor } from "./command/GenerateOtpExecutor.js";
import { verifyOtpExecutor } from "./command/VerifyOtpExecutor.js";
import { otpUrlExecutor } from "./command/OtpUrlExecutor.js";
import { otpQrcodeExecutor } from "./command/OtpQrcodeExecutor.js";

(async () => {
  const args = process.argv.slice(2);
  const [action, ...rest] = args;

  try {
    switch (action) {
      case "create": {
        const [name, issuer, otpSecret, otpInput, algorithm, digits, period, window, file] = rest;
        await createOtpExecutor({ name, issuer, secret: otpSecret, input: otpInput, algorithm, digits, period, window, file });
        break;
      }
      case "import": {
        const [url, name, file] = rest;
        await importOtpExecutor({ url, name, file });
        break;
      }
      case "list": {
        const [file] = rest;
        await listOtpExecutor({ file });
        break;
      }
      case "delete": {
        const [name, file] = rest;
        await deleteOtpExecutor({ name, file });
        break;
      }
      case "url": {
        const [name, file] = rest;
        await otpUrlExecutor({ name, file });
        break;
      }
      case "qrcode": {
        const [name, file, large] = rest;
        await otpQrcodeExecutor({ name, file, large });
        break;
      }
      case "generate": {
        const [name, file, noCopy] = rest;
        await generateOtpExecutor({ name, file, noCopy });
        break;
      }
      case "verify": {
        const [name, file, code] = rest;
        await verifyOtpExecutor({ name, file, otp: code });
        break;
      }
      default:
        console.error(`Unknown action: ${action}`);
        process.exit(1);
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
