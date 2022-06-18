const isThisRefsValid = (refs) => {
  let result = []
  for (const el of Object.keys(refs)) {
    const ref = Array.isArray(refs[el]) ? refs[el][0] : refs[el]
    if (!ref) return true
    if (ref.rules && ref.errorHandler) {
      result.push(ref.errorHandler())
    }
  }
  result = result.every((el) => !el)
  return result
}

const fieldErrorHandler = (rules, value) => {
  let hasError = false
  if (Array.isArray(rules)) {
    let i = 0
    while (i < rules.length) {
      const result = rules[i](value)
      if (typeof result === 'string') {
        hasError = result
        break
      } else if (!hasError) {
        hasError = false
      }
      i++
    }
    return hasError
  } else {
    console.log('rules must be an array')
  }
}

// RULES RULES RULES RULES RULES
const required = (v, message) => !!v || message || 'rules.required'

const email = (v, message) => /.+@.+/.test(v) || message || 'rules.email'

const minLength = (v, minLength, message) =>
  v.length >= minLength || message || `rules.pswMinLength ${minLength}`

const min = (v, min, message) => v >= min || message || `rules.min ${min}`

const max = (v, max, message) => v <= max || message || `rules.max ${max}`

const mismatch = (value1, value2, fieldName, message) =>
  value1 === value2 || message || `rules.pswMismatch ${fieldName}`

const containsNumber = (v, message) =>
  /\d/.test(v) || message || 'rules.containsNumber'

const containsSymbol = (v, message) =>
  /[|\\/~^:,;?!&%$#@*+()]/.test(v) || message || 'rules.containsSymbol'

const containsUpperCase = (v, message) =>
  /(?=.*[A-Z])/.test(v) || message || 'rules.containsUpperCase'

const containsLowerCase = (v, message) =>
  /(?=.*[a-z])/.test(v) || message || 'rules.containsLowerCase'

const onlyNumbers = (v, message) =>
  /^[+]\d+$/.test(v) || message || 'phone number'

export {
  required,
  email,
  min,
  max,
  minLength,
  mismatch,
  containsNumber,
  containsSymbol,
  containsUpperCase,
  containsLowerCase,
  isThisRefsValid,
  fieldErrorHandler,
  onlyNumbers
}
