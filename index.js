const hummus = require('hummus');
const writeLinks = require('./src/writeLinks');
const Path = require('path');

module.exports = (inFile, outFile, text, page, linkTo, x1, y1, x2, y2, options = {}) => {

  pdfWriter = hummus.createWriterToModify(inFile, {
    modifiedFilePath: outFile
  });

   if(options.font)
  font = pdfWriter.getFontForFile( options.font);
  else 
 font =  pdfWriter.getFontForFile(Path.join(__dirname,'./Helvetica 400.ttf'));

  let pModifier = new hummus.PDFPageModifier(pdfWriter, page);
  const context = pModifier.startContext().getContext();
  context.writeText(
    text,
     x1 + 2,
     y1  + 5 ,
    { font, size: options.size || 10, color: options.color || 'black', underline: options.underline || false }
  )
  pModifier.endContext().writePage()

  pdfWriter.end()

  pdfWriter = hummus.createWriterToModify(outFile, {
    modifiedFilePath: outFile
  });


  const ctx = pdfWriter.getObjectsContext()
  const copyCtx = pdfWriter.createPDFCopyingContextForModifiedFile()
  const parser = copyCtx.getSourceDocumentParser()

  writeLinks(ctx, copyCtx, parser,page,linkTo,x1,y1,x2,y2)

  pdfWriter.requireCatalogUpdate()

  pdfWriter.end()
}
