
import { VARIABLES } from '../../data/ENV.js';
import toSearchQuery from './toSearchQuery';
import toParsedArray from './toParsedArray';

const API_SEARCHARTIST_URL = `${VARIABLES.API_HOST}:${VARIABLES.API_PORT}${VARIABLES.BASENAME}/spotifyapi/searchartist`;
const API_SEARCHALBUM_URL = `${VARIABLES.API_HOST}:${VARIABLES.API_PORT}${VARIABLES.BASENAME}/spotifyapi/searchalbum`;
const API_SEARCHTRACK_URL = `${VARIABLES.API_HOST}:${VARIABLES.API_PORT}${VARIABLES.BASENAME}/spotifyapi/searchtrack`;

export default async function callSpotifyAPI(inputText, resultsQuota) {
	var searchQuery = toSearchQuery(inputText);
	var queryObj = { 
		query : searchQuery,
		resultsLimit: resultsQuota 
	};

	var artistArr = [];
	var albumArr = [];
	var trackArr = [];

	// Search for artist
	let responseArt = await fetch(API_SEARCHARTIST_URL, {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseArtJson = await responseArt.json();

	artistArr = toParsedArray('artist', await responseArtJson);
/*
	artistArr.forEach(item => {
		alert("URL: " + item.url + '\n' +
			"name: " + item.name
		);
	})
	*/
	// Search for album
	let responseAlb = await fetch(API_SEARCHALBUM_URL, {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseAlbJson = await responseAlb.json();
	
	albumArr = toParsedArray('album', responseAlbJson);

	// Search for track
	let responseTra = await fetch(API_SEARCHTRACK_URL, {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseTraJson = await responseTra.json();

	trackArr = toParsedArray('track', responseTraJson);

	return { artist: artistArr, album: albumArr, track: trackArr };
}