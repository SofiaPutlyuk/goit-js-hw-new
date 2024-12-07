const searchGetButton = document.getElementById("buttonGet");
const allMovies = "http://localhost:3000/movies";

function createTable(movies) {
    const existingTable = document.querySelector('table');
    if (existingTable) {
        existingTable.remove();
    }

    const createTable = document.createElement('table');
    createTable.innerHTML = `
        <thead>
            <tr>
                <th>№</th>
                <th>Movies</th>
                <th>Genre</th>
                <th>Director</th>
                <th>Year</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    document.body.append(createTable);
    const tbody = createTable.querySelector("tbody");
    movies.forEach((movie, index) => {
        const createRow = document.createElement('tr');
        createRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.director}</td>
            <td>${movie.year}</td>
            <td>
                <button class="edit-btn" data-id="${movie.id}">Edit</button>
                <button class="delete-btn" data-id="${movie.id}">Delete</button>
            </td>
        `;
        tbody.append(createRow);
    });

    attachEditEvent();
    attachDeleteEvent();
}

function attachEditEvent() {
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const movieId = button.getAttribute('data-id');

            fetch(`${allMovies}/${movieId}`)
                .then(response => response.json())
                .then(movie => {
                    const createModal = document.createElement('div');
                    createModal.classList.add("modalEdit");
                    const createContentModal = document.createElement('div');
                    createContentModal.classList.add("modalContantEdit");

                    const createInputTitle = document.createElement('input');
                    createInputTitle.type = "text";
                    createInputTitle.value = movie.title;

                    const createInputGenre = document.createElement('input');
                    createInputGenre.type = "text";
                    createInputGenre.value = movie.genre;

                    const createInputDirector = document.createElement('input');
                    createInputDirector.type = "text";
                    createInputDirector.value = movie.director;

                    const createInputYear = document.createElement('input');
                    createInputYear.type = "text";
                    createInputYear.value = movie.year;

                    createContentModal.appendChild(createInputTitle);
                    createContentModal.appendChild(createInputGenre);
                    createContentModal.appendChild(createInputDirector);
                    createContentModal.appendChild(createInputYear);

                    const createButtonSave = document.createElement('button');
                    createButtonSave.textContent = "Save";
                    createButtonSave.addEventListener('click', function () {
                        const editedMovie = {
                            title: createInputTitle.value,
                            genre: createInputGenre.value,
                            director: createInputDirector.value,
                            year: createInputYear.value
                        };

                        fetch(`${allMovies}/${movieId}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(editedMovie)
                        })
                            .then(response => response.json())
                            .then(updatedMovie => {
                                let existingTable = document.querySelector('table');
                                if (existingTable) {
                                    const tbody = existingTable.querySelector("tbody");
                                    const rows = tbody.querySelectorAll('tr');
                                    rows.forEach(row => {
                                        if (row.querySelector('td').innerText == movieId) {
                                            row.innerHTML = `
                                                <td>${movieId}</td>
                                                <td>${updatedMovie.title}</td>
                                                <td>${updatedMovie.genre}</td>
                                                <td>${updatedMovie.director}</td>
                                                <td>${updatedMovie.year}</td>
                                                <td>
                                                    <button class="edit-btn" data-id="${updatedMovie.id}">Edit</button>
                                                    <button class="delete-btn" data-id="${updatedMovie.id}">Delete</button>
                                                </td>
                                            `;
                                        }
                                    });
                                    attachEditEvent();
                                    attachDeleteEvent();
                                }
                            });

                        createModal.remove();
                    });

                    createContentModal.appendChild(createButtonSave);
                    createModal.appendChild(createContentModal);
                    document.body.appendChild(createModal);
                });
        });
    });
}

function attachDeleteEvent() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const movieId = button.getAttribute('data-id');

            fetch(`${allMovies}/${movieId}`, {
                method: "DELETE",
            })
                .then(() => {
                    let existingTable = document.querySelector('table');
                    if (existingTable) {
                        const tbody = existingTable.querySelector("tbody");
                        const rows = tbody.querySelectorAll('tr');
                        rows.forEach((row, index) => {
                            if (row.querySelector('td').innerText == movieId) {
                                row.remove();
                            }
                        });
                    }
                });
        });
    });
}

const searchButtonMovie = document.getElementById("addNewMovie");
searchButtonMovie.addEventListener('click', function () {
    const searchTitleInput = document.getElementById("newMovieInput");
    const searchNewGenre = document.getElementById("newGenreinput");
    const searchNewDirector = document.getElementById("newDirectorInput");
    const searchNewYear = document.getElementById("newYearInput");

    const newMovie = {
        title: searchTitleInput.value,
        genre: searchNewGenre.value,
        director: searchNewDirector.value,
        year: searchNewYear.value
    };

    fetch(allMovies, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMovie)
    })
        .then(response => response.json())
        .then(newMovie => {
            createTable([newMovie]);
            attachEditEvent();
            attachDeleteEvent();
        });
});

searchGetButton.addEventListener('click', function () {
    fetch(allMovies, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(allMovie => {
            createTable(allMovie);
            attachEditEvent();
            attachDeleteEvent();
        });
});
