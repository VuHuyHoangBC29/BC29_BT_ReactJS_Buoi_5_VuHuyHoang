import React, { Component } from "react";
import FormInput from "./FormInput";
import FormTable from "./FormTable";

export default class BaiTapForm extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center text-danger">BÀI TẬP QUẢN LÝ SINH VIÊN</h1>
        <FormInput />
        <FormTable />
      </div>
    );
  }
}
