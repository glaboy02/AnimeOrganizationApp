/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    function navigate(viewId) {\r\n      // Hide all views\r\n    document.querySelectorAll(\".view\").forEach((view) => {\r\n    view.style.display = \"none\";\r\n    });\r\n\r\n    // Show the requested view\r\n    document.getElementById(viewId).style.display = \"block\";\r\n\r\n    window.scrollTo({ top: 0, behavior: 'smooth' });\r\n\r\n\r\n\r\n\r\n    // Function to fetch anime data from the API\r\nasync function fetchAnimeData(animeName) {\r\n    const query = `\r\n    query ($search: String) {\r\n        Media(search: $search, type: ANIME) {\r\n            id\r\n            title {\r\n                romaji\r\n                english\r\n                native\r\n            }\r\n            description\r\n            coverImage {\r\n                large\r\n            }\r\n        }\r\n    }\r\n    `;\r\n\r\n    const variables = {\r\n        search: animeName\r\n    };\r\n\r\n    const url = 'https://graphql.anilist.co';\r\n\r\n    const response = await fetch(url, {\r\n        method: 'POST',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n            'Accept': 'application/json',\r\n        },\r\n        body: JSON.stringify({\r\n            query: query,\r\n            variables: variables\r\n        })\r\n    });\r\n\r\n    const data = await response.json();\r\n    return data.data.Media;\r\n}\r\n// Function to display search results in the results view\r\nfunction displaySearchResults(results) {\r\n    const searchResultsContainer = document.getElementById('searchResultsContainer');\r\n    console.log(results)\r\n    // Check if searchResultsContainer exists\r\n    if (!searchResultsContainer) {\r\n        console.error(\"Element with ID 'searchResultsContainer' not found.\");\r\n        return;\r\n    }\r\n\r\n    // Clear previous results\r\n    searchResultsContainer.innerHTML = '';\r\n\r\n    // Check if results is an object and has the data we need\r\n    if (!results || !results.coverImage || !results.coverImage.large) {\r\n        console.error('Results is not in the expected format:', results);\r\n        return;\r\n    }\r\n\r\n    // Create a card for the single result\r\n    const card = document.createElement('div');\r\n    card.classList.add('col');\r\n    card.innerHTML = `\r\n        <div class=\"card\">\r\n            <img src=\"${results.coverImage.large}\" class=\"card-img-top\" alt=\"${results.title.romaji}\">\r\n            <div class=\"card-body\">\r\n                <h5 class=\"card-title\">${results.title.romaji}</h5>\r\n                <p class=\"card-text\">${results.description}</p>\r\n            </div>\r\n        </div>\r\n    `;\r\n    searchResultsContainer.appendChild(card);\r\n\r\n    // Navigate to the search results view\r\n    navigate('searchResultsView');\r\n}\r\n\r\n// Event listener for the search button\r\nconst searchButton = document.getElementById('searchButton');\r\nsearchButton.addEventListener('click', async function() {\r\n    const searchInput = document.getElementById('searchBar').value.trim();\r\n    if (searchInput === '') {\r\n        console.error('Search input cannot be empty.');\r\n        return;\r\n    }\r\n\r\n    try {\r\n        const results = await fetchAnimeData(searchInput);\r\n        if (results) {\r\n            displaySearchResults(results);\r\n        } else {\r\n            console.error('No results found.');\r\n        }\r\n    } catch (error) {\r\n        console.error('Error fetching data:', error);\r\n    }\r\n});\r\n\r\n\r\n\r\n\r\n\r\n\r\n}\r\n\r\ndocument\r\n    .getElementById(\"home\")\r\n    .addEventListener(\"click\", () => navigate(\"homeView\"));\r\ndocument\r\n    .getElementById(\"bookmark\")\r\n    .addEventListener(\"click\", () => navigate(\"bookmarkView\"));\r\n\r\ndocument\r\n    .getElementById(\"account\")\r\n    .addEventListener(\"click\", () => {\r\n        const info = document.querySelector('.info');\r\n\r\n        if(getComputedStyle(info).textDecorationLine !== 'line-through'){\r\n            navigate(\"accountView\")\r\n        }\r\n    });\r\n\r\ndocument\r\n    .getElementById(\"plus\")\r\n    .addEventListener(\"click\", () => {\r\n        const info = document.querySelector('.info');\r\n        return info.removeAttribute('style');\r\n    });\r\n\r\ndocument\r\n    .getElementById(\"minus\")\r\n    .addEventListener(\"click\", () => {\r\n        const info = document.querySelector('.info');\r\n        return info.setAttribute(\r\n            'style',\r\n            'text-decoration: line-through'\r\n        );\r\n    });\r\n\r\n    \r\ndocument\r\n    .getElementById(\"signInGo\")\r\n    .addEventListener(\"click\", () => {\r\n        console.log('Go Button clicked')\r\n        navigate(\"accountView\")\r\n    });\r\n\r\ndocument\r\n    .getElementById(\"signUpGo\")\r\n    .addEventListener(\"click\", () => navigate(\"accountView\"));\r\n\r\n// document\r\n//     .getElementsByClassName(\"bi-file-plus\")\r\n//     .addEventListener(\"click\", () => navigate(\"accountView\"));\r\n\r\n// document\r\n//     .getElementById(\"animeCardLink\")\r\n//     .addEventListener(\"click\", () => navigate(\"bookmarkView\"));\r\n\r\ndocument.getElementById(\"animeCardLink\").addEventListener(\"click\", (event) => {\r\n    event.preventDefault(); // Prevent default anchor tag behavior\r\n    navigate(\"bookmarkView\");\r\n});\r\ndocument.getElementById(\"bookmarkCardIcon\").addEventListener(\"click\", (event) => {\r\n    event.preventDefault(); // Prevent default anchor tag behavior\r\n    navigate(\"accountView\");\r\n});\r\n\r\n// Initialize with the home view\r\nnavigate(\"homeView\");\r\n\r\n// Assuming your images are within a container with the class\r\n'image-container'\r\ndocument.querySelectorAll(\".image-container img\").forEach((img) => {\r\n    img.addEventListener(\"click\", function () {\r\n    const parent = this.parentNode;\r\n    parent.insertBefore(this, parent.firstChild); // Move the clicked image to the beginning\r\n    });\r\n});\r\n\r\n});\r\n\r\n// import Anilist from '/anilist-node';\r\n\r\n// const anilist = new Anilist();\r\n\r\n// // Anilist.searchEntries.anime()\r\n// // anilist.media.anime(21708).then(data => {\r\n// //     console.log(data);\r\n// // });\r\n\r\n// anilist.people.character(126156).then(data => { console.log(data); });\r\n\r\n// // Or await it!\r\n// const data = await anilist.people.character(126156);\r\n// console.log(data);\r\n\r\n// async function fetchCharacterData(characterId) {\r\n//     const query = `\r\n//     query ($id: Int) {\r\n//         Character(id: $id) {\r\n//             id\r\n//             name {\r\n//                 first\r\n//                 last\r\n//                 native\r\n//             }\r\n//             description\r\n//             image {\r\n//                 large\r\n//             }\r\n//         }\r\n//     }\r\n//     `;\r\n\r\n//     const variables = {\r\n//         id: characterId\r\n//     };\r\n\r\n//     const url = 'https://graphql.anilist.co';\r\n\r\n//     const response = await fetch(url, {\r\n//         method: 'POST',\r\n//         headers: {\r\n//             'Content-Type': 'application/json',\r\n//             'Accept': 'application/json',\r\n//         },\r\n//         body: JSON.stringify({\r\n//             query: query,\r\n//             variables: variables\r\n//         })\r\n//     });\r\n\r\n//     const data = await response.json();\r\n//     return data.data.Character;\r\n// }\r\n\r\n// async function displayCharacterData(characterId) {\r\n//     const characterData = await fetchCharacterData(characterId);\r\n//     // const characterDiv = document.getElementById('character-data');\r\n//     // characterDiv.innerHTML = `\r\n//     //     <h2>${characterData.name.first} ${characterData.name.last}</h2>\r\n//     //     <p>${characterData.description}</p>\r\n//     //     <img src=\"${characterData.image.large}\" alt=\"${characterData.name.first}\">\r\n//     // `;\r\n//     console.log(characterData);\r\n// }\r\n\r\n// // Fetch and display character data for a specific character ID\r\n// displayCharacterData(126156);\r\n\r\n// \r\n\r\n\r\n\r\n// async function fetchAnimeData(animeName) {\r\n//     const query = `\r\n//     query ($search: String) {\r\n//         Media(search: $search, type: ANIME) {\r\n//             id\r\n//             title {\r\n//                 romaji\r\n//                 english\r\n//                 native\r\n//             }\r\n//             description\r\n//             coverImage {\r\n//                 large\r\n//             }\r\n//         }\r\n//     }\r\n//     `;\r\n\r\n//     const variables = {\r\n//         search: animeName\r\n//     };\r\n\r\n//     const url = 'https://graphql.anilist.co';\r\n\r\n//     const response = await fetch(url, {\r\n//         method: 'POST',\r\n//         headers: {\r\n//             'Content-Type': 'application/json',\r\n//             'Accept': 'application/json',\r\n//         },\r\n//         body: JSON.stringify({\r\n//             query: query,\r\n//             variables: variables\r\n//         })\r\n//     });\r\n\r\n//     const data = await response.json();\r\n//     return data.data.Media;\r\n// }\r\n\r\n// async function displayAnimeData(animeName) {\r\n//     const animeData = await fetchAnimeData(animeName);\r\n//     // const animeDiv = document.getElementById('anime-data');\r\n//     // animeDiv.innerHTML = `\r\n//     //     <h2>${animeData.title.romaji}</h2>\r\n//     //     <h3>${animeData.title.english ? animeData.title.english : ''}</h3>\r\n//     //     <p>${animeData.description}</p>\r\n//     //     <img src=\"${animeData.coverImage.large}\" alt=\"${animeData.title.romaji}\">\r\n//     // `;\r\n\r\n//     console.log(animeData)\r\n// }\r\n\r\n// document.getElementById(\"searchButton\").addEventListener('click', () => {\r\n    \r\n\r\n//     console.log(displayAnimeData(document.getElementById(\"searchBar\").value))\r\n// })\r\n\r\n\r\n\r\n\r\n// Update the click event for the search button to display search results\r\n// document.getElementById(\"searchButton\").addEventListener('click', async () => {\r\n//     const searchTerm = document.getElementById(\"searchBar\").value;\r\n//     if (searchTerm.trim() === \"\") return;\r\n\r\n//     const searchResults = await fetchAnimeData(searchTerm);\r\n//     displaySearchResults(searchResults);\r\n// });\r\n\r\n\r\n\r\n\r\n// Function to display search results\r\n// function displaySearchResults(results) {\r\n//     const searchResultsContainer = document.getElementById('searchResultsContainer');\r\n//     searchResultsContainer.innerHTML = ''; // Clear previous results\r\n\r\n//     if (!Array.isArray(results)) {\r\n//         console.error('Results is not an array:', results);\r\n//         return;\r\n//     }\r\n\r\n//     results.forEach(result => {\r\n//         const card = document.createElement('div');\r\n//         card.classList.add('col');\r\n//         card.innerHTML = `\r\n//             <div class=\"card\">\r\n//                 <img src=\"${result.coverImage.large}\" class=\"card-img-top\" alt=\"${result.title.romaji}\">\r\n//                 <div class=\"card-body\">\r\n//                     <h5 class=\"card-title\">${result.title.romaji}</h5>\r\n//                     <p class=\"card-text\">${result.description}</p>\r\n//                 </div>\r\n//             </div>\r\n//         `;\r\n//         searchResultsContainer.appendChild(card);\r\n//     });\r\n\r\n//     // Show the search results section\r\n//     const searchResultsView = document.getElementById('searchResultsView');\r\n//     searchResultsView.style.display = 'block';\r\n// }\r\n\r\n\r\n\r\n\r\nconst animeId = 16498; // Replace with the ID of the anime you want to fetch\r\n\r\n// fetch(`https://graphql.anilist.co`, {\r\n//   method: 'POST',\r\n//   headers: {\r\n//     'Content-Type': 'application/json',\r\n//     'Accept': 'application/json',\r\n//   },\r\n//   body: JSON.stringify({\r\n//     query: `\r\n//       query ($id: Int) {\r\n//         Media(id: $id, type: ANIME) {\r\n//           id\r\n//           title {\r\n//             romaji\r\n//             english\r\n//             native\r\n//           }\r\n//           description\r\n//           coverImage {\r\n//             large\r\n//           }\r\n//         }\r\n//       }\r\n//     `,\r\n//     variables: { id: animeId }\r\n//   })\r\n// })\r\n// .then(response => response.json())\r\n// .then(data => {\r\n//   const anime = data.data.Media;\r\n//   console.log(anime)\r\n//   console.log('Title (Romaji):', anime.title.romaji);\r\n//   console.log('Title (English):', anime.title.english);\r\n//   console.log('Description:', anime.description);\r\n//   console.log('Cover Image URL:', anime.coverImage.large);\r\n// })\r\n// .catch(error => {\r\n//   console.error('Error fetching anime:', error);\r\n// });\r\n\r\n// Function to fetch anime data based on title\r\n// async function fetchAnimeData2(title) {\r\n//     try {\r\n//       const response = await fetch('https://graphql.anilist.co', {\r\n//         method: 'POST',\r\n//         headers: {\r\n//           'Content-Type': 'application/json',\r\n//           Accept: 'application/json',\r\n//         },\r\n//         body: JSON.stringify({\r\n//           query: `\r\n//             query ($search: String) {\r\n//               Media(search: $search, type: ANIME) {\r\n//                 id\r\n//                 title {\r\n//                   romaji\r\n//                   english\r\n//                   native\r\n//                 }\r\n//                 description\r\n//                 coverImage {\r\n//                   large\r\n//                 }\r\n//               }\r\n//             }\r\n//           `,\r\n//           variables: { search: title },\r\n//         }),\r\n//       });\r\n  \r\n//       const data = await response.json();\r\n//       if (data.errors) {\r\n//         throw new Error(data.errors[0].message);\r\n//       }\r\n  \r\n//       const anime = data.data;\r\n//       if (!anime) {\r\n//         throw new Error('Anime not found');\r\n//       }\r\n  \r\n//       // Log the fetched anime data\r\n//       console.log(anime)\r\n//       console.log('Title (Romaji):', anime.Media.title.romaji);\r\n//       console.log('Title (English):', anime.Media.title.english);\r\n//       console.log('Description:', anime.Media.description);\r\n//       console.log('Cover Image URL:', anime.Media.coverImage.large);\r\n//     } catch (error) {\r\n//       console.error('Error fetching anime:', error.message);\r\n//     }\r\n//   }\r\n  \r\n//   // Example usage: Fetch anime data by title \"Attack on Titan\"\r\n//   const animeTitle = 'Attack on Titan';\r\n//   fetchAnimeData2(animeTitle);\r\n\r\n\r\n\r\n// Function to search for anime by title\r\n\r\n\r\n// app.js\r\nconst Anilist = require('anilist-node');\r\nconst anilist = new Anilist();\r\n\r\nasync function searchAnimeByTitle(title) {\r\n  try {\r\n    const response = await anilist.search.entry.anime(title);\r\n    \r\n    if (!response || !response.media || response.media.length === 0) {\r\n      console.log('No anime found with that title.');\r\n      return;\r\n    }\r\n\r\n    response.media.forEach((anime) => {\r\n      console.log('Title (Romaji):', anime.title.romaji);\r\n      console.log('Title (English):', anime.title.english);\r\n      console.log('Native Title:', anime.title.native);\r\n      console.log('Description:', anime.description);\r\n      console.log('Cover Image URL:', anime.coverImage.large);\r\n      console.log('----------------------------------------');\r\n    });\r\n  } catch (error) {\r\n    console.error('Error searching for anime:', error);\r\n  }\r\n}\r\n\r\nconst animeTitle = 'Attack on Titan';\r\nsearchAnimeByTitle(animeTitle);\r\n\n\n//# sourceURL=webpack://anime_organization_app/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;