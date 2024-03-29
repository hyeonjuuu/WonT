import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import AddPlanButton from "./AddPlanButton";
import React, { useEffect } from "react";
import { CiSquareChevDown, CiSquareChevUp } from "react-icons/ci";
import { motion } from "framer-motion";
import { useViewPlanStore } from "@/store/useViewPlanStore";
import { DatesStore } from "@/store/DatesStore";
import { SelectPlacesStore } from "@/store/PlacesStore";
import AddSchedule from "./AddSchedule";
import { SelectAccommodationsStore } from "@/store/AccommodationsStore";

interface TripDaysProps {
  days?: string;
  // date?: string;
  date?: any;
  tripDate?: string[];
}

function TripDays() {
  const { viewPlanStates, setViewPlanStates } = useViewPlanStore();
  const { selectedPlaces, setSelectedPlacesArray } = SelectPlacesStore();
  const { selectedAccommodations, setSelectedAccommodationsArray } =
    SelectAccommodationsStore();
  const { tripDates } = DatesStore();

  useEffect(() => {
    setViewPlanStates(new Array(tripDates?.length).fill(true));
  }, []);

  const onDragEnd = (result: { destination: any; source: any }) => {
    const { destination, source } = result;

    if (!destination) return;
    const sourceDroppableId = source.droppableId;

    if (source.droppableId === destination.droppableId) {
      if (sourceDroppableId === "selectedPlaces") {
        const newSelectedPlaces = Array.from(selectedPlaces || []);
        const listIndex = parseInt(source.droppableId.split("-")[1]);
        const copiedPlace = [...newSelectedPlaces];
        const items = copiedPlace[listIndex];
        const [removed] = items.splice(source.index, 1);
        items.splice(destination.index, 0, removed);
        setSelectedPlacesArray(copiedPlace);
      } else {
        const newSelectedPlaces = Array.from(selectedPlaces || []);
        const sourceListIndex = parseInt(source.droppableId.split("-")[1]);
        const destinationListIndex = parseInt(
          destination.droppableId.split("-")[1],
        );
        const copiedPlace = [...newSelectedPlaces];
        const sourceItems = copiedPlace[sourceListIndex];
        const destinationItems = copiedPlace[destinationListIndex];
        const [removed] = sourceItems.splice(source.index, 1);
        destinationItems.splice(destination.index, 0, removed);
        setSelectedPlacesArray(copiedPlace);
      }
    }
  };

  const handleViewPlan = (e: React.MouseEvent, index: number) => {
    const newViewPlanStates = [...viewPlanStates];
    newViewPlanStates[index] = !newViewPlanStates[index];

    setViewPlanStates(newViewPlanStates);
    // setTripIndex(index);
  };

  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      height: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3,
      },
    },
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ul className="flex flex-col my-5 gap-[10px]">
        {tripDates?.length !== 0 && selectedAccommodations && selectedPlaces ? (
          tripDates?.map((item, index) => (
            <React.Fragment key={index}>
              <div className="bg-secondary flex items-center h-14 px-5 gap-2 font-semibold justify-between">
                <span className="font-light text-contentMuted">
                  {`Day${index + 1} | ${item}`}
                </span>
                <button
                  className="p-0 m-0"
                  onClick={(e) => handleViewPlan(e, index)}
                >
                  {viewPlanStates[index] ? (
                    <CiSquareChevUp size={20} color="#828282" />
                  ) : (
                    <CiSquareChevDown size={20} color="#828282" />
                  )}
                </button>
              </div>
              <AddSchedule index={index} />
              <Droppable droppableId={`selectedPlan-${index}`}>
                {(provided) => (
                  <motion.div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="overflow-hidden"
                    animate={viewPlanStates[index] ? "open" : "closed"}
                    variants={variants}
                    transition={{ ease: "easeIn", duration: 0.3 }}
                    style={{ originY: 0.55 }}
                  >
                    {selectedPlaces &&
                      selectedPlaces[index]?.map((item, placeIndex) => (
                        <Draggable
                          key={item.title}
                          draggableId={item.title}
                          index={placeIndex}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <AddPlanButton
                                text="장소"
                                place={item.title}
                                key={index}
                                index={index}
                                placeIndex={placeIndex}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}

                    {selectedAccommodations &&
                      selectedAccommodations[index]?.map(
                        (item, accommondationIndex) => (
                          <Draggable
                            key={item?.title}
                            draggableId={item.title}
                            index={accommondationIndex}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <AddPlanButton
                                  text="숙소"
                                  place={item?.title}
                                  key={index}
                                  index={index}
                                  accommondationIndex={accommondationIndex}
                                />
                              </div>
                            )}
                          </Draggable>
                        ),
                      )}
                    {provided.placeholder}
                  </motion.div>
                )}
              </Droppable>
            </React.Fragment>
          ))
        ) : (
          <>
            {tripDates?.map((item, index) => (
              <React.Fragment key={index}>
                <div className="bg-secondary flex items-center h-14 px-5 gap-2 font-semibold justify-between">
                  <span className="font-light text-contentMuted">
                    {`Day${index + 1} | ${item}`}
                  </span>
                </div>

                <AddPlanButton text="장소" index={index} />
                <AddPlanButton text="숙소" index={index} />
              </React.Fragment>
            ))}
          </>
        )}
      </ul>
    </DragDropContext>
  );
}

export default TripDays;
