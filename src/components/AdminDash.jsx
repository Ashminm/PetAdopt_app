import React, { useState } from "react";
import { Col, Row, Dropdown, Image } from "react-bootstrap";
import MyProject from "./MyProject";
import Profile from "./Profile";
import AdminProfile from "./AdminProfile";

function AdminDash() {
    const [adprofile, setAdProfile] = useState({
        username: JSON.parse(localStorage.getItem("currentUser")).username,
        email: JSON.parse(localStorage.getItem("currentUser")).email,
    });

    return (
        <div>
            <Row>
                <Col sm="12" md="2">
                    <AdminProfile />
                </Col>
                <Col sm="12" md="10 p-0">
                    <h3 className="p-3">
                        Hello <span style={{ color: "#94619E" }}>{adprofile.username} </span>👋
                    </h3>
                    <MyProject />
                </Col>
               
            </Row>
            <div className="">
                
            </div>
        </div>
    );
}

export default AdminDash;
