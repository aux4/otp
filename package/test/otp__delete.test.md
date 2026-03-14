# otp delete

## existing OTP

### should delete the OTP

```beforeAll
aux4 otp create --name to-delete --issuer "Test" --file ./test-otp-delete.json
aux4 otp create --name to-keep --issuer "Test" --file ./test-otp-delete.json
```

```execute
aux4 otp delete to-delete --file ./test-otp-delete.json
```

```execute
aux4 otp list --file ./test-otp-delete.json
```

```expect:partial
*to-keep*
```

```afterAll
rm -f ./test-otp-delete.json
```

## non-existing OTP

### should fail when OTP does not exist

```beforeAll
aux4 otp create --name keep-me --issuer "Test" --file ./test-otp-delete-missing.json
```

```execute
aux4 otp delete non-existing --file ./test-otp-delete-missing.json
```

```error:partial
*does not exist*
```

```afterAll
rm -f ./test-otp-delete-missing.json
```
