import styled from 'styled-components';

const StyledTodoList = styled.div`
  margin: 10vh auto 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
  max-width: 600px;
  border: 1px solid #5c86ff;
  padding: 0 0.8rem;
  background-color: rgba(0,0,0,0.1);
  border-radius: 5px;

  .signIn-btn,
  .header-loader{
    position: absolute;
    top: 50%;
    left: 0;

    transform: translateY(-50%);
  }
  .add-todo-btn {
    position: absolute !important;
    top: 50%;
    right: 0;

    transform: translateY(-50%);
  }
  .todos {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.8rem 0px;
    ul{
      width: 100%;
    }
  }
  header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .userEmail{
      padding: 0.5rem;
      border: 1px solid #5c86ff;
      border-top: none;
      max-width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-radius: 0 0 5px 5px ;
      background-color: #171e42;
      filter: drop-shadow(0 0 2px #5c86ff);
    }
    .title{
      width: 100%;
      text-align: center;
      position: relative;
      padding: 0.7rem 0px 0.7rem 0px;
      border-bottom: 1px solid #5c86ff;
    }
  }
  h1 {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

export default StyledTodoList;

