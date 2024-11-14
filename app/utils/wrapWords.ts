export default function (htmlString: string): string {
  // Parse the HTML string into a DOM structure
  const parser = new DOMParser()
  const document = parser.parseFromString(htmlString, 'text/html')

  // Recursive function to wrap each word in a span tag
  function wrapNodeWords(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim() || ''
      if (text) {
        // Split text by spaces to wrap each word separately
        const words = text.split(/\s+/)
        const wrappedWords = words.map((word) => {
          const span = document.createElement('span')
          span.className =
            'js-word inline-block will-change-[transform,opacity]'
          span.textContent = word

          const wrapperSpan = document.createElement('span')
          wrapperSpan.className =
            'overflow-hidden inline-block py-2 my-[-0.5rem]'
          wrapperSpan.innerHTML = span.outerHTML

          return wrapperSpan
        })

        // Replace text node with wrapped words in the parent
        const parent = node.parentNode
        if (parent) {
          wrappedWords.forEach((span, index) => {
            parent.insertBefore(span, node)
            if (index < wrappedWords.length - 1) {
              parent.insertBefore(document.createTextNode(' '), node)
            }
          })
          parent.removeChild(node)
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'BR') {
      // If it's an element node, recursively apply wrapping on its child nodes
      Array.from(node.childNodes).forEach(wrapNodeWords)
    }
  }

  // Start wrapping words from the body of the parsed document
  Array.from(document.body.childNodes).forEach(wrapNodeWords)

  // Return the mutated HTML string
  return document.body.innerHTML
}
