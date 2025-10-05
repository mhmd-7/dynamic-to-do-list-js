// Wait for the DOM to fully load before running any code
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // "Add Task" button
    const taskInput = document.getElementById('task-input');   // input field for new tasks
    const taskList = document.getElementById('task-list');     // ul where tasks will be listed

    /**
     * addTask
     * Adds a new task to the DOM.
     * If called with no parameter, it reads the text from the input field and shows an alert
     * if the input is empty (this covers the "user-submitted" case).
     *
     * @param {string|null} taskTextParam - Optional. If provided, that text will be used as the task.
     */
    function addTask(taskTextParam = null) {
        // Get and trim the text to add
        const taskText = (taskTextParam !== null)
            ? String(taskTextParam).trim()
            : taskInput.value.trim();

        // If the text is empty:
        // - If we were called from the UI (no param) we alert the user to enter a task.
        // - If we were called programmatically with a param, just bail out silently.
        if (taskText === '') {
            if (taskTextParam === null) {
                alert('Please enter a task!');
            }
            return;
        }

        // Create list item and set its text
        const li = document.createElement('li');

        // Use a span so text and buttons are separate (better DOM control)
        const span = document.createElement('span');
        span.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When remove button is clicked, remove the li element from the list
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append elements and clear input if it came from the input field
        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (taskTextParam === null) {
            taskInput.value = '';
            taskInput.focus();
        }
    }

    // Attach event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow adding tasks by pressing Enter inside the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // NOTE about invoking addTask on DOMContentLoaded:
    // Many specifications say "invoke addTask on DOMContentLoaded" to initialize things,
    // but calling addTask() with no argument here would trigger the "Please enter a task!" alert.
    // So instead, we only set up listeners here (done above).
    // If you want to pre-populate the list with sample tasks at load time, call:
    // addTask('Sample task 1'); addTask('Sample task 2');
    //
    // If you later implement loading from localStorage, you will call addTask(taskTextFromStorage, true)
    // for each saved task (no alert will be shown because a non-null parameter is supplied).
});
