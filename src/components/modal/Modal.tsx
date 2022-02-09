import { useState } from "react";
//icon
import { Close } from "@material-ui/icons";
import "./Modal.css"
//type
interface ModalProps {
    show: boolean
    close: () => void
}


const Modal: React.FC<ModalProps> = ({show, close}) => {
    const [title,setTitle] = useState<string>(``)
    const [type,setType] = useState<string>(``)
    const [desc,setDesc] = useState<string>(``)
    const [error,setError] = useState<string>(``)

    const titleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => setTitle(e.target.value)
    const typeChange = (e: React.ChangeEvent<HTMLSelectElement>) : void => setType(e.target.value)
    const descChange = (e: React.ChangeEvent<HTMLTextAreaElement>) : void => setDesc(e.target.value)
    
    const handleClose = () : void => {
        setType(``)
        setTitle(``)
        setDesc(``)
        setError(``)
        close()
    }
    const handleSubmit = (e: React.FormEvent) : void => {
        e.preventDefault()
        setError(``)
        //dead simple validation
        if(!!title && !!desc && !!type){
            console.log({title, type, desc});
        }else{
            setError(`Please fill all inputs!`)
        }
    }
    

  return (
    <>
        <>
            {/* back drop modal */}
            {show && <div onClick={handleClose} className="modal-backdrop"></div>}   
            <div style={{opacity: show ? `1` : `0`, transform: show ? `translateY(0)` : `translateY(-200vh)`}} className="modal-container">
                <div className="modal-header">
                    <h2>Share Location</h2>
                    <div className="icon-button" onClick={handleClose}><Close /></div>
                </div>

                <div className="modal-content">
                    <div className="modal-content-left">

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Location Title</label>
                            <input type="text" id="title" value={title} onChange={titleChange} />

                            <label htmlFor="type">Location Type</label>
                            <select id="type" value={type} onChange={typeChange}>
                                <option value=""></option>
                                <option value="Hospital">Hospital</option>
                                <option value="Shop">Shop</option>
                                <option value="restaurant">restaurant</option>
                                <option value="Hotel">Hotel</option>
                            </select>

                            <label htmlFor="desc">Location Description</label>
                            <textarea id="desc" value={desc} onChange={descChange}/>

                            <div className="modal-buttons">
                                <button className="btn-cancel btn-rad" type="reset" onClick={handleClose}>cancel</button>
                                <button className="btn btn-rad" type="submit">share</button>
                            </div>
                        </form>

                    </div>

                    <div className="modal-content-right">
                        <p>Map:</p>
                        <div className="modal-content-map">Choose a location</div>
                    </div>
                </div>
                {error && <p className="error">{error}</p>}
            </div>
        </>
    </>
  )
};

export default Modal;

