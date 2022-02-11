import React, { Suspense, useState } from 'react';
import { Add } from "@material-ui/icons";

import "./Header.css";
import Loading from '../loading/Loading';

const Modal = React.lazy(() => import("../modal/Modal"))

const Header: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>      
      <div className="header-container">
        <div className="header-wrapper">
          <h1>Location list</h1>
          <button className="btn" onClick={handleShow}><Add /> Add Location</button>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <Modal show={show} close={handleClose} />
      </Suspense>
    </>
  );
};

export default Header;
