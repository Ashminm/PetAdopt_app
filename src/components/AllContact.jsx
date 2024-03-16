import React, { useRef } from "react";
import HowToAdopt from "./HowToAdopt";
import { Form } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import blob2 from "../assets/blob (2).png";
import blob from "../assets/blob.png";

function AllContact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm("service_ik338a8", "template_og0bp1a", form.current, {
                publicKey: "URueRZOg0Fo3p2IWe",
            })
            .then(
                () => {
                    toast.success("Message send successfully!!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#FFFF",
                        },
                    });
                },
                (error) => {
                    toast.error("Message send faild!!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#bb2124",
                        },
                    });
                    console.log("FAILED...", error.text);
                }
            );
    };

    return (
        <div className="">
            <img src={blob2} alt="" style={{ position: "absolute" }} />
            <div
                className="text-dark text-center p-5 d-flex flex-column justify-content-center align-items-center"
                style={{ backgroundColor: "#F4DECB", height: "80vh" }}
            >
                <h1 style={{ fontSize: "70px", zIndex: "1" }}>
                    Get In <span style={{ color: "#94619E" }}>Touch</span>
                </h1>
                <p style={{ fontSize: "20px", paddingTop: "20px" }}>
                    Have questions or ready to embark on your adoption journey? Contact us for personalized <br />{" "}
                    assistance and guidance in bringing home your new furry friend
                </p>
            </div>
            <div className="container">
                <h1 className=" pt-3 mb-5 text-center" style={{ fontSize: "50px" }}>
                    Contact <span style={{ color: "#94619E" }}>Us</span>
                </h1>
                <Form ref={form} onSubmit={sendEmail}>
                    <div className="d-flex">
                        <Form.Group className="mb-3 w-50 me-2 shadow" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                className="p-3 border-dark"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 w-50 shadow " controlId="exampleForm.ControlInput2">
                            <Form.Control
                                type="email"
                                placeholder="Your Email"
                                name="user_email"
                                className="p-3 border-dark"
                                required
                            />
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-3 shadow" controlId="exampleForm.ControlInput3">
                        <Form.Control
                            type="text"
                            placeholder="Subject"
                            name="subject"
                            className="p-3 border-dark"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 shadow" controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            rows={8}
                            placeholder="Message"
                            name="msg"
                            className="p-3 border-dark"
                            required
                        />
                    </Form.Group>

                    <button type="submit" className="btn btn-dark p-3 ps-5 pe-5 mt-3 shadow">
                        Send
                    </button>
                </Form>
                <img src={blob} alt="" style={{ position: "absolute",zIndex:'-1'  }} />
            </div>
            <div className="container mt-5">
                <HowToAdopt />
            </div>
        </div>
    );
}

export default AllContact;
