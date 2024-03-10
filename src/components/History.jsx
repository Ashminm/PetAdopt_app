import React, { useState, useEffect } from "react";
import { getHistory } from "../service/allApis";
import { Link } from "react-router-dom";

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
            <table className="table shadow rounded">
                <tr style={{ backgroundColor: "#cacacae0" }}>
                    <th>Status</th>
                    <th>Breed</th>
                    <th>Amount</th>
                    <th>Last add</th>
                    {/* <th>Delete</th> */}
                </tr>
                <tbody>
                    {allHistory.map((item) => (
                        <tr>
                            <td style={{ color: item.status === "Available" ? "green" : "red" }}>{item.status}</td>
                            <td>{item.breed}</td>
                            <td>{item.amount}</td>
                            <td className="text-success">Sussessfull</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-center"><Link className="btn border-dark" to={"/history"}>
                See more
            </Link></p>
        </div>
    );
}

export default History;
