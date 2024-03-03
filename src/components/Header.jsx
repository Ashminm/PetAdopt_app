import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import toast from "react-hot-toast";

function Header({ loginL }) {
    const closeNavbar = () => {
        const navbarToggle = document.querySelector(".navbar-toggler");
        if (navbarToggle) {
            navbarToggle.click();
        }
    };

    const handleLinkClick = () => {
        toast(loginL ? "" : "You're not logged in! You must log in to access the page", {
            icon: "⚠️",
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#FFFF00",
            },
        });
    };

    return (
        <div style={{ backgroundColor: "#F4DECB" }}>

            {loginL ? (
                <Navbar className="Navy container" collapseOnSelect expand="full">
                    <Navbar.Brand style={{ fontSize: "35px" }}>PetPulse</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginRight: "3px" }} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto container p-3">
                            <Nav.Link style={{ fontSize: "20px", fontWeight: "600" }} onClick={closeNavbar}>
                                <Link to={"/"} className="text-decoration-none text-dark">
                                    Home
                                </Link>
                            </Nav.Link>
                            {loginL ? (
                                <Nav.Link style={{ fontSize: "20px", fontWeight: "600" }} onClick={closeNavbar}>
                                    <Link to={"/Adopt"} className="text-decoration-none text-dark">
                                        Adopt a Pet
                                    </Link>
                                </Nav.Link>
                            ) : (
                                <Nav.Link style={{ fontSize: "20px", fontWeight: "600" }} onClick={closeNavbar}>
                                    <Link
                                        to={"/Login"}
                                        className="text-decoration-none text-dark"
                                        onClick={handleLinkClick}
                                    >
                                        Adopt a Pet
                                    </Link>
                                </Nav.Link>
                            )}
                            {loginL ? (
                                <Nav.Link style={{ fontSize: "20px", fontWeight: "600" }} onClick={closeNavbar}>
                                    <Link to={"/List"} className="text-decoration-none text-dark">
                                        All pets
                                    </Link>
                                </Nav.Link>
                            ) : (
                                <Nav.Link style={{ fontSize: "20px", fontWeight: "600" }} onClick={closeNavbar}>
                                    <Link
                                        to={"/Login"}
                                        className="text-decoration-none text-dark"
                                        onClick={handleLinkClick}
                                    >
                                        Adopt a Pet
                                    </Link>
                                </Nav.Link>
                            )}
                            <Nav.Link style={{ fontSize: "20px", fontWeight: "600" }} onClick={closeNavbar}>
                                {" "}
                                <Link to={"/Contact"} className="text-decoration-none text-dark">
                                    Contact
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            ) : (
                <Navbar style={{ backgroundColor: "#F4DECB" }}>
                    <Container>
                        <Navbar.Brand style={{ fontSize: "30px" }}>Petpulse</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Link to={"/Login"} className="btn border-dark ">
                                    Sign in
                                </Link>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
        </div>
    );
}

export default Header;
