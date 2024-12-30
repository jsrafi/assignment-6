// loader
window.onload = function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('body');
    setTimeout(function() {
        loader.classList = 'none';  
        content.classList = 'block'; 
    }, 1000);
};



// loading modal
let seconds = 3;
const countdown = document.getElementById('countdown');

function countdownPet(id)
{
    const petsId = document.getElementById(`pet-${id}`);
    petsId.disabled = true;
    petsId.classList = "disabled:opacity-50 disabled:border disabled:bg-orange-950 disabled:px-3 disabled:py-2 disabled:text-wheat disabled:rounded-xl disabled:cursor-not-allowed"
    
    document.getElementById('my_modal_1').showModal();
    const intervalId = setInterval(updateTime, 1000);
    

    function updateTime()
   {
     countdown.innerHTML=`${seconds}`;
     seconds--;
     
     
     if(seconds <= -1)
     {
       
         seconds=3;
         clearInterval(intervalId);
         document.getElementById('my_modal_1').close();
        
         
        
     }
    
     
   }
   
    
}



// fetching pets button api
async function petBtn()
{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    showPetBtn(data.categories)
}
petBtn();

// removing css from btn
function removeCSS()
{
  const btnChange = document.getElementsByClassName('category-id')
  for (let btn of btnChange)
  {
    btn.classList.remove('bg-slate-100','rounded-full');
  }
  
}

