# Quick Start Guide - ADHD Focus App

## 🚀 Running the App Locally

### Option 1: Development Mode (Recommended for development)
```bash
npm run dev
```
Then open `http://localhost:3000` in your browser.

### Option 2: Production Mode
```bash
npm run build
npm start
```
Then open `http://localhost:3000` in your browser.

## 📋 What You Can Do

### Task Manager
1. Click **📋 Tasks** tab
2. Type your task name
3. Choose priority (Low, Medium, High)
4. Optionally set a due date
5. Click **Add**
6. Check off tasks as you complete them
7. Use filters to hide completed or low-priority tasks

### Habit Tracker
1. Click **🎯 Habits** tab
2. Enter habit name (e.g., "Drink Water", "Exercise")
3. Set daily goal (how many times per day)
4. Click **Add**
5. Click the **+** button to log completions
6. Watch your streak grow! 🔥

### Pomodoro Timer
1. Click **⏱️ Timer** tab
2. Customize work time (1-30 minutes)
3. Customize break time (1-30 minutes)
4. Click **Start**
5. When timer ends, it will ring and ask what you accomplished
6. Switch between work and break sessions automatically

### Dashboard
1. Click **📊 Dashboard** tab
2. See your progress at a glance:
   - Tasks completed today
   - Your best habit streak
   - Pomodoro sessions completed
   - Motivational message
3. Click **Focus ON** button to reduce distractions

## 💾 Your Data

- **All data is saved locally** in your browser
- No accounts, no login, no external servers
- Data persists even if you close the browser
- Data is tied to your browser/device

## 🔌 Using as a Chrome Extension

### Quick Method (Easiest):
1. Run the app locally with `npm run dev`
2. Create a bookmark with this code:
   ```javascript
   javascript:window.open('http://localhost:3000', 'ADHD Focus', 'width=900,height=700');
   ```
3. Click the bookmark anytime to open the app in a popup window

## 🎯 ADHD Tips

1. **Start small** - Add 1-3 high-priority tasks per day
2. **Use Pomodoro** - 25 minutes focused work, 5 minute break
3. **One habit at a time** - Don't add too many habits at once
4. **Celebrate wins** - Mark tasks complete and watch your progress
5. **Use Focus Mode** - Click "Focus ON" to minimize distractions
6. **Review Dashboard** - Check your progress for motivation

## ⚙️ Settings

### Timer Settings
- Work duration: 1-30 minutes (default 25)
- Break duration: 1-30 minutes (default 5)
- Settings save automatically

### Habit Tracking
- Habits reset daily at midnight
- Streaks are automatically tracked
- Completions reset each day

## 🐛 Troubleshooting

**App is blank?**
- Refresh the page (Ctrl+R or Cmd+R)
- Check browser console for errors

**Data disappeared?**
- Check if you're in private/incognito mode (data won't persist)
- Clear browser cache might have deleted localStorage
- Data is device/browser specific

**Timer sound not working?**
- Check browser sound settings
- Make sure volume is on
- Some browsers require user interaction before playing sounds

## 📧 Keyboard Shortcuts

- **Enter** in task/habit name field = Add task/habit
- Tab = Navigate between fields

## 🎨 Colors & Design

- **Blue** = Tasks
- **Green** = Habits
- **Orange** = Timer & Motivation
- **Purple** = Messages
- **Gray** = Neutral UI

---

Need help? Check the full README.md for more detailed information!
