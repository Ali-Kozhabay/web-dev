document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('task-input');
    const list = document.getElementById('todo-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(input.value);
        input.value = '';
    });

    function addTask(text) {
        if (text.trim() === '') return;

        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            li.classList.toggle('done');
        });

        const span = document.createElement('span');
        span.textContent = text;

      
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
        `;
        deleteBtn.style.background = 'none';
        deleteBtn.style.border = 'none';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.padding = '5px';
        
       
        deleteBtn.addEventListener('click', () => {
            const confirmDelete = confirm('Do you really want to delete this task?');
            if (confirmDelete) {
                list.removeChild(li);
            }
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    }
});