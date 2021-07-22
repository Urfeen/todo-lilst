import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-box {
    z-index: ${({ zIndexBox }) => zIndexBox};
    max-width: 400px;
    width: 100%;
    border: 1px solid #fff;
    padding: 0.5rem;
    margin: 0 1rem;

    position: relative;
    ${({ fadeType }) => {
    switch (fadeType) {
      case "in":
        return "top: -15vh; opacity: 1;";
      default:
        return "top: -17vh; opacity: 0;";
    }
  }};
    transition: top linear 0.1s, opacity linear 0.1s;
    
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__title {
      font-size: 1.2rem;
    }
    &__close{
      width: 20px;
      height: 20px;
      position: relative;
      background-color: rgba(0, 0, 0, 0);
      border: 1px solid #fff;
      border-radius: 3px;
      &::after,
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 90%;
        height: 2px;
        background-color: #fff;
      }
      &::before {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      &::after {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &:hover {
        transform: scale(1.1);
      }
    }
    &__content {
      padding: 10px 0;
    }
  }
  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: ${({ zIndexBox }) => zIndexBox - 1};

    opacity: ${({ fadeType }) => {
    switch (fadeType) {
      case "in":
        return "1";
      default:
        return "0";
    };
  }};
  transition: opacity linear 0.2s;
  }
`

export default StyledModal;
