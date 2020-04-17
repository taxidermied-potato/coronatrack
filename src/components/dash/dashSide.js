import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import StatModule from './module/module'
import { useSelector, useDispatch } from "react-redux";
import Controller from './controller'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function DashSide() {
  const storedModules = useSelector(state => state.sideModules);
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
    dispatch({ type: `SWAP_MODULES`, item: reorderedModules, location: "SIDE" })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            className="dashSide"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Controller />
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
                    <StatModule id={module.id} mType={module.type} type={module.subtype} country={module.country} key={module.id} moduleLocation="SIDE"/>
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

export default DashSide
