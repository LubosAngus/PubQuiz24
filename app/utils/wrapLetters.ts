export default function (htmlString: string): string {
  // Parse the HTML string into a DOM structure
  const parser = new DOMParser()
  const document = parser.parseFromString(htmlString, 'text/html')

  // Recursive function to wrap each letter in a span tag
  function wrapNodeLetters(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim() || ''
      if (text) {
        // Split text by spaces to process each word separately
        const words = text.split(/\s+/)
        const wrappedWords = words.map((word) => {
          // Wrap each letter in the word
          const wrappedLetters = Array.from(word).map((letter) => {
            const span = document.createElement('span')
            span.className = 'js-letter inline-block will-change-[transform]'
            span.textContent = letter
            return span.outerHTML
          })

          // Join wrapped letters and wrap the word in a container span
          const lettersContainer = document.createElement('span')
          lettersContainer.className = 'inline-block'
          lettersContainer.innerHTML = wrappedLetters.join('')

          return lettersContainer
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
      Array.from(node.childNodes).forEach(wrapNodeLetters)
    }
  }

  // Start wrapping letters from the body of the parsed document
  Array.from(document.body.childNodes).forEach(wrapNodeLetters)

  // Return the mutated HTML string
  return document.body.innerHTML
}
