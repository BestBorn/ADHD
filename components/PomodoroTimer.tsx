'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { saveTimerSettings, loadTimerSettings, loadTimerSessions, saveTimerSessions, getTodayDate } from '@/lib/storage'
import { TimerSession } from '@/lib/types'

export default function PomodoroTimer() {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true)
  const [sessions, setSessions] = useState<TimerSession[]>([])
  const [sessionNote, setSessionNote] = useState('')
  const [showNoteInput, setShowNoteInput] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const settings = loadTimerSettings()
    setWorkMinutes(settings.workMinutes)
    setBreakMinutes(settings.breakMinutes)
    setTimeLeft(settings.workMinutes * 60)

    const loadedSessions = loadTimerSessions()
    setSessions(loadedSessions)

    // Initialize audio
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj==')
  }, [])

  useEffect(() => {
    saveTimerSettings(workMinutes, breakMinutes)
  }, [workMinutes, breakMinutes])

  useEffect(() => {
    if (!isRunning) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
      return
    }

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Timer ended
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e))
          }
          setIsRunning(false)
          setShowNoteInput(true)

          // Add session
          if (isWorkSession) {
            const today = getTodayDate()
            setSessions(prev => {
              const updated = [...prev]
              const todaySession = updated.find(s => s.date === today)
              if (todaySession) {
                todaySession.count += 1
              } else {
                updated.push({ date: today, count: 1 })
              }
              saveTimerSessions(updated)
              return updated
            })
          }

          // Switch to break/work
          if (isWorkSession) {
            setIsWorkSession(false)
            setTimeLeft(breakMinutes * 60)
          } else {
            setIsWorkSession(true)
            setTimeLeft(workMinutes * 60)
          }
          return breakMinutes * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [isRunning, isWorkSession, breakMinutes, workMinutes])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setIsWorkSession(true)
    setTimeLeft(workMinutes * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleWorkMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(30, parseInt(e.target.value) || 1))
    setWorkMinutes(value)
    if (isWorkSession && !isRunning) {
      setTimeLeft(value * 60)
    }
  }

  const handleBreakMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(30, parseInt(e.target.value) || 1))
    setBreakMinutes(value)
    if (!isWorkSession && !isRunning) {
      setTimeLeft(value * 60)
    }
  }

  const handleSaveNote = () => {
    setSessionNote('')
    setShowNoteInput(false)
  }

  const todaySession = sessions.find(s => s.date === getTodayDate())
  const sessionsToday = todaySession?.count || 0

  const progress = isWorkSession
    ? ((workMinutes * 60 - timeLeft) / (workMinutes * 60)) * 100
    : ((breakMinutes * 60 - timeLeft) / (breakMinutes * 60)) * 100

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">⏱️ Pomodoro Timer</h2>

      {/* Settings */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Work (1-30 min)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={workMinutes}
              onChange={handleWorkMinutesChange}
              disabled={isRunning}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Break (1-30 min)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={breakMinutes}
              onChange={handleBreakMinutesChange}
              disabled={isRunning}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mb-6 text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-600 mb-2">{isWorkSession ? '💼 Work Session' : '☕ Break Time'}</p>
        <p className="text-sm text-gray-600">Sessions today: {sessionsToday}</p>
      </div>

      {/* Timer Display */}
      <div className="mb-6 flex flex-col items-center">
        <div className="relative w-48 h-48 mb-4">
          {/* Progress Circle */}
          <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke={isWorkSession ? '#3b82f6' : '#10b981'}
              strokeWidth="8"
              strokeDasharray={`${(progress / 100) * 2 * Math.PI * 88} ${2 * Math.PI * 88}`}
              style={{ transition: 'stroke-dasharray 1s linear' }}
            />
          </svg>

          {/* Time Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-gray-800">{formatTime(timeLeft)}</div>
          </div>
        </div>

        {/* Progress bar below */}
        <div className="w-full max-w-md bg-gray-300 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${isWorkSession ? 'bg-blue-500' : 'bg-green-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 flex gap-3 justify-center">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="btn-primary flex items-center gap-2"
          >
            <Play size={20} /> Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Pause size={20} /> Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <RotateCcw size={20} /> Reset
        </button>
      </div>

      {/* Note Input */}
      {showNoteInput && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm font-medium text-gray-800 mb-3">🎉 {isWorkSession ? 'Break time!' : 'Work session complete!'}</p>
          <p className="text-sm text-gray-600 mb-3">What did you accomplish?</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={sessionNote}
              onChange={e => setSessionNote(e.target.value)}
              placeholder="e.g., Completed 3 tasks"
              className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSaveNote}
              className="btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
