import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import blob from "../assets/blob.png";

function Footer({ loginL }) {
    return (
        <div style={{ backgroundColor: "#49274A" }}>
            <div className="container text-light">
                <Row className="p-5">
                    <Col sm="12" md="4">
                        <h1>PetPulse</h1>
                        <p style={{ fontSize: "16px", lineHeight: "28px" }}>
                            The ultimate online destination for pet adoption, connecting loving homes with furry companions.
                            Browse profiles, find your perfect match, and embark on a heartwarming journey of pet
                            parenthood. Discover joy, one adoption at a time, with PetPulse.
                        </p>
                    </Col>
                    <Col sm="12" md="2" className="d-flex flex-column">
                        <h1>Explore</h1>
                        <Link to={"/"} className="text-decoration-none text-light p-1" style={{ fontSize: "18px" }}>
                            Explore
                        </Link>

                        {loginL ? (
                            <Link
                                to={"/Adopt"}
                                className="text-decoration-none text-light p-1"
                                style={{ fontSize: "18px" }}
                            >
                                Adopt
                            </Link>
                        ) : (
                            <Link
                                to={"/Login"}
                                className="text-decoration-none text-light p-1"
                                style={{ fontSize: "18px" }}
                            >
                                Contact
                            </Link>
                        )}
                        {loginL ? (
                            <Link to={"/List"} className="text-decoration-none text-light p-1" style={{ fontSize: "18px" }}>
                                Pets
                            </Link>
                        ) : (
                            <Link
                                to={"/Login"}
                                className="text-decoration-none text-light p-1"
                                style={{ fontSize: "18px" }}
                            >
                                Contact
                            </Link>
                        )}
                        {/* <Link to={'/Login'} className="text-decoration-none text-light p-1" style={{fontSize:'18px'}} >login</Link> */}
                        {loginL ? (
                            <Link
                                to={"/Contact"}
                                className="text-decoration-none text-light p-1"
                                style={{ fontSize: "18px" }}
                            >
                                Contact
                            </Link>
                        ) : (
                            <Link
                                to={"/Login"}
                                className="text-decoration-none text-light p-1"
                                style={{ fontSize: "18px" }}
                            >
                                Contact
                            </Link>
                        )}
                        {/* <Link to={'/Admdash'} className="text-decoration-none text-light p-1" style={{fontSize:'18px'}} >AdminDash</Link> */}
                    </Col>
                    <Col sm="12" md="3">
                        <h1>Contact</h1>
                        <p style={{ fontSize: "14px", lineHeight: "28px" }}>
                            A108 Willa Street <br /> Mumbai, NY 535022 <br /> India
                        </p>
                    </Col>
                    <Col sm="12" md="1">
                        {" "}
                        <img src={blob} alt="" style={{ position: "absolute" }} />
                    </Col>
                    <Col sm="12" md="2">
                        <a href="#">
                            <i
                                class="fa-brands fa-instagram p-3 m-2 border"
                                style={{ color: "#ffffff", borderRadius: "50%" }}
                            ></i>
                        </a>
                        <a href="#">
                            <i
                                class="fa-brands fa-x-twitter p-3 m-2 border"
                                style={{ color: "#ffffff", borderRadius: "50%" }}
                            ></i>
                        </a>

                        <a href="#">
                            <i
                                class="fa-brands fa-github p-3 m-2 border"
                                style={{ color: "#ffffff", borderRadius: "50%" }}
                            ></i>
                        </a>
                    </Col>
                </Row>

                <hr />
                <p style={{ textAlign: "center", fontSize: "18px", padding: "20px" }}>
                    Copyright &#169; PetPulse.All right reserved.
                </p>
            </div>
        </div>
    );
}

export default Footer;
