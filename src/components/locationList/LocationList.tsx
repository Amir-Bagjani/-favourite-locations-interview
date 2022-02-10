import { useState } from 'react'
//components
import Modal from '../modal/Modal';
import TableData from './TableData';
//style
import "./LocationList.css"
//type
import { LocationData } from '../../context/LocationContext';



const LocationList: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [location,setLocation] = useState({} as LocationData)
    const handleClose = () => setShowModal(false)
    
  return (
    <>
        <div className="locationlist-container">
            <div className="locationlist-wrapper">

                <table className="locationlist-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableData setShowModal={setShowModal} setLocation={setLocation} />
                    </tbody>
                </table>

                <Modal show={showModal} close={handleClose} location={location}/>
            </div>
        </div>
    </>
  )
};

export default LocationList;
