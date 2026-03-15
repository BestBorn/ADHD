'use client'

import { useState, useEffect } from 'react'
import { Task } from '@/lib/types'
import { saveTasks, loadTasks } from '@/lib/storage'
import { Trash2, Plus, Check } from 'lucide-react'

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskName, setTaskName] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium')
  const [dueDate, setDueDate] = useState('')
  const [hideComplete, setHideComplete] = useState(false)
  const [hideLowPriority, setHideLowPriority] = useState(false)

  useEffect(() => {
    setTasks(loadTasks())
  }, [])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = () => {
    if (!taskName.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      priority,
      dueDate: dueDate || undefined,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks([newTask, ...tasks])
    setTaskName('')
    setDueDate('')
    setPriority('Medium')
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const priorityColors = {
    Low: 'bg-gray-100 text-gray-700 border-gray-300',
    Medium: 'bg-blue-100 text-blue-700 border-blue-300',
    High: 'bg-orange-100 text-orange-700 border-orange-300',
  }

  const filteredTasks = tasks.filter(t => {
    if (hideComplete && t.completed) return false
    if (hideLowPriority && t.priority === 'Low') return false
    return true
  })

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 Task Manager</h2>

      {/* Add Task Form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="What's your next task?"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addTask()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTask}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
          <input
            type="checkbox"
            checked={hideComplete}
            onChange={e => setHideComplete(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Hide completed tasks</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
          <input
            type="checkbox"
            checked={hideLowPriority}
            onChange={e => setHideLowPriority(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Hide low priority</span>
        </label>
      </div>

      {/* Progress */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-600">
          {completedCount}/{tasks.length} tasks completed
        </p>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: tasks.length > 0 ? `${(completedCount / tasks.length) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No tasks. Great job! 🎉</p>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                task.completed
                  ? 'bg-gray-100 border-gray-200 line-through text-gray-400'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-green-500'
                }`}
              >
                {task.completed && <Check size={16} className="text-white" />}
              </button>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{task.name}</p>
                {task.dueDate && (
                  <p className="text-xs text-gray-400 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                )}
              </div>

              <span className={`px-2 py-1 rounded text-xs font-medium border ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
