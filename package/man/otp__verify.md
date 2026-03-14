#### Description

The `verify` command checks whether a given OTP code is valid for a stored OTP. If the code is valid, the command succeeds silently. If the code is invalid, the command fails with an error, making it suitable for use in scripts and conditional logic.

The verification uses the configured time window tolerance. With window `0` (default), only the current time step is accepted. A larger window allows codes from adjacent time steps.

#### Usage

```bash
aux4 otp verify --name <name> --code <code> [--file <file>]
```

--name  Name of the OTP (required)
--code  The OTP code to verify (required)
--file  OTP storage file (default: ~/.aux4.config/otp)

#### Example

```bash
aux4 otp verify --name github --code 482901
```

The command succeeds with no output if the code is valid.

```bash
aux4 otp verify --name github --code 000000
```

The command fails with an error if the code is invalid.
