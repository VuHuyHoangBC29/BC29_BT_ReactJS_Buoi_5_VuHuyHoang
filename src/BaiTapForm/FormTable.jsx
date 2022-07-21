import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSV, xoaSV } from "../Store/Actions/BTFormAction";

class FormTable extends Component {
  state = {
    keyword: "",
  };

  renderSVList = () => {
    let data = this.props.arrSV.filter((ele) => {
      return (
        ele.tenSV
          .toLowerCase()
          .trim()
          .indexOf(this.state.keyword.toLowerCase().trim()) !== -1
      );
    });

    return data.map((ele, index) => {
      const { maSV, tenSV, email, soDT } = ele;
      return (
        <tr key={maSV}>
          <td>{maSV}</td>
          <td>{tenSV}</td>
          <td>{soDT}</td>
          <td>{email}</td>
          <td>
            <button
              onClick={() =>
                // this.props.dispatch({ type: "SET_SELECTED_SV", payload: ele });
                this.props.dispatch(selectSV(ele))
              }
              className="btn btn-primary mr-3"
            >
              Sửa
            </button>

            <button
              onClick={() =>
                // this.props.dispatch({ type: "XOA_SV", payload: ele.maSV });
                this.props.dispatch(xoaSV(ele.maSV))
              }
              className="btn btn-danger"
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="card p-0 mt-3">
        <div className="card-header font-weight-bold">Quản lý sinh viên</div>
        <div className="row mt-4 px-3 ">
          <div className="col-4">
            <div className="form-group mb-0">
              <input
                onChange={this.handleChange}
                name="keyword"
                type="text"
                placeholder="Search by full name..."
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Mã SV</th>
                <th>Họ tên </th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.renderSVList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ ...state.BTFormReducers }))(FormTable);
