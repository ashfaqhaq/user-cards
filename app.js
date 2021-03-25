const data = []

class User {
    async getUsers() {
      
      try {
          const result = await fetch("https://jsonplaceholder.typicode.com/users")
            const _data =  await  result.json()
            return _data;
    }
       catch (error) {
          
      }
     

        }
    }

class UI {
    display(data){
      let result = "";
      let cardDom= document.querySelector('.card-group')
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
             <div class="footer">
                     <button id="edit">Edit</button>
             </div>
         </div>
     </div>`
     });

     cardDom.innerHTML= result;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const user = new User()
    user.getUsers()
        .then((data)=>ui.display(data))
        
        ;
       
})