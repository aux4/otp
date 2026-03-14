#### Description

The `qrcode` command renders a QR code in the terminal for a stored OTP. The QR code encodes the `otpauth://` URL, which can be scanned by authenticator apps. By default, a compact QR code is generated. Use `--large true` for a larger, more readable QR code.

#### Usage

```bash
aux4 otp qrcode <name> [--large <true|false>] [--file <file>]
```

name     Name of the OTP (required, positional)
--large  Generate a large QR code (default: false)
--file   OTP storage file (default: ~/.aux4.config/otp)

#### Example

```bash
aux4 otp qrcode github
```

```bash
aux4 otp qrcode github --large true
```
