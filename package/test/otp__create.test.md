# otp create

## with name and issuer

### should create a new OTP

```execute
aux4 otp create --name test-otp --issuer "Test Issuer" --file ./test-otp-create.json
```

```execute
aux4 otp list --file ./test-otp-create.json
```

```expect:partial
*test-otp*
```

```afterAll
rm -f ./test-otp-create.json
```

## with explicit secret

### should create OTP with provided secret

```execute
aux4 otp create --name test-secret --issuer "Test" --otpSecret JBSWY3DPEHPK3PXP --file ./test-otp-create-secret.json
```

```execute
aux4 otp url test-secret --file ./test-otp-create-secret.json
```

```expect:partial
*secret=JBSWY3DPEHPK3PXP*
```

```afterAll
rm -f ./test-otp-create-secret.json
```

## duplicate name

### should fail when OTP already exists

```beforeAll
aux4 otp create --name duplicate-otp --issuer "Test" --file ./test-otp-create-dup.json
```

```execute
aux4 otp create --name duplicate-otp --issuer "Test" --file ./test-otp-create-dup.json
```

```error:partial
*already exists*
```

```afterAll
rm -f ./test-otp-create-dup.json
```
