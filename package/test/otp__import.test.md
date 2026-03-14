# otp import

## with valid URL

### should import OTP from otpauth URL

```execute
aux4 otp import "otpauth://totp/TestApp?secret=JBSWY3DPEHPK3PXP&issuer=TestApp" --file ./test-otp-import.json
```

```execute
aux4 otp url TestApp --file ./test-otp-import.json
```

```expect:partial
*secret=JBSWY3DPEHPK3PXP*
```

```afterAll
rm -f ./test-otp-import.json
```

## with name override

### should import OTP with custom name

```execute
aux4 otp import "otpauth://totp/OriginalName?secret=JBSWY3DPEHPK3PXP&issuer=Test" --name custom-name --file ./test-otp-import-name.json
```

```execute
aux4 otp list --file ./test-otp-import-name.json
```

```expect:partial
*custom-name*
```

```afterAll
rm -f ./test-otp-import-name.json
```
