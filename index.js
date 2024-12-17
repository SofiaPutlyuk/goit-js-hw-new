let currentTotal = 10;

const fetchImages = async (perPage, totalImages) => {
    let images = [];
    const totalPages = Math.ceil(totalImages / perPage);

    for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://pixabay.com/api?key=47691967-ff3ef6cdb0645665e864ebc79&editors_choice=true&page=${page}&per_page=${perPage}`);
        const data = await response.json();
        images = [...images, ...data.hits];
    }

    const searchGallery = document.getElementById("gallery");
    images.slice(currentTotal - 10, currentTotal).forEach(photo => {
        const createImg = document.createElement('img');
        createImg.src = photo.previewURL;
        searchGallery.appendChild(createImg);
    });
};

fetchImages(6, currentTotal);

const searchButtonLoad = document.getElementById("loadButton");
searchButtonLoad.addEventListener('click', function() {
    currentTotal += 10;
    fetchImages(6, currentTotal);
});


