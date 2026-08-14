/* =========================================
   ELEMENTS
========================================= */

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");

const taskReminder =
    document.getElementById("taskReminder");

const clearReminder =
    document.getElementById("clearReminder");

const pendingTasks =
    document.getElementById("pendingTasks");

const completedTasks =
    document.getElementById("completedTasks");

const pendingCount =
    document.getElementById("pendingCount");

const completedCount =
    document.getElementById("completedCount");

const pendingEmpty =
    document.getElementById("pendingEmpty");

const completedEmpty =
    document.getElementById("completedEmpty");

const inputError =
    document.getElementById("inputError");

const currentDate =
    document.getElementById("currentDate");

const clearCompletedBtn =
    document.getElementById("clearCompleted");


/* =========================================
   TASK DATA
========================================= */

let tasks = JSON.parse(
    localStorage.getItem("taskFlowTasks")
) || [];


/* =========================================
   CURRENT DATE
========================================= */

function displayCurrentDate() {

    const today = new Date();

    currentDate.textContent =
        today.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        });
}


/* =========================================
   SAVE TASKS
========================================= */

function saveTasks() {

    localStorage.setItem(
        "taskFlowTasks",
        JSON.stringify(tasks)
    );
}


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(timestamp) {

    const date = new Date(timestamp);

    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit"
    });
}


/* =========================================
   FORMAT REMINDER
========================================= */

function formatReminder(timestamp) {

    const date = new Date(timestamp);

    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}


/* =========================================
   REQUEST NOTIFICATION PERMISSION
========================================= */

function requestNotificationPermission() {

    if (!("Notification" in window)) {
        return;
    }

    if (Notification.permission === "default") {

        Notification.requestPermission();
    }
}


/* =========================================
   PLAY ALARM SOUND
========================================= */

function playAlarmSound() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }

        const audioContext =
            new AudioContext();

        const oscillator =
            audioContext.createOscillator();

        const gainNode =
            audioContext.createGain();


        oscillator.connect(gainNode);

        gainNode.connect(
            audioContext.destination
        );


        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            880,
            audioContext.currentTime
        );


        gainNode.gain.setValueAtTime(
            0.3,
            audioContext.currentTime
        );


        oscillator.start();


        oscillator.stop(
            audioContext.currentTime + 0.6
        );

    } catch (error) {

        console.log(
            "Alarm sound could not be played."
        );
    }
}


/* =========================================
   TRIGGER REMINDER
========================================= */

function triggerReminder(task) {

    /* Prevent the same reminder
       from triggering repeatedly */

    task.reminderTriggered = true;

    saveTasks();


    /* Play alarm */

    playAlarmSound();


    /* Browser notification */

    if (
        "Notification" in window &&
        Notification.permission === "granted"
    ) {

        new Notification(
            "TaskFlow Reminder",
            {
                body: task.text
            }
        );
    }


    /* Popup */

    alert(
        `⏰ Reminder\n\n${task.text}`
    );


    renderTasks();
}


/* =========================================
   CHECK REMINDERS
========================================= */

function checkReminders() {

    const now = Date.now();


    tasks.forEach(task => {

        /* Ignore tasks without reminders */

        if (!task.reminder) {
            return;
        }


        /* Ignore completed tasks */

        if (task.completed) {
            return;
        }


        /* Ignore already triggered reminders */

        if (task.reminderTriggered) {
            return;
        }


        const reminderTime =
            new Date(task.reminder).getTime();


        if (
            !isNaN(reminderTime) &&
            reminderTime <= now
        ) {

            triggerReminder(task);
        }

    });
}


/* =========================================
   CREATE TASK
========================================= */

function addTask(
    text,
    reminder = null
) {

    const newTask = {

        id: Date.now(),

        text: text,

        completed: false,

        createdAt: Date.now(),

        completedAt: null,

        reminder: reminder,

        reminderTriggered: false
    };


    tasks.push(newTask);

    saveTasks();

    renderTasks();
}


