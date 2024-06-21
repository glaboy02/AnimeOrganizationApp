// import AniList from 'anilist-node';

// const anilist = new AniList();

// async function searchAnimeByTitle(title) {
//     try {
//         const response = await anilist.searchEntry.anime(title);
        
//         if (!response || !response.media || response.media.length === 0) {
//         console.log('No anime found with that title.');
//         return;
//         }

//         // Log each anime found
//         response.media.forEach((anime) => {
//         console.log('Title (Romaji):', anime.title.romaji);
//         console.log('Title (English):', anime.title.english);
//         console.log('Native Title:', anime.title.native);
//         console.log('Description:', anime.description);
//         //   console.log('Cover Image URL:', anime.coverImage.large);
//         console.log('----------------------------------------');
//         });
//     } catch (error) {
//         console.error('Error searching for anime:', error);
//     }
// }

// // Example usage: Search for anime with title "Attack on Titan"
// const animeTitle = 'Attack on Titan';
// searchAnimeByTitle(animeTitle);