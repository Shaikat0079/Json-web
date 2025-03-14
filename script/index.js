function removeActiveClass(){
    const activeButtons = document.getElementsByClassName("active");

    for(let btn of activeButtons){
        btn.classList.remove('active')
    }
}

function loadCategories() {
    // console.log("Category is loading!")
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories").
        then(res => res.json()).
        then(data => displayCategories(data.categories))
}

// console.log(loadCategories())


const loadCategoryVideos =(id)=>{
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        removeActiveClass()
        const clickedButton = document.getElementById(`btn-${id}`)
        clickedButton.classList.add("active")
        displayVideos(data.category)
    })
    console.log(url)
}
function displayCategories(categories) {
    // console.log(categories)
    const categoryContainer = document.getElementById("category-container");

    for (let cat of categories) {
        const categoryDiv = document.createElement("div")
        categoryDiv.innerHTML =
            `
            <button id='btn-${cat.category_id}' onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${cat.category}</button>

            `;

        categoryContainer.append(categoryDiv)
    }
}

function loadVideos(searchText = ``) {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            document.getElementById('btn-all').classList.add('active')
            displayVideos(data.videos)
        })
}

const loadVideoDetails=(videoId)=>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayVideoDetails(data.video))
}

const displayVideoDetails = (video)=>{
    console.log(video)
    document.getElementById("video_details").showModal()
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    
    ${video.title}
    
    `
}


const displayVideos = (videos) => {
    console.log(videos)
    const videoContainer = document.getElementById('video-container')
    videoContainer.innerHTML = ""

    if(videos.length == 0){
        videoContainer.innerHTML = `
        <div class="py-20 col-span-3 text-center flex flex-col justify-center items-center">
            <img class=" w-[120px]" src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">OOPs!! Sorry No Content Here!!!!</h2>
        </div>
        
        `;
        return;
    }
    videos.forEach(video => {
        // console.log(video)
        const videoCard = document.createElement('div')
        videoCard.innerHTML = `
        
        <div class="card bg-base-100">
  <figure class="relative">
    <img class='w-full h-[350px] object-cover'
      src=${video.thumbnail}
      alt="Shoes" />
      <span class = 'absolute text-white bg-black bottom-2 right-2 px-2 text-sm rounded'>${video.others.posted_date}</span>
  </figure>
  <div class="flex gap-3 px-0 py-5">
        <div class="profile">
            <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                  <img src=${video.authors[0].profile_picture} />
                </div>
              </div>
        </div>
        <div class="intro">
        <h2 class="text-sm font-semibold">${video.title}</h2>
        <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
         ${video.authors[0].verified===true? `<img class='w-6' src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">`:""} </p>
        <p class="text-sm text-gray-400">${video.others.views}</p>
        </div>
    </div>
  </div>
  <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
</div>
        
        `

        videoContainer.append(videoCard)
    });
}

// loadVideos()

document.getElementById('search-input').addEventListener("keyup",(e)=>{
    const input=e.target.value;
    loadVideos(input)
})

loadCategories()