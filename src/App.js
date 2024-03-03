import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Auth from "./components/Auth";
import Footer from "./components/Footer";
import AllPetList from "./components/AllPetList";
import AllContact from "./components/AllContact";
import Adopt from "./components/Adopt";
import toast,{Toaster} from 'react-hot-toast'
import AdminDash from "./components/AdminDash";
import GetAllPets from "./components/GetAllPets";
import History from "./components/History";
import Cart from "./components/Cart";
import EditProject from "./components/EditProject";
import { useState ,useEffect,useContext} from "react";
// import ContextShare from "./context/ContextShare";
import { addPetResponseContect } from "./context/ContextShare";

function App() {
    const {addPetResponse,setAddPetResponse}=useContext(addPetResponseContect)
    const [loginL, setLoginL] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            // setAddPetResponse(false)
            setLoginL(true);
        } else {
            setLoginL(false);
        }
    });
    return (
        <div className="App">
            <Header  loginL={loginL}/>
            <Routes>
             
                <Route path="/" element={<Landing />} />
                <Route path="/Login" element={<Auth />} />
                <Route path="/Register" element={<Auth register />} />
                <Route path="/List" element={<AllPetList />} />
                <Route path="/Adopt" element={<Adopt />} />
                <Route path="/Contact" element={<AllContact />} />
                <Route path="/Admdash" element={<AdminDash />} />
                <Route path="/allpets" element={<GetAllPets />} />
                <Route path="/history" element={<History />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/editpet" element={<EditProject />} />
                {/* <Route path="/p" element={<ALLPETS />} /> */}
            </Routes>
            <Footer loginL={loginL} />
            <Toaster />
        </div>
    );
}

export default App;
