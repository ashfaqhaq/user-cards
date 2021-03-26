var data = []
 
function editContent(id){
   
   const _place = data.filter(item=>item.id==id)[0]
  

    var modal = document.getElementById("myModal");
    
   
    modal.innerHTML = `<div class="modal-content"> 
    <span class="close">&times;</span>
    <br/>
    
     <div class="modal-container" >
     <label  class="modal-body">Name</label>

     <input id="modal-name" value="${_place.name}" type="text" />  <br/>
     <label class="modal-body">Email</label>
     <input id="modal-email"  value="${_place.email}" type="text" />  <br/>
     <label class="modal-body">Phone</label>
     <input id="modal-phone"  value="${_place.phone}" type="text" />  <br/>
     <label class="modal-body">Website</label>
    <input id="modal-website"  value="${_place.website}"  type="text" />  <br/>
    </div>
   
    <div class="modal-footer">
    
    <button class="save">Save</button>
    <button class="cancel">Cancel</button>
    </div>
    </div>`
    var btn = document.getElementById("myBtn");
    modal.style.display = "block";

    var spanClose = document.getElementsByClassName("close")[0];
    var cancel = document.getElementsByClassName("cancel")[0];
    var spanSave = document.getElementsByClassName("save")[0];
    cancel.onclick = function() {
        modal.style.display = "none";
       
      }
    
    spanClose.onclick = function() {
        modal.style.display = "none";
       
      }
      spanSave.onclick = function() {

       const name =  document.querySelector('#modal-name').value;
       const website =  document.querySelector('#modal-website').value;
       const phone =  document.querySelector('#modal-phone').value;
       const email =  document.querySelector('#modal-email').value;
        
       _place.name = name;
       _place.website = website;
       _place.phone = phone;
       _place.email = email;
       modal.style.display = "none"; 
       display()
      }


    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
           
        }
       
    }


}
function deleteContent(id){


    var response = confirm("Are you sure you want to delete?");
if (response == true) {
  
 
       
        const filteredArray = data.filter(item=>item.id!==id+1)
        data =[...filteredArray];
       
        display()
}

}





async function display() {
    let result = "";
    let cardDom = document.querySelector('.card-group')

    if (data.length>1){
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
     <i onclick="likeProfile(this)" class="heart far fa-heart"></i>
     <i data-id=${element.id} class="edit fas fa-edit" id="edit" ></i>
     <i data-id=${element.id} class="delete fas fa-trash" id="delete"></i>
     

        </div>
 </div>`
    });
}
else{
    result += `<div class="card">

    <h2> No items to display
    </div>`
}
    cardDom.innerHTML = result;
   
 
    getEditButton()
    getDeleteButton()

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
       
        button.addEventListener('click', () => editContent(id))
        
    })
    
}

function getDeleteButton() {
        
    const buttons = [...document.querySelectorAll(".delete")];
    
    buttons.forEach(button => {
        let id = button.dataset.id;
       
        button.addEventListener('click', () => deleteContent(--id))
        
    })
   
}



function likeProfile(item) {
    if([...item.classList].includes('fas')){
        item.classList.remove('fas')
        item.classList.add('far')
    }
   else{
    item.classList.remove('far')
    item.classList.add('fas')
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
        .then(()=>getEditButton())
        .then(()=>getDeleteButton());
       
       



})