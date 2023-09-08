const colors = require("colors");
const { Engine } = require("@aux4/engine");
const { generateOtpExecutor } = require("./command/GenerateOtpExecutor");
const { createOtpExecutor } = require("./command/CreateOtpExecutor");
const { verifyOtpExecutor } = require("./command/VerifyOtpExecutor");
const { deleteOtpExecutor } = require("./command/DeleteOtpExecutor");
const { listOtpExecutor } = require("./command/ListOtpExecutor");
const { otpUrlExecutor } = require("./command/OtpUrlExecutor");
const { otpQrcodeExecutor } = require("./command/OtpQrcodeExecutor");

const config = {
  profiles: [
    {
      name: "main",
      commands: [
        {
          name: "create",
          execute: async params => {
            try {
              await createOtpExecutor(params);
            } catch (e) {
              console.error(e.message.red);
            }
          },
          help: {
            text: "Create OTP",
            variables: [
              {
                name: "name",
                text: "Name of the OTP",
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
                name: "length",
                text: "Length of the OTP",
                default: "6"
              },
              {
                name: "interval",
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
          name: "list",
          execute: async params => {
            try {
              await listOtpExecutor(params);
            } catch (e) {
              console.error(e.message.red);
            }
          },
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
          execute: async params => {
            try {
              await deleteOtpExecutor(params);
            } catch (e) {
              console.error(e.message.red);
            }
          },
          help: {
            text: "Delete OTP from the file",
            variables: [
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
          name: "url",
          execute: async params => {
            try {
              await otpUrlExecutor(params);
            } catch (e) {
              console.error(e.message.red);
            }
          },
          help: {
            text: "Return OTP URL",
            variables: [
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
          name: "qrcode",
          execute: async params => {
            try {
              await otpQrcodeExecutor(params);
            } catch (e) {
              console.error(e.message.red);
            }
          },
          help: {
            text: "Display OTP qrcode",
            variables: [
              {
                name: "name",
                text: "Name of the OTP",
                default: ""
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
          execute: async params => {
            try {
              await generateOtpExecutor(params);
            } catch (e) {
              console.error(e.message.red);
            }
          },
          help: {
            text: "Generate OTP",
            variables: [
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
          name: "verify",
          execute: async params => {
            try {
              await verifyOtpExecutor(params);
            } catch (e) {
              console.error(e.message.red);
            }
          },
          help: {
            text: "Verify OTP",
            variables: [
              {
                name: "name",
                text: "Name of the OTP",
                default: ""
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

(async () => {
  const engine = new Engine({ aux4: config });

  const args = process.argv.splice(2);
  await engine.run(args);
})();
