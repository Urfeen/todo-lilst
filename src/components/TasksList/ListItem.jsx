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
          <div className="list-item__task">
            <div className="list-item__checkbox">
              <input
                defaultChecked={done}
                onChange={() => changeTaskStatusHandler(id)}
                type="checkbox"
                className="checkbox"
              />

              <svg width="100%" height={30}>
                <line x1="0.5rem" y1="0" x2="0.5rem" y2="100" stroke="orange" fill="transparent" strokeWidth="2" />
              </svg>
            </div>
            <div className="list-item__task-content">
              <span>{taskText}</span>

              <ul className="list-item__subtasks">
                <li className="list-item__task">
                  <div className="list-item__checkbox">
                    <input
                      defaultChecked={done}
                      onChange={() => changeTaskStatusHandler(id)}
                      type="checkbox"
                      className="checkbox"
                    />
                  </div>
                  <div className="list-item__task-content">
                    <span>{taskText}</span>
                  </div>
                </li>
                <li className="list-item__task">
                  <div className="list-item__checkbox">
                    <input
                      defaultChecked={done}
                      onChange={() => changeTaskStatusHandler(id)}
                      type="checkbox"
                      className="checkbox"
                    />
                  </div>
                  <div className="list-item__task-content">
                    <span>{taskText}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div ref={liMoreRef} className={moreClasses}>
        <DeleteButton text="text" /*onClick={() => deleteTaskHandler(id)}*/ />
        <span> Start - {moment(creationDate).format('DD.MM.YY')}</span>
      </div>

    </li >
  );
}

export default memo(ListItem);