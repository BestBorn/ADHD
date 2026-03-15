import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ADHD Focus - Task Manager & Habit Tracker',
  description: 'An ADHD-friendly task management and habit tracking app with Pomodoro timer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
