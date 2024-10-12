// Wait for the page content to load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn'); // "Add Task" button
    const taskInput = document.getElementById('task-input'); // Input field for a new task
    const taskList = document.getElementById('task-list'); // Task list element

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get the value from the input field

        if (taskText === '') {
            alert('Please enter a task.'); // Alert if no task is entered
            return; // Stop function execution if input is empty
        }

        const listItem = document.createElement('li'); // Create a new <li> element
        listItem.textContent = taskText; // Set the task text as the <li> content

        const removeButton = document.createElement('button'); // Button to remove a task
        removeButton.textContent = 'Remove'; 
        removeButton.className = 'remove-btn'; // Assign class for styling

        // Add an event to remove the <li> element when the button is clicked
        removeButton.onclick = () => listItem.remove();

        listItem.appendChild(removeButton); // Add the button to the <li> element
        taskList.appendChild(listItem); // Add the <li> to the task list

        taskInput.value = ''; // Clear the input field
    }

    // Add an event to the "Add Task" button to call the addTask function
    addButton.addEventListener('click', addTask);

    // Add an event to detect if the user presses "Enter"
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(); // Call the addTask function when Enter is pressed
        }
    });
});
