window.addEventListener("load", () => {
    const form = document.querySelector("#form"); //<form/>
    const input = document.querySelector("#task-input");//content typed
    const list_el = document.querySelector("#tasks");//list column
    const completedTasksHolder = document.getElementById("completed-tasks"); //completed tasks

    form.addEventListener("submit", (e)=> {
        e.preventDefault();

        const task = input.value;
        if(!task){
            alert("Please add a task.");
            return;
        }

        const task_el = document.createElement("div"); 
        task_el.classList.add("task");//add class
        //line 14-15 => <div class="task"/>
        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");//add class
        //line 18-19 => <div class="content"/>
        task_el.appendChild(task_content_el);
        /* => <div class="task"> 
                 <div class="content">
                 </div>
              </div> */
        //const checkBox = document.createElement("input"); 
        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");//add class
        //line 26-27 => <input class="text"/>
        //checkBox.type = "checkbox"
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly") // turn type:input to type:read-only

        //task_content_el.appendChild(checkBox);
        task_content_el.appendChild(task_input_el);
        /* => <div class="task"> 
                 <div class="content">
                 <input
                 class="text"
                 type="text"
                 value = task
                 </div>
              </div> */

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");//add class
        // => <div class="actions"/>
        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");//add class
        task_edit_el.innerHTML = ("Edit");
         //<button class="edit">Edit</button/>
        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");//add class
        task_delete_el.innerHTML = "Delete";
        // <button class="delete">Delete</button/>
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        /* =>  <div class="actions">
                 <button class="edit">Edit</button/>
                 <button class="delete">Delete</button/>
                </div> */

        task_el.appendChild(task_actions_el);
        /* => <div class="task"> 
                 <div class="content">
                   <div class="actions">
                     <button class="edit">Edit</button/>
                     <button class="delete">Delete</button/>
                   </div> 
                 </div>
              </div> */
        list_el.appendChild(task_el);
        /* => <div id=tasks>
                <div class="task"> 
                  <div class="content">
                    <div class="actions">
                      <button class="edit">Edit</button/>
                      <button class="delete">Delete</button/>
                    </div> 
                  </div>
               </div> 
              </div>*/

        input.value = ""; //clear input data

        task_edit_el.addEventListener('click', () => {
            if(task_edit_el.innerText.toLowerCase() == "edit"){  //css .task .actions button has been set to uppercase
                task_input_el.removeAttribute("readonly"); // from type:read-only to type:input
                task_input_el.focus(); //automatically put cursor on type:input
                task_edit_el.innerHTML = ("save"); // EDIT to SAVE
            }else{
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerHTML = "Edit";
            }
        })

        task_delete_el.addEventListener('click',() => {
            list_el.removeChild(task_el); //removed
        })
    })
})

/*
var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var createNewTaskElement = function(taskString) {
	//Create List Item
	var listItem = document.createElement("li");

	//input (checkbox)
	var checkBox = document.createElement("input"); // checkbox
	//label
	var label = document.createElement("label");
	//input (text)
	var editInput = document.createElement("input"); // text
	//button.edit
	var editButton = document.createElement("button");
	//button.delete
	var deleteButton = document.createElement("button");

	//Each element needs modifying

	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	//Each element needs appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

//Add a new task
var addTask = function() {
	console.log("Add task...");
	//Create a new list item with the text from #new-task:
	var listItem = createNewTaskElement(taskInput.value);
	//Append listItem to incompleteTasksHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}

//Edit an existing task
var editTask = function() {
	console.log("Edit task...");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text");
	var label = listItem.querySelector("label");

	var containsClass = listItem.classList.contains("editMode");

	//if the class of the parent is .editMode
	if (containsClass) {
		//Switch from .editMode
		//label text become the input's value
		label.innerText = editInput.value;
	} else {
		//Switch to .editMode
		//input value becomes the label's text
		editInput.value = label.innerText;
	}

	//Toggle .editMode on the list item
	listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	//Remove the parent list item from the ul
	ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
	console.log("Task complete...");
	//Append the task list item to the #completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
	console.log("Task incomplete...");
	//Append the task list item to the #incomplete-tasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

	//bind editTask to edit button
	editButton.onclick = editTask;

	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;

	//bind checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;
}

// var ajaxRequest = function() {
// 	console.log("AJAX request");
// }

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
//addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	//bind events to list item's children (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	//bind events to list item's children (taskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
*/
