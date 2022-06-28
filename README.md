# **sMask**
## A Vanilla JS Mask

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
## Pattern format
#### Single pattern
```
smask.mask("123456", ["ddd.ddd"]);
// "123.456"
```
#### Multiple patterns
```
smask.mask("123456789", ["ddd.ddd", "ddd.ddd.ddd"]);
// "123.456.789"
```
#### Unmask pattern
```
smask.unmask("123.456", "ddd.ddd");
// "123456"
```
<br/>

## Number format

#### Get masked number from current locale
```
smask.number(1234.56);
// "1,234.56" if in US English locale
```
#### Get masked number by passing locale
```
smask.number(1234.56, "en-US");
// "1,234.56"
```
#### Get unmasked number by passing locale
```
smask.numberUnformat("1,234.56", "en-US");
// "1234.56"
```
<br/>

## Currency format
#### Get masked currency from current locale and currency code
```
smask.currency(1234.56);
// "$1,234.56" if in US English locale
```
#### Get masked currency by passing locale and current currency code
```
smask.currency(1234.56, "en-US");
// "$1,234.56"
```
#### Get masked currency by passing the locale and currency code.
```
smask.currency(1234.56, "en-US", "USD");
// "$1,234.56"
```
#### Get unformatted currency by passing locale and currency code
```
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
smask.input(document.getElementById("letters"), ["aaa"]);
```
### Letters Uppercase
```
smask.input(document.getElementById("lettersUpper"), ["AAA"]);
```
### Alphanumeric
```
smask.input(document.getElementById("alphanum"), ["www"]);
```
### Alphanumeric Uppercase
```
smask.input(document.getElementById("alphanumUpper"), ["WWW"]);
```
### Date
```
smask.input(document.getElementById("date"), ["date"]);
```
### Price
```
smask.input(document.getElementById("price"), ["price"]);
```

### Single pattern
```
smask.input(document.getElementById("phone"), ["(dd) ddddd-dddd"]);
```

### Multiple patterns
```
smask.input(document.getElementById("phoneOrCellphone"), ["(dd) dddd-dddd", "(dd) ddddd-dddd"]);
```
