import React, { useState,useEffect, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BASE_URL } from "../service/baseUel";
import toast from "react-hot-toast";
import { editPetApi } from "../service/allApis";
import { addPetResponseContect } from "../context/ContextShare";


function EditProject({pet}) {
    const [show, setShow] = useState(false);

    const {addPetResponse,setAddPetResponse}=useContext(addPetResponseContect)

    const [editPet,setEditPet]=useState({
        pname:pet.pname,
        overview:pet.overview,
        age:pet.age,
        color:pet.color,
        breed:pet.breed,
        gender:pet.gender,
        Weight:pet.Weight,
        status:pet.status,
        pId:pet.pId,
        p_image:pet.p_image,
        amount:pet.amount,
        number:pet.number,
        categories:pet.categories
    })

    const [preview, setPreview] = useState("");
    useEffect(() => {
        if (editPet.p_image  != pet.p_image) {
            setPreview(URL.createObjectURL(editPet.p_image));
        }
    }, [editPet.p_image]);


    const handleUpdate=async()=>{
        const {pname,overview,age,color,breed,gender,Weight,status,pId,amount,p_image,number,categories}= editPet
        if(!pname || !overview || !age || !color || !breed || !gender || !Weight || !status || !pId || !amount || !p_image || !number || !categories){
            toast("Enter Valid Correct Details!!",
            {
              icon: '⚠️',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#FFFF00',
              },
            })
        }
        else{
            // toast.success("Valid");
            const reqBody=new FormData()
            reqBody.append("pname", editPet.pname);
            reqBody.append("overview", editPet.overview);
            reqBody.append("age", editPet.age);
            reqBody.append("breed", editPet.breed);
            reqBody.append("color", editPet.color);
            reqBody.append("gender", editPet.gender);
            reqBody.append("Weight", editPet.Weight);
            reqBody.append("status", editPet.status);
            reqBody.append("p_image", editPet.p_image);
            reqBody.append("pId", editPet.pId);
            reqBody.append("amount", editPet.amount);
            reqBody.append("number", editPet.number);
            reqBody.append("categories", editPet.categories);
            if(p_image==pet.p_image){
                const reqHeader = {
                    "Content-Type": "application/json" ,
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                };
                const res=await editPetApi(reqHeader,reqBody,pet._id)
                if(res.status===200){
                    setAddPetResponse(res.data)
                    toast.success("Pet details updated",{
                        style: {
                          borderRadius: '10px',
                          background: '#333',
                          color: '#FFFF',
                        },
                      })
                    handleClose()
                }
                else{
                    toast.error(res.response.data)
                }
            }
            else{
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                };
                const res=await editPetApi(reqHeader,reqBody,pet._id)
                if(res.status===200){
                    setAddPetResponse(res.data)
                    toast.success("Pet details updated",{
                        style: {
                          borderRadius: '10px',
                          background: '#333',
                          color: '#FFFF',
                        },
                      })
                    handleClose()
                }
                else{
                    toast.error(res.response.data)
                }
            }
        }

    }



    const handleClose = () => {
        setShow(false);
        setPreview("")
    }
    const handleShow = () => setShow(true);

    // console.log(editPet);
    return (
        <div>
            <Button variant="" onClick={handleShow}>
            <i class="fa-solid fa-file-pen "  style={{fontSize:"25px",color:"#94619E"}}></i>
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor="project">
                            <input type="file" id="project" style={{ display: "none" }} onChange={(e)=>setEditPet({...editPet,p_image:e.target.files[0]})}/>
                            <img
                                src={preview? preview:`${BASE_URL}/upload/${pet.p_image}`}
                                className="img-fluid"
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
                                    defaultValue={pet.pname}
                                    onChange={(e)=>setEditPet({...editPet,pname:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Pet Overview"
                                    defaultValue={pet.overview}
                                    onChange={(e)=>setEditPet({...editPet,overview:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    type="text"
                                    placeholder="Approximate Age"
                                    defaultValue={pet.age}
                                    onChange={(e)=>setEditPet({...editPet,age:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet breed"
                                    defaultValue={pet.breed}
                                    onChange={(e)=>setEditPet({...editPet,breed:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    type="text"
                                    placeh defaultValue={pet.color}older="Pet color"
                                    onChange={(e)=>setEditPet({...editPet,color:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet gender"
                                    defaultValue={pet.gender}
                                    onChange={(e)=>setEditPet({...editPet,gender:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet Weight"
                                    defaultValue={pet.Weight}
                                    onChange={(e)=>setEditPet({...editPet,Weight:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet Status"
                                    defaultValue={pet.status}
                                    onChange={(e)=>setEditPet({...editPet,status:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e)=>setEditPet({...editPet,categories:e.target.value})}
                            >
                                {/* onChange={handleCategoryChange} */}
                                <option disabled selected>categories</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Deer">Deer</option>
                            </Form.Select>
                            <Form.Group className="mt-3" controlId="exampleForm.ControlInput4">
                                <Form.Control
                                    type="text"
                                    placeholder="Pet license ID"
                                    defaultValue={pet.pId}
                                    // onChange={(e)=>setEditPet({...editPet,pId:e.target.value.toUpperCase()})}
                                    onChange={(e) => setEditPet({ ...editPet, pId: e.target.value.toUpperCase() })}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3" controlId="exampleForm.ControlInput5">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Your Amount"
                                    defaultValue={pet.amount}
                                    onChange={(e)=>setEditPet({...editPet,amount:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3" controlId="exampleForm.ControlInput5">
                                <Form.Control
                                    type="text"
                                    placeholder="Contact number"
                                    defaultValue={pet.number}
                                    onChange={(e)=>setEditPet({...editPet,number:e.target.value})}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleUpdate}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditProject;
