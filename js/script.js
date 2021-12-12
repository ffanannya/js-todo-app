const renderTaskItem = task => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');

    const html = `
        <div class="task-content">
            <div class="task-content-wrapper">
                <div class="task-content-left">
                    <div class="task-heading ms-3">${task.title}</div>
                    <div class="badge bg-success ms-3">${task.tag}</div>
                </div>
                <div class="task-content-right">
                    <button class="deleteTask border-0 btn-transition btn btn-outline-danger"><i class="fa fa-trash"></i></button>
                </div>
            </div>
        </div>
    </li>`;

    li.innerHTML = html;
    deleteButton = li.getElementsByClassName('deleteTask')[0];
    deleteButton.addEventListener('click', () => removeTask(task));

    return li;
}

const renderTaskList = (listElement, tasks) => {
    listElement.innerHTML = '';
    if (tasks.length === 0) {
        listElement.innerHTML = 'There are no tasks';
    }
    tasks.forEach(task => listElement.appendChild(renderTaskItem(task)));
}

const saveTasks = tasks => localStorage.setItem('tasks', JSON.stringify(tasks));
const getTasks = key => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
const removeTask = (taskToRemove) => {
    tasks = tasks.filter(task => task !== taskToRemove);
    saveTasks(tasks);
    renderTaskList(taskListElement, tasks);
}

let tasks = getTasks('tasks');
const taskListElement = document.getElementById('tasks');
renderTaskList(taskListElement, tasks);

const newTaskModal = new bootstrap.Modal(document.getElementById('newTaskModal'), {
    keyboard: false
});

const newTaskSaveButton = document.getElementById('newTaskSaveButton');
newTaskSaveButton.addEventListener('click', function (e) {
    const titleElement = document.getElementById('newTaskTitle');
    const tagElement = document.getElementById('newTaskTag');

    if (titleElement.value.trim() === '') {
        alert('Title cannot be empty');
        return;
    }

    tasks.push({
        title: titleElement.value,
        tag: tagElement.value,
        isDone: false
    });

    titleElement.value = '';
    tagElement.value = 'Important';

    saveTasks(tasks);
    renderTaskList(taskListElement, tasks);

    newTaskModal.hide();
});
