let addToy = false;
const BASE_URL = "http://localhost:3000/toys/"

document.addEventListener("DOMContentLoaded", () => {
  // controles add new toy button
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // create a toy form
  document.querySelector('.add-toy-form').addEventListener('submit',createNewToy)
  // Fetch toys from db on page content load
  fetch(BASE_URL).then(res => res.json()).then(toyList => toyList.forEach(displayToy))

});



function displayToy(toy){
  let toyCard = document.createElement('div')
      toyCard.classList.add('card')
  let toyName = document.createElement('h2')
      toyName.innerText = toy.name
  let toyImg = document.createElement('img')
      toyImg.src = toy.image
      toyImg.alt = `picture of ${toy.name}`
      toyImg.classList.add('toy-avatar')
  let toyLikes = document.createElement('p')
      toyLikes.innerText = toy.likes
  let likeButton = document.createElement('button')
      likeButton.innerText = "like"
      likeButton.classList.add('button')
      likeButton.addEventListener('click',() =>likeToy(toy,toyCard))
      
  toyCard.append(toyName,toyImg,toyLikes,likeButton)

  document.getElementById('toy-collection').appendChild(toyCard)
}

function createNewToy(event){
  event.preventDefault()
  console.log(event.target)
  console.log(event.target.name.value )
  console.log(event.target.image.value)

  let newToy = {
    "name": event.target.name.value,
    "image": event.target.image.value,
    "likes": 0
  }

  let reqObj = {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(newToy)
  }

  fetch(BASE_URL,reqObj).then(res => res.json()).then(displayToy)

}

function likeToy(toy,toyCard){
  

  let likedToy = {
    "likes": +toyCard.querySelector('p').innerText + 1
  }
  let reqObj = {
    headers: {"Content-Type": "application/json"},
    method: "PATCH",
    body: JSON.stringify(likedToy)
  }
  
  fetch(BASE_URL+toy.id,reqObj).then(res => res.json())
  .then(updatedToy =>  toyCard.querySelector('p').innerText = updatedToy.likes)

}
