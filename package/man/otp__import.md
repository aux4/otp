#### Description

The `import` command imports an OTP from a standard `otpauth://totp/...` URL. The URL contains the secret, issuer, algorithm, digits, and period. Optionally, you can override the name extracted from the URL using the `--name` flag.

If an OTP with the same name already exists in the storage file, the command will fail.

#### Usage

```bash
aux4 otp import <url> [--name <name>] [--file <file>]
```

url     The otpauth URL to import (required, positional)
--name  Override the name from the URL
--file  OTP storage file (default: ~/.aux4.config/otp)

#### Example

```bash
aux4 otp import "otpauth://totp/GitHub:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=GitHub"
```

```bash
aux4 otp import "otpauth://totp/MyService?secret=JBSWY3DPEHPK3PXP&issuer=MyService" --name myservice
```
