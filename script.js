// Wait for the DOM to fully load before running any code
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements (IDs must match the HTML exactly)
    const addButton = document.getElementById('add-task-btn'); // <-- check id in your HTML
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get trimmed text from input
        const taskText = taskInput.value.trim();

        // If input is empty -> alert and return
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create the li element and set its textContent exactly to taskText
        const li = document.createElement('li');
        li.textContent = taskText; // <- important: li.textContent must equal taskText

        // Create Remove button and set class name exactly as required
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Assign onclick so that clicking Remove removes the li from taskList
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the li, then append the li to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field and focus it
        taskInput.value = '';
        taskInput.focus();
    }

    // Attach event listener to Add Task button
    addButton.addEventListener('click', addTask);

    // Allow adding tasks by pressing Enter (keypress event per spec)
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // NOTE: do not call addTask() here without a task — it would show an alert.
});
