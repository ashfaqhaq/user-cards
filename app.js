var data = []
function editContent(id){
   
    var modal = document.getElementById("myModal");
    console.log(id)
    data[id].name="Value changed"
    modal.innerHTML = `<div class="modal-content"> 
    <span class="close">&times;</span>
    Name
    <input value=${data[id].name}/> 
    <p>${data[id].name}</p>
    
    </div>`
    var btn = document.getElementById("myBtn");
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];

    
    span.onclick = function() {
        modal.style.display = "none";
      }


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
 display()
    
}
function display() {
    let result = "";
    let cardDom = document.querySelector('.card-group')
    data.forEach(element => {
        result += `<div class="card">

     <div class="card-img">
         <img src="https://avatars.dicebear.com/v2/avataaars/${element.name}.svg?options%5bmood%5d%5b%5d=happy" />
     </div>
     <div class="card-content">
         <h3 class="name"> ${element.name} </h3>
         <p class="name"><i class="fa fa-envelope-o"></i> ${element.email} </p>
         <p class="name"><i class="fa fa-phone" aria-hidden="true"></i> ${element.phone}</p>
         <a href="https://ashfaq.com" class="name"><i class="fa fa-globe" aria-hidden="true"></i>
                 ${element.website} 
         </a>
        
     </div>
     <div class="footer" >

     <button data-id=${element.id} class="edit" id="edit">Edit</button>
        </div>
 </div>`
    });

    cardDom.innerHTML = result;
    getEditButton()
}
class User {
    async getUsers() {

        try {
            const result = await fetch("https://jsonplaceholder.typicode.com/users")
            const _data = await result.json()
            
            data.push(..._data);
            return _data;
        }
        catch (error) {
            alert("error occured");
            console.error(error)
        }


    }
}
function getEditButton() {
        
    const buttons = [...document.querySelectorAll(".edit")];

    buttons.forEach(button => {
        let id = button.dataset.id;
       
        button.addEventListener('click', () => editContent(--id))

    })
}

document.addEventListener("DOMContentLoaded", () => {
  
    const user = new User()
    user.getUsers()
        .then(() =>display())
        .then(() => getEditButton());


})