import "./AddButton.scss";

const AddButton = ({ onClick: action }) => {
  return (
    <button
      className="btn_add"
      onClick={typeof action === "function" ? action : ''}
    />
  );
}

export default AddButton;