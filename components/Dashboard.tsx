'use client'

import { useState, useEffect } from 'react'
import { Task, Habit, TimerSession } from '@/lib/types'
import { loadTasks, loadHabits, loadTimerSessions, getTodayDate } from '@/lib/storage'

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [habits, setHabits] = useState<Habit[]>([])
  const [sessions, setSessions] = useState<TimerSession[]>([])
  const [focusMode, setFocusMode] = useState(false)

  const motivationalMessages = [
    "You're doing great! Keep going! 🚀",
    "Progress over perfection! 💪",
    "Every task completed is a win! 🎉",
    "You've got this! Stay focused! 🎯",
    "Believe in yourself! 🌟",
    "One step at a time! 👣",
    "You're crushing it! 💥",
    "Small wins lead to big victories! 🏆",
    "Focus on what you can control! 🧠",
    "Be proud of your progress! ⭐",
  ]

  useEffect(() => {
    setTasks(loadTasks())
    setHabits(loadHabits())
    setSessions(loadTimerSessions())
  }, [])

  const todayDate = getTodayDate()
  const todaySession = sessions.find(s => s.date === todayDate)
  const sessionsToday = todaySession?.count || 0

  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length

  const longestStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak), 0) : 0
  const topHabit = habits.reduce((prev, current) => (prev.streak > current.streak ? prev : current), null)

  const getRandomMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
  }

  return (
    <div className={`card ${focusMode ? 'ring-4 ring-orange-500' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🎯 ADHD Focus</h1>
        <button
          onClick={() => setFocusMode(!focusMode)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            focusMode
              ? 'bg-orange-500 text-white ring-2 ring-orange-300'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {focusMode ? '🔒 Focus ON' : '🔓 Focus OFF'}
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Tasks Card */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-600">📋 Tasks</h3>
            <span className="text-2xl font-bold text-blue-600">{completedTasks}/{totalTasks}</span>
          </div>
          <p className="text-xs text-gray-600">
            {totalTasks === 0 ? 'Add your first task!' : `${Math.round((completedTasks / totalTasks) * 100)}% complete`}
          </p>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%',
              }}
            />
          </div>
        </div>

        {/* Habits Card */}
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-600">🎯 Best Streak</h3>
            <span className="text-2xl font-bold text-green-600">{longestStreak} days</span>
          </div>
          <p className="text-xs text-gray-600">
            {topHabit ? `${topHabit.name} 🔥` : 'Start a habit!'}
          </p>
          <div className="w-full bg-green-200 rounded-full h-2 mt-3">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((longestStreak / 30) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Pomodoro Card */}
        <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-600">⏱️ Focus Sessions</h3>
            <span className="text-2xl font-bold text-orange-600">{sessionsToday}</span>
          </div>
          <p className="text-xs text-gray-600">
            {sessionsToday === 0 ? 'Start your first session!' : `Great focus today!`}
          </p>
          <div className="w-full bg-orange-200 rounded-full h-2 mt-3">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((sessionsToday / 5) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
        <p className="text-lg font-semibold text-purple-800">{getRandomMessage()}</p>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">📊 Today's Summary</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Tasks:</span> {completedTasks} of {totalTasks} completed
            {totalTasks > 0 && ` (${Math.round((completedTasks / totalTasks) * 100)}%)`}
          </p>
          <p>
            <span className="font-medium">Habits:</span> {habits.length} active {habits.length === 1 ? 'habit' : 'habits'}
          </p>
          <p>
            <span className="font-medium">Focus Sessions:</span> {sessionsToday} Pomodoro {sessionsToday === 1 ? 'session' : 'sessions'}
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">💡 Quick Tips</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Start with 1-3 high-priority tasks</li>
          <li>• Use Pomodoro timer for focused work</li>
          <li>• Build one habit at a time</li>
          <li>• Celebrate small wins!</li>
        </ul>
      </div>
    </div>
  )
}
