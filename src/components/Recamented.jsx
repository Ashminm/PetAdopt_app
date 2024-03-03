import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Recamented() {
    return (
        <div>
            <Card className="shadow">
                <Card.Header as="h5">Recoamented </Card.Header>
                <Card.Body style={{backgroundImage: "linear-gradient(#f1271157,#f5af196e)"}}>
                    <Row className="p-2">
                        <Col sm="12" md="1 p-2" className=" d-flex justify-content-center align-items-center">
                           <div className="border border-dark text-light" style={{borderRadius:'50%',backgroundColor:'#49274A',padding:'15px 17px 13px 17px'}}>
                           <i class="fa-solid fa-star"></i>
                           </div>
                        </Col>
                        <Col sm="12" md="9 p-2">
                            <Card.Title className="text-dark">Discover and Filter Favorite Pets</Card.Title>
                            <Card.Text className="text-dark">Effortlessly discover and filter your favorite pets with a user-friendly search feature, tailored to your preferences.</Card.Text>
                        </Col>
                        <Col sm="12" md="2 p-2" className="d-flex justify-content-center align-items-center">
                            <Link
                                to={"/List"}
                                className="btn text-light ps-4 pt-3 pb-3 pe-4 shadow"
                                style={{ backgroundColor: "#49274A", borderRadius: "30px" }}
                            >
                                Search favorate
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Recamented;
