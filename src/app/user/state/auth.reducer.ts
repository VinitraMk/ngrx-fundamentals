import { createAction, createReducer, on } from "@ngrx/store"

const initialState = {
    maskUserName: false
}

export const authReducer = createReducer(initialState,
    on(createAction('[Auth] Toggle mask username'), state => {
        return {
            ...state,
            maskUserName: !state.maskUserName
        }
    })
)