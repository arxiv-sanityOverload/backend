export const simpleAction = () => dispatch => {
    dispatch({
     type: 'CATEGORY',
     payload: 'result_of_simple_action'
    })
   }