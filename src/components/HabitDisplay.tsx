import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";
import { Habit } from "../types/Habit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const HabitItem: React.FC<{
  habit: Habit;
  index: number;
  onSwipeRight: (index: number) => void;
}> = ({ habit, index, onSwipeRight }) => {
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => onSwipeRight(index),
  });

  return (
    <div key={index} className="mb-4" {...swipeHandlers}>
      <img
        src={habit.image || ""}
        alt={habit.name}
        className="w-full rounded"
      />
      <p>
        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
        {habit.name}
      </p>
      <p>Consecutive Days: {habit.consecutiveDays}</p>
      <p>Status: {habit.isActive ? "Active" : "Disabled"}</p>
    </div>
  );
};

const HabitDisplay: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHabits = async () => {
      const storedHabits = await localforage.getItem<Habit[]>("habits");
      if (storedHabits) {
        setHabits(storedHabits || []);
      } else {
        navigate("/habit-input"); // Redirect if no habits are found
      }
      console.log("storedHabits", storedHabits);
    };
    loadHabits();
  }, [navigate]);

  console.log("habits", habits);
  const canAddMoreHabits = habits.every((habit) => habit.consecutiveDays >= 21);

  const handleAddMoreClick = () => {
    navigate("/habit-input");
  };

  const handleSwipeRight = (index: number) => {
    setHabits((prevHabits) => {
      const updatedHabits = [...prevHabits];
      updatedHabits[index].consecutiveDays += 1; // Mark as performed by incrementing consecutive days
      return updatedHabits;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600">
      <div className="w-full max-w-md px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <>
            {habits.map((habit, index) => (
              <HabitItem
                key={index}
                habit={habit}
                index={index}
                onSwipeRight={handleSwipeRight}
              />
            ))}
            {canAddMoreHabits && (
              <button
                onClick={handleAddMoreClick}
                className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300 font-bold mt-4"
              >
                Add More
              </button>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default HabitDisplay;
