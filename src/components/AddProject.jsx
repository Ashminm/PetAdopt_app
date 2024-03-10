import React, { useState, useEffect,useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addPetApi } from "../service/allApis";
import { addPetResponseContect } from "../context/ContextShare";
import toast from "react-hot-toast";


function AddProject() {
    const [show, setShow] = useState(false);
    const [token, setToken] = useState("");

  const {addPetResponse,setAddPetResponse}=useContext(addPetResponseContect)

    const [petDetails, setPetDetails] = useState({
        pname: "",
        overview: "",
        age: "",
        breed: "",
        color: "",
        gender: "",
        Weight: "",
        status: "",
        image: "",
        userid: "",
        pId: "",
        amount:"",
        number:"",
        categories: [],
    });

    useEffect(() => {
        const existingUser = JSON.parse(localStorage.getItem("currentUser"));
        if(existingUser){
            setPetDetails({ ...petDetails, userid: existingUser._id });
            // console.log(existingUser._id);
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
       
    }, [petDetails.userid]);
    // console.log(petDetails);

    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (petDetails.image) {
            setPreview(URL.createObjectURL(petDetails.image));
        }
    }, [petDetails.image]);

    const handleAddPet =async () => {
        if (
            !petDetails.pname ||
            !petDetails.overview ||
            !petDetails.age ||
            !petDetails.breed ||
            !petDetails.color ||
            !petDetails.gender ||
            !petDetails.Weight ||
            !petDetails.status ||
            !petDetails.image ||
            !petDetails.userid ||
            !petDetails.pId ||
            !petDetails.amount ||
            !petDetails.number ||
            !petDetails.categories
        ) {
            toast("Enter Valid Correct Details!!",
            {
              icon: '⚠️',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#FFFF00',
              },
            });
        } else {
            const petData = new FormData();
            petData.append("pname", petDetails.pname);
            petData.append("overview", petDetails.overview);
            petData.append("age", petDetails.age);
            petData.append("breed", petDetails.breed);
            petData.append("color", petDetails.color);
            petData.append("gender", petDetails.gender);
            petData.append("Weight", petDetails.Weight);
            petData.append("status", petDetails.status);
            petData.append("p_image", petDetails.image);
            petData.append("userid", petDetails.userid);
            petData.append("pId", petDetails.pId);
            petData.append("amount", petDetails.amount);
            petData.append("number", petDetails.number);
            petData.append("categories", petDetails.categories);
            // console.log(petData);
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            };
            // console.log(reqHeader);
            const res=await addPetApi(petData,reqHeader)
            // console.log(res);
            if(res.status===200){
               setAddPetResponse(res.data)
                toast.success("Pet Added Successfully!!",{
                    style: {
                      borderRadius: '10px',
                      background: '#333',
                      color: '#FFFF',
                    },
                  })
                handleClose()
            }
            else{
                toast.error("Pet Added Failed!! Please try correct Pet license ID or other Details!!",{
                    style:{
                      borderRadius: '10px',
                      background:"#333",
                      color:'#FFF'
                    }
                  })
            }
        }
    };

    const handleClose = () => {
        setPetDetails({
            pname: "",
            overview: "",
            age: "",
            breed: "",
            color: "",
            gender: "",
            Weight: "",
            status: "",
            image: "",
            userid: "",
            pId: "",
            amount:"",
            number:"",
            categories: [],
        });
        setPreview("")
        setShow(false)
    }
    const handleShow = () => setShow(true);

    // console.log(petDetails);
    return (
        <div>
            <Button variant="" className="p-4 border shadow fw-bold bg-light" onClick={handleShow}>
                <i class="fa-solid fa-circle-plus p-0" style={{ fontSize: "45px", color: "#94619E" }}></i>
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <label htmlFor="project">
                            <input
                                type="file"
                                id="project"
                                onChange={(e) => setPetDetails({ ...petDetails, image: e.target.files[0] })}
                                style={{ display: "none" }}
                            />
                            <span>Edit pet picture</span>
                            <img
                                src={
                                    preview
                                        ? preview
                                        : "https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg"
                                }
                                className="img-fluid rounded"
                                alt="no image"
                            />
                        </label>
                    </div>
                    <div className=" mt-3">
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet Name"
                                    onChange={(e) => setPetDetails({ ...petDetails, pname: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Pet Overview"
                                    onChange={(e) => setPetDetails({ ...petDetails, overview: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    type="text"
                                    placeholder="Approximate Age"
                                    onChange={(e) => setPetDetails({ ...petDetails, age: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet breed"
                                    onChange={(e) => setPetDetails({ ...petDetails, breed: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet color"
                                    onChange={(e) => setPetDetails({ ...petDetails, color: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet gender"
                                    onChange={(e) => setPetDetails({ ...petDetails, gender: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet Weight"
                                    onChange={(e) => setPetDetails({ ...petDetails, Weight: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet Status"
                                    onChange={(e) => setPetDetails({ ...petDetails, status: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => setPetDetails({ ...petDetails, categories: e.target.value })}
                            >
                                {/* onChange={handleCategoryChange} */}
                                <option disabled selected>categories</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Deer">Deer</option>
                                <option value="Deer">Squral</option>
                            </Form.Select>
                            <Form.Group className="mt-3" controlId="exampleForm.ControlInput4">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet license ID"
                                    onChange={(e) => setPetDetails({ ...petDetails, pId: e.target.value.toUpperCase() })}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3" controlId="exampleForm.ControlInput5">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Your Amount"
                                    onChange={(e) => setPetDetails({ ...petDetails, amount: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3" controlId="exampleForm.ControlInput5">
                                <Form.Control
                                    type="text"
                                    placeholder="Contact Number"
                                    onChange={(e) => setPetDetails({ ...petDetails, number: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" className="ps-4 pe-4" onClick={handleAddPet}>
                        Add Pet
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <ToastContainer position="bottom-right" theme="dark" /> */}
        </div>
    );
}

export default AddProject;
