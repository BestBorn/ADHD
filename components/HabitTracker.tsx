'use client'

import { useState, useEffect } from 'react'
import { Habit } from '@/lib/types'
import { saveHabits, loadHabits, getTodayDate } from '@/lib/storage'
import { Plus, Trash2, Check } from 'lucide-react'

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [habitName, setHabitName] = useState('')
  const [dailyGoal, setDailyGoal] = useState(3)
  const [today, setToday] = useState(getTodayDate())

  useEffect(() => {
    setHabits(loadHabits())
    setToday(getTodayDate())

    // Check for daily reset
    const timer = setInterval(() => {
      const currentDate = getTodayDate()
      if (currentDate !== today) {
        setToday(currentDate)
        // Reset completions for new day
        setHabits(prev =>
          prev.map(h => ({
            ...h,
            completions: 0,
          }))
        )
      }
    }, 60000) // Check every minute

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  const addHabit = () => {
    if (!habitName.trim()) return

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: habitName,
      dailyGoal,
      completions: 0,
      streak: 0,
      lastCompleted: getTodayDate(),
      createdAt: Date.now(),
    }
    setHabits([newHabit, ...habits])
    setHabitName('')
    setDailyGoal(3)
  }

  const incrementCompletion = (id: string) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const newCompletions = Math.min(h.completions + 1, h.dailyGoal)
        const newStreak = newCompletions === h.dailyGoal ? h.streak + 1 : h.streak
        return {
          ...h,
          completions: newCompletions,
          streak: newStreak,
          lastCompleted: getTodayDate(),
        }
      }
      return h
    }))
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id))
  }

  const totalGoals = habits.reduce((sum, h) => sum + h.dailyGoal, 0)
  const totalCompleted = habits.reduce((sum, h) => sum + h.completions, 0)

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 Habit Tracker</h2>

      {/* Add Habit Form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="What habit do you want to build?"
            value={habitName}
            onChange={e => setHabitName(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addHabit()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <label className="flex-1 flex items-center gap-2">
              <span className="text-sm text-gray-600">Daily goal:</span>
              <input
                type="number"
                min="1"
                max="20"
                value={dailyGoal}
                onChange={e => setDailyGoal(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <button
              onClick={addHabit}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-gray-600">
          {totalCompleted}/{totalGoals} habit completions today
        </p>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: totalGoals > 0 ? `${(totalCompleted / totalGoals) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-3">
        {habits.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No habits yet. Start small! 💪</p>
        ) : (
          habits.map(habit => (
            <div
              key={habit.id}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{habit.name}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span>Streak: {habit.streak} days 🔥</span>
                    <span>Today: {habit.completions}/{habit.dailyGoal}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Completion Buttons */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: habit.dailyGoal }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (idx === habit.completions - 1) {
                        // Allow decrementing by clicking again
                        setHabits(habits.map(h =>
                          h.id === habit.id ? { ...h, completions: Math.max(0, h.completions - 1) } : h
                        ))
                      }
                    }}
                    disabled={idx >= habit.completions && habit.completions < habit.dailyGoal}
                    className={`w-10 h-10 rounded-lg font-bold transition-all flex items-center justify-center ${
                      idx < habit.completions
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-pointer hover:bg-gray-300'
                    }`}
                  >
                    {idx < habit.completions ? <Check size={20} /> : idx + 1}
                  </button>
                ))}
                {habit.completions < habit.dailyGoal && (
                  <button
                    onClick={() => incrementCompletion(habit.id)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Plus size={18} /> Add
                  </button>
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${(habit.completions / habit.dailyGoal) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
