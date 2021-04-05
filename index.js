
// the variables we gonna need for this project
var obj;
var id = "";
var aname = "";
var mname = "Breaking";
var allfilms = [];
var allactors = [];
var date = "";

var input = document.getElementById("tre");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("qua").click();
  }
});
var input = document.getElementById("uno");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("dos").click();
  }
});


//fonction qui permet de recommencer si l utilisateur se trompe
let tryagain = function () {
  obj;
  id = "";
  aname = "";
  mname = "Breaking";
  allfilms = [];
  allactors = [];
  seeornot("erasor", "hidden");
  seeornot("uno", "hidden");
  seeornot("dos", "hidden");
  document.getElementById("actor_respons").innerHTML = "";
  document.getElementById("giveactor").innerHTML = "El Camino was relead the 2019-10 -07, give me an actor of this movie";
  document.getElementById("film_repons").innerHTML = "";
  document.getElementById("name_a").innerHTML = "";
  seeornot("giveactor","visible")
  seeornot("tre", "visible");
  seeornot("qua", "visible");
  seeornot("actor_show", "hidden");
  document.getElementById("movie_show").src =
    "https://image.tmdb.org/t/p/w500/ePXuKdXZuJx8hHMNr2yM4jY2L7Z.jpg";
  seeornot("movie_show", "visible");
  document.getElementById("tre").value = "";
};

//cette fonction permet de definir ou invercé la visibilité d un element selon le 2 eme parametre
("here we can decide the state of visibility of an object, visible, hidden, or inverse the state");
function seeornot(objectID, state) {
  var object = document.getElementById(objectID);
  real_state = object.style.visibility;
  if (state == "visible") object.style.visibility = "visible";
  if (state == "hidden") object.style.visibility = "hidden";
  if (state == "inverse"){
    if (real_state == "visible") object.style.visibility = "hidden";
    else object.style.visibility = "visible";
  }
}


