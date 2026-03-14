# otp qrcode

## with stored OTP

### should display a QR code

```beforeAll
aux4 otp import "otpauth://totp/QrTest?secret=JBSWY3DPEHPK3PXP&issuer=QrTest" --file ./test-otp-qr.json
```

```execute
aux4 otp qrcode QrTest --file ./test-otp-qr.json
```

```expect:partial
**
```

```afterAll
rm -f ./test-otp-qr.json
```

## non-existing OTP

### should fail when OTP does not exist

```file:test-otp-qr-missing.json
{}
```

```execute
aux4 otp qrcode missing --file ./test-otp-qr-missing.json
```

```error:partial
*does not exist*
```
