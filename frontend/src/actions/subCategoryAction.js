// const subCategoryAction = () => dispatch => {
//     dispatch({
//     type: 'SUBCATEGORY',
//     payload: 'sub_category_action'
//     })
// }

// export function fetchSubCategory(subCategory) {
//     return dispatch => {
//       dispatch(subCategoryAction()) // THIS IS CALLING INFINETELY
//       console.log(subCategory);

//       // return fetch(`/v1/${subCategory}/recents`)
//       return fetch(`http://localhost:3000/v1/${subCategory}/recents`)
//       .then((response) =>
//           //response.json()) 
//           console.log(response.json()))
//       }
//   }

  import axios from "axios";

  export function fetchSubCategory(subCategory) {
    return dispatch => {
      return dispatch({
        type: 'SUBCATEGORY',
        subCategory: axios.get(`http://localhost:3000/v1/${subCategory}/recents`)
      }).then(result => {
        console.log(result);
      }).catch(error => {
        console.log(error);
      });
    };
  }
