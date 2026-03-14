# aux4/otp

One-time password (OTP/TOTP) manager for aux4. Create, store, generate, and verify time-based one-time passwords following RFC 6238. OTPs are stored locally in a JSON file and can be imported/exported via standard `otpauth://` URLs.

## Installation

```bash
aux4 aux4 pkger install aux4/otp
```

## Quick Start

```bash
# Create a new OTP
aux4 otp create --name myapp --issuer "My App"

# Generate a code
aux4 otp generate myapp

# Verify a code
aux4 otp verify --name myapp --code 123456
```

## Commands

### Create a new OTP

```bash
aux4 otp create --name <name> --issuer <issuer> [--otpSecret <secret>] [--algorithm <algorithm>] [--digits <digits>] [--period <period>]
```

Creates a new TOTP entry. If no secret is provided, one is generated automatically.

### Import from URL

```bash
aux4 otp import <otpauth-url> [--name <name>]
```

Imports an OTP from a standard `otpauth://totp/...` URL. Optionally override the name.

### Generate a code

```bash
aux4 otp generate <name> [--noCopy true]
```

Generates the current TOTP code and copies it to the clipboard. Use `--noCopy true` to skip the clipboard copy.

### Verify a code

```bash
aux4 otp verify --name <name> --code <code>
```

Verifies a TOTP code. Succeeds if valid, fails with an error if invalid.

### Get OTP URL

```bash
aux4 otp url <name>
```

Outputs the `otpauth://` URL for the named OTP. Useful for exporting or sharing.

### Display QR code

```bash
aux4 otp qrcode <name> [--large true]
```

Displays a QR code in the terminal for the named OTP. Use `--large true` for a larger QR code.

### List all OTPs

```bash
aux4 otp list
```

Lists all stored OTP names.

### Delete an OTP

```bash
aux4 otp delete <name>
```

Deletes the named OTP from the storage file.

## Storage

OTPs are stored in `~/.aux4.config/otp` by default. Use the `--file` flag on any command to specify a different location. The file contains a JSON object mapping OTP names to their `otpauth://` URLs.

## TOTP Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `algorithm` | `SHA1` | HMAC algorithm |
| `digits` | `6` | Length of generated code |
| `period` | `30` | Time interval in seconds |
| `window` | `0` | Verification window tolerance |