//check the first part
let actorcheck = function (obj) {
  // la donnée renté ds le prmeier bloc
  new_actor = document.getElementById("tre").value;
    // ici on verifie que l utilisateur n a pas deja donné cette acteur
    if (allactors.includes(new_actor.toLowerCase())) 
    {
        var msg_error = "You already gave me this actor :( try again !";
        document.getElementById("actor_respons").innerHTML = msg_error.fontcolor("red");
    }
    //si il ne l a pas deja donné on rentre ds le else
    else 
    {
        //on choppe le lien de données du film (film name au debut est breaking)
        let url = "".concat(
            "https://api.themoviedb.org/3/search/movie?api_key=e4d9e1861864d0fbca5c6b61e841c203&query=",
            mname
        );
    
    //on recupere la donnée grace a l url
    fetch(url)
       //on met tt ds un json
      .then((result) => result.json())
      //ensuite on choppe la data qui nous interesse
      .then((data) => 
        {
        //premierement on choppe l img du film ds poster path
        document.getElementById("movie_show").src =
          "https://image.tmdb.org/t/p/w500/" + data.results[0].poster_path;
        //on choppe l url des info du film
        url1 = "".concat(
          "https://api.themoviedb.org/3/movie/",
          data.results[0].id,
          "?api_key=e4d9e1861864d0fbca5c6b61e841c203&append_to_response=credits"
        );
        //on met tt ds un json
        fetch(url1)
           //on met tt ds un json
          .then((res) => res.json())
           //on va chopper la data qui nous interesse
          .then((data) => {
            var z = "You got it wrong buddy ;(";
            var a = z;
            // on verif que l acteur est ds le film

            var casting = data.credits.cast;

            //on choppe aussi son id de l acteur et on dit que c bon
            if (casting.some(item => item.original_name.toLowerCase()===new_actor.toLowerCase())){
                var index_actor = casting.findIndex(std=> std.original_name.toLowerCase() === new_actor.toLowerCase());
                id = casting[index_actor].id;

                aname = new_actor;
                z = "Damn you good !";
                allactors.push(new_actor.toLowerCase());
            }
            
            // si c faux on cache et on try again
            if (z == a) {
                seeornot("tre", "hidden");
                seeornot("qua", "hidden");
                seeornot("erasor","inverse");
                seeornot("movie_show", "hidden");
              document.getElementById("giveactor").innerHTML = "";
              document.getElementById("film_repons").innerHTML = "";
              
              document.getElementById("name_a").innerHTML = "";
              document.getElementById("actor_respons").innerHTML = z.fontcolor("red");
            } 
            // snn ca marche !
            else {
                seeornot("qua", "hidden");
                actordisplay();
                document.getElementById("actor_respons").innerHTML = z;
            }
          });
        });
    }
};
//on va prendre sur l api les infos de l acteur à partir de son id recup av
let actordisplay = function () {
  
    seeornot("uno","inverse");
    seeornot("dos","inverse");
  //on trouve l url de l acteur 
  url1 = "".concat(
    "https://api.themoviedb.org/3/person/",
    id,
    "movie_credits?api_key=e4d9e1861864d0fbca5c6b61e841c203"
  );
  fetch(url1)
    //on met les infos ds un json
    .then((res) => res.json())
    .then((data) => {
      //on demande un film ds lequel l acteur a joué  
      document.getElementById("name_a").innerHTML =
        "Give me a movie in which " + aname + " played";
      //on lui montre l acteur
      document.getElementById("actor_show").src =
        "https://image.tmdb.org/t/p/w500" + data.profile_path;
        seeornot("actor_show", "visible");
    });
};
//verification de la presence ds le casting de l acteur + retour au debut
let moviecheck = function () {
  url1 = "".concat(
    "https://api.themoviedb.org/3/person/",
    id,
    "/movie_credits?api_key=e4d9e1861864d0fbca5c6b61e841c203"
  );
  fetch(url1)
    .then((res) => res.json())
    .then((data) => {
      answer = document.getElementById("uno").value;
      var verif = true;
      var new_movie = document.getElementById("uno").value.toLowerCase();
      //on verif que l'utilisateur n ai pas deja donné ce film
      if (allfilms.includes(new_movie)){
        verif = false;
      }
      if (verif == false) {
          msg_error = "You already gave me this movie :'( try again !";
        document.getElementById("film_repons").innerHTML =msg_error.fontcolor("red");
      } 
      //si c est bien un nouveau film : 
      else {
        
        var cast = data.cast;
        var check = false;
        if (cast.some(item => item.title.toLowerCase()===new_movie)){
            var index_film = cast.findIndex(std=> std.title.toLowerCase() === new_movie);
            check = true
            mname = cast[index_film].title.toLowerCase();
            allfilms.push(mname);
            seeornot("qua", "visible");
        }
        
        // message d erreur
        if (check == false) {
            seeornot("tre", "hidden");
                seeornot("qua", "hidden");
                seeornot("uno", "hidden");
                seeornot("dos", "hidden");
                seeornot("erasor","inverse");
                seeornot("movie_show", "hidden");
                seeornot("actor_show", "hidden");
                seeornot("giveactor", "hidden");
                seeornot("name_a", "hidden");
                document.getElementById("actor_respons").innerHTML ="";
              document.getElementById("giveactor").innerHTML = "";
              

            
          msg_error = "You got the wrong movie :(, try again !";
          document.getElementById("film_repons").innerHTML = msg_error.fontcolor("red");
        }
        //bon film
        else  {
            seeornot("uno","inverse");
            seeornot("dos","inverse");
          document.getElementById("name_a").innerHTML = "";
          document.getElementById("actor_respons").innerHTML = "";
          document.getElementById("tre").value = "";
          seeornot("actor_show", "hidden");
          let url = "".concat(
            "https://api.themoviedb.org/3/search/movie?api_key=e4d9e1861864d0fbca5c6b61e841c203&query=",
            mname
          );
            //on va chercher les info du film
          fetch(url)
            .then((result) => result.json())
            .then((data) => {
              //l image
              document.getElementById("movie_show").src =
                "https://image.tmdb.org/t/p/w500/" +
                data.results[0].poster_path;
                // et la date de sortie
                date = data.results[0].release_date;
              document.getElementById("giveactor").innerHTML =
                "<p1>" +
                mname +
                " was released the " +
                date +
                ", give me an other actor from this movie pls;) :</p1>";
            });
        }
      }
    });
};