import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import FileUpload from './FileUpload';
import { Habit } from '../types/Habit';

const HabitInput: React.FC = () => {
  const [habitName, setHabitName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkHabit = async () => {
      const habitData = await localforage.getItem<Habit[]>('habits');
      if (habitData && habitData.length > 0) {
        navigate('/display');
      }
    };
    checkHabit();
  }, [navigate]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleHabitSubmit = async () => {
    if (habitName && image) {
      const newHabit: Habit = {
        name: habitName,
        image,
        consecutiveDays: 0,
        isActive: true,
        lastTrackedDate: null,
      };

      const existingHabits = (await localforage.getItem<Habit[]>('habits')) || [];
      await localforage.setItem('habits', [...existingHabits, newHabit]);
      setHabitName('');
      setImage(null);
      navigate('/display');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="Enter your habit"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {image ? (
            <img src={image} alt="Uploaded preview" className="w-full mb-4 rounded" />
          ) : (
            <FileUpload onFileSelect={handleImageUpload} />
          )}
          <button
            onClick={handleHabitSubmit}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300 font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitInput; 