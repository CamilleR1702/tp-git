$(document).ready(function(){
    let listTodo = [];

    displayCardTodo(listTodo);

    $("#add-todo").click(function(){
        listTodo.push(new Todo(
            listTodo.length + 1,
            $("#label-todo").val()
        ));

        displayCardTodo(listTodo);
        console.log("listTodo", listTodo);
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

    ///Click on search butto,
    $("#search-button").click(function(){
        $("#display-error-message").empty();
        $("#display-filter").empty();
        if (listTodo.length > 0){
            if($("#searchtd").val() != null && $("#searchtd").val() != ""){
                console.log($("#searchtd").val());
                var filter = $("#searchtd").val();
                let listMatchTodo = []
                console.log("filter :" + filter)
                
                ///iterate on each todo in todolist
                for(var i = 0 ; i < listTodo.length ; i++){
                    ///if todo match to filter then add it to listMatchTodo
                    if (listTodo[i].label.toLowerCase().match(filter.toLowerCase())){
                        console.log('match');
                        listMatchTodo.push(listTodo[i]);
                    }else{
                        console.log('ne match pas')
                    }
                }
                ///If there is match, display filter and matched todos
                if(listMatchTodo.length > 0){
                    console.log('list match todo length', listMatchTodo.length)
                    displayFilter(filter);
                    displayCardTodo(listMatchTodo);
                }else{
                    $("#display-error-message").append("<b>Aucun résultat trouvé</b>");
                }
            }else{
                $("#display-error-message").append("<b>Aucun filtre rentré</b>");
            }
        } else {
            $("#display-error-message").append("<b>aucun todo ajouté</b>");
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