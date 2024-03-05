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

    // const HandleCart = (pname, breed, amount, userid) => {
    //     const cartdata = { pname, breed, amount, userid };

    //     if (cartdata.pname && cartdata.breed && cartdata.amount && cartdata.userid) {
    //         setCart((prevCart) => [...prevCart, cartdata]);
    //         toast.success("Item is added to cart!!",{
    //             style: {
    //               borderRadius: '10px',
    //               background: '#333',
    //               color: '#FFFF',
    //             },
    //           });
    //     } else {
    //         toast.error("Item added failed!!",{
    //             style:{
    //               borderRadius: '10px',
    //               background:"#333",
    //               color:'#bb2124'
    //             }
    //           });
    //     }
    // };
    const HandleCart = (pname, breed, amount, userid) => {
        const existingItem = cart.find(item => item.pname === pname && item.breed === breed);
    
        if (existingItem) {
            toast.error("Item already exists in the cart!", {
                style: {
                    borderRadius: '10px',
                    background: "#333",
                    color: '#FFF'
                }
            });
        } else {
            const cartdata = { pname, breed, amount, userid };
            if (cartdata.pname && cartdata.breed && cartdata.amount && cartdata.userid) {
                setCart((prevCart) => [...prevCart, cartdata]);
                toast.success("Item is added to cart!!", {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#FFFF',
                    },
                });
            } else {
                toast.error("Item added failed!!", {
                    style: {
                        borderRadius: '10px',
                        background: "#333",
                        color: '#bb2124'
                    }
                });
            }
        }
    };
    // console.log(cart);
    return (
        <div>
            <div className=" d-flex justify-content-end container mb-5">
                <Link to={"/cart"} className="text-decoration-none border p-3 text-dark" style={{borderRadius:'50%'}}>
                    <i class="fa-solid fa-cart-shopping" style={{ fontSize: "16px" }}></i>
                    <span className="text-light ps-2 pe-2 p-1 bg-dark " style={{borderRadius:"50%",position:'absolute',fontSize:'12px'}}>{cart.length}</span>
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
                                            className="shadow rounded"
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
                                        <h3 className="pt-2" title="Pet LicenceID">{item.pId}</h3>
                                        <h5>
                                            <Badge bg="success p-2" title="Pet Status">{item.status}</Badge>
                                        </h5>

                                        <div className="d-flex justify-content-between">
                                        
                                            <button className="btn border border-danger btn-warning" title="Add to cart"  onClick={()=>HandleCart(item.pname,item.breed,item.amount,item.userid,item.p_image)}>Add to cart</button>
                                            <button
                                            title="Delete"
                                                className="btn"
                                                onClick={() => {
                                                    handleDelete(item._id);
                                                }}
                                            >
                                                <i class="fa-solid fa-trash-can" style={{ fontSize: "25px" }}></i>
                                            </button>
                                        </div>
                                        
                                        
                                    </Col>
                                    <Col sm='12' md='1' className="d-flex align-items-end justify-content-end" title="Edit Pet Details">
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
