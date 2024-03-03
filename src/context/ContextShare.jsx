import React, { useState, createContext } from "react";

export const addPetResponseContect=createContext();


function ContextShare({ children }) { 
const [addPetResponse,setAddPetResponse]=useState({});

    return (
        <>
         <addPetResponseContect.Provider value={{addPetResponse,setAddPetResponse}}>
            {children}
         </addPetResponseContect.Provider>
        </>
    );
}

export default ContextShare;
