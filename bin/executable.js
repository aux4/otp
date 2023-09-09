#!/usr/bin/env node

const colors = require("colors");
const { Engine } = require("@aux4/engine");
const { generateOtpExecutor } = require("./command/GenerateOtpExecutor");
const { createOtpExecutor } = require("./command/CreateOtpExecutor");
const { verifyOtpExecutor } = require("./command/VerifyOtpExecutor");
const { deleteOtpExecutor } = require("./command/DeleteOtpExecutor");
const { listOtpExecutor } = require("./command/ListOtpExecutor");
const { otpUrlExecutor } = require("./command/OtpUrlExecutor");
const { otpQrcodeExecutor } = require("./command/OtpQrcodeExecutor");
const { importOtpExecutor } = require("./command/ImportOtpExecutor");

const config = {
  profiles: [
    {
      name: "main",
      commands: [
        {
          name: "create",
          execute: execute(createOtpExecutor),
          help: {
            text: "Create OTP",
            variables: [
              {
                name: "name",
                text: "Name of the OTP",
                default: ""
              },
              {
                name: "issuer",
                text: "Issuer of the OTP",
                default: ""
              },
              {
                name: "secret",
                text: "Secret of the OTP",
                default: ""
              },
              {
                name: "input",
                text: "Input of the OTP",
                default: ""
              },
              {
                name: "algorithm",
                text: "Secret algorithm of the OTP",
                default: "SHA1"
              },
              {
                name: "digits",
                text: "Length of the OTP",
                default: "6"
              },
              {
                name: "period",
                text: "Interval of the OTP",
                default: "30"
              },
              {
                name: "window",
                text: "Window of the OTP",
                default: "0"
              },
              {
                name: "file",
                text: "OTP file",
                default: "~/.aux4.config/otp"
              }
            ]
          }
        },
        {
          name: "import",
          execute: execute(importOtpExecutor),
          help: {
            text: "Import OTP from url",
            variables: [
              {
                name: "url",
                text: "OTP url"
              },
              {
                name: "name",
                text: "Name of the OTP",
                default: ""
              },
              {
                name: "file",
                text: "OTP file",
                default: "~/.aux4.config/otp"
              }
            ]
          }
        },
        {
          name: "list",
          execute: execute(listOtpExecutor),
          help: {
            text: "List OTPs from the file",
            variables: [
              {
                name: "file",
                text: "OTP file",
                default: "~/.aux4.config/otp"
              }
            ]
          }
        },
        {
          name: "delete",
          execute: execute(deleteOtpExecutor),
          help: {
            text: "Delete OTP from the file",
            variables: [
              {
                name: "name",
                text: "Name of the OTP"
              },
              {
                name: "file",
                text: "OTP file",
                default: "~/.aux4.config/otp"
              }
            ]
          }
        },
        {
          name: "url",
          execute: execute(otpUrlExecutor),
          help: {
            text: "Return OTP URL",
            variables: [
              {
                name: "name",
                text: "Name of the OTP"
              },
              {
                name: "file",
                text: "OTP file",
                default: "~/.aux4.config/otp"
              }
            ]
          }
        },
        {
          name: "qrcode",
          execute: execute(otpQrcodeExecutor),
          help: {
            text: "Display OTP qrcode",
            variables: [
              {
                name: "name",
                text: "Name of the OTP"
              },
              {
                name: "file",
                text: "OTP file",
                default: "~/.aux4.config/otp"
              },
              {
                name: "large",
                text: "Generate large qrcode",
                default: "false"
              }
            ]
          }
        },
        {
          name: "generate",
          execute: execute(generateOtpExecutor),
          help: {
            text: "Generate OTP",
            variables: [
              {
                name: "name",
                text: "Name of the OTP"
              },
              {
                name: "file",
                text: "OTP file",
                default: "~/.aux4.config/otp"
              },
              {
                name: "no-copy",
                text: "Do not copy to clipboard",
                default: "false"
              }
            ]
          }
        },
        {
          name: "verify",
          execute: execute(verifyOtpExecutor),
          help: {
            text: "Verify OTP",
            variables: [
              {
                name: "name",
                text: "Name of the OTP"
              },
              {
                name: "file",
                text: "OTP file",
                default: "~/.aux4.config/otp"
              },
              {
                name: "otp",
                text: "OTP"
              }
            ]
          }
        }
      ]
    }
  ]
};

function execute(action) {
  return async params => {
    try {
      await action(params);
    } catch (e) {
      console.error(e.message.red, e);
    }
  };
}

(async () => {
  const engine = new Engine({ aux4: config });

  const args = process.argv.splice(2);
  await engine.run(args);
})();
