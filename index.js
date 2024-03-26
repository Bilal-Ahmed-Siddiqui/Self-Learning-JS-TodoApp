const addbtn = document.getElementById("Addbtn");
const editbtn = document.getElementById("editbtn");
let taskArray = [];
let updateindex = null;

addbtn.addEventListener("click", function(){    
    
    if (!isEmpty('title','description', false)) {
        createCards();    
    }
    
});
 
editbtn.addEventListener("click", function(){    
    
    if (!isEmpty('edit-title', 'edit-description', true)) {
        editCards();    
    }
    
});

function isEmpty(Title, Description, editflag){
    let titlefield = document.getElementById(Title);
    let descfeild = document.getElementById(Description);
    let title = titlefield.value;
    let desc = descfeild.value;
    let flag = true;

    titlefield.style.borderColor = "";
    descfeild.style.borderColor = "";

    if (title === "" && desc === "") {
        titlefield.style.borderColor = "red";
        descfeild.style.borderColor = "red";
    }
    else if (title === "") {
        titlefield.style.borderColor = "red";
    }
    else if (desc === "") {
        descfeild.style.borderColor = "red"; 
    }
    else{
        if (editflag) {
            taskArray[updateindex].title = title;
            taskArray[updateindex].desc = desc;
            $('#EditModal').modal('hide'); 
        }
        else{
            taskArray.push({title: title ,desc: desc});
            $('#AddModal').modal('hide');
        }
        
        titlefield.value = "";
        descfeild.value = "";
        flag = false;
    }

    return flag;
}

function editCards() {
    // Clear existing cards from the container
    var cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    // Recreate cards with updated data
    taskArray.forEach(function(task, index) {
        var card = document.createElement("div");
        card.classList.add("card", "col-md-10", "mb-3");
        card.setAttribute("data-index", index); // Set data-index attribute with the index
        var cardContent = `
            <div class="row">
                <div class="col-md-8">
                    <h4>${task.title}</h4>
                    <p>${task.desc}</p>
                </div>
                <div class="col-md-4">
                    <button class="btn btn-primary" onclick="edit(this)">Edit</button>
                    <button class="btn btn-danger" onclick="deleteCard(this)">Delete</button>
                    <button class="btn btn-success" onclick="completed(this)">Completed</button>
                </div>
            </div>
        `;

        card.innerHTML = cardContent;
        cardContainer.appendChild(card);
    });
} 

function createCards() {
    var cardContainer = document.getElementById("card-container");

    // Get the index of the last element added to the taskArray
    var index = taskArray.length - 1;

    // Get the last element added to the taskArray
    var latestData = taskArray[index];

    // Create card element
    var card = document.createElement("div");
    card.classList.add("card", "col-md-10", "mb-3");
    card.setAttribute("data-index", index); // Set data-index attribute with the index

    // Create card content
    var cardContent = `
        <div class="row">
            <div class="col-md-8">
                <h4>${latestData.title}</h4>
                <p>${latestData.desc}</p>
            </div>
            <div class="col-md-4">
                <button class="btn btn-primary" onclick="edit(this)">Edit</button>
                <button class="btn btn-danger" onclick="deleteCard(this)">Delete</button>
                <button class="btn btn-success" onclick="completed(this)">Completed</button>
            </div>
        </div>
    `;

    // Set card content
    card.innerHTML = cardContent;

    // Append card to container
    cardContainer.appendChild(card);
}

function deleteCard(button) {
    // Traverse up the DOM to find the parent card element
    var card = button.closest('.card');
    
    // Find the index of the card in the cardContainer
    var index = Array.from(card.parentNode.children).indexOf(card);
    
    // Remove the card from the DOM
    card.parentNode.removeChild(card);
    
    // Remove the corresponding data from taskArray
    taskArray.splice(index, 1);
}

function completed(button){
    var card = button.closest('.card');
    card.style.backgroundColor = "#a0d9b5";
}

function edit(button) {
    var card = button.closest('.card');
    let title = card.querySelector('h4').textContent;
    let desc = card.querySelector('p').textContent;

    document.getElementById('edit-title').value = title;
    document.getElementById('edit-description').value = desc;
    updateindex = card.getAttribute('data-index');
    $('#EditModal').modal('show');
}