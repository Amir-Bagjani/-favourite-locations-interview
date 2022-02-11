import React, { useState, lazy, Suspense } from 'react'
//components
import TableData from './TableData';
import Loading from '../loading/Loading';
//style
import "./LocationList.css"
//type
import { LocationData } from '../../context/LocationContext';

const  Modal = React.lazy(() => import('../modal/Modal'))

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
                <Suspense fallback={<Loading />}>
                    <Modal show={showModal} close={handleClose} location={location}/>
                </Suspense>
            </div>
        </div>
    </>
  )
};

export default LocationList;
