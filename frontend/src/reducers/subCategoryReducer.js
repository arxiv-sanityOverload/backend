
export default (state = {}, action) => {
    switch (action.type) {
      case 'SUBCATEGORY':
      return {
        result: action.payload
      }
      default:
      return state
    }
}