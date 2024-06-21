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
    document.getElementById("bookmarkCardIcon").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor tag behavior
        navigate("accountView");
    });

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

});
