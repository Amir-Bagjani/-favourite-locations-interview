import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../context/LocationContext";
import { Add } from "@material-ui/icons";
import Modal from "../modal/Modal";

import "./Header.css";

const Header: React.FC = () => {
  const { state } = useContext(LocationContext)
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userInformation: any = {
    "user" : {
      "first_name" : "Amir",
      "last_name" : "Bagjani",
      "address" : {
        "street" : {
          "name" : "test name",
          "unit" : {"number" : 15}
        }
      }
    }
  }
  
  
  const [user, setUser] = useState<any>(userInformation);

  // useEffect(() => {
  //   setUser(JSON.parse(user))
  // }, [])
  // useEffect(() => {
  //   setUser(JSON.parse({...user, address: {street: {...user.address.street, unit: { number: 16}}}}))
    
    
  // }, [])
  // useEffect(() => {
  //   // setUser(JSON.parse({...user, address: {street: {...user.address.street, unit: { number: 16}}}}))
    
  //   console.log(user);
  // }, [user])

  return (
    <>      
      <div className="header-container">
        <div className="header-wrapper">
          <h1>Location list</h1>
          <button className="btn" onClick={handleShow}><Add /> Add Location</button>
        </div>
      </div>
      <Modal show={show} close={handleClose} />
    </>
  );
};

export default Header;
