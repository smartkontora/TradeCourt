import { createSlice } from "@reduxjs/toolkit"
import { IForm } from "../models/models"

const initialState: IForm = {
    step: 1
}

const formSlice = createSlice({
    name: 'form-slice',
    initialState,
    reducers: {
        nextStep: (state) => { state.step++ },
        prevStep: (state) => { state.step--}
    }
})

export const formReducer = formSlice.reducer
export const formActions = formSlice.actions 