$(document).ready(function(){
    let listTodo = [];

    displayCardTodo();

    $("#add-todo").click(function(){
        listTodo.push(new Todo(
            listTodo.length + 1,
            $("#label-todo").val()
        ));

        displayCardTodo();
        console.log("listTodo", listTodo);
    });
    
    $("body").on("click", ".checkbox-todo", function(){
        let checkbox = $(this)[0];
        if(checkbox.checked){
            markTodoRemoved(checkbox.id)
        }
    });
    
    function generateCardTemplate(todo){
        tag = "<div class=\"card my-2\"><div class=\"card-body\"><p>"+ todo.label +"</p></p><div class=\"card-footer\"><div class=\"form-check\"></div><input type=\"checkbox\" class=\ncheckbox-todo\n id=\""+ todo.id +"\"><label>J'ai terminé ma tâche</label></div></div></div>"
        return tag;
    }
    
    function displayCardTodo() {
        $("#container-todo").empty();
        for(var i = 0 ; i < listTodo.length ; i++){
            $("#container-todo").append(
                generateCardTemplate(listTodo[i])
            );
        }
    }

    ///mark checked todo as remove
    function markTodoRemoved(todoId){
        listTodo.forEach(element => {
            if(element.id == todoId){
                element.markRemove()
            }
        });

        $(".card-body p").addClass("todo-removed");
    }
});
    
class Todo {
    constructor(id, label) {
        this.id = id;
        this.label = label;
        this.checked = false;
    }

    markRemove(){
        this.checked = true;
    }
}