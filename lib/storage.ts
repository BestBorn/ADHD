import { Task, Habit, TimerSession, BuddyEmail } from './types'

const STORAGE_KEYS = {
  TASKS: 'adhd_tasks',
  HABITS: 'adhd_habits',
  TIMER_SESSIONS: 'adhd_timer_sessions',
  BUDDY_EMAIL: 'adhd_buddy_email',
  TIMER_SETTINGS: 'adhd_timer_settings',
}

// Tasks
export const saveTasks = (tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks))
  }
}

export const loadTasks = (): Task[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS)
    return data ? JSON.parse(data) : []
  }
  return []
}

// Habits
export const saveHabits = (habits: Habit[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits))
  }
}

export const loadHabits = (): Habit[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.HABITS)
    return data ? JSON.parse(data) : []
  }
  return []
}

// Timer Sessions
export const saveTimerSessions = (sessions: TimerSession[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TIMER_SESSIONS, JSON.stringify(sessions))
  }
}

export const loadTimerSessions = (): TimerSession[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.TIMER_SESSIONS)
    return data ? JSON.parse(data) : []
  }
  return []
}

// Buddy Email
export const saveBuddyEmail = (email: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.BUDDY_EMAIL, email)
  }
}

export const loadBuddyEmail = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEYS.BUDDY_EMAIL) || ''
  }
  return ''
}

// Timer Settings
export const saveTimerSettings = (workMinutes: number, breakMinutes: number) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TIMER_SETTINGS, JSON.stringify({ workMinutes, breakMinutes }))
  }
}

export const loadTimerSettings = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.TIMER_SETTINGS)
    return data ? JSON.parse(data) : { workMinutes: 25, breakMinutes: 5 }
  }
  return { workMinutes: 25, breakMinutes: 5 }
}

export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0]
}
