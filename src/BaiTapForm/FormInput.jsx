import React, { Component } from "react";
import { createRef } from "react";
import { connect } from "react-redux";
import { themSV, suaSV } from "../Store/Actions/BTFormAction";

let DEFAULT_VALUES = {
  maSV: "",
  tenSV: "",
  email: "",
  soDT: "",
};

class FormInput extends Component {
  state = {
    values: DEFAULT_VALUES,
    errors: {
      maSV: "",
      tenSV: "",
      email: "",
      soDT: "",
    },
    // },
  };

  formRef = createRef();

  static getDerivedStateFromProps(nextProps, currentState) {
    console.log({
      nextProps,
      currentState,
    });

    if (
      nextProps.selectedSV &&
      currentState.values.maSV !== nextProps.selectedSV.maSV
    ) {
      currentState.values = nextProps.selectedSV;
    }

    return currentState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };

  handleSumbit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      return;
    }

    // if (this.props.selectedSV) {
    //   this.props.dispatch({
    //     type: "SUA_SV",
    //     payload: this.state.values,
    //   });
    // } else {
    //   this.props.dispatch({
    //     type: "THEM_SV",
    //     payload: this.state.values,
    //   });
    // }

    // this.props.dispatch({
    //   type: this.props.selectedSV ? "SUA_SV" : "THEM_SV",
    //   payload: this.state.values,
    // });

    if (this.props.selectedSV) {
      this.props.dispatch(suaSV(this.state.values));
    } else {
      this.props.dispatch(themSV(this.state.values));
    }

    this.setState(
      {
        values: DEFAULT_VALUES,
      },
      () => {
        this.forceUpdate();
      }
    );
  };

  handleBlur = (event) => {
    const {
      name,
      title,
      minLength,
      maxLength,
      validationMessage,
      validity: { valueMissing, patternMismatch, tooLong, tooShort },
    } = event.target;

    let message = "";

    if (patternMismatch) {
      message = `${title} is invalid.`;
    }

    if (tooLong || tooShort) {
      message = `${title} must be between ${minLength} and ${maxLength}`;
    }

    if (valueMissing) {
      message = `${title} is required.`;
    }

    this.setState({
      errors: {
        ...this.state.errors,
        [name]: message,
      },
    });
  };

  render() {
    const { maSV, tenSV, email, soDT } = this.state.values || {};
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-dark text-light">
            Thông tin sinh viên
          </div>
          <div className="card-body">
            <form ref={this.formRef} noValidate onSubmit={this.handleSumbit}>
              <div className="row">
                <div className="form-group col-6">
                  <span>Mã SV</span>
                  <input
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    name="maSV"
                    className="form-control"
                    title="ID"
                    value={maSV}
                    required
                  />
                  {this.state.errors.maSV && (
                    <span className="text-danger">
                      {this.state.errors.maSV}
                    </span>
                  )}
                </div>

                <div className="form-group col-6">
                  <span>Tên SV</span>
                  <input
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    name="tenSV"
                    className="form-control"
                    title="Name"
                    value={tenSV}
                    required
                    minLength={6}
                    maxLength={20}
                    pattern='^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
                  />
                  {this.state.errors.tenSV && (
                    <span className="text-danger">
                      {this.state.errors.tenSV}
                    </span>
                  )}
                </div>

                <div className="form-group col-6">
                  <span>Email</span>
                  <input
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    name="email"
                    className="form-control"
                    title="Email"
                    type="email"
                    value={email}
                    required
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                  />
                  {this.state.errors.email && (
                    <span className="text-danger">
                      {this.state.errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group col-6">
                  <span>Số điện thoại</span>
                  <input
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    name="soDT"
                    className="form-control"
                    title="Phone Number"
                    value={soDT}
                    required
                    pattern="^[0-9]+$"
                  />
                  {this.state.errors.soDT && (
                    <span className="text-danger">
                      {this.state.errors.soDT}
                    </span>
                  )}
                </div>
              </div>

              <button
                disabled={!this.formRef.current?.checkValidity()}
                className="btn btn-success mr-2"
              >
                Thêm sinh viên
              </button>

              <button type="reset" className="btn btn-warning">
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ ...state.BTFormReducers }))(FormInput);
