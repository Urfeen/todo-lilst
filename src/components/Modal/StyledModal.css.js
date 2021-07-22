import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .modal-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    z-index: ${props => props.zIndexBox};
    max-width: 400px;
    width: 100%;
    border: 1px solid white;
    padding: 0.5rem;
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__title {
    }
    &__close{
      width: 20px;
      height: 20px;
      position: relative;
      background-color: rgba(0, 0, 0, 0);
      border: 1px solid #555;
      border-radius: 3px;
      &::after,
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 90%;
        height: 2px;
        background-color: #222;
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
    }
  }
  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: ${props => props.zIndexBox - 1};
  }
`

export default StyledModal;
