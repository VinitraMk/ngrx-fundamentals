import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state';

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
    on(createAction('[Product] Toggle Product Code'),  state => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    })
)

/**** SELECTORS ****/


const getProductFeatureSTate = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureSTate,
    state => state.showProductCode
)