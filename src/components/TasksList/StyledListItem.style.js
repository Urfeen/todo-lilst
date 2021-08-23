import styled from "styled-components";

const StyledListItem = styled.li`
  position: relative;

  max-width: 100%;
  border-bottom: 1px solid #bbc1e1;
  padding: 0.5rem;
  height: ${({ calcHeight }) => {
    if (!calcHeight) return "3.3rem"
    return calcHeight + 'px';
  }};

  ${({ isExpanded, isListItemFocus }) => {
    return !isExpanded && `
      &:focus-within{
        .paper{
          filter: brightness(1) drop-shadow(0 0 2px ${isListItemFocus ? "#5c86ff" : "rgba(0,0,0,0)"});
        }
      }
      &:hover{
        .paper{
          filter: brightness(1) drop-shadow(0 0 2px #5c86ff);
        }
      } 
    `
  }}
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
    position: relative;
    width: 100%;
    max-height: 132px;
    overflow: auto;
    border: 1px solid #202a47;
    border-radius: 5px;
    padding: 0.4rem;
    background-color: #171e42;
    color: #ccc;
    & > .task {
      margin: 0px 0px 0px 0px;
    }
    filter: brightness(0.7);
    transition: filter 0.2s ease;
  }
  .paper_expanded{
    filter: brightness(1);
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
    &_done{
      text-decoration: line-through;
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
    padding: 0px 0px 0.4rem 0px;
    opacity: 1;
    transition: opacity 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__time {
      color: #ddd;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }
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