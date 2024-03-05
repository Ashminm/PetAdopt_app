import React, { useState, useEffect, useContext } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { deletePetApi, getAllPetss } from "../service/allApis";
import { BASE_URL } from "../service/baseUel";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import EditProject from "./EditProject";
import { addPetResponseContect } from "../context/ContextShare";
import Cart from "./Cart";

function GetAllPets() {
    const [search, setSearch] = useState("");

    const [token, setToken] = useState("");
    const [allPet, setAllPet] = useState([]);
    const [cart, setCart] = useState([]);

    const {addPetResponse,setAddPetResponse}=useContext(addPetResponseContect)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);
    useEffect(() => {
        GetallPets();
    }, [token, search,addPetResponse]);

    const GetallPets = async () => {
        const header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const res = await getAllPetss(header, search);
        if (res.status === 200) {
            setAllPet(res.data);
        }
    };
    // console.log(allPet);
    // console.log(search);

    const handleDelete = async (id) => {
        const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const result = await deletePetApi(reqHeader, id);
        if (result.status === 200) {
            GetallPets();
            toast.success("Pet successfully  deleted!!",{
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#FFFF',
                },
              });
            // alert("Pet successfully  deleted!!")
        } else {
            toast.error("pet deletion failded!!",{
                style:{
                  borderRadius: '10px',
                  background:"#333",
                  color:'#bb2124'
                }
              });
        }
    };
    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(cart));
      }, [cart]);
    
      useEffect(() => {
        const storedData = localStorage.getItem("currentUser");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCart(parsedData);
        }
    }, []);

    const HandleCart = (pname, breed, amount, userid) => {
        const cartdata = { pname, breed, amount, userid };

        if (cartdata.pname && cartdata.breed && cartdata.amount && cartdata.userid) {
            setCart((prevCart) => [...prevCart, cartdata]);
            alert("Item is added to cart");
        } else {
            alert("Item add failed");
        }
    };


    console.log(cart);
    return (
        <div>
            <div className=" d-flex justify-content-end container mb-5">
                <Link to={"/cart"} className="text-decoration-none text-dark">
                    <i class="fa-solid fa-cart-shopping" style={{ fontSize: "26px" }}></i>
                    <span className="ms-2 ">3</span>
                </Link>
            </div>
            <div>
                <div className=" d-flex justify-content-between container mb-4">
                    <div className="" style={{borderRadius:"30px",border:'2px solid #49274A',outline:'none'}}>
                    <i class="fa-solid fa-magnifying-glass ps-3 "></i>
                        <input
                            type="search"
                            placeholder="Search breed and all"
                            className=" p-3" style={{border:'none',outline:'none'}}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <input
                            type="search"
                            placeholder="Enter amount"
                            className=" p-2" style={{border:'2px solid #49274A',outline:'none'}}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="container mt-3 ">
                    {allPet.length > 0 ? (
                        allPet
                            .filter((item) =>
                                Object.values(item)
                                    .filter((value) => typeof value === "string")
                                    .some((value) => value.toLowerCase().includes(search.toLowerCase()))
                            )
                            .map((item) => (
                                <Row className="border shadow mb-2 p-2">
                                    <Col
                                        sm="12"
                                        md="1 "
                                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                    >
                                        <img
                                            src={`${BASE_URL}/upload/${item.p_image}`}
                                            alt="image"
                                            className="shadow"
                                            style={{ borderRadius: "50%", width: "100%", height: "75%" }}
                                        />
                                    </Col>
                                    <Col sm="12" md="7">
                                        <h2 className="pt-2">
                                            <strong> Name:</strong> <span className="text-primary">{item.pname}</span>
                                        </h2>
                                        <p className="mb-1">
                                            <strong>Overview:</strong> {item.overview}
                                        </p>
                                        <span className="pe-3">
                                            <strong> Gender: </strong>
                                            {item.gender}{" "}
                                        </span>
                                        <span className="pe-3">
                                            | <strong>Color: </strong> {item.color}{" "}
                                        </span>
                                        <span className="pe-3">
                                            | <strong> Age: </strong>
                                            {item.age}{" "}
                                        </span>
                                        <span className="pe-3">
                                            | <strong>Weight:</strong> {item.Weight}{" "}
                                        </span>
                                        {/* <span className="text-danger">{item.categories}</span> */}
                                        <p className="pe-5 h5">
                                            {" "}
                                            <strong>Breed: </strong>
                                            {item.breed}
                                        </p>
                                    </Col>
                                    <Col sm="12" md="1" style={{ display: "flex", alignItems: "end" }}>
                                        <h5>₹{item.amount}</h5>
                                    </Col>
                                    <Col sm="12" md="2">
                                        <h3 className="pt-2">{item.pId}</h3>
                                        <h5>
                                            <Badge bg="success p-2">{item.status}</Badge>
                                        </h5>

                                        <div className="d-flex justify-content-between">
                                        
                                            <button className="btn btn-danger"  onClick={()=>HandleCart(item.pname,item.breed,item.amount,item.userid)}>Add to cart</button>
                                            <button
                                                className="btn"
                                                onClick={() => {
                                                    handleDelete(item._id);
                                                }}
                                            >
                                                <i class="fa-solid fa-trash-can" style={{ fontSize: "25px" }}></i>
                                            </button>
                                        </div>
                                        
                                        
                                    </Col>
                                    <Col sm='12' md='1' className="d-flex align-items-end justify-content-end">
                                        <EditProject pet={item}/>
                                    </Col>
                                </Row>
                                
                            ))
                    ) : search.trim() !== "" ? (
                        <p className="text-danger text-center p-5 h4">No matching pets found for your search</p>
                    ) : (
                        <p className="text-danger text-center p-5 h4">please wait. Loading....</p>
                    )}
                </div>
               
            </div>
            <div className="">
            <Cart cart={cart} />
            </div>
        </div>
    );
}

export default GetAllPets;
