# otp list

## with stored OTPs

### should list all OTP names sorted

```beforeAll
aux4 otp create --name bravo --issuer "B" --file ./test-otp-list.json
aux4 otp create --name alpha --issuer "A" --file ./test-otp-list.json
aux4 otp create --name charlie --issuer "C" --file ./test-otp-list.json
```

```execute
aux4 otp list --file ./test-otp-list.json
```

```expect:partial
*alpha*
*bravo*
*charlie*
```

```afterAll
rm -f ./test-otp-list.json
```

## with no OTPs

### should output nothing when file does not exist

```execute
aux4 otp list --file ./test-otp-list-empty.json
```

```expect
```