/* =========================================
   DELETE TASK
========================================= */

function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );


    saveTasks();

    renderTasks();
}


/* =========================================
   TOGGLE COMPLETE
========================================= */

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed =
                !task.completed;


            task.completedAt =
                task.completed
                    ? Date.now()
                    : null;
        }


        return task;
    });


    saveTasks();

    renderTasks();
}


/* =========================================
   EDIT TASK TEXT
========================================= */

function editTask(id) {

    const task =
        tasks.find(
            task => task.id === id
        );


    if (!task) {
        return;
    }


    const taskItem =
        document.querySelector(
            `[data-id="${id}"]`
        );


    const taskInfo =
        taskItem.querySelector(
            ".task-info"
        );


    taskInfo.innerHTML = "";


    const input =
        document.createElement("input");


    input.type = "text";

    input.value = task.text;

    input.className = "edit-input";

    input.maxLength = 150;


    taskInfo.appendChild(input);


    input.focus();

    input.select();


    function saveEdit() {

        const newText =
            input.value.trim();


        if (newText === "") {

            renderTasks();

            return;
        }


        task.text = newText;


        saveTasks();

        renderTasks();
    }


    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                saveEdit();
            }


            if (event.key === "Escape") {

                renderTasks();
            }

        }
    );


    input.addEventListener(
        "blur",
        saveEdit
    );
}


/* =========================================
   EDIT / ADD / REMOVE REMINDER
========================================= */

function editReminder(id) {

    const task =
        tasks.find(
            task => task.id === id
        );


    if (!task) {
        return;
    }


    const taskItem =
        document.querySelector(
            `[data-id="${id}"]`
        );


    if (!taskItem) {
        return;
    }


    /* =====================================
       REMOVE EXISTING REMINDER
    ===================================== */

    if (task.reminder) {

        const removeReminder =
            confirm(
                `Current reminder:\n${formatReminder(task.reminder)}\n\n` +
                `Click OK to remove it.\n` +
                `Click Cancel to keep it.`
            );


        if (removeReminder) {

            task.reminder = null;

            task.reminderTriggered = false;

            saveTasks();

            renderTasks();

            return;
        }
    }


    /* =====================================
       ASK FOR NEW REMINDER
    ===================================== */

    const reminderInput =
        document.createElement("input");


    reminderInput.type =
        "datetime-local";


    reminderInput.className =
        "edit-reminder-input";


    /* Existing reminder */

    if (task.reminder) {

        const reminderDate =
            new Date(task.reminder);


        const year =
            reminderDate.getFullYear();

        const month =
            String(
                reminderDate.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                reminderDate.getDate()
            ).padStart(2, "0");

        const hours =
            String(
                reminderDate.getHours()
            ).padStart(2, "0");

        const minutes =
            String(
                reminderDate.getMinutes()
            ).padStart(2, "0");


        reminderInput.value =
            `${year}-${month}-${day}T${hours}:${minutes}`;
    }


    const reminderContainer =
        document.createElement("div");


    reminderContainer.className =
        "edit-reminder-container";


    reminderContainer.appendChild(
        reminderInput
    );


    taskItem
        .querySelector(".task-info")
        .appendChild(
            reminderContainer
        );


    reminderInput.focus();


    function saveReminder() {

        if (!reminderInput.value) {

            renderTasks();

            return;
        }


        const reminderDate =
            new Date(
                reminderInput.value
            );


        if (
            isNaN(
                reminderDate.getTime()
            )
        ) {

            renderTasks();

            return;
        }


        if (
            reminderDate.getTime() <=
            Date.now()
        ) {

            alert(
                "Reminder time must be in the future."
            );

            renderTasks();

            return;
        }


        task.reminder =
            reminderInput.value;


        task.reminderTriggered =
            false;


        requestNotificationPermission();


        saveTasks();

        renderTasks();
    }


    reminderInput.addEventListener(
        "change",
        saveReminder
    );


    reminderInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                saveReminder();
            }


            if (event.key === "Escape") {

                renderTasks();
            }

        }
    );


    reminderInput.addEventListener(
        "blur",
        saveReminder
    );
}


