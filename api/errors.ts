export const SERVER_ERROR = {
  code: 500,
  message: {
    error: 'Server Error',
    error_description: 'Something bad happened at the server.'
  }
}

export const CUSTOM_CODE_ALREADY_EXISTS = {
  code: 409,
  message: {
    error: 'Conflict',
    error_description: 'Custom code is already in use.'
  }
}