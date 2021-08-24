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
    max-height: 60vh;
    width: 100%;
    border: 2px solid #202a47;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: #111527;
    box-shadow: 0px 0px 5px 1px #1e2235;

    position: relative;
    left: 50%;
    transform: translateX(-50%);

    ${({ fadeType }) => {
    switch (fadeType) {
      case "in":
        return "top: 20vh; opacity: 1;";
      default:
        return "top: 18vh; opacity: 0;";
    }
  }};
    transition: top linear 0.1s, opacity linear 0.1s;
    
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 0px 0.5rem 0px;
      border-bottom: 2px solid #202a47;
    }
    &__content {      
      max-height: calc(60vh - 60px);
      overflow: auto;
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
      border: 1px solid #ddd;
      border-radius: 3px;
      &:focus,
      &:hover{
        transform: scale(1.1);
        border: 1px solid #fff;
        /* outline: 1px solid #fff; */
        &::after,
        &::before {
          background-color: #fff;
        }
      }
      &::after,
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 90%;
        height: 2px;
        background-color: #ddd;
      }
      &::before {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      &::after {
        transform: translate(-50%, -50%) rotate(45deg);
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
