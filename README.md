# @aux4/otp
One time password for aux4

## Install
```bash
$ npm install --global @aux4/otp
```

## Usage

### Create a new OTP
```bash
$ aux4-otp create --name <name>
```

### Generate OTP
```bash
$ aux4-otp generate --name <name>
```

### Verify OTP
```bash
$ aux4-otp verify --name <name>
```

### Get OTP url
```bash
$ aux4-otp url --name <name>
```

### Get OTP qrcode
```bash
$ aux4-otp qrcode --name <name>
```

### List OTPs
```bash
$ aux4-otp list
```

### Delete OTP
```bash
$ aux4-otp delete --name <name>
```