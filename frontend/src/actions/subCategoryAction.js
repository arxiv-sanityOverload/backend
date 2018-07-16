const subCategoryAction = () => dispatch => {
    dispatch({
    type: 'SUBCATEGORY',
    payload: 'sub_category_action'
    })
}

export function fetchSubCategory(category, subCategory) {
    console.log(subCategory);
    return (dispatch) => {
      // update call metadata
      dispatch(subCategoryAction())
  
      return fetch(`/v1/${category}/${subCategory}`)
      .then((response) =>
          //response.json())
          console.log(response.json()))
      
    //   // send the result of the call, probably updating the request metadata as well
    //   .then((json) => dispatch(receiveAThing(json)))
      
      }
  }