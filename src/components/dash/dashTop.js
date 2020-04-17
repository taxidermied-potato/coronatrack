import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import StatModule from './module/module'
import { useSelector, useDispatch } from "react-redux";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function DashTop() {
  const storedModules = useSelector(state => state.modules);
  const [modules, setModules] = useState(storedModules);
  const dispatch = useDispatch();

  useEffect(() => {
    setModules(storedModules)
  },[storedModules])

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedModules = reorder(
      modules,
      result.source.index,
      result.destination.index
    );

    setModules(reorderedModules)
    dispatch({ type: `SWAP_MODULES`, item: reorderedModules, location: "TOP"  })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            className="dashTop"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {modules.map((module, index) => (
              <Draggable key={module.id} draggableId={module.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                    className="draggable"
                  >
                    <StatModule id={module.id} type={module.type} subType={module.subtype} country={module.country} key={module.id} moduleLocation="TOP"/>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

}

export default DashTop
