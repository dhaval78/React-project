import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpService.js";
class Student extends Component {
  state = { data: [] };
  async componentDidMount() {
    let { id } = this.props.match.params;
    let response = await http.get(`/svr/students/${id}`);

    console.log(response);
    let { data } = response;
    this.setState({ data: data });
  }
  render() {
    const { data } = this.state;
    return (
      <div classname="container">
        Id:{data.id}
        <br />
        Name:{data.name}
        <br />
        Course:{data.course}
        <br />
        Grade:{data.grade}
        <br />
        City:{data.city}
        <br />
        <Link to={`/student/${data.id}/delete`}>Delete</Link>
        <br />
        <Link to={`/student/${data.id}/edit`}>Edit</Link>
      </div>
    );
  }
}
export default Student;
