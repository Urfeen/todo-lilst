import { useRef, useState, memo } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import DeleteButton from '../DeleteButton/DeleteButton.jsx';

const ListItem = ({ id, done, taskText, changeTaskStatusHandler, deleteTaskHandler, creationDate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [textExpand, setTextExpand] = useState(false);
  // const [textScroll, setTextScroll] = useState(false);

  const liClasses = classNames(
    'tasks-list__item list-item',
    {
      'list-item_done': done,
      // 'list-item_text-expand': textExpand,
      // 'list-item_text-scroll': textScroll
    });
  const moreClasses = classNames(
    'list-item__more',
    {
      'list-item__more_hidden': !isExpanded
    }
  )
  const EXPAND_DURATION = 200;

  const liPrimaryAreaRef = useRef();
  const liMoreRef = useRef();
  let mouseEnterTimeoutId = useRef();
  let mouseLeaveTimeoutId = useRef();

  const onMouseEnterHandler = () => {
    if (mouseLeaveTimeoutId.current) clearTimeout(mouseLeaveTimeoutId.current);

    mouseEnterTimeoutId.current = setTimeout(() => {
      // setTextScroll(true);
    }, EXPAND_DURATION);

    setIsExpanded(true);
    // setTextExpand(true);
  }
  const onMouseLeaveHandler = () => {
    if (mouseEnterTimeoutId.current) clearTimeout(mouseEnterTimeoutId.current);

    mouseLeaveTimeoutId.current = setTimeout(() => {
      // setTextExpand(false);
    }, EXPAND_DURATION);

    setIsExpanded(false);
    // setTextScroll(false);
  }

  return (
    <li
      className={liClasses}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      style={{
        height: isExpanded ? liPrimaryAreaRef.current.offsetHeight + liMoreRef.current.offsetHeight + 20 + 'px' : ''
      }}
    >

      <div ref={liPrimaryAreaRef} className="list-item__primary-area">
        <div className="list-item__paper">
          <span>texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</span>
        </div>
        {/* <input
          defaultChecked={done}
          onChange={() => changeTaskStatusHandler(id)}
          type="checkbox"
          name="checkbox"
          className="checkbox"
        />
        <span>{taskText}</span> */}
      </div>

      <div ref={liMoreRef} className={moreClasses}>
        <DeleteButton text="text" /*onClick={() => deleteTaskHandler(id)}*/ />
        <span>Start - {moment(creationDate).format('DD.MM.YY')}</span>
      </div>

    </li >
  );
}

export default memo(ListItem);