#### Description

The `create` command creates a new TOTP entry and stores it in the OTP file. If no `--otpSecret` is provided, a random secret is generated automatically. The secret is encoded in Base32 format. You can optionally provide an `--otpInput` string that is appended to the random seed before encoding.

The OTP is stored using its name as the key. If an OTP with the same name already exists, the command will fail.

#### Usage

```bash
aux4 otp create --name <name> --issuer <issuer> [--otpSecret <secret>] [--otpInput <input>] [--algorithm <algorithm>] [--digits <digits>] [--period <period>] [--window <window>] [--file <file>]
```

--name        Name of the OTP
--issuer      Issuer of the OTP (e.g., service name)
--otpSecret   Base32-encoded secret (auto-generated if not provided)
--otpInput    Input string to include in secret generation
--algorithm  HMAC algorithm (default: SHA1)
--digits     Length of the OTP code (default: 6)
--period     Time interval in seconds (default: 30)
--window     Verification window tolerance (default: 0)
--file       OTP storage file (default: ~/.aux4.config/otp)

#### Example

```bash
aux4 otp create --name github --issuer "GitHub"
```

```bash
aux4 otp create --name aws --issuer "AWS" --otpSecret JBSWY3DPEHPK3PXP --digits 6 --period 30
```
