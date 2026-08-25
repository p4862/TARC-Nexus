export function getApiErrorMessage(error, fallbackMessage) {
  return error?.response?.data?.message || fallbackMessage;
}

export function getValidationErrors(error) {
  return error?.response?.data?.errors || {};
}