/* =========================================
   CREATE TASK ELEMENT
========================================= */

function createTaskElement(task) {

    const taskItem =
        document.createElement("div");


    taskItem.className =
        "task-item";


    if (task.completed) {

        taskItem.classList.add(
            "completed"
        );
    }


    taskItem.dataset.id =
        task.id;


    /* =====================================
       COMPLETE BUTTON
    ===================================== */

    const completeBtn =
        document.createElement("button");


    completeBtn.className =
        "complete-btn";


    completeBtn.type =
        "button";


    completeBtn.title =
        task.completed
            ? "Mark as pending"
            : "Mark as complete";


    completeBtn.addEventListener(
        "click",
        function () {

            toggleTask(task.id);
        }
    );


    /* =====================================
       TASK INFORMATION
    ===================================== */

    const taskInfo =
        document.createElement("div");


    taskInfo.className =
        "task-info";


    /* Task text */

    const taskText =
        document.createElement("div");


    taskText.className =
        "task-text";


    taskText.textContent =
        task.text;


    taskInfo.appendChild(
        taskText
    );


    /* =====================================
       REMINDER DISPLAY
    ===================================== */

    if (task.reminder) {

        const reminder =
            document.createElement("div");


        reminder.className =
            "task-reminder";


        if (task.completed) {

            reminder.classList.add(
                "completed-reminder"
            );
        }


        reminder.textContent =
            `⏰ Reminder: ${
                formatReminder(
                    task.reminder
                )
            }`;


        taskInfo.appendChild(
            reminder
        );
    }


    /* =====================================
       TASK TIME
    ===================================== */

    const taskTime =
        document.createElement("small");


    taskTime.className =
        "task-time";


    if (
        task.completed &&
        task.completedAt
    ) {

        taskTime.textContent =
            `Completed ${
                formatTime(
                    task.completedAt
                )
            }`;

    } else {

        taskTime.textContent =
            `Added ${
                formatTime(
                    task.createdAt
                )
            }`;
    }


    taskInfo.appendChild(
        taskTime
    );


    /* =====================================
       TASK ACTIONS
    ===================================== */

    const taskActions =
        document.createElement("div");


    taskActions.className =
        "task-actions";


    /* =====================================
       EDIT TASK BUTTON
    ===================================== */

    const editBtn =
        document.createElement("button");


    editBtn.className =
        "task-action edit-btn";


    editBtn.type =
        "button";


    editBtn.textContent =
        "✎";


    editBtn.title =
        "Edit task";


    editBtn.addEventListener(
        "click",
        function () {

            editTask(task.id);
        }
    );


    /* =====================================
       REMINDER BUTTON
    ===================================== */

    const reminderBtn =
        document.createElement("button");


    reminderBtn.className =
        "task-action reminder-btn";


    reminderBtn.type =
        "button";


    reminderBtn.textContent =
        "🔔";


    reminderBtn.title =
        task.reminder
            ? "Edit or remove reminder"
            : "Add reminder";


    reminderBtn.addEventListener(
        "click",
        function () {

            editReminder(task.id);
        }
    );


    /* =====================================
       DELETE BUTTON
    ===================================== */

    const deleteBtn =
        document.createElement("button");


    deleteBtn.className =
        "task-action delete-btn";


    deleteBtn.type =
        "button";


    deleteBtn.textContent =
        "×";


    deleteBtn.title =
        "Delete task";


    deleteBtn.addEventListener(
        "click",
        function () {

            deleteTask(task.id);
        }
    );


    /* =====================================
       ADD ACTION BUTTONS
    ===================================== */

    taskActions.appendChild(
        editBtn
    );

    taskActions.appendChild(
        reminderBtn
    );

    taskActions.appendChild(
        deleteBtn
    );


    /* =====================================
       ADD EVERYTHING
    ===================================== */

    taskItem.appendChild(
        completeBtn
    );


    taskItem.appendChild(
        taskInfo
    );


    taskItem.appendChild(
        taskActions
    );


    return taskItem;
}


