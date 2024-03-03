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
            <table className='table shadow rounded' >     
                    <tr style={{backgroundColor:'#cacacae0'}}  >
                        <th>Status</th>
                        <th>Breed</th>
                        <th>Amount</th>
                        <th>Last add</th>
                        {/* <th>Delete</th> */}
                    </tr>
                <tbody>
                    {allHistory.map((item) => (
                        <tr>
                            <td>{item.status}</td>
                            <td>{item.breed}</td>
                            <td>{item.amount}</td>
                            <td className="text-success">Sussessfull</td>
                            {/* <td><button className="btn border border-info text-info rounded" onClick={() => handlehistoryDelete(item.Id)}>Delete</button></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link className="" to={'/history'}>See more</Link>
        </div>
    );
}

export default History;
