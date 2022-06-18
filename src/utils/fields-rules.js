const isThisRefsValid = (refs) => {
  let result = []
  for (const el of Object.keys(refs)) {
    const ref = Array.isArray(refs[el]) ? refs[el][0] : refs[el]
    if (ref?.rules && ref?.errorHandler) {
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
const required = (v, message) => !!v || message || 'required field'

const phoneNumber = (v, message) =>
  /^[+]\d+$/.test(v) || message || 'enter "+" and phone number'

export { required, isThisRefsValid, fieldErrorHandler, phoneNumber }
