import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileUpdateApi } from "../service/allApis";
import { BASE_URL } from "../service/baseUel";
import toast from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";

function Profile() {
    const [profile, setProfile] = useState({
        username: JSON.parse(localStorage.getItem("currentUser")).username,
        password: JSON.parse(localStorage.getItem("currentUser")).password,
        email: JSON.parse(localStorage.getItem("currentUser")).email,
        licenceId: JSON.parse(localStorage.getItem("currentUser")).licenceId,
        location: JSON.parse(localStorage.getItem("currentUser")).location,
        phone: JSON.parse(localStorage.getItem("currentUser")).phone,
        image: "",
    });

    const [preview, setPreview] = useState("");
    useEffect(() => {
        if (profile.image) {
            setPreview(URL.createObjectURL(profile.image));
        } else {
            if (JSON.parse(localStorage.getItem("currentUser")).image) {
                setPreview(`${BASE_URL}/upload/${JSON.parse(localStorage.getItem("currentUser")).image}`);
            } else {
                setPreview("");
            }
        }
    }, [profile.image]);
    // console.log(profile);
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

    const handleProfileUpdate = async () => {
        const { username, password, email, image, licenceId, location, phone } = profile;
        if (!username || !password || !email || !image || !location || !licenceId || !phone) {
            toast("Enter valid data or Change your photo!!", {
                icon: "⚠️",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#FFFF00",
                },
            });
            // console.log(username,password,email,location,licenceId,image);
            // console.log(profile);
        } else {
            const reqBody = new FormData();
            reqBody.append("username", username);
            reqBody.append("password", password);
            reqBody.append("email", email);
            reqBody.append("licenceId", licenceId);
            reqBody.append("location", location);
            reqBody.append("image", image);
            reqBody.append("phone", phone);
            // console.log(reqBody);
            const id = JSON.parse(localStorage.getItem("currentUser"))._id;
            // console.log(profile);
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                };
                const result = await profileUpdateApi(reqHeader, reqBody, id);
                if (result.status === 200) {
                    // toast.success("Profile Updated!!")
                    toast.success("profile updated", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#FFFF",
                        },
                    });
                    navigate("/login");
                } else {
                    toast.error("Updation Failed!!", {
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
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                const result = await profileUpdateApi(reqHeader, reqBody, id);
                if (result.status === 200) {
                    toast.success("Profile Updated!!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#FFFF",
                        },
                    });
                } else {
                    toast.error("Updation Failed!!", {
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

    return (
        <div>
            <div className="card p-4 m-0 " style={{ backgroundColor: "#f8eee7b6" }}>
                <div className="mt-3 row justify-content-center">
                    <label htmlFor="profile" className="text-center">
                        <input
                            type="file"
                            id="profile"
                            className="d-none"
                            // defaultValue={profile.image}
                            onChange={(e) => setProfile({ ...profile, image: e.target.files[0] })}
                        />
                        <img
                            src={preview ? preview : "https://cdn-icons-png.flaticon.com/256/3135/3135715.png"}
                            style={{ borderRadius: "50%" }}
                            width={80}
                            height={80}
                            alt=""
                        />
                        <p>Edit profile picture</p>
                    </label>
                    <h6 className="pt-4">Change your information</h6>
                    {/* <h6>{profile.username}</h6> */}
                    <div className="mt-2">
                        <input
                            type="text"
                            className="form-control p-2"
                            placeholder="Your full Name"
                            defaultValue={profile.username}
                            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        />
                    </div>
                    <div className="mt-3 mb-1">
                        <input
                            type="text"
                            className="form-control p-2"
                            placeholder="Your Pet license ID"
                            style={{ textTransform: "uppercase" }}
                            defaultValue={profile.licenceId}
                            onChange={(e) => setProfile({ ...profile, licenceId: e.target.value })}
                        />
                    </div>
                    <div className="mt-3 mb-4">
                        <input
                            type="text"
                            className="form-control p-2"
                            placeholder="Your district"
                            defaultValue={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        />
                    </div>

                    <h6>Private information</h6>

                    <div className="">
                        <input
                            type="text"
                            className="form-control p-2"
                            placeholder="Your email-ID"
                            defaultValue={profile.email}
                            onChange={(e) => setProfile({ ...Profile, email: e.target.value })}
                        />
                    </div>
                    <div className="mt-3 mb-3">
                        <input
                            type="text"
                            className="form-control p-2"
                            placeholder="Your phone number"
                            defaultValue={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                    </div>

                    <div className="mt-1 mb-3 w-50  btn btn-dark p-2" onClick={handleProfileUpdate}>
                        Save profile
                    </div>
                    <hr />
                    <div className="mt-1 mb-3 w-75 btn btn-dark p-2" onClick={handleShow}>
                        Logout
                    </div>
                    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered size="sm" dialogClassName="custom-modal">
                        <Modal.Body>
                            <div className="p-3">
                                <div className="">
                                    <h3 className="pb-2">Log out?</h3>
                                </div>
                                <div className="pb-3">
                                    <p>
                                        Are you sure want to log out?{" "}
                                        <span className="text-danger">{profile.username}</span>{" "}
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
                                    <Button variant="dark" className="me-4 ps-3 pe-3 pt-2 pb-2" onClick={handleLogout}>
                                        Log out
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                        <i>
                            <p className="text-end pe-4" style={{ fontSize: "10px" }}>
                                User
                            </p>
                        </i>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Profile;
