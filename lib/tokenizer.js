/*!
 * lunr.tokenizer
 * Copyright (C) @YEAR Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index.
 *
 * @module
 * @param {String} obj The string to convert into tokens
 * @returns {Array}
 */
lunr.tokenizer = function (obj) {
  if (!arguments.length || obj == null || obj == undefined) return []
  if (Array.isArray(obj)) return obj.map(function (t) { return t.toLowerCase() })

  var str = obj.toString().replace(/^\s+/, '')

  for (var i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      str = str.substring(0, i + 1)
      break
    }
  }

  // necessary to index the whole camelcase, etc., string,
  // as well as its parts
  var fullLengthTokens = str.split(/\s+/)

  return str
    .replace(/[^a-zA-Z\s]/g, ' ')
    .replace(/[A-Z]{2,}(?![a-z])/g, ' $& ')
    .replace(/[A-Z](?=[a-z])/g, ' $&')
    .replace(/^\s+|\s+$/g, '')
    .split(/\s+/)
    .concat(fullLengthTokens)
    .map(function (token) {
      return token.toLowerCase()
    })
    .reduce(function(acc, token) {
      if (acc.indexOf(token) < 0) 
        acc.push(token)
      return acc
    }, [])
}
