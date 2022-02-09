import { useContext, useState } from "react";
import { LocationContext } from "../../context/LocationContext";
import { Add } from "@material-ui/icons";
import Modal from "../modal/Modal";

import "./Header.css";

const Header: React.FC = () => {
  const { state } = useContext(LocationContext)
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

console.log(state);


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
