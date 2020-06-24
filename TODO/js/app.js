var serverURL= "http://restclass.azurewebsites.net/API2/Todos";

var todos = [];

// var x=0;
function addToDo(){
    console.log("Adding a new task")
    // get the value from input
    
   //var text=document.getElementById("txt-task").value;
    var text = $('#txt-task').val();

    var todo={
        text:text,
        user:"Christian",
        state:0 // new
        
    };
    
    if(text!=""){
        console.log(text);
        
        $("#txt-task") .val ("");
         // clear the input
         
        //display the Task
        displayToDo(todo);
        
        
    }else{
            alert("You have to enter a task");
            displayToDo(todo)
            console.log(text);
            $('#txt-task').val('');
   
        }
    
    $("#txt-task").focus();
   
    
    
       var jsonString = JSON.stringify(todo);
       
       $.ajax({
           url:serverURL,
           type:"POST",
           contentType:"application/json",
           data:jsonString,
           
           success:function(response){
               console.log("It worked!!", response)
               
           },
           
           error:function(errorDetails){
               console.log("Something went wrong ... ", errorDetails);
           }
           
           
       });
       
       console.log(jsonString);  
        
}

/*function deleteToDo(id){
    console.log("Delete function is working"+id);
    $("#"+id).remove();
}
*/

function displayToDo(todo){
     //create the list item template
     if(todo.state==0){
     var li = ` <li id="${todo.id}"> ${todo.text} <button onclick=markDone(${todo.id}) style="border-radius: 5px"> Done </button> </li> `;
     
     //display the li under the ul
     $("#pending-list").append(li);
    }
     //set the focus to the input 
    else{
        var li2=`<li> ${todo.text} </li>`;
        $('#doneTodos').append(li2);
    }
}

function markDone(id){
    console.log("Item Done",id);
    
    $('#'+id).remove();
    
    //find the todos array the one with the id=id
    
    for(var i=0; i<todos.length;i++){
        if(todos[i].id==id){
            todos[i].state=1;
            displayToDo(todos[i]);
            var li = ` <li id="${todos.text}"> ${todos.text} <button onclick="markDone(${todos.text});"> <i class="fas fa-clipboard-check"></i> </button> </li> `;
        }
    }
    
}


function loadData(){
    // load data from the backend (GET)
    $.ajax({
        url:serverURL,
        type:"GET",
       success: function(res){
           console.log("Server responded");
           
            for (let i = 0; i < res.length; i++){
                if (res[i].user == "Christian"){
                    console.log("This item is mine");
                    
                    todos.push(res[i]);
                    displayToDo(res[i]);
                }
            }
           
       },
       error:function (errorDetails) {
           console.error("Error getting data", errorDetails);
       }
    });  
    
    
}


function init(){
  console.log("Init the to do app");
  
  document.getElementById("btn-add");
  $('#btn-add').click(addToDo);
  
  $("#txt-task").keypress(function(e){
      console.log(e.key);
      if(e.key ==="Enter"){
          console.log("Add a new task");
          addToDo();
      }
  });
  
  loadData();
}

// when the browser finishes rendering the HTML, execute init
window.onload=init;