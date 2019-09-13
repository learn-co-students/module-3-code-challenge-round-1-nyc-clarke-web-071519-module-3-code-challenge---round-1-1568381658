document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

//grab available elements off the DOM
  let imageId = 3426 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image = document.querySelector('#image')

  const imageName = document.querySelector('#name')

  const imageLikes = document.querySelector('#likes')

  const ulComments = document.querySelector('#comments')

  const likeButton = document.querySelector('#like_button')

  
  const commentForm = document.querySelector('#comment_form')

//fetch requests
function fetchImage(){
  fetch(imageURL)
    .then(response => response.json())
    .then(x => {
      console.log(x)
      displayImage(x);

    })
}
fetchImage();

//logic/dom manipulation
function displayImage(imageObj){
  image.setAttribute("src" , imageObj.url)
  imageName.innerText = imageObj.name
  imageLikes.innerText = imageObj.like_count

  imageObj.comments.forEach(comment => {
    let li = document.createElement('li')
    li.innerText = comment.content
    ulComments.append(li)

  })

  function showComments(){
//here is the showComments function that I called in the event listener
//I would find the ul id of comments
//create an li of the commemnts
//append it
  }

  //step 2: like button feature
document.addEventListener('click', function(event){
    let likeButtonIsPressed = event.target.id === "like_button"
    if (likeButtonIsPressed) {
      let id = event.target.dataset.id
  
      let likeCount = Number(imageLikes.innerText)
      imageLikes.innerText = `${++likeCount}`

      fetch('https://randopic.herokuapp.com/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'

        },
        body: JSON.stringify({
          "image_id": 3426
        })

      })
  
      
    }

  commentForm.addEventListener('submit',function(event){
    event.preventDefault()
    if (event.target.id === "comment_input"){
      fetch('https://randopic.herokuapp.com/comments', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
            "image_id": 3426,
            "content": comment.content
          })
      })
      .then(resp => resp.json())
      .then(showComments)
  }
}

  })


})


  

  
     
    
  
}










})