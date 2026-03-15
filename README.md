# ADHD Focus - Task Manager & Habit Tracker

A comprehensive ADHD-friendly app designed to help you manage tasks, track habits, stay focused with Pomodoro timer, and build accountability. All data is stored locally in your browser.

## 🌟 Features

### 📋 **Task Manager**
- Add tasks with priority levels (Low, Medium, High)
- Set optional due dates
- Track completion status with checkboxes
- Filter: Hide completed tasks or low-priority items
- Progress bar showing completion percentage

### 🎯 **Habit Tracker**
- Create daily habits with customizable goals
- Track multiple completions per day
- Automatic daily reset at midnight
- Streak counter to gamify consistency
- Visual progress indicators

### ⏱️ **Pomodoro Timer**
- Customizable work duration (1-30 minutes)
- Customizable break duration (1-30 minutes)
- Circular progress indicator
- Ring sound notification when timer completes
- Session counter for the day
- Prompt to log accomplishments after each session

### 📊 **Dashboard**
- Daily progress overview
- Task completion percentage
- Longest habit streak
- Pomodoro sessions completed today
- Motivational messages
- Quick tips for ADHD focus

### 💡 **Focus Mode**
- Highlight active section
- Reduce distractions on non-active elements
- Clear visual focus cue

## 🚀 Getting Started

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 💾 Data Storage

All data is automatically saved to your browser's localStorage:
- Tasks (with priority and due dates)
- Habits (with streaks and daily progress)
- Timer settings and session history
- User preferences

Your data persists across sessions and browser restarts.

## 🔌 Chrome Extension Setup

To use ADHD Focus as a Chrome extension:

### Quick Method: Bookmarklet

Create a bookmark with this code to open the app in a popup:

```javascript
javascript:window.open('http://localhost:3000', 'ADHD Focus', 'width=900,height=700');
```

Then click the bookmark to launch ADHD Focus anytime.

## 🎨 Design

- **Color Scheme:** Soft blue (#4B5EAA), light gray (#E5E7EB), motivational orange (#F97316)
- **Typography:** Montserrat font, 16px base size
- **Layout:** Minimal, distraction-free interface with tabbed navigation
- **Responsive:** Works on desktop, tablet, and mobile

## 📁 Project Structure

```
/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main app page with tabs
│   └── globals.css        # Global styles
├── components/
│   ├── Dashboard.tsx      # Dashboard metrics
│   ├── TaskManager.tsx    # Task management
│   ├── HabitTracker.tsx   # Habit tracking
│   └── PomodoroTimer.tsx  # Pomodoro timer
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   └── storage.ts         # localStorage utilities
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🔧 Technologies

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Storage:** Browser localStorage
- **Icons:** Lucide React

## 💡 Tips for ADHD Users

- Start with 1-3 high-priority tasks per day
- Use the Pomodoro timer for focused work sessions
- Build one habit at a time
- Celebrate small wins
- Use Focus Mode when you need to minimize distractions
- Review your Dashboard for motivation

## 🤝 Contributing

Feel free to fork and customize this app for your needs!

## 📝 License

Open source - use and modify as needed.

---

**Made with ❤️ for people with ADHD who want to stay focused and organized.**