import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import MyProject from "./MyProject";
import Profile from "./Profile";
import History from "./History";

function Dashboard() {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        setUserName(JSON.parse(localStorage.getItem("currentUser")).username);
    }, []);

    return (
        <div>
            <Row>
                <Col sm="12" md="2 p-0 shadow">
                    <Profile />
                </Col>
                <Col sm="12" md="10 p-0">
                    <h4 className="p-3">
                        Hello, <span style={{ color: "#94619E" }}>{userName} 👋</span>
                    </h4>
                    <MyProject />
                </Col>
            </Row>
            <div className=" mt-5 mb-5 container rounded shadow" style={{ backgroundColor: "#F8EEE7" }}>
                <History />
            </div>
        </div>
    );
}

export default Dashboard;
