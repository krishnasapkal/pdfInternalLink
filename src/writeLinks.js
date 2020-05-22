const createLink = require('./createLink')
const annotationArrayKey = 'Annots'

const getLinks = (objCtx,parser,page,x1,y1,x2,y2) => {
  return createLink(objCtx, parser.getPageObjectID(page), [x1  || 10, y1 ||  20 , x2 || 55, y2 || 50])
  
}

module.exports = (objCtx, copyCtx, parser,page,toPage,x1,y1,x2,y2) => {
  const pageId = parser.getPageObjectID(page)
  const pageObject = parser
    .parsePage(page)
    .getDictionary()
    .toJSObject()

  const links = getLinks(objCtx, parser,toPage,x1,y1,x2,y2)
  objCtx.startModifiedIndirectObject(pageId)
  const modifiedPageObject = objCtx.startDictionary()

  Object.getOwnPropertyNames(pageObject).forEach(element => {
    if (element !== annotationArrayKey) {
      modifiedPageObject.writeKey(element)
      copyCtx.copyDirectObjectAsIs(pageObject[element])
    }
  })

  modifiedPageObject.writeKey(annotationArrayKey)
  objCtx.startArray()

   objCtx.writeIndirectObjectReference(links)

  objCtx
    .endArray()
    .endLine()
    .endDictionary(modifiedPageObject)
    .endIndirectObject()

    return links.pgc;
}
