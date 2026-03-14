#### Description

The `generate` command creates a TOTP code for a stored OTP using the current time. The code is printed to stdout and automatically copied to the clipboard. Use `--noCopy true` to skip the clipboard copy.

The generated code is valid for the OTP's configured time period (default: 30 seconds).

#### Usage

```bash
aux4 otp generate <name> [--noCopy <true|false>] [--file <file>]
```

name      Name of the OTP (required, positional)
--noCopy  Do not copy the code to clipboard (default: false)
--file    OTP storage file (default: ~/.aux4.config/otp)

#### Example

```bash
aux4 otp generate github
```

```text
482901
```

```bash
aux4 otp generate github --noCopy true
```
