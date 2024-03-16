import React, { useState, useEffect } from "react";
import { getHistory } from "../service/allApis";
import { Link } from "react-router-dom";
import { Badge, Table } from "react-bootstrap";

function History() {
    const [token, setToken] = useState("");
    const [allHistory, setAllHistory] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);
    useEffect(() => {
        GetallHistory();
    }, [token]);

    const GetallHistory = async () => {
        const header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await getHistory(header);
        if (res.status === 200) {
            setAllHistory(res.data);
        }
    };

    // console.log(allHistory);
    return (
        <div className="container p-5">
            <span className="ps-3 ">-PET ADD HISTORY-</span>
            <h4 className="p-3 h2">History</h4>

            <Table striped bordered hover responsive="md" className="text-center">
                <thead>
                    <tr>
                        <th>Breed</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Last Added</th>
                    </tr>
                </thead>
                <tbody>
                    {allHistory.length > 0 ? (
                        allHistory.map((item, index) => (
                            <tr key={index}>
                                <td className="d-flex align-items-center">
                                    <div className="ms-3">
                                        <p className="fw-normal">{item.breed}</p>
                                    </div>
                                </td>
                                <td>
                                    <p className="fw-normal">{item.amount}</p>
                                </td>
                                <td>
                                    <Badge
                                        pill
                                        bg=" p-2 "
                                        title="Pet Status"
                                        style={{
                                            backgroundColor: item.status === "Available" ? "green" : "red",
                                            fontSize: "9px",
                                        }}
                                    >
                                        <i class="fa-solid fa-circle fa-fade"></i> {item.status}
                                    </Badge>
                                </td>
                                <td>
                                    <p className="text-success">SuccessFully</p>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center text-danger h4">
                                No history found, please add pets!
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <p className="text-center">
                <Link className="btn border-dark" to={"/history"}>
                    See more
                </Link>
            </p>
        </div>
    );
}

export default History;
