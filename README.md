# docx-stream-template
Simple stream template engine for create docx files in NodeJS

## Install

```
npm i --save docx-stream-template
```

## Use
Add to your docx file constructions like that:
```
Hello dear {{anotherBoringVariableName}}!
Good bye!
```
Then just call template function:
```javascript
const template = require('docx-stream-template');

template({
  anotherBoringVariableName: 'Bulochka',
}, fs.createReadStream(path.join(__dirname, './test.docx'))).
pipe(fs.createWriteStream(path.join(__dirname, './donetest.docx')));
```
The first parameter of template function is object with variables, what you can use in the docx file.

Thats all!
