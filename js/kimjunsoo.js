// DOM 요소들을 미리 저장
const todoListElement = document.getElementById('todoList');
const addButton = document.getElementById('submit');
const todoInput = document.getElementById('taskInput');

function addTodo(text, checked = false) {
    // li 요소 만들기
    const li = document.createElement('li');
    li.textContent = text;
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

    // ++수정 버튼 만들기 - 아직 미완성
    const editBtn = document.createElement('button');
    editBtn.textContent = '수정';
    editBtn.addEventListener('click', ()=>{
        const input = document.createElement('input');
        input.type = 'text';
        input.value = text; // 저장 되어있는 텍스트 호출
        li.replaceChild(input, li.childNodes[1]); // 텍스트 수정

        const saveBtn = document.createElement('button');
        saveBtn.textContent = '저장';
        saveBtn.addEventListener('click', ()=>{
            if (todoInput.value.trim() === '') {
                alert('할 일을 입력 해주세요!');
                return; // 빈 입력 방지
            };
            
        });

    });

    // ++삭제 버튼 만들기
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', ()=> {
        const todos = loadTodos();
        const index = Array.from(li.parentElement.children).indexOf(li);
        todos.splice(index, 1); // 할 일 제거
        saveTodos(todos);   // 저장
        li.remove();   // 보여지는 화면에서 삭제    
    });

    // ul > li에 추가한 요소
    li.prepend(checkbox);
    li.append(editBtn);
    li.append(deleteBtn);
    todoListElement.append(li);
}

// localStorage에서 할일 목록 가져오기S
function loadTodos() {
    const savedTodos = localStorage.getItem('todoList');
    return savedTodos ? JSON.parse(savedTodos) : [];
}

// localStorage에 할일 목록 저장하기
function saveTodos(todos) {
    localStorage.setItem('todoList', JSON.stringify(todos));
}

// 초기화 함수
function initialize() {
    // 저장된 할일 목록 불러오기
    const todos = loadTodos();
    todos.forEach(todo => {
        addTodo(todo.text, todo.checked);
    });

    // 새로운 할일 추가 버튼 클릭 이벤트
    addButton.addEventListener('click', () => {
        if (todoInput.value.trim() === '') {
            alert('할 일을 입력 해주세요!');
            return; // 빈 입력 방지
        };

        // 새로운 할일 추가
        addTodo(todoInput.value);

        // localStorage 업데이트
        const todos = loadTodos();
        todos.push({ text: todoInput.value, checked: false});
        saveTodos(todos);

        // 입력창 비우기
        todoInput.value = '';
    });
}

// 페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', initialize);