/* =========================================
   RENDER TASKS
========================================= */

function renderTasks() {

    /*
        Remove old task elements
        but keep empty-state messages.
    */

    pendingTasks
        .querySelectorAll(".task-item")
        .forEach(
            item => item.remove()
        );


    completedTasks
        .querySelectorAll(".task-item")
        .forEach(
            item => item.remove()
        );


    const pending =
        tasks.filter(
            task => !task.completed
        );


    const completed =
        tasks.filter(
            task => task.completed
        );


    /* =====================================
       COUNTERS
    ===================================== */

    pendingCount.textContent =
        pending.length;


    completedCount.textContent =
        completed.length;


    /* =====================================
       EMPTY STATES
    ===================================== */

    pendingEmpty.style.display =
        pending.length === 0
            ? "flex"
            : "none";


    completedEmpty.style.display =
        completed.length === 0
            ? "flex"
            : "none";


    /* =====================================
       PENDING TASKS
    ===================================== */

    pending.forEach(task => {

        const element =
            createTaskElement(
                task
            );


        pendingTasks.appendChild(
            element
        );
    });


    /* =====================================
       COMPLETED TASKS
    ===================================== */

    completed.forEach(task => {

        const element =
            createTaskElement(
                task
            );


        completedTasks.appendChild(
            element
        );
    });
}


/* =========================================
   ADD TASK FORM
========================================= */

taskForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const text =
            taskInput.value.trim();


        /* Empty task */

        if (text === "") {

            inputError.textContent =
                "Please enter a task.";

            taskInput.focus();

            return;
        }


        /* Clear error */

        inputError.textContent = "";


        /* =================================
           GET REMINDER
        ================================= */

        let reminder = null;


        if (taskReminder.value) {

            const reminderDate =
                new Date(
                    taskReminder.value
                );


            if (
                isNaN(
                    reminderDate.getTime()
                )
            ) {

                inputError.textContent =
                    "Please select a valid reminder time.";

                return;
            }


            /* Don't allow past reminders */

            if (
                reminderDate.getTime() <=
                Date.now()
            ) {

                inputError.textContent =
                    "Reminder time must be in the future.";

                return;
            }


            reminder =
                taskReminder.value;


            requestNotificationPermission();
        }


        /* Add task */

        addTask(
            text,
            reminder
        );


        /* Clear inputs */

        taskInput.value = "";

        taskReminder.value = "";

        taskInput.focus();
    }
);


/* =========================================
   CLEAR REMINDER INPUT
========================================= */

clearReminder.addEventListener(
    "click",
    function () {

        taskReminder.value = "";
    }
);


/* =========================================
   CLEAR COMPLETED
========================================= */

clearCompletedBtn.addEventListener(
    "click",
    function () {

        const completed =
            tasks.filter(
                task => task.completed
            );


        if (
            completed.length === 0
        ) {

            return;
        }


        const confirmClear =
            confirm(
                "Are you sure you want to clear all completed tasks?"
            );


        if (!confirmClear) {

            return;
        }


        tasks =
            tasks.filter(
                task => !task.completed
            );


        saveTasks();

        renderTasks();
    }
);


/* =========================================
   REMOVE INPUT ERROR
========================================= */

taskInput.addEventListener(
    "input",
    function () {

        if (
            taskInput.value.trim() !== ""
        ) {

            inputError.textContent = "";
        }
    }
);


taskReminder.addEventListener(
    "input",
    function () {

        inputError.textContent = "";
    }
);


/* =========================================
   INITIALIZE APP
========================================= */

displayCurrentDate();

renderTasks();


/* =========================================
   CHECK REMINDERS
========================================= */

setInterval(
    checkReminders,
    1000
);