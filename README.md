# ═══════════════════════════════════════════════════════════════

# ✦ TASKFLOW ✦

# Modern To-Do & Reminder Web App

# ═══════════════════════════════════════════════════════════════

<p align="center">

**Organise your day. Set your priorities. Get things done.**

A modern, responsive task-management web application built with
**HTML5 · CSS3 · Vanilla JavaScript**

<br>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![LocalStorage](https://img.shields.io/badge/LocalStorage-7C3AED?style=for-the-badge)

</p>

---

## ✦ PROJECT OVERVIEW

**TaskFlow** is a browser-based productivity application designed to make
everyday task management simple, clean, and visually engaging.

The application allows users to create and manage tasks through a
minimal, distraction-free interface while keeping **pending and completed
tasks clearly separated**.

TaskFlow also includes an **optional reminder system**, allowing users to
set a specific date and time for individual tasks.

The application works entirely in the browser and uses **LocalStorage**
to preserve task data between sessions.

---

## ✦ KEY FEATURES

### 📝 Task Management

| Feature            | Description                        |
| ------------------ | ---------------------------------- |
| ➕ Add Tasks        | Create new tasks quickly           |
| ✏️ Edit Tasks      | Modify existing task descriptions  |
| ✅ Complete Tasks   | Mark tasks as completed            |
| 🗑️ Delete Tasks   | Remove unwanted tasks              |
| 🧹 Clear Completed | Remove all completed tasks at once |

### ⏰ Reminder System

| Feature                  | Description                                  |
| ------------------------ | -------------------------------------------- |
| 🔔 Optional Reminder     | Add a reminder only when needed              |
| 📅 Date & Time           | Set a specific reminder date and time        |
| ✏️ Edit Reminder         | Change an existing reminder                  |
| ❌ Remove Reminder        | Remove a reminder from a task                |
| 🔊 Alarm                 | Play an alarm when the reminder is triggered |
| 🖥️ Browser Notification | Display a browser notification               |
| 💾 Persistent Reminder   | Store reminder information in LocalStorage   |

### 📊 Productivity Interface

* 🔢 Pending task counter
* 🔢 Completed task counter
* 🕐 Task creation timestamps
* 📭 Empty-state messages
* ⚠️ Input validation
* ⚠️ Reminder time validation
* 📱 Responsive mobile layout
* 🎨 Modern glassmorphism-inspired design

---

# ✦ USER EXPERIENCE

TaskFlow follows a simple workflow:

```text
                    ┌─────────────────┐
                    │   CREATE TASK   │
                    └────────┬────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Optional Reminder?    │
                 └───────────┬───────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                 YES                    NO
                  │                     │
                  ▼                     │
          ┌────────────────┐            │
          │ Set Date/Time  │            │
          └───────┬────────┘            │
                  │                     │
                  └──────────┬──────────┘
                             ▼
                    ┌─────────────────┐
                    │   PENDING TASK  │
                    └────────┬────────┘
                             │
                 ┌───────────┼───────────┐
                 ▼           ▼           ▼
              ✏️ Edit     🔔 Reminder   🗑️ Delete
                             │
                             ▼
                       ⏰ Alarm /
                    Notification
                             │
                             ▼
                    ┌─────────────────┐
                    │ COMPLETED TASK  │
                    └─────────────────┘
```

---

# ✦ REMINDER EXPERIENCE

One of TaskFlow's core features is its **optional task reminder system**.

A user can create a task without any reminder:

```text
☐ Buy groceries
   Added 14 Aug, 5:30 PM
```

Or add a reminder:

```text
☐ Complete assignment
   ⏰ Reminder: 14 Aug, 8:00 PM
   Added 14 Aug, 5:30 PM
```

Existing reminders can be managed directly from the task:

```text
                    ✎       🔔       ×
                   Edit    Reminder  Delete
```

This keeps reminders flexible without forcing users to assign a time
to every task.

> **Current limitation:** The reminder checker runs while the TaskFlow
> page is open. Closing the browser or page prevents the current version
> from checking reminders.

---

# ✦ DATA PERSISTENCE

TaskFlow uses the browser's **LocalStorage API** to preserve application
data.

Each task can contain:

```text
Task
├── ID
├── Task Text
├── Completion Status
├── Creation Timestamp
├── Completion Timestamp
├── Reminder Date & Time
└── Reminder Trigger Status
```

This means refreshing the browser does **not** erase the user's tasks.

---

# ✦ TECHNOLOGY STACK

<p align="center">

| Technology            | Purpose                            |
| --------------------- | ---------------------------------- |
| **HTML5**             | Application structure              |
| **CSS3**              | Styling and responsive design      |
| **JavaScript**        | Application logic and interactions |
| **DOM Manipulation**  | Dynamic task rendering             |
| **LocalStorage**      | Client-side data persistence       |
| **Notifications API** | Browser reminder notifications     |
| **Web Audio API**     | Reminder alarm sound               |
| **Flexbox**           | Flexible layouts                   |
| **CSS Grid**          | Dashboard layout                   |
| **Media Queries**     | Responsive behaviour               |
| **Google Fonts**      | DM Sans typography                 |

</p>

---

# ✦ DESIGN SYSTEM

TaskFlow follows a modern productivity-dashboard aesthetic.

### Visual Characteristics

```text
╭──────────────────────────────────────────────╮
│                                              │
│                  TaskFlow                    │
│                                              │
│     ┌──────────────────────────────────┐     │
│     │        Create New Task            │     │
│     └──────────────────────────────────┘     │
│                                              │
│     ┌────────────────┐ ┌────────────────┐    │
│     │  PENDING TASKS │ │ COMPLETED TASKS│    │
│     │                │ │                │    │
│     │  ☐ Task One    │ │  ✓ Task Two   │    │
│     │  ☐ Task Three  │ │  ✓ Task Four  │    │
│     │                │ │                │    │
│     └────────────────┘ └────────────────┘    │
│                                              │
╰──────────────────────────────────────────────╯
```

### UI Principles

* Clean visual hierarchy
* Minimal distractions
* Rounded components
* Soft shadows
* Glassmorphism-inspired surfaces
* Purple accent colour
* Clear task states
* Responsive layouts
* Accessible interaction patterns

---

# ✦ RESPONSIVE DESIGN

TaskFlow adapts to different screen sizes.

### 💻 Desktop

Two-column task dashboard:

```text
┌───────────────────────┬───────────────────────┐
│    PENDING TASKS      │   COMPLETED TASKS     │
│                       │                       │
│    Task 1             │   Task 3              │
│    Task 2             │   Task 4              │
└───────────────────────┴───────────────────────┘
```

### 📱 Mobile

The interface automatically switches to a single-column layout:

```text
┌─────────────────────────────┐
│       PENDING TASKS         │
│                             │
│       Task 1                │
│       Task 2                │
└─────────────────────────────┘

┌─────────────────────────────┐
│      COMPLETED TASKS        │
│                             │
│       Task 3                │
└─────────────────────────────┘
```

---

# ✦ PROJECT STRUCTURE

```text
To_Do_Web_App/
│
├── 📄 index.html
│   └── Application structure
│
├── 🎨 style.css
│   └── UI, animations & responsive design
│
├── ⚙️ script.js
│   └── Task management & reminder logic
│
└── 📖 README.md
    └── Project documentation
```

---

# ✦ HOW TO RUN

### 01 — Open the project

Open the project folder in **Visual Studio Code**.

### 02 — Start the application

Open `index.html` directly in your browser.

For development, using **VS Code Live Server** is recommended.

### 03 — Start managing tasks

```text
Add Task
   ↓
Optionally Set Reminder
   ↓
Manage Task
   ↓
Complete / Edit / Delete
```

No database or backend server is required for the current version.

---

# ✦ FEATURE HIGHLIGHTS

### ⚡ Lightweight

Built entirely with Vanilla JavaScript without requiring a frontend
framework.

### 💾 Persistent

Tasks remain stored in the browser using LocalStorage.

### 🔔 Smart Reminders

Reminders are optional and can be added, edited, or removed at any time.

### 📱 Responsive

Designed to work across desktop, tablet, and mobile screen sizes.

### 🎨 Modern UI

A clean glassmorphism-inspired interface provides a polished productivity
experience.

---

# ✦ CURRENT STATUS

**Version:** `1.0`

**Status:** 🟢 Active Development

### Implemented

* [x] Task creation
* [x] Task editing
* [x] Task deletion
* [x] Task completion
* [x] Pending/completed separation
* [x] Task counters
* [x] Task timestamps
* [x] LocalStorage persistence
* [x] Optional reminders
* [x] Edit reminders
* [x] Remove reminders
* [x] Browser notifications
* [x] Alarm sound
* [x] Responsive interface
* [x] Input validation

### Potential Future Improvements

* [ ] Reminders when the browser is closed
* [ ] Service Worker notification support
* [ ] Recurring tasks
* [ ] Task categories
* [ ] Priority levels
* [ ] Search and filtering
* [ ] Dark mode
* [ ] Cloud synchronization
* [ ] User accounts
* [ ] Backend database

---

# ✦ PROJECT SUMMARY

**TaskFlow** combines simple task management with an optional reminder
system in a clean and responsive productivity interface.

The project demonstrates practical implementation of:

**Frontend Development · DOM Manipulation · LocalStorage · Responsive UI ·
Browser APIs · Event Handling · Client-Side Application Logic**

---

<p align="center">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### ✦ TASKFLOW ✦

**Organise your day. One task at a time.**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

</p>
