$(document).ready(function(){
    let listTodo = [];

    $("#add-todo").click(function(){
        listTodo.push(new Todo(
            listTodo.length + 1,
            $("#label-todo").val()
        ));
        console.log("listTodo", listTodo);
    });
});

class Todo {
    constructor(id, label) {
        this.id = id;
        this.label = label;
    }
}