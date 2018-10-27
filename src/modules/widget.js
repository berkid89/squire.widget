export const SHOWPRODUCT_REQUESTED = 'widget/SHOWPRODUCT_REQUESTED';
export const SHOWPRODUCT = 'widget/SHOWPRODUCT';

const initialState = {
    product: null,
    isLoading: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOWPRODUCT_REQUESTED:
            return state;

        case SHOWPRODUCT:
            return {
                ...state,
                product: action.payload.product,
                isLoading: false
            }

        default:
            return state;
    }
}

export const showProduct = () => {
    return dispatch => {
      dispatch({
        type: SHOWPRODUCT_REQUESTED
      })
  
      dispatch({
        type: SHOWPRODUCT
      })
    }
  }
