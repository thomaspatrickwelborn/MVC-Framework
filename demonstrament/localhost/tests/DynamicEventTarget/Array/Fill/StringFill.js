const StringFill = ($character, $length) => {
  const strings = []
  strings.length = $length
  strings.fill($character, 0, $length)
  return strings.join('')
}

export default StringFill