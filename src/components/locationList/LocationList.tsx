import { useState } from 'react'
//components
import Modal from '../modal/Modal';
import TableData from './TableData';
//style
import "./LocationList.css"
//type
export type LocationData = {
  id: number | string;
  title: string;
  type: string;
  description: string;
  coordinate: number;
};



const LocationList: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
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
                        <TableData setShowModal={setShowModal} />
                    </tbody>
                </table>

                <Modal show={showModal} close={handleClose}/>
            </div>
        </div>
    </>
  )
};

export default LocationList;
