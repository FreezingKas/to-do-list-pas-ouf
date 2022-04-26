function Load() {
    if(localStorage.getItem("json") == null) {
        localStorage.setItem("json", JSON.stringify({task: []}));
    }

    document.getElementById("task-input").addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          addTask();
        }
    });

    var content = localStorage.getItem("json");
    content = JSON.parse(content).task;

    if(content.length == 0) {
        var notext = document.createElement("p");
        notext.setAttribute("class", "no-task-text");
        notext.innerHTML = "Aucune Tâche";
        document.getElementById("tasks").appendChild(notext);
    }
    

    for(var i = 0;i < content.length; i++) {
        var el = document.createElement("div");
        el.setAttribute("class", "task");


        var text = document.createElement("p");
        text.setAttribute("class", "task-text");
        text.innerText = content[i].desc;
        if(content[i].done) {
            text.style.textDecoration = "line-through";
        }

        var button = document.createElement("button");
        button.setAttribute("class", "task-button");
        button.setAttribute("onclick", "taskDone(" + i + ")");
        button.innerText = "\u2705";

        var button2 = document.createElement("button");
        button2.setAttribute("class", "task-button");
        button2.setAttribute("onclick", "removeTask(" + i + ")");
        button2.innerText = "\u274C";
        
        el.appendChild(text);
        el.appendChild(button2);
        el.appendChild(button);
        
        document.getElementById("tasks").appendChild(el);
    }
}

function removeTask(index) {
    var content = localStorage.getItem("json");
    content = JSON.parse(content);
    for(var i = 0; i < content.task.length; i++) {
        if(i == index) {
            content.task.splice(i, 1);
        }
    }

    localStorage.setItem("json", JSON.stringify(content));
    document.getElementById("tasks").innerHTML = "";
    Load();
}

function taskDone(index) {
    var content = localStorage.getItem("json");
    content = JSON.parse(content);
    for(var i = 0; i < content.task.length; i++) {
        if(i == index) {
            content.task[i].done = !content.task[i].done;
        }
    }
    localStorage.setItem("json", JSON.stringify(content));
    document.getElementById("tasks").innerHTML = "";
    Load()

}


function addTask() {
    var input = document.getElementById("task-input").value;

    var content = localStorage.getItem("json");
    content = JSON.parse(content);

    content.task.push({desc: input, done: false});
    localStorage.setItem("json", JSON.stringify(content));
    document.getElementById("task-input").value = "";
    document.getElementById("tasks").innerHTML = "";
    Load();
}

Load();