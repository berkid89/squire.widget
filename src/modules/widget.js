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

export const showProduct = (productId) => async (dispatch, getState) => {
    dispatch({
        type: SHOWPRODUCT_REQUESTED
    })

    const res = await fetch("http://localhost:7071/api/ProductInfo?productId=" + productId);
    const product = await res.json();
    
    dispatch({
        type: SHOWPRODUCT,
        payload: {
            product,
        }
    })

}
