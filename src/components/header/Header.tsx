import { useState } from "react";
import { Add } from "@material-ui/icons";
import Modal from "../modal/Modal";

import "./Header.css";

const Header: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {show && <div onClick={handleClose} className="back-drop"></div>}
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
