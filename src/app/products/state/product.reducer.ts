import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state';
import { initCurrentProduct, setCurrentProduct, toggleProductCode } from "./product.actions";

export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: false,
    currentProduct: null,
    products: []
}

export const productReducer = createReducer<ProductState>(
    initialState,
    on(toggleProductCode,  (state: ProductState) => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProduct: action.product
        }
    }),
    on(initCurrentProduct, (state: ProductState) => {
        return {
            ...state,
            currentProduct: {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            }
        }
    })
)

/**** SELECTORS ****/


const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
)

export const getCurrentSelectedProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
)