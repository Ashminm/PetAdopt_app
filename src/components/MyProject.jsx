import React from "react";
import {  Card } from "react-bootstrap";
import AddProject from "./AddProject";
// import EditProject from "./EditProject";
import Recamented from "./Recamented";
import { Link } from "react-router-dom";

function MyProject() {

    return (
        <div>
            <div className="text-dark  p-1 w-100  h-100" style={{ backgroundColor: "#fcfcfc" }}>
                <h3 className="p-3">Dashboard</h3>
                
                <div className="d-flex" style={{ flexWrap:"wrap"}}>
                    <Card border="danger shadow" style={{ width: "18rem" }}>
                        <Card.Header>ADD PETS</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <AddProject />
                            </Card.Title>
                            <Card.Text>
                            Discover your ideal furry friend through PetAdopt's intuitive pet addition page.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="warning shadow" style={{ width: "18rem" }}>
                        <Card.Header>ALL PET DETAILS</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {/* <EditProject /> */}
                                <div className="">
                                <Link to={'/List'}><i class="fa-solid fa-paw shadow p-4 border bg-light" style={{ fontSize: "45px", color: "#94619E" }}></i></Link>
                                </div>
                            </Card.Title>
                            <Card.Text>
                            Effortlessly update your pet's profile on PetAdopt with our user-friendly editing page.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card border="info shadow" style={{ width: "18rem" }}>
                        <Card.Header>CONTACT E-MAIL</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {/* <AddProject />{" "} */}
                                <div className="">
                                <Link to={'/Contact'}><i class="fa-solid fa-envelope shadow p-4 border bg-light" style={{ fontSize: "45px", color: "#94619E" }}></i></Link>
                                </div>
                            </Card.Title>
                            <Card.Text>
                            Easily submit adoption requests via PetAdopt's streamlined request page
                     
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
              <div className="">
                <Recamented/>
              </div>
            </div>
        </div>
    );
}

export default MyProject;
