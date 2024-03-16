import React, { useState, useEffect } from "react";
import { ListGroup, Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { addCatagory, profileUpdateAdminApi } from "../service/allApis";
import { BASE_URL } from "../service/baseUel";
import toast from "react-hot-toast";

function AdminProfile() {
    const [profile, setProfile] = useState({
        username: JSON.parse(localStorage.getItem("currentUser")).username,
        password: JSON.parse(localStorage.getItem("currentUser")).password,
        email: JSON.parse(localStorage.getItem("currentUser")).email,
        location: JSON.parse(localStorage.getItem("currentUser")).location,
        phone: JSON.parse(localStorage.getItem("currentUser")).phone,
        Ad_image: "",
    });
    const [preview, setPreview] = useState("");
    useEffect(() => {
        if (profile.Ad_image) {
            setPreview(URL.createObjectURL(profile.Ad_image));
        } else {
            if (JSON.parse(localStorage.getItem("currentUser")).Ad_image) {
                setPreview(`${BASE_URL}/upload/${JSON.parse(localStorage.getItem("currentUser")).Ad_image}`);
            } else {
                setPreview("");
            }
        }
    }, [profile.Ad_image]);

    const handleProfileUpdate = async () => {
        const { username, password, email, location, phone, Ad_image } = profile;
        if (!username || !password || !email || !location || !phone || !Ad_image) {
            toast("Enter valid data or change image", {
                icon: "⚠️",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#FFFF00",
                },
            });
        } else {
            const reqBody = new FormData();
            reqBody.append("username", username);
            reqBody.append("password", password);
            reqBody.append("email", email);
            reqBody.append("location", location);
            reqBody.append("phone", phone);
            reqBody.append("Ad_image", Ad_image);
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                };
                const result = await profileUpdateAdminApi(
                    reqHeader,
                    reqBody,
                    JSON.parse(localStorage.getItem("currentUser"))._id
                );
                if (result.status === 200) {
                    toast.success("Profile update", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#FFFF",
                        },
                    });
                    navigate("/Login");
                } else {
                    toast.error(result.response.data, {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#bb2124",
                        },
                    });
                }
            } else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                };
                const result = await profileUpdateAdminApi(
                    reqHeader,
                    reqBody,
                    JSON.parse(localStorage.getItem("currentUser"))._id
                );
                if (result.status === 200) {
                    toast.success("Profile update", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#FFFF",
                        },
                    });
                } else {
                    toast.error(result.response.data, {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#bb2124",
                        },
                    });
                }
            }
        }
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.success("Logged out successfully", {
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#FFFF",
            },
        });
        navigate("/Login");
    };

    // console.log(profile);
    return (
        <div className="shadow h-100 mb-3">
            <div className="pt-4 d-flex justify-content-between">
                <h4 className="ps-3">PetPulse</h4>
                <h4 className="me-3">
                    <i class="fa-solid fa-bars"></i>
                </h4>
            </div>
            <div className="mt-4 row justify-content-center">
                <label htmlFor="profile" className="text-center">
                    <input
                        type="file"
                        id="profile"
                        className="d-none"
                        onChange={(e) => setProfile({ ...profile, Ad_image: e.target.files[0] })}
                    />
                    <img
                        src={preview ? preview : "https://cdn-icons-png.flaticon.com/256/3135/3135715.png"}
                        style={{ borderRadius: "50%" }}
                        width={80}
                        height={80}
                        alt=""
                    />
                    <p className="pt-4">{profile.username}</p>
                </label>
                <div className="">
                    <ListGroup>
                        <ListGroup.Item action variant="primary" className="mb-3 mt-2 ms-2 ">
                            <Link
                                to={"/Admdash"}
                                className="text-decoration-none"
                                style={{ color: "#94619E", fontWeight: "600" }}
                            >
                                <i class="fa-solid fa-file pe-3"></i>Dashboard
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item action variant="light" className="mb-3 ms-2 ">
                            <Link to={"/"} className="text-decoration-none" style={{ color: "#94619E", fontWeight: "600" }}>
                                <i class="fa-solid fa-house pe-3"></i>Home
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item action variant="light" className="mb-3 ms-2 ">
                            <Link
                                to={"/List"}
                                className="text-decoration-none"
                                style={{ color: "#94619E", fontWeight: "600" }}
                            >
                                <i class="fa-solid fa-list pe-3"></i>Pets
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item action variant="light" className="mb-3 ms-2 ">
                            <Link
                                to={"/history"}
                                className="text-decoration-none"
                                style={{ color: "#94619E", fontWeight: "600" }}
                            >
                                <i class="fa-solid fa-clock-rotate-left pe-2"></i>History
                            </Link>
                        </ListGroup.Item>
                        <div className="">
                            <p className="ps-2">Add Information</p>
                            <input
                                type="text"
                                className="form-control border-dark"
                                defaultValue={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        </div>

                        <ListGroup.Item action variant="info" className="mt-2 mb-3 ms-2 " onClick={handleProfileUpdate}>
                            <Link className="text-decoration-none" style={{ color: "#94619E", fontWeight: "600" }}>
                                <i class="fa-solid fa-floppy-disk pe-3"></i>Save profile
                            </Link>
                        </ListGroup.Item>

                        <hr />
                        <ListGroup.Item action variant="danger" className="mt-2 mb-3 ms-2 " onClick={handleShow}>
                            <Link className="text-decoration-none" style={{ color: "#94619E", fontWeight: "600" }}>
                                <i class="fa-solid fa-right-from-bracket pe-3"></i>Logout
                            </Link>
                        </ListGroup.Item>
                        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered size="sm" dialogClassName="custom-modal">
                            <Modal.Body>
                                <div className="p-4">
                                    <div className="">
                                        <h3 className="pb-2">Log out?</h3>
                                    </div>
                                    <div className="pb-3">
                                        <p>
                                            Are you sure want to log out?{" "}
                                            <span className="text-danger">{profile.username}</span>
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <Button
                                            variant="light"
                                            id="Transparant"
                                            className="border border-dark ms-4  ps-3 pe-3 pt-2 pb-2"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button variant="dark" className="me-4  ps-3 pe-3 pt-2 pb-2"  onClick={handleLogout}>
                                            Log out
                                        </Button>
                                    </div>
                                </div>
                                <i>
                                    <p className="text-end pe-4 m-0" style={{ fontSize: "12px" }}>
                                        Admin
                                    </p>
                                </i>
                            </Modal.Body>
                        </Modal>
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
