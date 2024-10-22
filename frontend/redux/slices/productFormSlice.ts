import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../utils/models/Item';

interface ProductFormState {
  formData: Item;
  errors: { [K in keyof Item]?: string };
  isEditing: boolean;
}

const initialState: ProductFormState = {
  formData: {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  },
  errors: {},
  isEditing: false,
};

const productFormSlice = createSlice({
  name: 'productForm',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<Item>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setFieldError: (state, action: PayloadAction<{ field: keyof Item; error: string }>) => {
      state.errors[action.payload.field] = action.payload.error;
    },
    clearFieldError: (state, action: PayloadAction<keyof Item>) => {
      delete state.errors[action.payload];
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.errors = {};
    },
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const { 
  setFormData,  
  setFieldError, 
  clearFieldError, 
  resetForm, 
  setEditing 
} = productFormSlice.actions;

export default productFormSlice.reducer;