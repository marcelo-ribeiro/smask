# **sMask**
## A Vanilla JS Mask
<br/>

> Documentation and tests in development.

<br/>

## Install
```
npm i smask
```
<br/>

## Usage
```
import smask from "smask";
```
<br/>

# Masking values
### Single pattern
```
smask.mask("123456", ["ddd.ddd"]);
// "123.456"

smask.unmask("123.456", "ddd.ddd");
// "123456"
```
### Multiple patterns
```
smask.mask("123456789", ["ddd.ddd", "ddd.ddd.ddd"]);
// "123.456.789"
```
### Number format
```
smask.number(1234.56, "en-US");
// "1,234.56"

smask.numberUnformat("1,234.56", "en-US");
// "1234.56"
```
### Currency format
```
smask.currency(1234.56, "en-US", "USD");
// "$1,234.56"

smask.currencyUnformat("$1,234.56", "en-US", "USD");
// 1234.56
```
<br/>

# Masking Inputs
### Numbers
```
smask.input(document.getElementById("phone"), ["ddd"]);
```
### Letters
```
smask.input(document.getElementById("phone"), ["aaa"]);
```
### Letters Uppercase
```
smask.input(document.getElementById("phone"), ["AAA"]);
```
### Alphanumeric
```
smask.input(document.getElementById("phone"), ["www"]);
```
### Alphanumeric Uppercase
```
smask.input(document.getElementById("phone"), ["WWW"]);
```
### Date
```
smask.input(document.getElementById("phone"), ["date"]);
```
### Price
```
smask.input(document.getElementById("phone"), ["price"]);
```

### Single pattern
```
smask.input(document.getElementById("phone"), ["(dd) ddddd-dddd"]);
```

### Multiple patterns
```
smask.input(document.getElementById("phone"), ["(dd) dddd-dddd", "(dd) ddddd-dddd"]);
```
