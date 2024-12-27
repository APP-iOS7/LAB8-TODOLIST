// DOM 요소들을 미리 저장
const todoListElement = document.getElementById('todoList');
const addButton = document.getElementById('submit');
const todoInput = document.getElementById('taskInput');
const filterButtons = document.querySelectorAll('.filters button');

// 할 일 추가
function addTodo(text, checked = false) {
    // li 요소 만들기
    const li = document.createElement('li');
    li.classList.add('list-group-item');

    // 체크박스 만들기
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('form-check-input');
    checkbox.checked = checked;

    // 체크박스 상태에 따라서 취소선 정리
    li.style.textDecoration = checked ? 'line-through' : 'none';

    // 체크박스 클릭시 처리
    checkbox.addEventListener('change', () => {
        li.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

        // localStorage 업데이트
        const todos = loadTodos();
        const index = Array.from(li.parentElement.children).indexOf(li);
        todos[index].checked = checkbox.checked;
        saveTodos(todos);
    });

    // 할 일 텍스트 영역
    const span = document.createElement('span');
    span.textContent = text;
    span.style.flex = '1'; // 공간을 차지하게 설정

    // **수정 기능**: 더블클릭으로 편집 모드
    span.addEventListener('dblclick', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.replaceChild(input, span);

        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.value = span.textContent; // 빈 값 방지
            }

            span.textContent = input.value;
            li.replaceChild(span, input);

            // localStorage 업데이트
            const todos = loadTodos();
            const index = Array.from(li.parentElement.children).indexOf(li);
            todos[index].text = span.textContent;
            saveTodos(todos);
        });

        input.focus();
    });

    // **삭제 버튼 추가**
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', () => {
        const todos = loadTodos();
        const index = Array.from(li.parentElement.children).indexOf(li);
        todos.splice(index, 1); // 해당 할 일을 배열에서 제거
        saveTodos(todos);
        li.remove(); // DOM에서 제거
    });

    // 요소 추가
    li.prepend(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    todoListElement.append(li);
}

// localStorage에서 할 일 목록 가져오기
function loadTodos() {
    const savedTodos = localStorage.getItem('todoList');
    return savedTodos ? JSON.parse(savedTodos) : [];
}

// localStorage에 할 일 목록 저장하기
function saveTodos(todos) {
    localStorage.setItem('todoList', JSON.stringify(todos));
}

// 필터링 함수
function filterTodos(filter) {
    const todos = Array.from(todoListElement.children);

    todos.forEach((todo) => {
        const isCompleted = todo.querySelector('.form-check-input').checked;

        if (filter === 'all') {
            todo.classList.remove('hidden');
        } else if (filter === 'active' && isCompleted) {
            todo.classList.add('hidden');
        } else if (filter === 'completed' && !isCompleted) {
            todo.classList.add('hidden');
        } else {
            todo.classList.remove('hidden');
        }
    });
}

// 초기화 함수
function initialize() {
    // 저장된 할 일 목록 불러오기
    const todos = loadTodos();
    todos.forEach((todo) => {
        addTodo(todo.text, todo.checked);
    });

    // 새로운 할 일 추가 버튼 클릭 이벤트
    addButton.addEventListener('click', () => {
        if (todoInput.value.trim() === '') return; // 빈 입력 방지

        // 새로운 할 일 추가
        addTodo(todoInput.value);

        // localStorage 업데이트
        const todos = loadTodos();
        todos.push({ text: todoInput.value, checked: false });
        saveTodos(todos);

        // 입력창 비우기
        todoInput.value = '';
    });

    // 필터 버튼 클릭 이벤트
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterTodos(filter);
        });
    });
}

// 페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', initialize);