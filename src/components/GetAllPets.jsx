import React, { useState, useEffect, useContext } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { deletePetApi, getAllPetss } from "../service/allApis";
import { BASE_URL } from "../service/baseUel";
import toast from "react-hot-toast";
import EditProject from "./EditProject";
import { addPetResponseContect } from "../context/ContextShare";
import Cart from "./Cart";
import blob2 from "../assets/blob (2).png";

const getLocalItems = () => {
    let list = localStorage.getItem("CartPets");
    // console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem("CartPets"));
    } else {
        return [];
    }
};

function GetAllPets() {
    const userRole = localStorage.getItem("role");
    const isAdmin = userRole === "admin";
    const [search, setSearch] = useState("");

    const [token, setToken] = useState("");
    const [allPet, setAllPet] = useState([]);
    const [cart, setCart] = useState(getLocalItems());

    const { addPetResponse, setAddPetResponse } = useContext(addPetResponseContect);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);
    useEffect(() => {
        GetallPets();
    }, [token, search, addPetResponse]);

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
            toast.success("Pet successfully  deleted!!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#FFFF",
                },
            });
        } else {
            toast.error("pet deletion failded!!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#bb2124",
                },
            });
        }
    };
    useEffect(() => {
        localStorage.setItem("CartPets", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const storedData = localStorage.getItem("CartPets");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCart(parsedData);
        }
    }, []);

    const HandleCart = (pname, breed, amount, userid, p_image) => {
        const existingItem = cart.find((item) => item.pname === pname && item.breed === breed);

        if (existingItem) {
            toast.error("Item already exists in the cart!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#FFF",
                },
            });
        } else {
            const cartdata = { pname, breed, amount, p_image, userid, Id: new Date().getTime().toString() };
            if (cartdata.pname && cartdata.breed && cartdata.amount && cartdata.userid) {
                setCart((prevCart) => [...prevCart, cartdata]);
                toast.success("Item is added to cart!!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#FFFF",
                    },
                });
            } else {
                toast.error("Item added failed!!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#bb2124",
                    },
                });
            }
        }
    };
    // console.log(cart);

    const handleStock = () => {
        toast("This item is currently out of stock", {
            icon: "⚠️",
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#FFFF00",
            },
        });
    };
    return (
        <div>
            <div className="mt-5">
                <div className=" d-flex justify-content-between container mb-4">
                    <div className="w-75">
                        <input
                            type="search"
                            placeholder="Search breed and all"
                            className=" p-2 icon ps-4 border border-secondary"
                            style={{ outline: "none", borderRadius: "20px" }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <input
                            type="search"
                            placeholder="Enter amount"
                            className=" p-2 ps-3 w-75 border border-secondary"
                            style={{ outline: "none", borderRadius: "20px" }}
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
                                        <h3 className="pt-4 mb-4" title="Pet LicenceID">
                                            {item.pId}
                                        </h3>
                                        {/* <Badge
                                            pill
                                            bg=" p-2 "
                                            title="Pet Status"
                                            style={{
                                                backgroundColor: item.status === "Available" ? "green" : "red",
                                                fontSize: "11px",
                                            }}
                                        >
                                            {item.status}
                                        </Badge> */}

                                        <div className="d-flex justify-content-between ">
                                            {item.status === "Available" ? (
                                                <button
                                                    className=" ps-3 pe-3 text-light shadow"
                                                    title="Add to cart"
                                                    style={{ border: "none", backgroundColor: "#49274A" }}
                                                    onClick={() =>
                                                        HandleCart(
                                                            item.pname,
                                                            item.breed,
                                                            item.amount,
                                                            item.userid,
                                                            item.p_image,
                                                            item.ID
                                                        )
                                                    }
                                                >
                                                    Add to cart
                                                </button>
                                            ) : (
                                                <button
                                                    className="ps-3 pe-3 bg-warning shadow"
                                                    style={{ border: "none" }}
                                                    title="Notify me"
                                                    onClick={handleStock}
                                                >
                                                    Out Of Stock
                                                </button>
                                            )}
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
                                    <Col
                                        sm="12"
                                        md="1"
                                        className="d-flex align-items-end mb-3 justify-content-end"
                                        title="Edit Pet Details"
                                    >
                                        {isAdmin ? (
                                            <EditProject pet={item} />
                                        ) : (
                                            <Badge
                                                pill
                                                bg=" p-2 "
                                                style={{
                                                    backgroundColor: "Approved" ? "green" : "red",
                                                    fontSize: "11px",
                                                }}
                                            >
                                                Approved
                                            </Badge>
                                            // <button
                                            //     title="Request"
                                            //     className="btn border-dark"
                                            //     onClick={() => {
                                            //         // Handle user request logic here
                                            //     }}
                                            // >
                                            //     Request
                                            // </button>
                                        )}
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
            <img src={blob2} alt="" style={{ position: "absolute" }} />
            <div className="">
                <Cart cart={cart} setCart={setCart} />
            </div>
        </div>
    );
}

export default GetAllPets;
