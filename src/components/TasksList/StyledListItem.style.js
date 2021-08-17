import styled from "styled-components";

const StyledListItem = styled.li`
  position: relative;

  max-width: 100%;
  border-bottom: 1px solid #bbc1e1;
  padding: 0.5rem;
  height: ${({ calcHeight }) => {
    if (!calcHeight) return "3.3rem"
    return calcHeight;
  }};
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-shadow: inset 0px -10px 6px -6px #2b3044;

  transition: height 0.2s ease;
  polyline {
    transition: stroke 0.2s ease;
  }
  polyline.focusing{
    filter: drop-shadow(0 0 2px #5c86ff);
  }   
  .paper {
    width: 100%;
    height: auto;
    border: 1px solid #202a47;
    border-radius: 5px;
    padding: 0.4rem;
    background-color: #111527;
    color: #ccc;
    & > .task {
      margin: 0px 0px 0px 0px;
    }
  }
  .task {
    display: flex;
    margin: 7px 0px 0px 0px;
    &_done {
      text-decoration: line-through;
    }
  }

  .task-content.head-focusing{
    color: #fff;
  }
  .task-content {
    flex-grow: 1;
    max-width: calc(100% - 1.5rem);
    &_focusing{
      color: #fff;
    }
    label{
      display: block;
    }
    span {
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 1.1rem;
      line-height: 1.2;
      width: 100%;
    }
  }
  .checkbox {
    margin: 0.05rem 0.3rem 0px 0px;
    max-width: 1.2rem;
  }
  .subtasks {
  }

  .more {
    margin: 10px 0px 0px 0px;
    opacity: 1;
    transition: opacity 0.2s ease;
    &_hidden {
      opacity: 0;
    }
  }
  .primary-area {
    span {
      word-wrap: break-word;
    }
  }
`;

export default StyledListItem;