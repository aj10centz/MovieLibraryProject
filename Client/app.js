//event listener in document on ready or (Jquery{});
function getAllMovies() {
 $(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        success: function(){
            $(`#movieTableBody`).html(``);
        }
    }).then(function(data) {
        addDataToTable(data);
    
    })
 })
}

function addDataToTable(data) {
    for(let i = 0; i < data.length; i++){
        $("#movieTableBody").append(`
        <tr><td>${data[i].title}</td>
        <td>${data[i].genre}</td>
        <td>${data[i].director}</td>
        <td><button type="submit" class="btn btn-outline-danger"onclick="editSingleMovie(${data[i].movieId})">Edit</button>
        <td><button type="submit" class="btn btn-outline-danger"onclick="getMovieDetails(${data[i].movieId})">Details</button></tr>
        </tr>`)
    }
}

function createMovie() {
    var data = makeMovieObject();
    $(document).ready(function() {
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(){
                alert("Successfully added movie!");
                $(document.getElementById('add-form').reset());
            }
            }).then(function() {
                getAllMovies();
            });
    });
}

function makeMovieObject(){
    var movieData = {
        "Title": document.getElementById('newTitle').value,
        "Genre": document.getElementById('newGenre').value,
        "Director": document.getElementById('newDirector').value,
        "ImgPath": document.getElementById('newImg').value
    };
    if (movieData.ImgPath == null)
    {
        movieData.ImgPath = "";
    }
    return movieData;
}


function editSingleMovie(movieId){
    $(document).ready(function(){
        $.ajax({
            type: 'GET',
            url: 'https://localhost:44325/api/movie/' + movieId,
            dataType: 'json'
        }).then(function(data){

            $('#hiddenMovieId').val(data['movieId'])
            $('#editTitle').val(data['title']).text()
            $('#editGenre').val(data['genre']).text()
            $('#editDirector').val(data['director']).text()
            $('#editImg').val(data['imgPath']).text()
    })
})
}

function getMovieDetails(movieId){
    $(document).ready(function(){
        $.ajax({
            type: 'GET',
            url: 'https://localhost:44325/api/movie/' + movieId,
            dataType: 'json'
        }).then(function(data){
            var movieImage = document.getElementById('movieImg');
            var movieTitle = document.getElementById('movieTitle');
            var movieDirector = document.getElementById('movieDirector');
            var movieGenre = document.getElementById('movieGenre');

            movieImage.src = data['imgPath'];
            movieTitle.innerText = data['title'];
            movieDirector.innerText = data['director'];
            movieGenre.innerText = data['genre'];
    })
})
}

function updateMovie() {
    var movieToUpdate = {
        "MovieId": parseInt(document.getElementById('hiddenMovieId').value),
        "Title": document.getElementById('editTitle').value,
        "Genre": document.getElementById('editGenre').value,
        "Director": document.getElementById('editDirector').value,
        "ImgPath": document.getElementById('editImg').value
    };
    $(document).ready(function() {
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            type: 'Put',
            contentType: 'application/json',
            data: JSON.stringify(movieToUpdate),
            success: function(){
                alert("Successfully updated movie!");
                $(document.getElementById('edit-form').reset());
            }
            }).then(function() {
                getAllMovies();
            });
    });
}