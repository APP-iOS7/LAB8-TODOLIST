const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('submit');
const todos = [];

// CRUD 중에 CREATE 함수
function todolist_create_action(tagInput) {

    // 조건 : input 안에 값이 없으면 return 합니다.
    if (tagInput.value == '') return;

    // Input의 이벤트 change 
    tagInput.addEventListener('change', () => {
        tagInput.value = tagInput.value;
    });

    // ul 가져와서 안에 list 추가 후 값 전달
    const ul = document.getElementById('todoList'); // ul 가져오기
    const li = document.createElement('li'); // li 생성하기
    const data = document.createElement('span'); // 값 을 넣을 태크 span

    const editButton = document.createElement('button'); // 수정 버튼 추가가
    const deleteButton = document.createElement('button'); // 수정 버튼 추가가

    editButton.innerText = '수정'; //텍스트 넣어주기
    deleteButton.innerText = '삭제'; // 텍스트 넣어주기

    data.innerText = tagInput.value; // li 에 값 추가하기
    li.appendChild(data);
    li.appendChild(editButton); // li에 붙이기기
    li.appendChild(deleteButton); // li에 붙이기기
    ul.appendChild(li); // li 를 ul에 붙이기
    tagInput.value = ''; //값 초기화화
    
    // data 형식
    const data_format = {
        text : data.innerText,
        is_checked : false
    };
    console.log(data_format);

    // editButton이 눌리면 실행 될 EVENT
    editButton.addEventListener('click', () => todolist_update_action(editButton));
    deleteButton.addEventListener('click', () => todolist_delete_action(deleteButton));
}

// CRUD 중에 UPDATE 함수
function todolist_update_action(editbutton) {
    const selected_list = editbutton.parentNode; // edit 버튼의 부모 li 변수에 저장
    const saved_data = selected_list.textContent.slice(0,-4); // li 안의 값 가져오기기
    

    selected_list.innerText = ''; // 저장 후 초기화
    const new_input = document.createElement('input');
    const new_button = document.createElement('button');

    new_input.value = saved_data;
    new_button.innerText = '확인';

    selected_list.appendChild(new_input);
    selected_list.appendChild(new_button);

    // 수정 시 확인 이벤트 함수
    new_button.addEventListener('click', () => {
        // 수정 할때도 유효성 검사
        if (new_input.value == '') return;

        todolist_create_action(new_input); // new_input에 대한 create 함수
        selected_list.remove() // 수정 input 삭제제
    });

}

// CRUD 중에 DELETE 함수
function todolist_delete_action(deleteButton) {
    
    // delete 버튼의 부모 변수에 저장.
    const selected_list = deleteButton.parentNode;

    const confirmMessage = confirm("정말 삭제 하시겠습니까?"); //확인 Message
    if(confirmMessage) selected_list.remove();
    else return;
}


/////////////////////// TEST ////////////////////////////

// 버튼을 누르면 input 값을 반환
taskButton.addEventListener('click',() => todolist_create_action(taskInput));