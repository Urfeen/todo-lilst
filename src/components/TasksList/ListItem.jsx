import { useRef, useState, memo } from 'react';
import classNames from 'classnames';

const ListItem = ({ id, done, taskText, changeTaskStatusHandler, deleteTaskHandler }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [textExpand, setTextExpand] = useState(false);
  const [textScroll, setTextScroll] = useState(false);

  const liClasses = classNames(
    'tasks-list__item list-item',
    {
      'list-item_done': done,
      'list-item_expanded': isExpanded,
      'list-item_text-expand': textExpand,
      'list-item_text-scroll': textScroll
    });
  const EXPAND_DURATION = 200;

  let mouseEnterTimeoutId = useRef();
  let mouseLeaveTimeoutId = useRef();
  const onMouseEnterHandler = event => {
    if (mouseLeaveTimeoutId.current) clearTimeout(mouseLeaveTimeoutId.current);

    mouseEnterTimeoutId.current = setTimeout(() => {
      setTextScroll(true);
    }, EXPAND_DURATION);

    setIsExpanded(true);
    setTextExpand(true);
  }
  const onMouseLeaveHandler = event => {
    if (mouseEnterTimeoutId.current) clearTimeout(mouseEnterTimeoutId.current);

    mouseLeaveTimeoutId.current = setTimeout(() => {
      setTextExpand(false);
    }, EXPAND_DURATION);

    setIsExpanded(false);
    setTextScroll(false);
  }

  return (
    <li
      className={liClasses}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className="list-item__primary-area">
        <input
          defaultChecked={done}
          onChange={() => changeTaskStatusHandler(id)}
          type="checkbox"
          name="checkbox"
          className="checkbox"
        />
        <span>{taskText}</span>
      </div>
      <div className="list-item__more">

      </div>
      {/* <button
        onClick={() => deleteTaskHandler(task.id)}
        type="button"
        className="btn_cross"
        style={{ height: "18px", width: "18px" }}
      /> */}
    </li>
  );
}

export default memo(ListItem);