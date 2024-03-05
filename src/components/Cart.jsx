import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../service/baseUel";

function Cart({ cart }) {
  const [cartItems, setCartItems] = useState([]);
  
    useEffect(() => {
        const storedData = localStorage.getItem("currentUser");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCartItems(parsedData);
        }
    }, []);
    useEffect(() => {
       
        setCartItems([
          ...cartItems,
       
          {
            pname: cart.pname || "",
            breed: cart.breed || "",
            amount: cart.amount || "",
            p_image: cart.p_image || "",
            userid: cart.userid || "",
        }, ]);
    }, [cart]);



    const handleRemove = (userid) => {
      const updatedCart = cartItems.filter((item) => item.userid !== userid);
      setCartItems(updatedCart);
    };
  
    console.log(cartItems);

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

                                            {cart.map((item, index) => (
                                                <Row
                                                    key={index}
                                                    className="mb-4 d-flex justify-content-between align-items-center"
                                                >
                                                    <Col md={2} lg={2} xl={2}>
                                                        <img
                                                            src={item.p_image}
                                                            alt="no img"
                                                            style={{ width: "100%", height: "auto" }}
                                                        />
                                                    </Col>
                                                    <Col md={3} lg={3} xl={3}>
                                                        <h6 className="text-muted">{item.pname}</h6>
                                                        <h6 className="text-black mb-0">{item.breed}</h6>
                                                    </Col>
                                                    <Col md={3} lg={3} xl={3} className="d-flex align-items-center">
                                                        <Button variant="link" className="px-2">
                                                            <i class="fa-solid fa-minus"></i>
                                                        </Button>
                                                        <Form.Control
                                                            type="number"
                                                            min="0"
                                                            defaultValue={item.quantity}
                                                            value={1}
                                                            size="sm"
                                                        />
                                                        <Button variant="link" className="px-2">
                                                            <i class="fa-solid fa-plus"></i>
                                                        </Button>
                                                    </Col>
                                                    <Col md={3} lg={2} xl={2} className="text-end">
                                                        <h6 className="mb-0">{`₹ ${item.amount}`}</h6>
                                                    </Col>
                                                    <Col md={1} lg={1} xl={1} className="text-end">
                                                       <span onClick={()=>handleRemove(item.userid)}>
                                                       <i class="fa-solid fa-xmark" title="remove item"></i>
                                                       </span>
                                                           
                                                        
                                                    </Col>
                                                    <hr className="my-4" />
                                                </Row>
                                            ))}
                                            <div className="pt-5">
                                                <h6 className="mb-0">
                                                    <Link to={"/List"} className="text-dark">
                                                        Back to shop{" "}
                                                    </Link>
                                                </h6>
                                            </div>
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
                                                        <span>{/* Calculate total products cost */}0</span>
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
