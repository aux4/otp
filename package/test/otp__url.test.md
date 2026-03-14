# otp url

## existing OTP

### should display the otpauth URL

```beforeAll
aux4 otp import "otpauth://totp/UrlTest?secret=JBSWY3DPEHPK3PXP&issuer=UrlTest" --file ./test-otp-url.json
```

```execute
aux4 otp url UrlTest --file ./test-otp-url.json
```

```expect:partial
otpauth://totp/UrlTest*secret=JBSWY3DPEHPK3PXP*
```

```afterAll
rm -f ./test-otp-url.json
```

## non-existing OTP

### should fail when OTP does not exist

```file:test-otp-url-missing.json
{}
```

```execute
aux4 otp url missing --file ./test-otp-url-missing.json
```

```error:partial
*does not exist*
```
