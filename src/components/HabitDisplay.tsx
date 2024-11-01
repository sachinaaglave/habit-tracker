import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import localforage from 'localforage';

const HabitDisplay: React.FC = () => {
  const [habitData, setHabitData] = useState<{ habit: string; image: string } | null>(null);

  useEffect(() => {
    const fetchHabit = async () => {
      const data = await localforage.getItem<{ habit: string; image: string }>('habit');
      setHabitData(data);
    };
    fetchHabit();
  }, []);

  const handleSwipe = (direction: string) => {
    if (habitData) {
      const today = new Date().toISOString().split('T')[0];
      const habitStatus = direction === 'right' ? true : false;
      localforage.setItem(`habit-${today}`, habitStatus);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
  });

  if (!habitData) return <div>Loading...</div>;

  return (
    <div {...handlers}>
      <h1>{habitData.habit}</h1>
      <img src={habitData.image} alt="Habit" />
    </div>
  );
};

export default HabitDisplay; 