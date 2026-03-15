export interface Task {
  id: string
  name: string
  priority: 'Low' | 'Medium' | 'High'
  dueDate?: string
  completed: boolean
  createdAt: number
}

export interface Habit {
  id: string
  name: string
  dailyGoal: number
  completions: number
  streak: number
  lastCompleted: string
  createdAt: number
}

export interface TimerSession {
  date: string
  count: number
}

export interface BuddyEmail {
  email: string
}
