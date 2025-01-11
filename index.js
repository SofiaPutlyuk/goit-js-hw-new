const API_KEY = '47691967-ff3ef6cdb0645665e864ebc79';
const baseURL = 'https://pixabay.com/api/';
const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const galleryContainer = document.createElement('div');
galleryContainer.classList.add('gallery-container');
document.body.appendChild(galleryContainer);
const createButtonLoad = document.createElement("button")
createButtonLoad.textContent ="Load more"
document.body.appendChild(createButtonLoad)
let photoPerPage = 12;
let currentPage = 1; 
let currentQuery = '';
function counter(){
    createButtonLoad.addEventListener("click",function(){
        currentPage++;
        fetchPhoto(currentQuery).then(() => {
            createButtonLoad.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
      })
    
    })}



async function fetchPhoto(query) {
    try {
        currentQuery = query;
        const response = await fetch(`${baseURL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${currentPage}&per_page=${photoPerPage}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        const dataHits = data.hits;
        console.log(dataHits)
        galleryContainer.innerHTML = '';

        if (dataHits.length === 0) {
            galleryContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        const createContainer = document.createElement("ul");
        createContainer.classList.add("gallery");

        dataHits.forEach(element => {
            const createList = document.createElement('li');
            const createDiv = document.createElement('div');
            createDiv.classList.add("photo-card");
            createDiv.innerHTML = `
                <img src="${element.largeImageURL}" alt="${element.tags}"/>
                <div class="stats">
                    <p class="stats-item">
                        <i class="material-icons">thumb_up</i>
                        ${element.likes}
                    </p>
                    <p class="stats-item">
                        <i class="material-icons">visibility</i>
                        ${element.views}
                    </p>
                    <p class="stats-item">
                        <i class="material-icons">comment</i>
                        ${element.comments}
                    </p>
                    <p class="stats-item">
                        <i class="material-icons">cloud_download</i>
                        ${element.downloads}
                    </p>
                </div>`;
            createList.appendChild(createDiv);
            createContainer.appendChild(createList);
        });

        galleryContainer.appendChild(createContainer);
    } catch (error) {
        console.error('Error fetching data:', error);
        galleryContainer.innerHTML = '<p>An error occurred while fetching data. Please try again.</p>';
    }
}

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        currentPage = 1;
        fetchPhoto(query);
    }
});

