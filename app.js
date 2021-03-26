var data = []


 
function editContent(id){
   
    var modal = document.getElementById("myModal");
    console.log(id)
   
    modal.innerHTML = `<div class="modal-content"> 
    <span class="close">&times;</span>
    <br/>
    
    <div >
    <label  class="modal-body">Name</label>

    <input id="modal-name" value=${data[id].name}/>  <br/>
    <label class="modal-body" >Email</label>
    <input id="modal-email"  value=${data[id].email}/>  <br/>
    <label class="modal-body">Phone</label>
    <input id="modal-phone"  value=${data[id].phone}/>  <br/>
    <label class="modal-body" >Website</label>
    <input id="modal-website"  value=${data[id].website}/>  <br/>
    </div>
   

    <button class="save">Save</button>
    </div>`
    var btn = document.getElementById("myBtn");
    modal.style.display = "block";

    var spanClose = document.getElementsByClassName("close")[0];
    var spanSave = document.getElementsByClassName("save")[0];

    
    spanClose.onclick = function() {
        modal.style.display = "none";
      }
      spanSave.onclick = function() {
       const name =  document.querySelector('#modal-name').value;
       const website =  document.querySelector('#modal-website').value;
       const phone =  document.querySelector('#modal-phone').value;
       const email =  document.querySelector('#modal-email').value;
        
       data[id].name = name;
       data[id].website = website;
       data[id].phone = phone;
       data[id].email = email;
       modal.style.display = "none"; 
       display()
    
      }


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            display()
    
        }
    }

}
async function display() {
    let result = "";
    let cardDom = document.querySelector('.card-group')
    data.forEach(element => {
        result += `<div class="card">

     <div class="card-img">
         <img src="https://avatars.dicebear.com/v2/avataaars/${element.name}.svg?options%5bmood%5d%5b%5d=happy" />
     </div>
     <div class="card-content">
         <h3 class="name"> ${element.name} </h3>
         <ul class="info">
         <li class="name"><i class="fa fa-envelope"></i> ${element.email} </li>
         <li class="name"><i class="fa fa-phone" aria-hidden="true"></i> ${element.phone}</li>
         <a href="https://ashfaq.com" class="name"><i class="fa fa-globe" aria-hidden="true"></i>
                 ${element.website} 
         </a>
         </ul>
        
     </div>
     <div class="content-footer" >
     <i onclick="myFunction(this)" class="heart far fa-heart"></i>
     <i data-id=${element.id} class="edit fas fa-edit" id="edit" ></i>
     <i data-id=${element.id} class="delete fas fa-trash" id="delete"></i>
     

        </div>
 </div>`
    });
    cardDom.innerHTML = result;
   
 
    getEditButton()
    getLikeButton()

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


function myFunction(x) {
    if([...x.classList].includes('fas')){
        x.classList.remove('fas')
        x.classList.add('far')
    }
   else{
        x.classList.remove('far')
        x.classList.add('fas')
    }
   
  }


document.addEventListener("DOMContentLoaded", () => {
  
    const user = new User()
    user.getUsers();

    let  a = new Promise( function(resolve, reject) { setTimeout(
        function() {
           document.querySelector('.spinner').style.display = "none"; 

          resolve("loading");
        },  600)})
    //  .then(()=>)
        .then(() =>display())
       
        .then(() => getEditButton())
        .then(() => getLikeButton());



})