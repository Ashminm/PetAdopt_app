import React from "react";
import { Accordion } from "react-bootstrap";

function HowToAdopt() {
    return (
        <div className="container text-center">
            <span className="pt-3">-GET A PET-</span>
            <h1 className="pb-4" style={{ fontSize: "60px" }}>
                How To Adopt A <span style={{ color: "#94619E" }}>Pet</span>
            </h1>
            <p style={{ fontSize: "18px" }}>
                Explore reputable online adoption platforms, browse profiles, and connect
                <br /> with shelters or rescues. Complete the adoption process to <br />
                welcome your new furry friend into your home.
            </p>
            <div className="pt-5 d-flex justify-content-center pb-5 ">
                <Accordion defaultActiveKey="0" className="shadow text-start" style={{ width: "80%" }}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Adopt: Follow PetPulse's Simple Steps</Accordion.Header>
                        <Accordion.Body>
                            "Discover joy through pet adoption with PetPulse. Find your perfect companion by browsing
                            profiles, completing an easy application, and finalizing the adoption seamlessly online.
                            Experience the love of a furry friend today!"
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Step 1. Filter and Select a Pet</Accordion.Header>
                        <Accordion.Body>
                            Use the search filters on the adoption website to narrow down your preferences, such as the type
                            of pet, breed, age, and location. Once you find a pet that matches your criteria, click on their
                            profile to learn more about their background, health, and temperament.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Step 2. Contact the Shelter or Rescue Organization</Accordion.Header>
                        <Accordion.Body>
                            Reach out to the shelter or rescue organization responsible for the pet you're interested in.
                            Use the provided contact information on the adoption website to inquire about the pet's
                            availability, adoption process, and any specific requirements they may have.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Step 3. Complete Adoption Application</Accordion.Header>
                        <Accordion.Body>
                            Most shelters and rescue organizations require potential adopters to fill out an adoption
                            application form. This form typically includes questions about your living situation, experience
                            with pets, and your ability to provide proper care. Complete the application accurately and
                            provide any necessary documentation they may request.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Step 4. Meet and Finalize Adoption</Accordion.Header>
                        <Accordion.Body>
                            Once your application is reviewed and approved, arrange a meeting with the pet. This may involve
                            a virtual meet-and-greet or an in-person visit to the shelter or foster home. If the meeting
                            goes well, finalize the adoption process by signing any required paperwork, paying adoption
                            fees, and making arrangements for bringing the pet home.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Adoption Alert: PetPulse Process Inside</Accordion.Header>
                        <Accordion.Body>
                            Remember to make the user experience as smooth as possible, providing clear instructions and
                            easy navigation throughout the adoption process on the petPulse platform
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}

export default HowToAdopt;
