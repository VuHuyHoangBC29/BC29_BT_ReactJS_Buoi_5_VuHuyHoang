import { SET_SELECTED_SV, SUA_SV, THEM_SV, XOA_SV } from "../Types/BTFormType";

const themSV = (values) => {
  return {
    type: THEM_SV,
    payload: values,
  };
};

const suaSV = (values) => {
  return {
    type: SUA_SV,
    payload: values,
  };
};

const xoaSV = (values) => {
  return {
    type: XOA_SV,
    payload: values,
  };
};

const selectSV = (SV) => {
  return {
    type: SET_SELECTED_SV,
    payload: SV,
  };
};

export { themSV, suaSV, xoaSV, selectSV };
