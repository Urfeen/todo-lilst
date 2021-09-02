import styled from "styled-components";

const StyledTextareaWithSubTextarea = styled.div`
  margin: 0.8rem 0px 0.8rem 0px;
  textarea {
    width: 100%;
    height: auto;
    resize: none;
    padding: 4px;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px #2b3044 solid;
    color: #ccc;
    transition: border 0.2s ease, color 0.2s ease;
    border-radius: 3px;
    overflow: hidden;
  }
  textarea:focus {
    border: 1px #395ac0 solid;
    box-shadow: 0px 0px 3px 1px #395ac050;
    color: #fff;
  }
  .sub-textareas {
    display: flex;
    &__visual-nav {
      width: 30px;
      polyline {
        transition: stroke 0.2s ease;
      }
      polyline.focusing{
        filter: drop-shadow(0 0 2px #5c86ff);
      }
    }
    &__list {
      flex: 1 1 auto;
      li {
        margin: 7px 0 0 0;
      }
      textarea {
        font-size: 14px;
      }
    }
  }
`;

export default StyledTextareaWithSubTextarea;