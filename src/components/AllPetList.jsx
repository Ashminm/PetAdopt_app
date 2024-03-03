import React from "react";
import ALLPETS from "./ALLPETS";
import HowToAdopt from "./HowToAdopt";
import Img1 from "../assets/blob.png";
import DirectCon from "./DirectCon";
import GetAllPets from "./GetAllPets";

function AllPetList() {
    return (
        <div>
            <img src={Img1} alt="" style={{ position: "absolute" }} />
            <div
                className="text-dark text-center p-5 d-flex flex-column justify-content-center align-items-center"
                style={{ backgroundColor: "#F4DECB", height: "80vh" }}
            >
                <h1 style={{ fontSize: "70px", zIndex: "1" }}>
                    Find Your Perfect <span style={{ color: "#94619E" }}>Match</span>{" "}
                </h1>
                <p style={{ fontSize: "20px", paddingTop: "20px" }}>
                Discover your perfect pet match by utilizing our intuitive search and filter features, tailoring <br /> your search to find the ideal companion based  on your <br /> preferences and criteria
                </p>
            </div>
            <h1 style={{ fontSize: "50px" }} className="text-center pt-5">
                    All Pets
                </h1>
            <div className="">
                <GetAllPets/>
            </div>
            <div>
                <HowToAdopt />
            </div>
            <div>
                <DirectCon/>
            </div>
           
        </div>
    );
}

export default AllPetList;
