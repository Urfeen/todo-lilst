import { useState } from "react";
import "./Modal.scss";
import AddButton from "../AddButton/AddButton.jsx";

const Modal = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>
      <AddButton onClick={toggleModalHandler} />
      {isModalOpen && (
        // <Modal
        //   id="modal"
        //   isOpen={isModalOpen}
        //   onClose={toggleModalHandler}
        //   class="my-class"
        // >
        //   <div className="box-body">I am the content of the modal</div>
        // </Modal>

        <div>{children}</div>
      )}
    </div>
  )
}

export default Modal;