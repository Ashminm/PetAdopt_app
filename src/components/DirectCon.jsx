import React from "react";
import { Col, Row } from "react-bootstrap";
import conOne from "../assets/image-card.png";
import { Link } from "react-router-dom";
function DirectCon({loginL}) {
    return (
        <div className="pt-5 pb-5 container">
            <Row style={{ alignItems: "center" }}>
                <Col sm="12" md="6">
                    <img src={conOne} alt="" style={{ width: "110%" }} />
                </Col>
                <Col sm="12" md="6 " style={{ alignItems: "center" }}>
                    <span className="text-end">-PET READINESS-</span>
                    <h1 style={{ fontSize: "55px", marginTop: "10px", paddingBottom: "20px" }}>
                        Embrace Pet Parenthood:
                        <br />{" "}
                        <span style={{ fontSize: "48px" }}>
                            Are You <span style={{ color: "#94619E" }}>Ready?</span>{" "}
                        </span>
                    </h1>
                    <p style={{ fontSize: "18px" }}>
                        Ready to become a pet parent? Embrace the joy of companionship by adopting a furry friend today!
                        Whether you're drawn to playful puppies or serene senior pets, contact us to find your perfect
                        match. Experience the unconditional love and fulfillment that comes with welcoming a pet into your
                        home.
                    </p>
                    <p style={{ fontSize: "18px" }}>
                        Our dedicated team is here to guide you through the adoption process, ensuring a seamless transition
                        for both you and your new companion. Contact us now to start the rewarding journey of pet
                        parenthood!
                    </p>
                    {
                        loginL ? (
                            <Link
                            to={"/List"}
                            className="btn text-light ps-5 pt-3 pb-3 pe-5 shadow mt-4"
                            style={{ backgroundColor: "#49274A", borderRadius: "50px" }}
                            title="Review pets after purcase"
                        >
                              Review
                        </Link>
                        ) : (
                            <Link
                            to={"/Contact"}
                            className="btn text-light ps-5 pt-3 pb-3 pe-5 shadow mt-4"
                            style={{ backgroundColor: "#49274A", borderRadius: "50px" }}
                        >
                            Contact
                          
                        </Link>
                        )
                    }
                   
                </Col>
            </Row>
        </div>
    );
}

export default DirectCon;
