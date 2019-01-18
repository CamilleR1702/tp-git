$(document).ready(function(){
    let listTodo = [];

    displayCardTodo(listTodo);

    $("#add-todo").click(function(){
        listTodo.push(new Todo(
            listTodo.length + 1,
            $("#label-todo").val()
        ));
        $("#label-todo").val('');

        displayCardTodo(listTodo);
    });
    
    $("body").on("click", ".checkbox-todo", function(){
        let checkbox = $(this)[0];
        if(checkbox.checked){
            markTodoChecked(checkbox.id)
        }else{
            markTodoNotChecked(checkbox.id);
        }
    });
    
    
    function displayCardTodo(list) {
        $("#container-todo").empty();
        for(var i = 0 ; i < list.length ; i++){
            $("#container-todo").append(
                generateCardTemplate(list[i])
                );
            }
        }
    function generateCardTemplate(todo){
        tag = "<div class=\"card my-2\"><div class=\"card-body\" id=\""+ todo.id +"\"><p>"+ todo.label +"</p></p><div class=\"card-footer\"><div class=\"form-check\"></div><input type=\"checkbox\" class=\ncheckbox-todo\n id=\""+ todo.id +"\"><label>J'ai terminé ma tâche</label></div></div></div>"
        return tag;
    }

    ///mark checked todo as remove
    function markTodoChecked(todoId){
        listTodo.forEach(element => {
            if(element.id == todoId){
                element.markRemove()
                $(".card-body#"+todoId+" p").addClass("todo-removed");
            }
        });
    }

    function markTodoNotChecked(todoId){
        listTodo.forEach(element => {
            if(element.id == todoId){
                element.markNotRemove();
                $(".card-body#"+todoId+" p").removeClass("todo-removed");
            }
        });
    }

    $("#search-button").click(function(){
        var filter = $("#searchtd").val();
        let listMatchTodo = []
        for(var i = 0 ; i < listTodo.length ; i++){
            if (listTodo[i].label.toLowerCase().match(filter.toLowerCase())){
                listMatchTodo.push(listTodo[i]);
            }else{
            }
        }
        if(listMatchTodo.length > 0){
            displayFilter(filter);
            displayCardTodo(listMatchTodo);
        }
    })

    function displayFilter(filter){
        $("#display-filter").empty();
        $("#display-filter").append("<button id=\"delete-filter\">"+ filter +" \&times</button>");
    }

    $("body").on("click", "#delete-filter", function(){
        $("#display-filter").empty();
        $("#searchtd").val('');
        displayCardTodo(listTodo);
    });
    
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

    markNotRemove(){
        this.checked = false;
    }
}