
let imageId = 3423 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

fetchData()

//grab dom elements
const title = document.querySelector('#name')
const picture = document.querySelector('#image')
const likes = document.querySelector('#likes')
const comments = document.querySelector('#comments')
const likeButton = document.querySelector('#like_button')
const commentInput = document.querySelector('#comment_input')
const commentForm = document.querySelector('#comment_form')
const submit = document.querySelector("#submit")
const deleteBtn = document.querySelector(".deleteButton")
//add event listeners

likeButton.addEventListener('click', addLike)
submit.addEventListener('click', function(event){
  event.preventDefault()
  addComment()
})


//fetch data from backend
function fetchData(){
  fetch(imageURL)
    .then(resp => resp.json())
    .then(placeData)
}

function postLike(){
  fetch('https://randopic.herokuapp.com/likes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: 3423})
  })
}

function postComment(content){
  fetch('https://randopic.herokuapp.com/comments', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: 3423, content: content })
  })
}

 function deleteComment(content){
  fetch('https://randopic.herokuapp.com/comments',{
    method: "DELETE",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({image_id: 3423, content: content })
    })
 }


//DOM manipulation
function placeData(allData) {
  title.innerText = allData.name
  picture.src = allData.url
  likes.innerText = allData.like_count
  allData.comments.forEach((commentData) => {
    const li = document.createElement('li')
    li.innerText = commentData.content
    //attempting delete
    const deletebtn = document.createElement('button')
    deletebtn.innerText = "Delete"
    deletebtn.className = "deleteButton"
    comments.append(li)
    li.append(deletebtn)
  })
}

function addLike(){
  likes.innerText = parseInt(likes.innerText) + 1
  postLike()
}

function addComment(){
  let value = commentInput.value
  const li = document.createElement('li')
  li.innerText = value
  comments.append(li)
  postComment(value)
  commentInput.value = ''
}

function deleteCommentElement(){
  
}