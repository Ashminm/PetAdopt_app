import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../service/baseUel";

function Cart({ cart, setCart }) {
    useEffect(() => {
        const storedData = localStorage.getItem("CartPets");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCart(parsedData);
        }
    }, [setCart]);

    const handleDelete = (itemId) => {
        const updatedItems = cart.filter((item) => itemId !== item.Id);
        if (updatedItems) {
            setCart(updatedItems);
            localStorage.setItem("CartPets", JSON.stringify(updatedItems));
            toast.success("Item successfully removed!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#FFFF",
                },
            });
        } else {
            toast.error("Failed to remove item.", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#bb2124",
                },
            });
        }
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

    const totalAmount = cart.reduce((total, item) => {
        const itemAmount = parseFloat(item.amount);
        return isNaN(itemAmount) ? total : total + itemAmount;
    }, 0).toLocaleString('en-IN');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="mt-5 container">
            <Container className="py-5">
                <div className="d-flex justify-content-end">
                    {/* <Link
                    to={"/cart"}
                    className="text-decoration-none border p-3 text-dark"
                    style={{ borderRadius: "50%", cursor: "not-allowed " }}
                > */}
                    <i class="fa-solid fa-cart-shopping" style={{ fontSize: "33px" }}></i>
                    <span
                        className="text-dark ps-2 pe-2 p-1 bg-light "
                        style={{ borderRadius: "50%", position: "absolute", fontSize: "12px" }}
                    >
                        {cart.length}
                    </span>
                    {/* </Link> */}
                </div>
                <Row className="justify-content-center align-items-center">
                    <Col xs={12}>
                        <Card className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <Card.Body className="p-0">
                                <Row className="g-0">
                                    <Col lg={8} md={7}>
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">My Cart</h1>
                                                <p className="mb-0 text-muted">{cart?.length ?? 0} items</p>
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
                                                            <Col md={2} lg={2} xl={2} sm={3}  xs={6}>
                                                                <img
                                                                    src={`${BASE_URL}/upload/${item.p_image}`}
                                                                    alt="image"
                                                                    className="shadow rounded"
                                                                    height={50}
                                                                    width={60}
                                                                />
                                                            </Col>
                                                            <Col md={4} lg={4} xl={6} sm={4}  xs={6}>
                                                                <h6 className="text-muted">{item.pname}</h6>
                                                                <h6 className="text-black mb-0">{item.breed}</h6>
                                                            </Col>
                                                            <Col md={3} lg={2} xl={2}  sm={4}  xs={7} className="text-start">
                                                                <h6 className="mb-0">{`₹ ${item.amount}`}</h6>
                                                            </Col>
                                                            <Col md={1} lg={1} xl={1} sm={1}  xs={1} className="text-center">
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
                                                        <span
                                                            className="btn border-danger text-danger"
                                                            onClick={() => handleAllRemove()}
                                                        >
                                                            Remove all
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={5} sm={12}  xs={12} lg={4}>
                                        <Card className="mb-4">
                                            <Card.Header>
                                                <h5 className="mb-0">Summary</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                        Products
                                                        <span>{cart.length}</span>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                                                        Shipping
                                                        <span>Pulse free</span>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                        <div>
                                                            <strong>Total amount</strong>
                                                            <strong>
                                                                <p className="mb-0">(including GST)</p>
                                                            </strong>
                                                        </div>
                                                        <span>
                                                            <span>₹ {totalAmount}</span>
                                                        </span>
                                                    </ListGroup.Item>
                                                </ListGroup>

                                                <Card.Footer>
                                                    <Row>
                                                        <Col>
                                                            <button className="btn btn-dark w-100 p-2" onClick={handleShow}>
                                                            <i class="fa-solid fa-bolt pe-1"></i> Checkout
                                                            </button>
                                                            <Modal
                                                                show={show}
                                                                onHide={handleClose}
                                                                backdrop="static"
                                                                keyboard={false}
                                                                centered
                                                                size="sm"
                                                                dialogClassName="custom-modal"
                                                            >
                                                                <Modal.Header closeButton className="p-4">
                                                                    <p className="p-1 h1">🛍️</p>
                                                                    <p className="pt-3 h6">Order placed successfully!!</p>
                                                                </Modal.Header>
                                                            </Modal>
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
