import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../service/allApis";
import toast, { Toaster } from "react-hot-toast";

function Auth({ register }) {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e, field) => {
        setUserData({ ...userData, [field]: e.target.value });
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
        setTimeout(() => {
            setShowPassword(false);
        }, 300);
    };

    const navigate = useNavigate();
    const handleRegistration = async (e) => {
        e.preventDefault();
        if (!userData.username || !userData.password || !userData.email) {
            toast("Enter values to every fields!", {
                icon: "⚠️",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#FFFF00",
                },
            });
        } else {
            const res = await registerApi(userData);
            if (res.status === 200) {
                toast.success(`Registration of ${res.data.username} is successfull!!`, {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#FFFF",
                    },
                });
                setUserData({ username: "", password: "", email: "" });
                navigate("/Login");
            } else {
                toast.error(res.response.data, {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#FFF",
                    },
                });
            }
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = userData;
        if (!email || !password) {
            toast("Enter Email and Password!", {
                icon: "⚠️",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#FFFF00",
                },
            });
        } else {
            const res = await loginApi(userData);
            if (res.status === 200 && res.data.existingUser) {
                localStorage.setItem("currentUser", JSON.stringify(res.data.existingUser));
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("token", res.data.token);

                toast.success("Successfully Login!!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#FFF",
                    },
                });
                setUserData({ username: "", password: "", email: "" });
                navigate("/");
            } else if (res.status === 200 && res.data.existingAdmin) {
                localStorage.setItem("currentUser", JSON.stringify(res.data.existingAdmin));
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("token", res.data.token);

                toast.success("Successfully Login!!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#FFF",
                    },
                });
                setUserData({ username: "", password: "", email: "" });
                navigate("/Admdash");
            } else {
                toast.error("Login Faild!! Try again", {
                    richColors: true,
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#FFF",
                    },
                });
            }
        }
    };

    const registration = register ? true : false;
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ backgroundImage: "linear-gradient(#F4DECB,#F8EEE7)", width: "100%", height: "85vh" }}
        >
            <div
                className="d-flex m-3 shadow"
                style={{ width: "100%", maxWidth: "650px", height: "auto", backgroundColor: "#ffffff3d", flexWrap: "wrap" }}
            >
                <div
                    className="col-12 col-lg-5 p-5 d-flex flex-column align-items-center justify-content-center"
                    style={{ backgroundColor: "#94619e2f" }}
                >
                    <div className="text-center">
                        <h1 className="text-dark mb-4 ">{registration ? "Welcome!" : "Hello!"}</h1>
                        {registration ? (
                            <Link
                                to={"/Login"}
                                className="btn text-light ps-4 pt-2 pb-2 pe-4 shadow"
                                style={{ backgroundColor: "#49274A", borderRadius: "30px" }}
                            >
                                Login
                            </Link>
                        ) : (
                            <Link
                                to={"/Register"}
                                className="btn text-light ps-4 pt-2 pb-2 pe-4 shadow"
                                style={{ backgroundColor: "#49274A", borderRadius: "30px" }}
                            >
                                Sign Up
                            </Link>
                        )}
                    </div>
                </div>

                <div className="col-12 col-lg-7 p-5">
                    <h3>{registration ? "Create account" : "Login PetPulse!"}</h3>
                    <Form className="w-100 text-dark fw-bold mt-3">
                        {registration && (
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={userData.username}
                                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                />
                            </Form.Group>
                        )}

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput3">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={userData.password}
                                onChange={(e) => handleInputChange(e, "password")}
                            />
                            <Form.Text className="text-muted">
                                <Button variant="link" onClick={toggleShowPassword} className="text-dark">
                                    {showPassword ? "Hide" : "Show"} Password
                                </Button>
                            </Form.Text>
                        </Form.Group>
                        {registration ? (
                            <div>
                                <Button
                                    type="submit"
                                    className="btn text-light ps-4 pt-2 pb-2 pe-4 w-100 mt-3"
                                    style={{ backgroundColor: "#49274A", borderRadius: "30px" }}
                                    onClick={handleRegistration}
                                >
                                    Sign up
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Button
                                    type="submit"
                                    className="btn text-light ps-4 pt-2 pb-2 pe-4 w-100 mt-3"
                                    style={{ backgroundColor: "#49274A", borderRadius: "30px" }}
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                                <hr />
                                <p>Admin can also login</p>
                                <p>
                                    <Link to={"/"} className="text-dark">
                                        Back to Home
                                    </Link>
                                </p>
                            </div>
                        )}
                    </Form>
                </div>
            </div>

            {/* <Toaster /> */}
        </div>
    );
}

export default Auth;
