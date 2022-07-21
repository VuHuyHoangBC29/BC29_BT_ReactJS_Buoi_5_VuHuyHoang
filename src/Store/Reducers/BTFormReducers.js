import { SET_SELECTED_SV, SUA_SV, THEM_SV, XOA_SV } from "../Types/BTFormType";

const DEFAULT_STATE = {
  arrSV: [
    {
      maSV: "1111",
      tenSV: "Ngô Bá Khá",
      email: "ngobakha@gmail.com",
      soDT: "01234567",
    },
    {
      maSV: "1112",
      tenSV: "Trần Tràn Trề",
      email: "trantrantre@gmail.com",
      soDT: "01234568",
    },
    {
      maSV: "1113",
      tenSV: "Lý Sự",
      email: "lysu@gmail.com",
      soDT: "01234569",
    },
  ],
  selectedSV: null,
};

export const BTFormReducers = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case THEM_SV: {
      let data = [...state.arrSV];

      data.push(payload);

      state.arrSV = data;

      return { ...state };
    }

    case SET_SELECTED_SV: {
      // state.selectedSV = payload;
      return { ...state, selectedSV: payload };
    }

    case SUA_SV: {
      state.arrSV = state.arrSV.map((ele) =>
        ele.maSV === payload.maSV ? payload : ele
      );

      state.selectedSV = null;

      return { ...state };
    }

    case XOA_SV: {
      state.arrSV = state.arrSV.filter((ele) => ele.maSV !== payload);

      return { ...state };
    }

    default:
      return state;
  }
};
