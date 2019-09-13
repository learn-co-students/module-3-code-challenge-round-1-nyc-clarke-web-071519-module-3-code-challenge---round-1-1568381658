document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

//variables
  let imageId = 3424 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likes = document.getElementById('likes')
  const imageDiv = document.getElementById('image_card')

//event listeners
document.addEventListener('click', handleLike)
document.addEventListener('submit', handleForm)

//fetches

getImageData()

function getImageData() {
  fetch(imageURL)
  .then(response => response.json())
  .then(displayImage)
}

function likeFetch(newLikes) {
  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      like_count: newLikes
    })
  })
  .then(response => response.json())
  .then(updatedImageObject => showUpdatedLikes(updatedImageObject))
}

function commentFetch(newCommentContent) {
  fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: newCommentContent
    })
  })
  .then(response => response.json())
  .then(updatedImageObject => showUpdatedComments(updatedImageObject))
}


//functions
function displayImage(imageObject) {
console.log(imageObject)

  imageDiv.innerHTML = `
  <img src=${imageObject.url} id="image" data-id=${imageObject.id}/>
  <h4 id="name">${imageObject.name}</h4>
  <span>Likes:
    <span id="likes">${imageObject.like_count}</span>
  </span>
  <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
     </ul>
  `

  const commentsUl = document.getElementById('comments')
  imageObject.comments.forEach(comment => {
    const commentsLi = document.createElement('li')
    commentsLi.innerHTML = comment.content
    commentsUl.appendChild(commentsLi)
  })

}

function handleLike(event){
  if (event.target.id === "like_button") {
    const newLikes = Number(likes.innerHTML) + 1
    console.log(newLikes)
    likes.innerHTML = newLikes
    console.log(likes.innerHTML)
    console.log(likes)
  
    likeFetch(newLikes)
  }
 
}

function showUpdatedLikes(updatedImageObject){
  getImageData()
}

function handleForm(event) {
  event.preventDefault()
  if (event.target.id === 'comment_form') {
    const newComment = document.getElementById('comment_input')
    const newCommentContent = newComment.value
    console.log(newCommentContent)

    commentFetch(newCommentContent)
  }
}

function showUpdatedComments(updatedImageObject) {
  getImageData()
}




})



