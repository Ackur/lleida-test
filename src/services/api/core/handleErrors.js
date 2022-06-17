
export const handleErrors = (response) => {
  if (response.status === 401) {
    console.log('need Logout')
  }
  // Note: here you may want to add your errors handling
  const errorMessage = Array.isArray(response?.data?.errors)
    ? response.data.errors[0].content
    : typeof response?.data?.errors === 'object'
    ? response.data.errors.content
    : response.data.message
  return errorMessage
}
