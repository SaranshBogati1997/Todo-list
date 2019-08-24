const list = document.querySelector('.todoList');
const Btn = document.getElementById('submitBtn');
const pop = document.querySelector('.popup');
const pp =document.querySelector('#pp');

Btn.addEventListener('click',addList);
list.addEventListener('click',removeItem);
document.addEventListener('DOMContentLoaded',showLS);

function addList(e){
    e.preventDefault();
    const input = document.querySelector('#inputText');

    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-btn';
    removeBtn.innerText = 'X';

    let li = document.createElement('li');
    li.textContent = input.value;
    li.appendChild(removeBtn);
    list.appendChild(li);

    let item = input.value;
    addToLocalStorage(item);
    popup();

    
    input.value = '';

}

function popup(){
pop.style.opacity = 1;
pp.innerHTML = 'Todo Added';
pop.style.backgroundColor = 'rgb(65, 223, 65)';
setTimeout(hidePopup, 1000);
}
function redPopup(){
    pop.style.opacity = 1;
    pp.innerHTML = 'Todo Deleted';
    pop.style.backgroundColor = 'red';
    setTimeout(hidePopup, 1000);
   
}
function hidePopup(){
    pop.style.opacity = 0;
}



function addToLocalStorage(item){
   let todolist =  getListFromLocalStorage();
   //console.log(todolist);
    todolist.push(item);
   localStorage.setItem('keys', JSON.stringify( todolist ) );
}

function getListFromLocalStorage(){
    let keys;
    const listLS = localStorage.getItem('keys');
    if(listLS === null){
        keys = [];
    }else{
        keys = JSON.parse( listLS );
    }
    return keys;
} 

function removeItem(e){
    if(e.target.classList.contains('remove-btn')){
        e.target.parentElement.remove();

        
        
    }

    removeTodoFromLs(e.target.parentElement.textContent);
    redPopup();
}

function showLS(){
    let todo = getListFromLocalStorage();
    //console.log(todo);

    todo.forEach(function(items) {
       // console.log(items);
        
        const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-btn';
    removeBtn.innerText = 'X';

    let li = document.createElement('li');
    li.textContent = items;
    li.appendChild(removeBtn);
    list.appendChild(li);

    }

    )}

    function removeTodoFromLs(todos){
        let todo = getListFromLocalStorage();
        const todoo = todos.substring(0,todos.length-1);

        
        todo.forEach(function(todoLs,index){
            if( todoo === todoLs){
                todo.splice(index,1);
            }
        });

        localStorage.setItem('keys', JSON.stringify(todo));
    }