import { createReviewFormularView } from "./review-modal.js";
import { getMoviesByTitle } from "./search.js";

const favMovie = JSON.parse(localStorage.getItem("favList"));
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const popMoviesFav = document.getElementById("popularMovieList");
        let buttonIdCounter = 1;
        favMovie.forEach(movie => {
            const item = document.createElement("li");
            item.innerHTML = `
            <a href="#"><img src="${movie.imgSrc}" alt=${movie.id} class="w-full rounded-[3rem] shadow-lg"/></a>
            <div class="mt-[7px] pl-[2rem]">
            <h4 class="text-[1.4rem] md:text-[1.6rem]">${movie.title}</h4>
            <span>${movie.votes}</span>
            <span>${movie.releaseDate}</span>
            </div>

            <button id="delete-btn-${buttonIdCounter}" class="w-[100%] mt-[4px] py-[8px] text-[1.2rem] bg-[#020F1D] rounded-[3rem]">- Delete from Favorites</button> 
            <button id="review-btn-${buttonIdCounter}" class="w-[100%] mt-[4px] py-[8px] text-[1.2rem] bg-[#020F1D] rounded-[3rem]">Leave your review</button> 
            `;
            item.classList.add("flex", "flex-col", "justify-between");
            popMoviesFav.appendChild(item);

            const deleteButton = document.getElementById(
                `delete-btn-${buttonIdCounter}`
            );
            deleteButton.addEventListener("click", () => {
                deleteFav(movie.id);
                item.remove();
            });

            const reviewButton = document.getElementById(
                `review-btn-${buttonIdCounter}`
            );
            reviewButton.addEventListener("click", () => {
                const reviewViewContainer = document.getElementById("reviewView");
                reviewViewContainer.innerHTML = "";

                const reviewView = createReviewFormularView(movie);
                reviewViewContainer.appendChild(reviewView);

                const reviewModalView = document.getElementById("review-modal");
                reviewModalView.classList.remove("hidden");
            });

            buttonIdCounter++;
        });
    } catch (error) {
        console.error(error);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const searchInputView = document.getElementById("searchInput");
        searchInputView.addEventListener("change", async event => {
            const userSearchText = event.target.value;
            console.log("user is searching for", userSearchText);

            const titleOfMovie = await getMoviesByTitle(userSearchText);
            const searchBarResult = document.getElementById("searchResults");
            // reset search results
            searchBarResult.innerHTML = "";

            //show the searchbar results
            searchBarResult.classList.remove("hidden");

            console.log(titleOfMovie);
            titleOfMovie.forEach((movie, i) => {
                console.log("movie.poster_path}", movie.poster_path);

                const item = document.createElement("li");
                item.innerHTML = `
                <div class="w-[50%] flex justify-between items-center">
                <img src=${movie.poster_path
                    } alt=${movie.id} class="w-[40%] rounded-[1rem] shadow-lg mr-[2.5rem] ] cursor-pointer"/>
                <div class="movie_info_text inline-block  text-[1.4rem]">
                <h4>${movie.title}</h4>
    
                <span class="vote" >⭐️ ${movie.vote_average.toFixed(1)}</span>
                <span class="realese_date">| ${movie.release_date.split("-")[0]
                    }</span>
    
                </div>
                </div>
                <button class="w-[30%] py-[5px] px-[2rem] text-[1.25rem] bg-[#020F1D] rounded-full">+ Add to favorites</button>
               
                `;
                item.classList.add(
                    "movie",
                    `movie_${i + 1}`,
                    "flex",
                    "items-center",
                    "justify-between",
                    "border-b-2",
                    "pb-[3rem]"
                );
                searchBarResult.appendChild(item);
            });

            //closing the search bar
            const closeBtn = document.createElement("btn");
            closeBtn.innerHTML = `<button class="absolute top-[3rem] right-[5rem]">X</button>`;
            searchBarResult.appendChild(closeBtn);

            closeBtn.addEventListener("click", function () {
                searchBarResult.classList.add("hidden");
            });

            const favButtons = document.querySelectorAll("button");
            favButtons.forEach(button =>
                button.addEventListener("click", function () {
                    const favMovie = this.parentElement;
                    console.log(favMovie.children);
                    const favmovieClass = favMovie.classList[1];
                    console.log(favmovieClass);

                    const favMovieObj = {
                        id: document.querySelector(`.${favmovieClass} img`).alt,
                        imgSrc: document.querySelector(`.${favmovieClass} img`)
                            .src,
                        title: document.querySelector(`.${favmovieClass} h4`)
                            .textContent,
                        votes: document.querySelector(`.${favmovieClass} .vote`)
                            .textContent,
                        releaseDate: document.querySelector(
                            `.${favmovieClass} .realese_date`
                        ).textContent,
                    };
                    console.log(favMovieObj);
                    const favList =
                        JSON.parse(localStorage.getItem("favList")) || [];
                    const localStorageFavList = JSON.parse(
                        localStorage.getItem("favList")
                    );
                    if (!favList.some(e => e.title === favMovieObj.title)) {
                        favList.push(favMovieObj);

                        localStorage.setItem(
                            "favList",
                            JSON.stringify(favList)
                        );
                    } else {
                        console.log("Already added to favorite");
                    }

                    console.log(JSON.parse(localStorage.getItem("favList")));
                })
            );
        });
    } catch (error) {
        console.error(error);
    }
});

function deleteFav(id) {
    let favList = JSON.parse(localStorage.getItem("favList")) || [];
    favList = favList.filter(movie => movie.id !== id);
    localStorage.setItem("favList", JSON.stringify(favList));
}

// const movie2 = JSON.parse(localStorage.getItem('movie'))
// console.log(movie2)
// document.addEventListener("DOMContentLoaded", async () => {
// try {
//     const popularMovies = await movie2;
//     const popMoviesView = document.getElementById("popularMovieList");
//     popularMovies.forEach(movie => {
//         console.log("movie.poster_path", movie.poster_path);
//         console.log(movie);

//         const item = document.createElement("li");

//         item.innerHTML = `
//         <a href="#"><img src="${movie.poster_path}" alt=${movie.id} class="w-full rounded-[3rem] shadow-lg"/></a>
//         <div class="mt-[7px] pl-[2rem]">
//         <h4 class="text-[1.4rem] md:text-[1.6rem]">${movie.title}</h4>

//         <span>⭐️ ${movie.vote_average.toFixed(1)}</span>
//         <span>| ${movie.release_date.split("-")[0]}</span>
//         </div>
//         `;
//         item.classList.add("flex", "flex-col", "justify-between");
//         popMoviesView.appendChild(item);
//     });
// } catch (error) {
//     console.error(error);
// }
// });
