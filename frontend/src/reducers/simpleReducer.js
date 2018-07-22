export default (state = {}, action) => {
    switch (action.type) {
      case 'CATEGORY':
        return {
          result: action.payload
       }
      case 'SUBCATEGORY':
        return {
          ...state,
          result: action.subCategory
      }
      default:
        return state
    }
  }