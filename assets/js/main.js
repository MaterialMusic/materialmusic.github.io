var playlists = [
{
	name: "In A Perfect World",
	artist: "Kodaline",
	icon: "assets/imgs/playlists/inaperfectworld.jpeg",
	songs: [
		{
			name: "High Hopes",
			file: "assets/audio/highhopes.mp3"
		},
		{
			name: "In A Perfect World",
			file: "assets/audio/inaperfectworld.mp3"
		},
		{
			name: "Way Back When",
			file: "assets/audio/waybackwhen.mp3"
		}
	]
},
{
	name: "Nine Track Mind",
	artist: "Charlie Puth",
	icon: "assets/imgs/playlists/ninetrackmind.jpg",
	songs: [
		{
			name: "One Call Away",
			file: "assets/audio/onecallaway.mp3"
		},
		{
			name: "See You Again - from \"Furios 7\"",
			file: "assets/audio/seeyouagain.mp3"
		},
		{
			name: "We Dont Talk Anymore",
			file: "assets/audio/wedonttalkanymore.mp3"
		}
	]
},
{
	name: "Purpose (Deluxe)",
	artist: "Justin Bieber",
	icon: "assets/imgs/playlists/purposedeluxe.jpg",
	songs: [
		{
			name: "Sorry",
			file: "assets/audio/sorrypurposejb.mp3"
		},
		{
			name: "Love Yourself",
			file: "assets/audio/loveyourselfjb.mp3"
		},
		{
			name: "What Do You Mean?",
			file: "assets/audio/whatdoyoumeanjb.mp3"
		}
	]
},
{
	name: "Love Like This",
	artist: "Kodaline",
	icon: "assets/imgs/playlists/lovelikethis.jpg",
	songs: [
		{
			name: "Love Like This",
			file: "assets/audio/lovelikethis.mp3"
		},
		{
			name: "What it is",
			file: "assets/audio/whatitis.mp3"
		},
		{
			name: "Midnight",
			file: "assets/audio/midnightkodaline.mp3"
		}
	]
},
{
	name: "Cloud Nine",
	artist: "Kygo",
	icon: "assets/imgs/playlists/cloudnine.jpg",
	songs: [
		{
			name: "Raging",
			file: "assets/audio/ragingkygo.mp3"
		},
		{
			name: "Stay",
			file: "assets/audio/staykygo.mp3"
		},
		{
			name: "Fragile",
			file: "assets/audio/fragilekygo.mp3"
		}
	]
}
];

var musicFile;
function playAudio(file){
	musicFile = new Audio(file);
	musicFile.play();
}

function closebtn(){
	$(".fullalbum").removeClass("visible");
	$(".shader").removeClass("visible");
}

function loadSongs(pos){
	var songs = playlists[pos]["songs"];
	$(".fullalbum-title").html(playlists[pos]["name"]);
	$(".fullalbum .thumbnail").attr("src", playlists[pos].icon);
	$(".fullalbum .collection").empty();
	for (var i = songs.length - 1; i >= 0; i--) {
		$(".fullalbum .collection").append('<li class="collection-item"><a href="javascript:playAudio(\''+songs[i].file+'\');">'+songs[i]["name"]+'</a></li>');
	};
}

function albummake(i){
	return function(){
		loadSongs(i);
		$(".fullalbum").toggleClass("visible");
		$(".shader").toggleClass("visible");
	};
}

function loadAlbum(i){
	loadSongs(i);
	$(".fullalbum").toggleClass("visible");
	$(".shader").toggleClass("visible");
}

function checkSearch(){
	var search = document.querySelector("#search-box").value;
	var searchResults = [];

	if(search != ""){
		for (var i = playlists.length - 1; i >= 0; i--) {
			if(search.toLowerCase() == playlists[i]["name"].toLowerCase() || search.toLowerCase() == playlists[i]["name"].substr(0, search.length).toLowerCase()){
				searchResults.push({
					type: "playlist",
					name: playlists[i]["name"],
					artist: playlists[i]["artist"],
					id: i
				});
			};
			for (var j = playlists[i].songs.length - 1; j >= 0; j--) {
				song = playlists[i].songs[j];
				if(search.toLowerCase() == song["name"].toLowerCase() || search.toLowerCase() == song["name"].substr(0, search.length).toLowerCase()){
					searchResults.push({
						type: "song",
						name: song["name"],
						playlist: playlists[i],
						artist: playlists[i].artist,
						playlistId: i,
						id: j
					});
				};
			};
		};
	} else {
		$(".results").empty();
	};

	// console.log(searchResults);
	if(searchResults != []){
		var html = "<ul class='collection'>";
		var result;
		for (var i = searchResults.length - 1; i >= 0; i--) {
			result = searchResults[i];
			if(result["type"] == "song"){
				html += "<li class='collection-item result'><a class='result-name' href='javascript:loadAlbum(\""+result["playlistId"]+"\");'>"+result["name"]+"</a> <span class='full-type'>type: <span class='result-type'>"+result["type"]+"</span></span>";
			} else if(result["type"] == "playlist"){
				html += "<li class='collection-item result'><a class='result-name' href='javascript:loadAlbum(\""+result["id"]+"\");'>"+result["name"]+"</a> <span class='full-type'>type: <span class='result-type'>"+result["type"]+"</span></span>";
			};
		};
		$(".results").html(html);
	} else {
		$(".results").empty();
	};
}

function checkEmpty(){
	var search = document.querySelector("#search-box").value;
	if(search == ""){
		$(".results").empty();
	}
};

$(document).ready(function(){
	$("#search-box").keyup(checkSearch);
	for (var i = playlists.length - 1; i >= 0; i--) {
		album = playlists[i];
		name = album["name"];
		var extraclasses = "";
		if(i==0){
			extraclasses = " active";
		}
		$('.carousel').append('<a class="carousel-item album album'+i+extraclasses+'"><img src="'+album.icon+'"><h3 class="artist">'+album.artist+'</h3><h3 class="album-title">'+name+'</h3><h3 class="see">View</h3></a>');
		$('.album'+i+" .see").click(albummake(i));
	};
	$('.carousel').carousel();
	setInterval(checkEmpty,0);
});