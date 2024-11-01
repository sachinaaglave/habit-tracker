import React, { useState } from 'react';
import localforage from 'localforage';

const HabitInput: React.FC = () => {
  const [habit, setHabit] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleHabitSubmit = async () => {
    if (habit && image) {
      const habitData = { habit, image: URL.createObjectURL(image) };
      await localforage.setItem('habit', habitData);
      setHabit('');
      setImage(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Enter your habit"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={handleHabitSubmit}>Submit</button>
    </div>
  );
};

export default HabitInput; 