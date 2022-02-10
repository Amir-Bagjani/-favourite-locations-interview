import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Close } from "@material-ui/icons";
//component
import Map from "../map/Map";
//style
import "./Modal.css"
//type and context
import { LocationContext, LocationData } from "../../context/LocationContext";
interface ModalProps {
    show: boolean
    close: () => void
    location?: LocationData
}
export interface Coordinate {
    latitude: number ;
    longitude: number ;
}

const Modal: React.FC<ModalProps> = ({show, close, location}) => {
    const { dispatch } = useContext(LocationContext);
    const [title,setTitle] = useState<string>(``)
    const [type,setType] = useState<string>(``)
    const [description,setDescription] = useState<string>(``)
    const [latitude,setLatitude] = useState<number>()
    const [longitude,setLongitude] = useState<number>()
    const [error,setError] = useState<string>(``)
    const [openMap,setOpenMap] = useState<boolean>(false)
    const [offsetTop,setOffsetTop] = useState(0)
    const div = useRef<HTMLDivElement>(null !)    

    const titleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => setTitle(e.target.value)
    const typeChange = (e: React.ChangeEvent<HTMLSelectElement>) : void => setType(e.target.value)
    const descChange = (e: React.ChangeEvent<HTMLTextAreaElement>) : void => setDescription(e.target.value)
    
    const handleClose = () : void => {
        setType(``)
        setTitle(``)
        setDescription(``)
        setError(``)
        close()
    }
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setError(``)
        //dead simple validation
        if(!!title && !!description && !!type && latitude && longitude){
            if(location){//edit mode
                const data: LocationData = {id: location.id, title, type, description, latitude, longitude}
                await axios.put(`http://localhost:3030/locations/${location.id}`, data)
                dispatch({type: "EDIT_LOCATION", payload: data})
                handleClose()
            }else{//add mode

            }
        
        }else{
            setError(`Please fill all inputs and choose a location!`)
        }
    }

    const closeMap = (): void => setOpenMap(false)

    //initial values
    useEffect(() => {
        if(location){
            setType(location.type)
            setTitle(location.title)
            setDescription(location.description)
            setLatitude(location.latitude)
            setLongitude(location.longitude)            
        }
    }, [location, show])

    //find the pageoffset
    useEffect(() => {
        setOffsetTop(div.current.offsetTop)
    }, [])
    

  return (
    <>
        <>
            {/* back drop modal */}
            {show && <div onClick={handleClose} className="modal-backdrop"></div>}   
            <div ref={div} style={{opacity: show ? `1` : `0`, transform: show ? `translateY(0)` : `translateY(-200vh)`}} className="modal-container">
                <div className="modal-header">
                    <h2>{ location ? `Edit Location` : `Share Location` }</h2>
                    <div className="icon-button" onClick={handleClose}><Close /></div>
                </div>

                <div className="modal-content">
                    <div className="modal-content-left">

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Location Title</label>
                            <input type="text" id="title" value={title ? title : ``} onChange={titleChange} placeholder="Location Title" />

                            <label htmlFor="type">Location Type</label>
                            <select id="type" value={type} onChange={typeChange}>
                                <option value=""></option>
                                <option value="Hospital">Hospital</option>
                                <option value="Shop">Shop</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="Hotel">Hotel</option>
                            </select>

                            <label htmlFor="desc">Location Description</label>
                            <textarea id="desc" value={description} onChange={descChange} placeholder="Location Description"/>

                            <div className="modal-buttons">
                                <button className="btn-cancel btn-rad" type="reset" onClick={handleClose}>cancel</button>
                                <button className="btn btn-rad" type="submit">{ location ? `edit` : `share` }</button>
                            </div>
                        </form>

                    </div>

                    <div className="modal-content-right">
                        <p>Map:</p>
                        <div
                            className="modal-content-map" 
                        >
                            {location ?
                             (<Map 
                                openMap={openMap}
                                closeMap={closeMap}
                                latitude = {latitude}
                                setLatitude = {setLatitude}
                                longitude = {longitude}
                                setLongitude = {setLongitude}
                                offsetTop={offsetTop}
                                title= {title}
                                description ={description}
                            />) : <div className="center">Choose a location</div>} 
                        </div>
                        <button
                         onClick={location ? () => setOpenMap(true) : () => console.log(`sdfs`)}
                         className="modal-open-map"
                         >
                            open map
                        </button>
                    </div>
                </div>
                {error && <p className="error">{error}</p>}
            </div>
        </>
    </>
  )
};

export default Modal;

