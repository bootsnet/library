# Bootsnet Ajax JS
Bootsnet Ajax JS is a pure ajax javascript libary to handle ajax and find out more.

## Demo usage

```js
let myAjax = new Ajax({
  method: 'GET',
  url: 'https://en.wikipedia.org/api/rest_v1/page/summary/dhaka',
  data: null,
  section: 'text',
}).onload({
  success: function (data) {
  console.log(data);
},
error: function(status, data) {
  console.error(status+"!! ",data);
}
});
```

## Feature

* Handle CORS with cookie (withCredentials) (IE 10+).
* Handle IE8 CORS (XDomainRequest).
* Handle response XML format.
* Not handle IE8 IE9 CORS with cookie (Native browser not support).
* Supports set header.
* If you want to check ajax in server side, you can use code like `xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');`

## Supports

* Chrome
* Firefox
* Safari
* IE8+
* Microsoft Edge

## Documentation

|key|type|required|value|description|example|
|---|---|---|---|---|---|
|method|string|required|'POST', 'GET', 'DELETE', 'PUT', 'OPTION', 'PATH'| http request method|'GET'|
|url|string|required|'url'|url you request|'test.php'|
|data|object|no|{user: 'ted', age: '12'}|the arguments want request|{user: 'ted', age: '12'}|
|withCredentials|boolean|no|true, false|cross domain request with cookie, use it|true|
|setRequestHeader|object|no|{'X-Requested-With': 'XMLHttpRequest'}|ajax with custom header|{'X-Requested-With': 'XMLHttpRequest','X-Token': 'HAHA'}|
|section|string|no|'json', 'xml'|section type is JSON or XML or text or none, default no set is full|'xml'|
|onload|event object|required|success, error|controls event|onload: { // events }
|success|function|required|function(data) {console.log(data);}|handle response success|function(data) {console.log(data);}|
|error|function|required|function(data) {console.log(data);}|handle response error|function(data) {console.log(data);}|

## Credits

* Bootsnet Ajax JS by : bootsnet inc.
* Created on : 29 Dec 2020.
* All version: (1.0 Latest).
* Copyright &copy; 2020 by us.
* licensed under Apache 2.0

## Thanks
