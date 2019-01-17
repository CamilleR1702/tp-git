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

    function generateCardTemplate(todo){
        return "<div class=\"card my-2\"><div class=\"card-body\"><p>"+ todo.label +"</p></p><div class=\"card-footer\"><div class=\"form-check\"></div><input type=\"checkbox\" class=\"custom-control-input\" id=\"checkbox-"+ todo.id +"\"><label class=\"custom-control-label\" for=\"validation123\">J'ai terminé ma tâche</label></div></div></div>"
    }

    function displayCardTodo() {
        for(var i = 0 ; i < listTodo.length ; i++){
            $("#container-todo").append(
                generateCardTemplate(listTodo[i])
            );
        }
    }
});

class Todo {
    constructor(id, label) {
        this.id = id;
        this.label = label;
    }
}