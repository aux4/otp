#### Description

The `url` command outputs the `otpauth://` URL for a stored OTP. This URL contains the full OTP configuration (secret, issuer, algorithm, digits, period) and can be used to export or transfer the OTP to another device or application.

#### Usage

```bash
aux4 otp url <name> [--file <file>]
```

name    Name of the OTP (required, positional)
--file  OTP storage file (default: ~/.aux4.config/otp)

#### Example

```bash
aux4 otp url github
```

```text
otpauth://totp/github?secret=JBSWY3DPEHPK3PXP&issuer=GitHub
```
