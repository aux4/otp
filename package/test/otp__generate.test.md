# otp generate

## with stored OTP

### should generate a 6-digit code

```beforeAll
aux4 otp import "otpauth://totp/GenTest?secret=JBSWY3DPEHPK3PXP&issuer=GenTest" --file ./test-otp-gen.json
```

```execute
aux4 otp generate GenTest --noCopy true --file ./test-otp-gen.json
```

```expect:regex
^\d{6}$
```

```afterAll
rm -f ./test-otp-gen.json
```

## non-existing OTP

### should fail when OTP does not exist

```file:test-otp-gen-missing.json
{}
```

```execute
aux4 otp generate missing --noCopy true --file ./test-otp-gen-missing.json
```

```error:partial
*does not exist*
```
