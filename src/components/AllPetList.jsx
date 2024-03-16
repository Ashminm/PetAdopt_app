import React from "react";
import HowToAdopt from "./HowToAdopt";
import DirectCon from "./DirectCon";
import GetAllPets from "./GetAllPets";
import blob2 from "../assets/landing-bg.png";

function AllPetList() {
    return (
        <div>
            <img src={blob2} alt="" width={200} style={{ position: "absolute", right: 0, bottom: 100 }} />
            <div
                className="text-dark text-center p-5 d-flex flex-column justify-content-center align-items-center"
                style={{ backgroundColor: "#F4DECB", height: "80vh" }}
            >
                <h1 style={{ fontSize: "70px", zIndex: "1" }}>
                    Find Your Perfect <span style={{ color: "#94619E" }}>Match</span>{" "}
                </h1>
                <p style={{ fontSize: "20px", paddingTop: "20px", zIndex: "1" }}>
                    Discover your perfect pet match by utilizing our intuitive search and filter features, tailoring <br />{" "}
                    your search to find the ideal companion based on your <br /> preferences and criteria
                </p>
            </div>
            <h1 style={{ fontSize: "50px" }} className="text-center pt-5">
                All Pets
            </h1>
            <div className="">
                <GetAllPets />
            </div>
            <div>
                <HowToAdopt />
            </div>
            <div>
                <DirectCon />
            </div>
        </div>
    );
}

export default AllPetList;
