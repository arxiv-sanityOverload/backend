export default (state = {}, action) => {
    switch (action.type) {
      case 'CATEGORY':
        return {
          result: action.payload
       }
      case 'SUBCATEGORY':
        return {
          result: action.payload
      }
      default:
        return state
    }
  }