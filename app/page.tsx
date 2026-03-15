'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import TaskManager from '@/components/TaskManager'
import HabitTracker from '@/components/HabitTracker'
import PomodoroTimer from '@/components/PomodoroTimer'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tasks' | 'habits' | 'timer'>('dashboard')

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'tasks', label: '📋 Tasks', icon: '📋' },
    { id: 'habits', label: '🎯 Habits', icon: '🎯' },
    { id: 'timer', label: '⏱️ Timer', icon: '⏱️' },
  ] as const

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">ADHD Focus</h1>
          <p className="text-gray-600">Your personal task & habit management app</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex gap-2 bg-white rounded-lg shadow-sm p-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-md font-medium transition-all whitespace-nowrap text-sm md:text-base ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="tab-content transition-opacity duration-200">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'tasks' && <TaskManager />}
          {activeTab === 'habits' && <HabitTracker />}
          {activeTab === 'timer' && <PomodoroTimer />}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>💾 All data is saved locally in your browser</p>
          <p className="mt-2">Made with ❤️ for ADHD focus</p>
        </div>
      </div>
    </main>
  )
}
