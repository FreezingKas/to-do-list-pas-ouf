// Fonction permettant de charger et recharger toutes les tâches
function Load() {
    // Si task n'existe pas dans le localStorage, on le crée
    if(localStorage.getItem("json") == null) {
        localStorage.setItem("json", JSON.stringify({task: []}));
    }

    // On récupère le contenu JSON du localStorage et on parse le JSON
    var content = localStorage.getItem("json");
    content = JSON.parse(content).task;

    // Si le localStorage est vide, on affiche un message "Aucune tâche"
    if(content.length == 0) {
        var notext = document.createElement("p");
        notext.setAttribute("class", "no-task-text");
        notext.innerHTML = "Aucune Tâche";
        document.getElementById("tasks").appendChild(notext);
    }
    
    // Pour chaque élément du JSON, on va créer la div contenant la tâche
    for(var i = 0;i < content.length; i++) {
        // Déja on crée la div principale
        var el = document.createElement("div");
        el.setAttribute("class", "task");

        // Puis on crée une balise p contenant le texte de la tâche et on le barre si la tâche est effectuée
        var text = document.createElement("p");
        text.setAttribute("class", "task-text");
        text.innerText = content[i].desc;
        if(content[i].done) {
            text.style.textDecoration = "line-through";
        }

        // On crée deux boutons pour supprimer la tâche et pour la marquer comme effectuée
        var button = document.createElement("button");
        button.setAttribute("class", "task-button");
        button.setAttribute("onclick", "taskDone(" + i + ")");
        button.innerText = "\u2705";

        var button2 = document.createElement("button");
        button2.setAttribute("class", "task-button");
        button2.setAttribute("onclick", "removeTask(" + i + ")");
        button2.innerText = "\u274C";
        
        // On ajoute ces éléments à la div principale
        el.appendChild(text);
        el.appendChild(button2);
        el.appendChild(button);

        if(content[i].done) {
            el.style.opacity = 0.33;
        }
        
        // Puis on ajoute la div principale à la div "tasks"
        document.getElementById("tasks").appendChild(el);
    }
}

// Fonction pour supprimer une tâche
function removeTask(index) {
    // On récupère le contenu du localStorage et on parse le JSON
    var content = localStorage.getItem("json");
    content = JSON.parse(content);

    // On supprime la tâche grâce à l'index passé en paramètre
    content.task.splice(index, 1);

    // On met à jour le localStorage, on vide la div et on recharge les tâches
    localStorage.setItem("json", JSON.stringify(content));
    document.getElementById("tasks").innerHTML = "";
    Load();
}

// Fonction pour marquer une tâche comme effectuée
function taskDone(index) {
    // On récupère le contenu du localStorage et on parse le JSON
    var content = localStorage.getItem("json");
    content = JSON.parse(content);

    // On modifie la tâche comme effectué grâce à l'index passé en paramètre
    content.task[index].done = !content.task[index].done;

    // On met à jour le localStorage, on vide la div et on recharge les tâches
    localStorage.setItem("json", JSON.stringify(content));
    document.getElementById("tasks").innerHTML = "";
    Load();
}


function addTask() {
    // On récupère la valeur de l'input
    var input = document.getElementById("task-input").value;

    // On récupère le contenu du localStorage et on parse le JSON
    var content = localStorage.getItem("json");
    content = JSON.parse(content);

    // On ajoute la tâche dans le JSON
    content.task.push({desc: input, done: false});

    // On met à jour le localStorage, on vide la div et on recharge les tâches
    localStorage.setItem("json", JSON.stringify(content));

    // On vide l'input et la div tasks puis on remet à jour les tâches
    document.getElementById("task-input").value = "";
    document.getElementById("tasks").innerHTML = "";
    Load();
}

// Premier chargement des tâches
Load();