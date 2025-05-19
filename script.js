document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const defaultSection = document.getElementById('not-urgent-not-important');

    // 请求通知权限
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    // 添加新任务
    addTaskBtn.addEventListener('click', function() {
        addNewTask();
    });

    // 按Enter键添加任务
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewTask();
        }
    });

    function addNewTask() {
        const taskText = taskInput.value.trim();
        const deadline = deadlineInput.value;
        if (taskText && deadline) {
            addTask(taskText, deadline, defaultSection.querySelector('.task-list'));
            taskInput.value = '';
            deadlineInput.value = '';
        }
    }

    // 添加任务到列表
    function addTask(taskText, deadline, targetList) {
        const li = document.createElement('li');
        li.draggable = true;
        
        const taskInfo = document.createElement('div');
        taskInfo.className = 'task-info';
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = taskText;
        
        const deadlineSpan = document.createElement('span');
        deadlineSpan.className = 'task-deadline';
        const deadlineDate = new Date(deadline);
        deadlineSpan.textContent = `截止时间: ${deadlineDate.toLocaleString()}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });
        
        taskInfo.appendChild(taskTextSpan);
        taskInfo.appendChild(deadlineSpan);
        li.appendChild(taskInfo);
        li.appendChild(deleteBtn);
        
        // 添加拖拽事件监听器
        li.addEventListener('dragstart', dragStart);
        li.addEventListener('dragend', dragEnd);
        
        targetList.appendChild(li);

        // 设置截止时间提醒
        const now = new Date();
        const timeDiff = deadlineDate - now;
        
        if (timeDiff > 0) {
            // 在截止时间前15分钟提醒
            const reminderTime = timeDiff - (15 * 60 * 1000);
            if (reminderTime > 0) {
                setTimeout(() => {
                    showNotification(taskText, deadlineDate);
                }, reminderTime);
            }

            // 更新截止时间样式
            const checkDeadline = () => {
                const currentTime = new Date();
                const remainingTime = deadlineDate - currentTime;
                if (remainingTime <= 24 * 60 * 60 * 1000) { // 24小时内
                    deadlineSpan.classList.add('urgent');
                }
            };
            checkDeadline();
            setInterval(checkDeadline, 60000); // 每分钟检查一次
        }
    }
});

// 显示桌面通知
function showNotification(taskText, deadline) {
    if (Notification.permission === 'granted') {
        new Notification('任务提醒', {
            body: `任务「${taskText}」将在15分钟后截止（${deadline.toLocaleString()}）`,
            icon: '/favicon.ico'
        });
    }
}

// 拖拽相关函数
function dragStart(e) {
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedItem = document.querySelector('.dragging');
    if (draggedItem) {
        const targetList = e.target.closest('.task-list');
        if (targetList) {
            targetList.appendChild(draggedItem);
        }
    }
}