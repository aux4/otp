#### Description

The `delete` command removes an OTP entry from the storage file by name. If the named OTP does not exist, the command will fail with an error.

#### Usage

```bash
aux4 otp delete <name> [--file <file>]
```

name    Name of the OTP to delete (required, positional)
--file  OTP storage file (default: ~/.aux4.config/otp)

#### Example

```bash
aux4 otp delete github
```
