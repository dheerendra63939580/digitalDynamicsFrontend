import "./Modal.css"
export const Modal = ({isOpen, onClose, children}) => {
    if(!isOpen)  {
        return null
    }
    return (
        <div className="modal-container" onClick={onClose}>
            <div className="data-container" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}