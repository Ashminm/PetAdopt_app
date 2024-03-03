import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import landingTop from "../assets/Landing-top1.png";
import landingbg from "../assets/landing-bg.png";
import blob2 from "../assets/blob (2).png";
import { Link } from "react-router-dom";
import Catagory from "../components/Catagory";
import DirectCon from "../components/DirectCon";
import HowToAdopt from "../components/HowToAdopt";

function Landing() {
    const [loginL, setLoginL] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            setLoginL(true);
        } else {
            setLoginL(false);
        }
    });
    return (
        <div>
            <div style={{ backgroundColor: "#F4DECB" }}>
                <img src={blob2} alt="" style={{ position: "absolute" }} />
                <Row className="align-items-center h-100">
                    <Col sm="12" md="2"></Col>
                    <Col sm="12 p-4" md="5" style={{ zIndex: "1" }}>
                        <h1>
                            Home for <br />
                            <span style={{ fontSize: "60px" }}>
                                Every <span style={{ color: "#94619E" }}>Pet</span>
                            </span>
                        </h1>
                        <p style={{ fontSize: "20px" }}>
                            Discover joy through adoption. Find your perfect furry companion <br /> and create a forever
                            home filled with love and happiness.
                        </p>
                        {loginL ? (
                            <Link
                                to={"/Adopt"}
                                className="btn text-light ps-5 pt-3 pb-3 pe-5 shadow"
                                style={{ backgroundColor: "#49274A", borderRadius: "50px" }}
                            >
                                Lets Adopt
                            </Link>
                        ) : (
                            <Link
                                to={"/Login"}
                                className="btn text-light ps-5 pt-3 pb-3 pe-5 shadow"
                                style={{ backgroundColor: "#49274A", borderRadius: "27px" }}
                            >
                                Get start
                            </Link>
                        )}
                    </Col>

                    <Col sm="12" md="5 ">
                        <img src={landingTop} className="img-fluid" alt="no image" style={{ width: "85%" }} />
                    </Col>
                </Row>
            </div>
            <div className="container text-center pt-5">
                <p className="m-0 text-secondary">-MEET US-</p>
                <h1 style={{ fontSize: "30px" }}>
                    Popular <span style={{ color: "#94619E" }}>Breeds </span>
                </h1>
                <img src={landingbg} alt="" style={{ position: "absolute", width: "9%", zIndex: "-1" }} />
                {loginL ? (
                    <Link to={"/List"} className="text-decoration-none text-dark">
                        <Catagory />
                    </Link>
                ) : (
                    <Link to={"/Login"} className="text-decoration-none text-dark">
                        <Catagory />
                    </Link>
                )}

                <div className="text-center pb-5">
                    {loginL ? (
                        <Link
                            to={"/List"}
                            className="btn text-light ps-5 pt-3 pb-3 pe-5 shadow"
                            style={{ backgroundColor: "#49274A", borderRadius: "30px" }}
                        >
                            See more
                        </Link>
                    ) : (
                        <Link
                            to={"/Login"}
                            className="btn text-light ps-5 pt-3 pb-3 pe-5 shadow"
                            style={{ backgroundColor: "#49274A", borderRadius: "30px" }}
                        >
                            Login to see
                        </Link>
                    )}
                </div>
            </div>
            <div>
                <img src={landingbg} alt="" style={{ position: "absolute", width: "20%", zIndex: "-1" }} />
                <HowToAdopt />
            </div>
            <div className="container text-center pt-5 mb-5">
                <p className="m-0 text-secondary">-MEET US-</p>
                <h1 style={{ fontSize: "30px" }}>
                    Best <span style={{ color: "#94619E" }}>Choice</span>
                </h1>
                {loginL ? (
                    <Link to={"/List"} className="text-decoration-none text-dark">
                        <Catagory />
                    </Link>
                ) : (
                    <Link to={"/Login"} className="text-decoration-none text-dark">
                        <Catagory />
                    </Link>
                )}
            </div>
            <div style={{ backgroundColor: "#F8EEE7" }}>
                <DirectCon loginL={loginL} />
            </div>
        </div>
    );
}

export default Landing;
