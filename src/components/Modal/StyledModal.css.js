import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 1rem;

  .modal-box {
    z-index: ${({ zIndexBox }) => zIndexBox};
    max-width: 400px;
    width: 100%;
    border: 1px solid #fff;
    padding: 0.5rem;

    position: relative;
    left: 50%;
    transform: translateX(-50%);

    ${({ fadeType }) => {
    switch (fadeType) {
      case "in":
        return "top: 27vh; opacity: 1;";
      default:
        return "top: 25vh; opacity: 0;";
    }
  }};
    transition: top linear 0.1s, opacity linear 0.1s;
    
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 0px 0.5rem 0px;
      margin: 0px 0px 0.8rem 0px;
      border-bottom: 1px solid #fff;
    }
    &__content {
    }
    &__footer {
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