import "./Modal.css"
import close from './assets/icons/close.png'
export const Modal = ({isOpen, onClose, children}) => {
    if(!isOpen)  {
        return null
    }
    return (
        <div className="modal-container py-5 px-2" onClick={onClose}>
            <div className="data-container rounded-lg" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end mb-2">
                    <img 
                        src={close} 
                        alt="" 
                        className="w-10 bg-gray-400 rounded-lg cursor-pointer" 
                        onClick={onClose}
                    />
                </div>
                <hr/>
                {children}
            </div>
        </div>
    )
}