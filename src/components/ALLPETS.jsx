import React, { useState, useEffect, useContext } from "react";
import { userPets } from "../service/allApis";

function ALLPETS() {
    const [token, setToken] = useState("");
    const [search,setSearch] = useState("")
    const [pets, setPets] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);
    useEffect(() => {
        if (token) {
            getPet();
        }
    }, [token]);

    const getPet = async () => {
        const regHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const result = await userPets(regHeader);
        if (result.status === 200) {
            setPets(result.data);
            console.log(pets);
        } else {
            setPets([]);
        }
    };
    // console.log(pets);
console.log(search);
    return (
        <div>

            {/* ---------------------old Admin Add pet List---------------------Not using---------------- */}
            {/* <div>
            
                <div className=" d-flex justify-content-between container">
                    <div className="">
                        <input type="search" placeholder="Search breed" className="form-control p-2" onChange={(e)=>setSearch(e.target.value)} />
                    </div>
                    <div className="">
                        <input type="search" placeholder="fillter" className="form-control p-2" />
                    </div>
                </div>
                <div className="container mt-3">
                    {pets ? (
                        pets.map((item) => (
                            <Row className="border shadow mb-2 p-2">
                                <Col sm="12" md="1 ">
                                    <img
                                        src={`${BASE_URL}/upload/${item.p_image}`}
                                        alt="image"
                                        width={110}
                                        className="rounded shadow"
                                    />
                                </Col>
                                <Col sm="12" md="8">
                                    <h2 className="pt-2"><strong> Name:</strong> <span className="text-primary">{item.pname}</span></h2>
                                    <p className="mb-1"><strong>Overview:</strong>  {item.overview}</p>
                                    <span className="pe-3"><strong> Gender: </strong>{item.gender} |</span> 
                                    <span className="pe-3">| <strong>Color: </strong> {item.color} |</span>
                                    <span className="pe-3">| <strong> Age: </strong>{item.age} |</span>
                                    <span className="pe-3">| <strong>Weight:</strong>  {item.Weight} |</span>
                                   
                                    <span className="pe-5 h5"> <strong>Breed: </strong>{item.breed}</span>
                                    
                                </Col>
                                <Col sm="12" md="1" style={{display:"flex",alignItems:"end"}}>
                                    <h5>₹{item.amount}</h5>
                                </Col>
                                <Col sm="12" md="2">
                                <h3 className="pt-2">{item.pId}</h3>
                                    <h5><Badge bg="success p-2">{item.status}</Badge></h5>
                                   
                                   
                                </Col>
                                
                                
                               
                                
                            </Row>
                            
                        ))
                    ) : (
                        <p className="text-danger">No Pets Avilable</p>
                    )}
                </div>
            </div> */}
          
        </div>
    );
}

export default ALLPETS;
