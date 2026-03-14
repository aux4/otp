#### Description

The `otp` command group manages time-based one-time passwords (TOTP). It provides commands to create, import, generate, verify, list, and delete OTPs. All OTPs are stored locally in a JSON file and follow the RFC 6238 standard.

Available subcommands:

- **create** — Create a new OTP entry
- **import** — Import an OTP from an otpauth URL
- **generate** — Generate the current OTP code
- **verify** — Verify an OTP code
- **url** — Display the otpauth URL
- **qrcode** — Display a QR code in the terminal
- **list** — List all stored OTPs
- **delete** — Delete an OTP entry

#### Usage

```bash
aux4 otp <command> [options]
```

#### Example

```bash
aux4 otp create --name myapp --issuer "My App"
aux4 otp generate myapp
```
