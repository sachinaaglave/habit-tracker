import React, { useState, useEffect } from 'react';
import HabitInput from './components/HabitInput';
import HabitDisplay from './components/HabitDisplay';
import localforage from 'localforage';

const App: React.FC = () => {
  const [isHabitSet, setIsHabitSet] = useState(false);

  useEffect(() => {
    const checkHabit = async () => {
      const habit = await localforage.getItem('habit');
      setIsHabitSet(!!habit);
    };
    checkHabit();
  }, []);

  return (
    <div className="App">
      {isHabitSet ? <HabitDisplay /> : <HabitInput />}
    </div>
  );
};

export default App;
