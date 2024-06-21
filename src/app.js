document.addEventListener("DOMContentLoaded", () => {
    function navigate(viewId) {
      // Hide all views
    document.querySelectorAll(".view").forEach((view) => {
    view.style.display = "none";
    });

    // Show the requested view
    document.getElementById(viewId).style.display = "block";

    window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document
        .getElementById("home")
        .addEventListener("click", () => navigate("homeView"));
    document
        .getElementById("bookmark")
        .addEventListener("click", () => navigate("bookmarkView"));

    document
        .getElementById("account")
        .addEventListener("click", () => {
            const info = document.querySelector('.info');

            if(getComputedStyle(info).textDecorationLine !== 'line-through'){
                navigate("accountView")
            }
        });

    document
        .getElementById("plus")
        .addEventListener("click", () => {
            const info = document.querySelector('.info');
            return info.removeAttribute('style');
        });

    document
        .getElementById("minus")
        .addEventListener("click", () => {
            const info = document.querySelector('.info');
            return info.setAttribute(
                'style',
                'text-decoration: line-through'
            );
        });

        
    document
        .getElementById("signInGo")
        .addEventListener("click", () => {
            console.log('Go Button clicked')
            navigate("accountView")
        });

    document
        .getElementById("signUpGo")
        .addEventListener("click", () => navigate("accountView"));

    // document
    //     .getElementsByClassName("bi-file-plus")
    //     .addEventListener("click", () => navigate("accountView"));

    // document
    //     .getElementById("animeCardLink")
    //     .addEventListener("click", () => navigate("bookmarkView"));

    document.getElementById("animeCardLink").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor tag behavior
        navigate("bookmarkView");
    });
    // document.getElementById("bookmarkCardIcon").addEventListener("click", (event) => {
    //     event.preventDefault(); // Prevent default anchor tag behavior
    //     console.log(event.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML)
    //     navigate("accountView");
    // });

    // Initialize with the home view
    navigate("homeView");

    // Assuming your images are within a container with the class
    'image-container'
    document.querySelectorAll(".image-container img").forEach((img) => {
        img.addEventListener("click", function () {
        const parent = this.parentNode;
        parent.insertBefore(this, parent.firstChild); // Move the clicked image to the beginning
        });
    });

        // Function to fetch anime data from the API
    // async function fetchAnimeData(animeName) {
    //     const query = `
    //     query ($search: String) {
    //         Media(search: $search, type: ANIME) {
    //             id
    //             title {
    //                 romaji
    //                 english
    //                 native
    //             }
    //             description
    //             coverImage {
    //                 large
    //             }
    //         }
    //     }
    //     `;

    //     const variables = {
    //         search: animeName
    //     };

    //     const url = 'https://graphql.anilist.co';

    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             query: query,
    //             variables: variables
    //         })
    //     });

    //     const data = await response.json();
    //     return data.data.Media;
    // }

    async function fetchAnimeData(searchQuery) {
        try {
            const response = await fetch(`https://graphql.anilist.co`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query ($search: String) {
                            Media(search: $search, type: ANIME) {
                                id
                                title {
                                    romaji
                                }
                                description
                                coverImage {
                                    large
                                }
                            }
                        }
                    `,
                    variables: { search: searchQuery },
                }),
            });
            const data = await response.json();
            return data.data.Media;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }
    // Function to display search results in the results view
    function displaySearchResults(results) {
        const searchResultsContainer = document.getElementById('searchResultsContainer');
        
        // Check if searchResultsContainer exists
        if (!searchResultsContainer) {
            console.error("Element with ID 'searchResultsContainer' not found.");
            return;
        }

        // Clear previous results
        searchResultsContainer.innerHTML = '';

        // Check if results is an object and has the data we need
        if (!results || !results.coverImage || !results.coverImage.large) {
            console.error('Results is not in the expected format:', results);
            return;
        }

        // Create a card for the single result
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
            <div class="card" id="searchedCard">
                <img src="${results.coverImage.large}" class="card-img-top" alt="${results.title.romaji}">
                <div class="card-body">
                    <h5 class="card-title">${results.title.romaji}</h5>
                    <p class="card-text">${results.description}</p>
                </div>
            </div>
        `;
        searchResultsContainer.appendChild(card);

        // Navigate to the search results view
        navigate('searchResultsView');
    }

    // Event listener for the search button
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', async function() {
        const searchInput = document.getElementById('searchBar').value.trim();
        if (searchInput === '') {
            console.error('Search input cannot be empty.');
            return;
        }

        try {
            const results = await fetchAnimeData(searchInput);
            if (results) {
                displaySearchResults(results);
            } else {
                console.error('No results found.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });


    function fetchTopAiringAnime() {
        const query = `
            query {
                Page(page: 1, perPage: 6) {
                    media(type: ANIME, format: TV, status: RELEASING, sort: POPULARITY_DESC) {
                        id
                        title {
                            romaji
                            english
                            native
                        }
                        coverImage {
                            large
                        }
                        description
                    }
                }
            }
        `;

        fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query })
        })
        .then(response => response.json())
        .then(data => {
            const animeList = data.data.Page.media;
            displayTopAiringAnime(animeList);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    
    fetchTopAiringAnime();

    // function displayAnime(animeList) {
    //     const animeSection = document.getElementById("cardSectionTwo");
    //     animeSection.innerHTML = ''; // Clear previous content

    //     animeList.forEach(anime => {
    //         const animeCard = document.createElement("div");
    //         animeCard.className = "col"; // Adjust the classes as needed
    //         animeCard.innerHTML = `
    //             <div class="card">
    //                 <a href="">
    //                     <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}"
    //                 </a>
    //                 <div class="bg-dark">
    //                     <div class="row row-cols-sm-2 animeFooter">
    //                         <h3 class="w-75 animeName">${anime.title.romaji}</h3>
    //                         <div class="w-25" >
    //                             <a href="" id="bookmarkCardIcon">
    //                                 <i class="bi bi-file-plus"></i>
    //                             </a>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         `;
    //         animeSection.appendChild(animeCard);
    //     });
    // }
    function fetchUpcomingAnime() {
        const query = `
            query {
                Page(perPage: 6) {
                    media(status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
                        id
                        title {
                            romaji
                        }
                        coverImage {
                            large
                        }
                    }
                }
            }
        `;

        fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query })
        })
        .then(response => response.json())
        .then(data => {
            const animeList = data.data.Page.media;
            displayUpcomingAnime(animeList);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    // async function fetchUpcomingAnime() {
    //     const query = `
    //         query {
    //             Page(perPage: 6) {
    //                 media(status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
    //                     id
    //                     title {
    //                         romaji
    //                     }
    //                     coverImage {
    //                         large
    //                     }
    //                 }
    //             }
    //         }
    //     `;
    
    //     console.log('Fetching upcoming anime...');
    //     console.log('GraphQL Query:', query);
    
    //     try {
    //         const response = await fetch('https://graphql.anilist.co', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 query: query,
    //             }),
    //         });
    
    //         console.log('Response received:', response);
    
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    
    //         const data = await response.json();
            
    //         if (data.errors) {
    //             throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
    //         }
    
    //         const upcomingAnimeList = data.data.Page.media;
    
    //         console.log('Upcoming anime data:', upcomingAnimeList);
    
    //         // Call displayAnime function with the upcoming anime list
    //         displayUpcomingAnime(upcomingAnimeList);
    
    //     } catch (error) {
    //         console.error('Error fetching upcoming anime:', error);
    //     }
    // }
    
    fetchUpcomingAnime();

    function displayTopAiringAnime(animeList) {
        const animeSection = document.getElementById("cardSectionTwo");
        animeSection.innerHTML = ''; // Clear previous content

        animeList.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.className = "col col-12 col-md-6 col-lg-2 mb-4"; // Adjust the classes as needed
            animeCard.innerHTML = `
                <div class="card">
                    <a href="">
                        <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}">
                    </a>
                    <div class="bg-dark">
                        <div class="animeFooter">
                            <h3 class="animeName">${anime.title.romaji}</h3>
                            <div class="bookmark-icon">
                                <a href="" id="bookmarkCardIcon" data-anime-id="${anime.id}">
                                    <i class="bi bi-file-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            animeSection.appendChild(animeCard);

            const bookmarkButton = animeCard.querySelector('#bookmarkCardIcon');
            bookmarkButton.addEventListener('click', (event) => {
                event.preventDefault();
                toggleBookmark(anime.id);
            });

        });
    }
    // <div class="card">
    //     <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}">
    //     <div class="card-body">
    //         <h5 class="card-title">${anime.title.romaji}</h5>
    //         <p class="card-text">${anime.description ? anime.description.substring(0, 100) + '...' : 'No description available'}</p>
    //     </div>
    // </div>

    function displayUpcomingAnime(animeList) {
        const animeSection = document.getElementById("cardSectionThree");
        animeSection.innerHTML = ''; // Clear previous content

        animeList.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.className = "col col-12 col-md-6 col-lg-2 mb-4"; // Adjust the classes as needed
            animeCard.innerHTML = `
                <div class="card">
                    <a href="">
                        <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}">
                    </a>
                    <div class="bg-dark">
                        <div class="animeFooter">
                            <h3 class="animeName">${anime.title.romaji}</h3>
                            <div class="bookmark-icon">
                                <a href="" id="bookmarkCardIcon" data-anime-id="${anime.id}">
                                    <i class="bi bi-file-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            animeSection.appendChild(animeCard);

            const bookmarkButton = animeCard.querySelector('#bookmarkCardIcon');
            bookmarkButton.addEventListener('click', (event) => {
                event.preventDefault();
                toggleBookmark(anime.id);
            });
        });
    }


    function fetchTopPopularAllTimeAnime() {
        const query = `
            query {
                Page(perPage: 6) {
                    media(sort:  POPULARITY_DESC) {
                        id
                        title {
                            romaji
                        }
                        coverImage {
                            large
                        }
                    }
                }
            }
        `;

        fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query })
        })
        .then(response => response.json())
        .then(data => {
            const animeList = data.data.Page.media;
            displayTopPopularAllTimeAnime(animeList);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    fetchTopPopularAllTimeAnime();

    function displayTopPopularAllTimeAnime(animeList) {
        const animeSection = document.getElementById("cardSectionFour");
        animeSection.innerHTML = ''; // Clear previous content

        animeList.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.className = "col col-12 col-md-6 col-lg-2 mb-4"; // Adjust the classes as needed
            animeCard.innerHTML = `
                <div class="card">
                    <a href="">
                        <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}">
                    </a>
                    <div class="bg-dark">
                        <div class="animeFooter">
                            <h3 class="animeName">${anime.title.romaji}</h3>
                            <div class="bookmark-icon">
                                <a href="" id="bookmarkCardIcon" data-anime-id="${anime.id}">
                                    <i class="bi bi-file-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            animeSection.appendChild(animeCard);

            const bookmarkButton = animeCard.querySelector('#bookmarkCardIcon');
            bookmarkButton.addEventListener('click', (event) => {
                event.preventDefault();
                toggleBookmark(anime.id);
            });
        });
    }


    function displayTopPopularAllTimeAnime(animeList) {
        const animeSection = document.getElementById("cardSectionFour");
        animeSection.innerHTML = ''; // Clear previous content

        animeList.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.className = "col col-12 col-md-6 col-lg-2 mb-4"; // Adjust the classes as needed
            animeCard.innerHTML = `
                <div class="card">
                    <a href="">
                        <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}">
                    </a>
                    <div class="bg-dark">
                        <div class="animeFooter">
                            <h3 class="animeName">${anime.title.romaji}</h3>
                            <div class="bookmark-icon">
                                <a href="" id="bookmarkCardIcon" data-anime-id="${anime.id}">
                                    <i class="bi bi-file-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            animeSection.appendChild(animeCard);

            const bookmarkButton = animeCard.querySelector('#bookmarkCardIcon');
            bookmarkButton.addEventListener('click', (event) => {
                event.preventDefault();
                toggleBookmark(anime.id);
            });
        });
    }


    function toggleBookmark(animeId) {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
        if (bookmarks.includes(animeId)) {
            bookmarks = bookmarks.filter(id => id !== animeId);
        } else {
            bookmarks.push(animeId);
        }
    
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
        // Update UI (you can add visual feedback here)
        updateBookmarkUI();
    }
    
    // Function to update UI based on bookmark status (simple example)
    function updateBookmarkUI() {
        const bookmarkedAnimeIds = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
        const bookmarkButtons = document.querySelectorAll('#bookmarkCardIcon');
        bookmarkButtons.forEach(button => {
            const animeId = parseInt(button.getAttribute('data-anime-id'));
            if (bookmarkedAnimeIds.includes(animeId)) {
                button.innerHTML = '<i class="bi bi-file-plus-fill"></i>';
            } else {
                button.innerHTML = '<i class="bi bi-file-plus"></i>';
            }
        });
    }
    // updateBookmarkUI();
    
    // Example usage:
    // Fetch and display upcoming anime
    // async function fetchAndDisplayAnime() {
    //     try {
    //         const bookmarkedAnimeList = await fetchBookmarkedAnimeData();
    //         displayBookmarkedAnime(bookmarkedAnimeList);
    //     } catch (error) {
    //         console.error('Error fetching upcoming anime:', error);
    //     }
    // }
    
    // // Initial call to fetch and display anime
    // fetchAndDisplayAnime();

    function bookmarkedID(){
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

        let empty = true;
        if(JSON.stringify(bookmarks) === '[]'){
            console.log(bookmarks + " <---bookmarks")
            displayBookmarkedAnime(empty);
            // displayBookmarkedAnimeInBookmark(empty);
        }
        else{
            for (const [key, value] of Object.entries(bookmarks)) {
                console.log("value =" + value)
                fetchBookmarkedAnimeData(value);
            }
        }
    }

    // async function bookmarkedID() {
    //     let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    //     if (Object.keys(bookmarks).length === 0) {
    //         displayBookmarkedAnime(true); // Display no bookmarks message
    //         displayBookmarkedAnimeInBookmark(true);
    //         return;
    //     }
    
    //     try {
    //         const fetchPromises = Object.values(bookmarks).map(value => fetchBookmarkedAnimeData(value));
    //         await Promise.all(fetchPromises);
    //     } catch (error) {
    //         console.error('Error fetching bookmarked anime:', error);
    //     }
    // }
    // function bookmarkedID() {
    //     let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    //     let empty = true;
    
    //     if (bookmarks.length === 0) {
    //         displayBookmarkedAnime(empty);
    //         return;
    //     }
    
    //     // Array to store promises of fetching anime data
    //     const fetchPromises = [];
    
    //     bookmarks.forEach(bookmark => {
    //         fetchPromises.push(fetchBookmarkedAnimeData(bookmark));
    //     });
    
    //     // Resolve all promises and handle them together
    //     Promise.all(fetchPromises)
    //         .then(animeDataArray => {
    //             // animeDataArray will be an array of anime data fetched
    //             animeDataArray.forEach(animeData => {
    //                 displayBookmarkedAnime(animeData);
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error fetching anime data:', error);
    //         });
    // }
    

    bookmarkedID();

    // async function fetchBookmarkedAnimeData(IdQuery) {
    //     const query= `
    //         query ($id: Int) {
    //             Media(id: $id, type: ANIME) {
    //                 id
    //                 title {
    //                     romaji
    //                 }
    //                 description
    //                 coverImage {
    //                     large
    //                 }
    //             }
    //         }
    //     `;

    //     console.log(IdQuery)

    //     const variables = {
    //         id: IdQuery
    //     }
    //     console.log("variable is: " + variables)
        
    //     fetch('https://graphql.anilist.co', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             query: query,
    //             variables: variables 
    //         })
    //     })
    //     .then(response =>{
    //         console.log(response);
    //         return response.json()
    //     })
    //     .then(data => {
    //         const animeList = data.data.Media;
    //         console.log(animeList);
    //         // fetchBookmarkedAnimeData(animeList);
    //         displayBookmarkedAnime(animeList);
    //         displayBookmarkedAnimeInBookmark(animeList);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching data:', error);
    //     });
    // }
    async function fetchBookmarkedAnimeData(IdQuery) {
        
        
        const query = `
            query ($id: Int) {
                Media(id: $id, type: ANIME) {
                    id
                    title {
                        romaji
                    }
                    description
                    coverImage {
                        large
                    }
                }
            }
        `;
    
        console.log(IdQuery);
    
        const variables = {
            id: IdQuery
        };
        console.log("variable is: " + JSON.stringify(variables));
    
        fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables 
            })
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            const anime = data.data.Media;
            // console.log("Log of the anime: "+ anime);
            const animeList = []
            animeList.push(anime);
            console.log(JSON.stringify(animeList));
            displayBookmarkedAnime(anime); // Pass the single anime object as an array
            displayBookmarkedAnimeInBookmark(anime);
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    // async function fetchBookmarkedAnimeData(IdQuery) {
    //     const query = `
    //         query ($id: Int) {
    //             Media(id: $id, type: ANIME) {
    //                 id
    //                 title {
    //                     romaji
    //                 }
    //                 description
    //                 coverImage {
    //                     large
    //                 }
    //             }
    //         }
    //     `;
    
    //     console.log(IdQuery);
    
    //     const variables = {
    //         id: IdQuery
    //     };
    //     console.log("variable is: " + JSON.stringify(variables));
    
    //     try {
    //         const response = await fetch('https://graphql.anilist.co', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 query: query,
    //                 variables: variables 
    //             })
    //         });
    
    //         const data = await response.json();
    //         const anime = data.data.Media;
    //         console.log("Log of the anime: " + JSON.stringify(anime));
    //         // return anime; // Return the fetched anime object
    //         displayBookmarkedAnime(anime);
        
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         return null; // Return null if there's an error
    //     }
    // }


    // async function fetchBookmarkedAnimeData(IdQuery) {
    //     const query = `
    //         query ($id: Int) {
    //             Media(id: $id, type: ANIME) {
    //                 id
    //                 title {
    //                     romaji
    //                 }
    //                 description
    //                 coverImage {
    //                     large
    //                 }
    //             }
    //         }
    //     `;
    
    //     const variables = {
    //         id: IdQuery
    //     };
    
    //     try {
    //         const response = await fetch('https://graphql.anilist.co', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 query: query,
    //                 variables: variables 
    //             })
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    
    //         const data = await response.json();
    //         const anime = data.data.Media;
    
    //         return anime; // Resolve with fetched anime data
    
    //     } catch (error) {
    //         console.error('Error fetching anime data:', error);
    //         throw error; // Propagate the error
    //     }
    // }
    
    

    function displayBookmarkedAnime(animeList) {
        const bookmarkSection = document.getElementById('sectionOneOuterShell');
        bookmarkSection.innerHTML = '';

        

        // const animeSection = document.getElementById("cardSectionOne");
         // Clear previous content
        console.log(animeList);
        if(animeList === true || !Array.isArray(animeList)){
            bookmarkSection.innerHTML = ''
            const div = document.createElement("div");
            div.className = "noBookmarks";
            
            div.innerHTML = `
                <h5>No Bookmarks Available</h5>
                `;
            bookmarkSection.appendChild(div);
            return;
        }
        else{
            const containerDiv = document.createElement("div");
            containerDiv.className = "row row-cols-1 row-cols-md-5 g-4"
            containerDiv.setAttribute('id', "cardSectionOne");
            bookmarkSection.appendChild(containerDiv)
            containerDiv.innerHTML = '';
        }

        // if (!Array.isArray(animeList)) {
        //     animeList = [animeList]; // Convert to an array with one item
        // }

        // animeList.forEach(anime => {
        //     const animeCard = document.createElement("div");
        //     animeCard.className = "col col-12 col-md-6 col-lg-2 mb-4"; // Adjust the classes as needed
        //     animeCard.innerHTML = `
        //         <div class="card">
        //             <a href="">
        //                 <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}">
        //             </a>
        //             <div class="bg-dark">
        //                 <div class="animeFooter">
        //                     <h3 class="animeName">${anime.title.romaji}</h3>
        //                     <div class="bookmark-icon">
        //                         <a href="" id="bookmarkCardIcon" data-anime-id="${anime.id}">
        //                             <i class="bi bi-file-plus"></i>
        //                         </a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     `;
        //     animeSection.appendChild(animeCard);

        //     const bookmarkButton = animeCard.querySelector('#bookmarkCardIcon');
        //     bookmarkButton.addEventListener('click', (event) => {
        //         event.preventDefault();
        //         toggleBookmark(anime.id);
        //     });
        // });

        

        animeList.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.className = "col col-12 col-md-6 col-lg-2 mb-4"; // Adjust the classes as needed
            animeCard.innerHTML = `
                <div class="card">
                    <a href="">
                        <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}">
                    </a>
                    <div class="bg-dark">
                        <div class="animeFooter">
                            <h3 class="animeName">${anime.title.romaji}</h3>
                            <div class="bookmark-icon">
                                <a href="" id="bookmarkCardIcon" data-anime-id="${anime.id}">
                                    <i class="bi bi-file-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            containerDiv.appendChild(animeCard);

            const bookmarkButton = animeCard.querySelector('#bookmarkCardIcon');
            bookmarkButton.addEventListener('click', (event) => {
                event.preventDefault();
                toggleBookmark(anime.id);
            });
        });


        // const animeCard = document.createElement("div");
        // animeCard.className = "col col-12 col-md-6 col-lg-2 mb-4"; // Adjust the classes as needed
        // animeCard.innerHTML = `
        //     <div class="card">
        //         <a href="">
        //             <img src="${animeList.coverImage.large}" class="card-img-top" alt="${animeList.title.romaji}">
        //         </a>
        //         <div class="bg-dark">
        //             <div class="animeFooter">
        //                 <h3 class="animeName">${animeList.title.romaji}</h3>
        //                 <div class="bookmark-icon">
        //                     <a href="" id="bookmarkCardIcon" data-anime-id="${animeList.id}">
        //                         <i class="bi bi-file-plus"></i>
        //                     </a>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // `;
        // animeSection.appendChild(animeCard);

        // const bookmarkButton = animeCard.querySelector('#bookmarkCardIcon');
        // bookmarkButton.addEventListener('click', (event) => {
        //     event.preventDefault();
        //     toggleBookmark(animeList.id);
        // });
    
    }


    function displayBookmarkedAnimeInBookmark(animeList) {
        const animeSection = document.getElementById("bookmarkSection");
        animeSection.innerHTML = ''; // Clear previous content
        console.log(animeList);
        if(animeList === true || !Array.isArray(animeList)){
            const div = document.createElement("div");
            div.className = "noBookmarks";
            
            div.innerHTML = `
                <h5>No Bookmarks Available</h5>
                `;
            animeSection.appendChild(div);
            return;
        }

        // animeList.forEach(anime => {
        //     const animeCard = document.createElement("div");
        //     animeCard.className = "col col-12 col-md-6 col-lg-2 mb-4"; // Adjust the classes as needed
        //     animeCard.innerHTML = `
        //         <div class="card">
        //             <a href="">
        //                 <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}">
        //             </a>
        //             <div class="bg-dark">
        //                 <div class="animeFooter">
        //                     <h3 class="animeName">${anime.title.romaji}</h3>
        //                     <div class="bookmark-icon">
        //                         <a href="" id="bookmarkCardIcon" data-anime-id="${anime.id}">
        //                             <i class="bi bi-file-plus"></i>
        //                         </a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     `;
        //     animeSection.appendChild(animeCard);

        //     const bookmarkButton = animeCard.querySelector('#bookmarkCardIcon');
        //     bookmarkButton.addEventListener('click', (event) => {
        //         event.preventDefault();
        //         toggleBookmark(anime.id);
        //     });
        // });
    
        const animeCard = document.createElement("div");
        animeCard.className = "col col-12 col-md-6 col-lg-2 mb-4"; // Adjust the classes as needed
        animeCard.innerHTML = `
            <div class="card">
                <a href="">
                    <img src="${animeList.coverImage.large}" class="card-img-top" alt="${animeList.title.romaji}">
                </a>
                <div class="bg-dark">
                    <div class="animeFooter">
                        <h3 class="animeName">${animeList.title.romaji}</h3>
                        <div class="bookmark-icon">
                            <a href="" id="bookmarkCardIcon" data-anime-id="${animeList.id}">
                                <i class="bi bi-file-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        animeSection.appendChild(animeCard);

        const bookmarkButton = animeCard.querySelector('#bookmarkCardIcon');
        bookmarkButton.addEventListener('click', (event) => {
            event.preventDefault();
            toggleBookmark(animeList.id);
        });
    }

    document
        .getElementById("viewAllOne")
        .addEventListener("click", () => {
            navigate("bookmarkView");
        });
            

});
