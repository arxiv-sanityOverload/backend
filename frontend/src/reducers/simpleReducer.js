export default (state = {
  processing: false,
  data: null,
  error: false
}, action) => {
  switch (action.type) {
    case 'CATEGORY':
      return {
        result: action.payload
      }
    case 'SUBCATEGORY_PENDING':
      // if request is in process.
      return {
        ...state,
        processing: true
      }
    case 'SUBCATEGORY_FULFILLED':
      // if request is fulfilled.
      return {
        ...state,
        processing: false,
        data: action.payload.data,
      }

    case 'SUBCATEGORY_REJECTED':
      // if request is rejected.
      return {
        ...state,
        processing: false,
        error: true
      }
  }
  return state;
}
