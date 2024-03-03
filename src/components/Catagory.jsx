import React from "react";
import cardIMG from "../assets/cat.jpg";
import cardIMG1 from "../assets/dog.jpg";
import cardIMG2 from "../assets/squ.jpg";
import cardIMG3 from "../assets/Boxer.jpg";

function AnimalList() {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center m-3" style={{ flexWrap: "wrap" }}>
                <div
                    className="d-flex justify-content-center align-items-center flex-column m-3 rounded shadow"
                    style={{ backgroundColor: "#F4DECB", width: "130px", height: "130px" }}
                >
                    <div
                        className="m-3"
                        style={{ backgroundColor: "#94619E", width: "5rem", height: "5rem", borderRadius: "50%" }}
                    >
                        <img src={cardIMG1} alt="" style={{ width: "100%" }} />
                    </div>
                    <p className="m-0 fw-bold">Beagle</p>
                </div>

                <div
                    className="d-flex justify-content-center align-items-center flex-column m-3 rounded shadow"
                    style={{ backgroundColor: "#F4DECB", width: "130px", height: "130px" }}
                >
                    <div
                        className="m-3"
                        style={{ backgroundColor: "#94619E", width: "5rem", height: "5rem", borderRadius: "50%" }}
                    >
                        <img src={cardIMG} alt="" style={{ width: "100%" }} />
                    </div>
                    <p className="m-0 fw-bold">Ragdoll</p>
                </div>

                <div
                    className="d-flex justify-content-center align-items-center flex-column m-3 rounded shadow"
                    style={{ backgroundColor: "#F4DECB", width: "130px", height: "130px" }}
                >
                    <div
                        className="m-3"
                        style={{ backgroundColor: "#94619E", width: "5rem", height: "5rem", borderRadius: "50%" }}
                    >
                        <img src={cardIMG2} alt="" style={{ width: "100%" }} />
                    </div>
                    <p className="m-0 fw-bold">Fox squirrel</p>
                </div>

                <div
                    className="d-flex justify-content-center align-items-center flex-column m-3 rounded shadow"
                    style={{ backgroundColor: "#F4DECB", width: "130px", height: "130px" }}
                >
                    <div
                        className="m-3"
                        style={{ backgroundColor: "#94619E", width: "5rem", height: "5rem", borderRadius: "50%" }}
                    >
                        <img src={cardIMG3} alt="" style={{ width: "100%" }} />
                    </div>
                    <p className="m-0 fw-bold">Boxer</p>
                </div>
            </div>
        </div>
    );
}

export default AnimalList;
