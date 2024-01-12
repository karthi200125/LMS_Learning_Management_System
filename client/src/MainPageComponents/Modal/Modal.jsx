import './Modal.scss'
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, bodyContent, title, subTitle }) => {
    return (
        <div className={`modalcontainer ${isOpen ? 'opencon' : ''}`}>
            <div className={`${isOpen ? "modal" : "closemodal"}`}>
                <div className="top">
                    <span className="close" onClick={onClose}>
                        <IoMdClose size={25} />
                    </span>
                    <h1>{title}</h1>
                    <p>{subTitle}</p>
                </div>
                <div className="content">
                    {bodyContent}
                </div>
            </div>
        </div>
    )
}

export default Modal