// fetching particular pet section
async function fetchParticularPet(id)
{
    removeCSS();
    const categoryBtn = document.getElementById(`pet-${id}`)
    const content = document.getElementById('loader');
    const mainContent = document.getElementById('main-fetch')
    const likedPet = document.getElementById('liked-pet-main')
    const loader = document.createElement('div')
    loader.innerHTML = `
    
    <span id="loader2" class="loading z-[9999] loading-bars loading-lg fixed top-[50%] left-[50%]  justify-center items-center "></span>
    `
    content.appendChild(loader)
    
      content.classList.remove('hidden')
      mainContent.classList.add('hidden');
      likedPet.classList.add('hidden');
        
      
      
      setTimeout(() => {
        content.classList.add('hidden');  
        mainContent.classList.remove('hidden');  
        likedPet.classList.remove('hidden');  
      }, 2000);  

    categoryBtn.classList.add('bg-slate-100','rounded-full');

    
    

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`);
    const data = await res.json();
    showMainApi(data.data)
}

// showing fetched btn api
function showPetBtn(data)
{

    const petBtn = document.getElementById('pet-btn');
    for(let newData of data)
    {
        const div = document.createElement('div');
        div.innerHTML = `

        <button id="pet-${newData.category}" onclick="fetchParticularPet('${newData.category}')" class="category-id flex gap-1 md:gap-4 bg-white border-solid border border-slate-300 px-2 h-[40px] md:px-10 md:h-[70px] rounded-xl items-center text-sm md:text-lg font-bold text-black"><img class=" w-5 md:w-10" src="${newData.category_icon}" alt="">${newData.category}</button>
        `
        petBtn.appendChild(div)
    }
}

// fetching all pets api
async function fetchMainApi ()
{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    showMainApi(data.pets)
}
fetchMainApi();


// liked pet section 
function likedPet(data)
{
    console.log(data)
    const likedPetContainer = document.getElementById('liked-pet');
    const div = document.createElement('div');
    div.classList =" w-90% h-[90px] md:h-[140px]"
    div.innerHTML= `
    
    <img class="rounded-xl h-full w-full object-cover" src="${data}" alt="">
    
    `
    likedPetContainer.appendChild(div)
}

// showing pet details
function showDetailsPet(data)
{
    document.getElementById('my_modal_5').showModal();
    const modalOne = document.getElementById('modal-one');
    modalOne.innerHTML = `
    
        <figure class="">
          <img class="h-full w-full  rounded-3xl object-cover"
           src="${data.image}"
           alt="Shoes" />
        </figure>
        <div class=" card-body">
          <h2 class="text-black text-lg font-bold">${data.pet_name}</h2>
         <div class="flex items-center justify-between">
          <div class="flex flex-col gap-2">
          <p class="flex items-center gap-1 md:text-base text-xs"><img src="images/Frame (1).png" alt="">Breed : ${data.breed? data.breed: "Not Mentioned"}</p>
          <p class="flex items-center gap-1 md:text-base text-xs"><img src="images/Frame (3).png" alt="">Birth : ${data.date_of_birth? data.date_of_birth : "Not Available"}</p>
          <p class="flex items-center gap-1 md:text-base text-xs"><img src="images/Frame (3).png" alt="">vaccinated-status: ${data.vaccinated_status? data.vaccinated_status : "Not Available"}</p>
          </div>

          <div class="flex flex-col gap-2">
            <p class="flex items-center gap-1 md:text-base text-xs"><img src="images/Frame (4).png" alt="">Gender : ${data.gender? data.gender : "Not Mentioned"}</p>
            <p class="flex items-center gap-1 mb-2 md:text-base text-xs"><img src="images/Frame (2).png" alt="">Price : ${data.price? data.price+'$' : "Not Available"}</p>
          </div>
         </div>
          <hr>

          <div class="mt-2">
          <p class="font-bold md:text-base text-sm text-black">Details Information</p>
          <p class="mt-2 md:text-base text-xs">${data.pet_details}</p>
          </div>
        </div>

    `
}

//fetching details of pets
async function detailsPet(id)
{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json();
    showDetailsPet(data.petData)
}


function showMainApi(data)
{
 console.log(data)
 
 const mainDiv = document.getElementById('main-fetch');
 mainDiv.innerHTML = "";

 if(data.length === 0)
 {
    const mainDiv = document.getElementById('main-fetch');
    mainDiv.classList.remove('grid');
    mainDiv.innerHTML = `
    <div class="bg-slate-300 py-20 rounded-lg flex flex-col justify-center items-center text-center gap-4">
    <img class="md:w-36 w-20" src="images/error.webp" alt="" >
    <h3 class="px-1 md:text-2xl text-lg font-bold text-black">No Information Available</h3>
    <p class="px-1">In our pet center there is still no any birds but we are assuring you that we are going <br> to get beautiful birds soon. </p>
    </div>
    
    `
    return;
 }
 else{
    mainDiv.classList.add('grid');
 }

    for(let newData of data)
    {
        
        const div = document.createElement('div');
        div.classList = 'card card-compact border border-slate-300'
        div.innerHTML = `

        <figure class="h-[200px]">
          <img class="h-full w-full p-3 rounded-3xl object-cover"
           src="${newData.image}"
           alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="text-black text-lg font-bold">${newData.pet_name}</h2>
          <p class="flex items-center gap-1"><img src="images/Frame (1).png" alt="">Breed : ${newData.breed? newData.breed: "Not Mentioned"}</p>
          <p class="flex items-center gap-1"><img src="images/Frame (3).png" alt="">Birth : ${newData.date_of_birth? newData.date_of_birth : "Not Available"}</p>
          <p class="flex items-center gap-1"><img src="images/Frame (4).png" alt="">Gender : ${newData.gender? newData.gender : "Not Mentioned"}</p>
          <p class="flex items-center gap-1 mb-2"><img src="images/Frame (2).png" alt="">Price : ${newData.price? newData.price+'$' : "Not Available"}</p>
          <hr>
          
          <div class="card-actions flex justify-between mt-2 ">
          
            <button  onclick="likedPet('${newData.image}')" class="border  border-slate-300  py-2 px-2  md:py-2 md:px-3 rounded-xl"><img class=" md:w-full w-4"   src="images/like.png" alt="" ></button>
            <button id="pet-${newData.petId}" onclick="countdownPet('${newData.petId}')" class="border border-slate-300 text-xs py-2 px-2 md:text-sm md:py-2 md:px-3 rounded-xl text-[#0E7A81] font-bold">Adopt</button>
            <button onclick="detailsPet('${newData.petId}')" class="border border-slate-300 text-xs py-2 px-2 md:text-sm md:py-2 md:px-3 rounded-xl text-[#0E7A81] font-bold">Details</button>
            
          </div>
        </div>

        

        `
        mainDiv.appendChild(div)
    }
}


function sortingObject()
{
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res=> res.json())
    .then(data => {
        data.pets.sort((a, b) => b.price - a.price);
        showMainApi(data.pets);
    })
}


