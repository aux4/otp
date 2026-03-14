# otp verify

## with invalid code

### should fail for wrong code

```beforeAll
aux4 otp import "otpauth://totp/VerifyTest?secret=JBSWY3DPEHPK3PXP&issuer=VerifyTest" --file ./test-otp-verify.json
```

```execute
aux4 otp verify --name VerifyTest --code 000000 --file ./test-otp-verify.json
```

```error:partial
*invalid OTP*
```

```afterAll
rm -f ./test-otp-verify.json
```

## non-existing OTP

### should fail when OTP does not exist

```file:test-otp-verify-missing.json
{}
```

```execute
aux4 otp verify --name missing --code 123456 --file ./test-otp-verify-missing.json
```

```error:partial
*does not exist*
```
