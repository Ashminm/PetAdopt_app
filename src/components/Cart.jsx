import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../service/baseUel";

function Cart({ cart, setCart }) {
    useEffect(() => {
        const storedData = localStorage.getItem("CartPets");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCart(parsedData);
        }
    }, []);

    const handleDelete = (index) => {
        const updatedItems = cart.filter((item) => index !== item.Id);
        setCart(updatedItems);

        localStorage.setItem("CartPets", JSON.stringify(updatedItems));
    };

    const handleAllRemove = () => {
        setCart([]);
        localStorage.removeItem("CartPets");
        toast.success("Removed all items", {
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#FFFF",
            },
        });
    };

    return (
        <div className="mt-5 container">
            <Container className="py-5">
                <Row className="justify-content-center align-items-center">
                    <Col xs={12}>
                        <Card className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <Card.Body className="p-0">
                                <Row className="g-0">
                                    <Col lg={8}>
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">My Cart</h1>
                                                <p className="mb-0 text-muted">{cart.length} items</p>
                                            </div>

                                            <hr className="my-4" />

                                            {cart.length === 0 ? (
                                                <>
                                                    <p className="text-center text-danger h3">Your cart is empty.</p>
                                                    <p className="text-center text-danger">
                                                        {" "}
                                                        <Link className="btn border-dark mt-4" to="/List">
                                                            Continue shopping
                                                        </Link>
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    {cart.map((item, index) => (
                                                        <Row
                                                            key={index}
                                                            className="mb-4 d-flex justify-content-between align-items-center"
                                                        >
                                                            <Col md={2} lg={2} xl={2}>
                                                                <img
                                                                    src={`${BASE_URL}/upload/${item.p_image}`}
                                                                    alt="image"
                                                                    className="shadow rounded"
                                                                    height={50}
                                                                    width={60}
                                                                />
                                                            </Col>
                                                            <Col md={3} lg={3} xl={3}>
                                                                <h6 className="text-muted">{item.pname}</h6>
                                                                <h6 className="text-black mb-0">{item.breed}</h6>
                                                            </Col>
                                                            <Col md={3} lg={3} xl={3} className="d-flex align-items-center">
                                                                <Button variant="link" className="px-2">
                                                                    <i className="fa-solid fa-minus"></i>
                                                                </Button>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="1"
                                                                    defaultValue={item.quantity}
                                                                    value={1}
                                                                    size="sm"
                                                                />
                                                                <Button variant="link" className="px-2">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </Button>
                                                            </Col>
                                                            <Col md={3} lg={2} xl={2} className="text-end">
                                                                <h6 className="mb-0">{`₹ ${item.amount}`}</h6>
                                                            </Col>
                                                            <Col md={1} lg={1} xl={1} className="text-end">
                                                                <span onClick={() => handleDelete(item.Id)}>
                                                                    <i
                                                                        className="fa-solid fa-xmark"
                                                                        title="remove item"
                                                                    ></i>
                                                                </span>
                                                            </Col>
                                                            <hr className="my-4" />
                                                        </Row>
                                                    ))}
                                                    <div className="pt-5 d-flex justify-content-between">
                                                        <h6 className="mb-0">
                                                            <Link to={"/List"} className="text-dark">
                                                                Back to shop{" "}
                                                            </Link>
                                                        </h6>
                                                        <span className="btn border-dark" onClick={() => handleAllRemove()}>
                                                            Clear cart
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <Card className="mb-4">
                                            <Card.Header>
                                                <h5 className="mb-0">Summary</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                        Products
                                                        <span>{/* Calculate total products cost */}</span>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                                                        Shipping
                                                        <span>Pulse</span>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                        <div>
                                                            <strong>Total amount</strong>
                                                            <strong>
                                                                <p className="mb-0">(including GST)</p>
                                                            </strong>
                                                        </div>
                                                        <span>
                                                            <strong>{/* Calculate total amount */}0</strong>
                                                        </span>
                                                    </ListGroup.Item>
                                                </ListGroup>

                                                <Card.Footer>
                                                    <Row>
                                                        <Col>
                                                            <Card.Link
                                                                href="#"
                                                                className="btn bg-dark text-light ps-5 pe-5 btn-lg btn-block"
                                                            >
                                                                Go to checkout
                                                            </Card.Link>
                                                        </Col>
                                                    </Row>
                                                </Card.Footer>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Cart;
