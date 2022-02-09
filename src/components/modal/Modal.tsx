//icon
import { Close } from "@material-ui/icons";
//style
import "./Modal.css"
//type
interface ModalProps {
    show: boolean
    close: () => void
}


const Modal: React.FC<ModalProps> = ({show, close}) => {
  return (
    <>
        <div style={{opacity: show ? `1` : `0`, transform: show ? `translateY(0)` : `translateY(-100vh)`}} className="modal-container">
            <div className="modal-header">
                <h2>Share Location</h2>
                <div className="icon-button" onClick={close}><Close /></div>
            </div>
            <div className="modal-content">
                <div className="modal-content-left">

                    <label htmlFor="title">Location Title</label>
                    <input type="text" id="title"  />

                    <label htmlFor="type">Location Type</label>
                    <select id="type">
                        <option value="Hospital">Hospital</option>
                        <option value="Shop">Shop</option>
                        <option value="restaurant">restaurant</option>
                        <option value="Hotel">Hotel</option>
                    </select>

                    <label htmlFor="desc">Location Description</label>
                    <textarea id="desc" />

                </div>
                <div className="modal-content-right">
                    <p>Map:</p>
                    <div className="modal-content-map">Choose a location</div>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-cancel btn-rad">cancel</button>
                <button className="btn btn-rad">share</button>
            </div>
        </div>
    </>
  )
};

export default Modal;

