Easy way to add intenal links to existing PDF


## Instructions

* [GetStarted](#getstarted)

## GetStarted

```bash
npm i hummus-recipe --save
```

## Usage

```javascript
const link = require('pdfinternallink');
const inFile = './input.pdf'
const outFile = './output.pdf'
const onPage = 5
const toPage = 10
const x1 = 10
const y1 = 20
const x2 = 55
const y2 = 50

const options = {
  color : 'blue'
}
link(inFile, outFile, linkText, onPage, toPage, x1, y1, x2, y2, options)
})
```

## Parameters 
 inFile - Path to the input file.
 outFile - Path to the output file.
 linkText - Text for the link
 onPage - Page on which link will appear.
 toPage - Page to which link will take
 x1 , y1 , x2 , y2 - Rectange around the text which will be clickable 
  

## Available options
  size - user to change font size default 10
  font - Path to a font file (.ttf) to change font default Helvetica 400
  color - To change link color. default black
  underline - To underline the link default true. default false


