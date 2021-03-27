var data = []
 
function editContent(id){
   
   const _place = data.filter(item=>item.id==id)[0]
  

    var modal = document.getElementById("myModal");
    
   
    modal.innerHTML = `<div class="modal-content"> 
    <span class="close">&times;</span>
    <br/>
    
     <div class="modal-container" >
     <form>
     <p class="row">
     <label  class="modal-body">Name</label>

     <input id="modal-name" value="${_place.name}" type="text" />  <br/>
     </p>
     <p class="row">
     <label class="modal-body">Email</label>
     <input id="modal-email"  value="${_place.email}" type="text" />  <br/>
     </p>
     <p class="row">
     <label class="modal-body">Phone</label>
     <input id="modal-phone"  value="${_place.phone}" type="text" />  <br/>
     </p>
     <p class="row">
     <label class="modal-body">Website</label>
    <input id="modal-website"  value="${_place.website}"  type="text" />  <br/>
    </p>
    <p class="row">
    </form>

    </div>
   
    <div class="modal-footer">
    
    <button class="save" data-micron="bounce">Save</button>
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
   
    // console.log(typeof id) //string
    // const response  = window.confirm('Are you sure you want to remove this item?');

// if (response === true) {
   
        const filteredArray = data.filter(item=>item.id!=id)
       
        data =[...filteredArray];
        tata.success('Deleted','')
        display()
// }



}





async function display() {
    let result = "";
    let likeClasses = {
        true:"fas",
        false:"far"
    }
    let cardDom = document.querySelector('.card-group')

    if (data.length>0){
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
     
     <span class="hvr"><i onclick="likeProfile(this)" class=" ${likeClasses[element.like]} + fa-heart heart hvr-grow" value="${element.like}" data-id=${element.id}> </i></span>
     <span class="hvr"> <i data-id=${element.id} class="edit fas fa-edit hvr-grow" id="edit" ></i></span>
     <span class="hvr"> <i data-id=${element.id} class="delete fas fa-trash hvr-grow" id="delete"></i></span>
     

        </div>
 </div>`
    });
}
else{
    result += `<div class="card">

    <h2> No items to display </h2>
    <p> Please reload </p>
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
           _data.map(item=>item.like=false)
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
       
        button.addEventListener('click', () => deleteContent(id))
        
    })
   
}



function likeProfile(item) {
    console.log(item)
    let currentObject = data.filter(i=>item.dataset.id==i.id)[0]
  let currentIndex = (data.indexOf(currentObject))

 
    if( data[currentIndex].like == true){ //already liked
        item.classList.remove('fas')         // remove solid
        item.classList.add('far')            // add regular
       data[currentIndex] = {...data[currentIndex],like: false};
        console.log(!data[currentIndex].like)
    }
   else{
    item.classList.remove('far')
    item.classList.add('fas')
   
    data[currentIndex] = {...data[currentIndex],like: true}
    console.log(!data[currentIndex].like)
    
    }
   
  }


window.addEventListener("load", () => {
  
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