import { useRef, useState, memo } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import DeleteButton from '../DeleteButton/DeleteButton.jsx';
import InputCheckbox from '../InputCheckbox/InputCheckbox.jsx';

const ListItem = ({ id, done, taskText, changeTaskStatusHandler, deleteTaskHandler, creationDate, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

    mouseEnterTimeoutId.current = setTimeout(() => { }, EXPAND_DURATION);

    setIsExpanded(true);
  }
  const onMouseLeaveHandler = () => {
    if (mouseEnterTimeoutId.current) clearTimeout(mouseEnterTimeoutId.current);

    mouseLeaveTimeoutId.current = setTimeout(() => { }, EXPAND_DURATION);

    setIsExpanded(false);
  }

  return (
    // <a href={'task-' + (index + 1)}>
    <li
      className={classNames('tasks-list__item list-item', { 'list-item_expanded': isExpanded })}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      style={{
        height: isExpanded ? liPrimaryAreaRef.current.offsetHeight + liMoreRef.current.offsetHeight + 20 + 'px' : ''
      }}
    >

      <div ref={liPrimaryAreaRef} className="list-item__primary-area">
        <div className="list-item__paper">
          <div className={classNames('list-item__task', { 'list-item__task_done': done })}>
            <div className="list-item__checkbox">
              <InputCheckbox
                defaultChecked={done}
                onChange={() => changeTaskStatusHandler(id)}
              />

              {/* <svg width="100%" height={42}>
                <polyline points="8,0 8,20 16,20" fill="none" stroke="#fff" />
                <polyline points="8,0 8,40 16,40" fill="none" stroke="#fff" />
              </svg> */}
            </div>
            <div className="list-item__task-content">
              <span>{taskText}</span>

              {/* <ul className="list-item__subtasks">
                <li className="list-item__task">
                  <div className="list-item__checkbox">
                    <InputCheckbox
                      defaultChecked={done}
                      onChange={() => changeTaskStatusHandler(id)}
                    />
                  </div>
                  <div className="list-item__task-content">
                    <span>{taskText}</span>
                  </div>
                </li>
                <li className="list-item__task">
                  <div className="list-item__checkbox">
                    <InputCheckbox
                      defaultChecked={done}
                      onChange={() => changeTaskStatusHandler(id)}
                    />
                  </div>
                  <div className="list-item__task-content">
                    <span>{taskText}</span>
                  </div>
                </li>
              </ul> */}

            </div>
          </div>
        </div>
      </div>

      <div ref={liMoreRef} className={moreClasses}>
        <DeleteButton text="text" /*onClick={() => deleteTaskHandler(id)}*/ />
        <span>Start - {moment(creationDate).format('DD.MM.YY')}</span>
      </div>

    </li >
    // </a>
  );
}

export default memo(ListItem);