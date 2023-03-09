console.log("Async & Axios")


// 1.Pintar usuarios
// En este ejercicio utilizaremos la API de https://jsonplaceholder.typicode.com/users. Leyendo su documentación, deberás hacer lo siguiente:
// ●	Imprimir por consola la lista de usuarios.

// ●	Imprimir por consola solo el nombre de los usuarios.

// ●	Crea una variable global users y cuando hagas la petición axios rellénala con la respuesta de la api (todo esto fuera de una función)
// ●	Crea una función que muestre por consola la variable global que habías creado
// ●	Crea un botón que cuando lo cliques ejecute la función que habías creado
// ●	Ahora en vez de mostrar los usuarios por consola muestra el nombre de cada uno en el DOM ( en el HTML)
// Recuerda que para estos ejercicios deberás utilizar Axios. 


const API_URL = "https://jsonplaceholder.typicode.com/users/";

axios.get(API_URL)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));

axios.get(API_URL)
    .then(res => console.log(res.data.map(user => user.name)))
    .catch(err => console.error(err));




let myUsers = [];

axios.get(API_URL)
    .then(res => {
        myUsers = (res.data.map(user => user));
    })
    .catch(err => console.error(err));

console.log(myUsers); //CHECKING
console.log("Above is the user array but it was declared and logged out of the axios Promise, and it didn't have time to get filled with data from the API!");

const users = document.getElementById("users");
const showArray = () => {
    console.log(myUsers);
    users.innerHTML = myUsers.map(user =>`<p>${user.name.toUpperCase()}`);
     }

const button = document.getElementById("userbtn");
button.addEventListener("click", showArray);


// 1. Quiero un perrito, pero no se que raza escoger, ¿me ayudas?
// En este ejercicio utilizaremos la API de https://dog.ceo/dog-api/. Leyendo su documentación, deberás hacer lo siguiente:
// ●	Imprimir por consola la lista de razas de todos los perros.
// ●	Imprimir por consola una imagen random de una raza.
// ●	Imprimir por consola todas las imágenes de una raza concreta.
// Recuerda que para estos ejercicios deberás utilizar Axios. Al haber conseguido que se imprima por consola, el siguiente paso será que se muestren en pantalla con las herramientas que nos ofrece el árbol DOM.
// *Extra ¿Y si ahora te pidiéramos que podamos poner otra raza en la url para que nos busque otras imágenes? Adapta las urls que ya tenías para que puedas pasarle argumentos.


const imgcontainer = document.getElementById("img-container");
const manyImages = document.getElementById("allImages");

axios.get("https://dog.ceo/api/breeds/list/all")
  .then(res => console.log(res.data.message))
  .then(res => console.log ("DOGS!!!"))
  .catch(err => console.log(err))

axios.get("https://dog.ceo/api/breeds/image/random")
    .then(res => {
        console.log(res.data.message);
        let imageURL = res.data.message;
        imgcontainer.innerHTML = `<a href="${imageURL}">Click here to go to image source</a><br><img src="${imageURL}"></img>`
    })
    .catch(err => console.error(err));

let breed = "";

function showImages() {    //inside function so it can be triggered with "search"
axios.get("https://dog.ceo/api/breed/" + breed + "/images")
.then(res => {
        res.data.message.slice(0, 6).forEach(link => {     //I've added slice to limit the images to 6, as searching for some breeds with too many images crashes the browser
        console.log(link);
        manyImages.innerHTML += `<img src="${link}"</img>`;
     } ) 
}
    )
.catch(err => console.error(err));
}


const changeImages = () => {         //This function captures user input in search field and triggers the axios above
    breed = userInput.value;
    manyImages.innerHTML = "";    //This clears the previous images
    showImages();
}
const userInput = document.getElementById("dogs")
const searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", changeImages)



// Para este ejercicio vamos a utilizar la API de usuarios de GitHub, la cual tiene esta URL: https://api.github.com/users/{username}. {username} es el nombre del usuario en GitHub, por lo que si quieres buscar a cualquier usuario, solo tienes que ponerlo en la url. Por ejemplo,https://api.github.com/users/sofiapinilla, o esta https://api.github.com/users/GeerDev. Si ponéis esta URL en una nueva pestaña del navegador podréis observar qué datos nos devuelve el API.
// Lo primero que haremos será crear un input de tipo texto y un botón para buscar. El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. Después crearemos una función que se ejecute cuando se pulse el botón buscar y que contenga una petición a la API para obtener información de ese usuario y así mostrarla en nuestra página:



// Lo que queremos que se imprima por consola será:
// ●	Nombre
// ●	Número de repositorios
// ●	Avatar (imagen)
// Recuerda que para estos ejercicios deberás utilizar Axios.Si ya has obtenido toda la información, utiliza las herramientas del árbol DOM para que esta información aparezca en la pantalla.


function showGHusers() {
    axios.get("https://api.github.com/users/" + userSearch.value)
    .then(res => {
        list.innerHTML = `<h2>${res.data.login}: Number of repositories ${res.data.public_repos}<h2><img src="${res.data.avatar_url}"></img>`
    })
    .catch(err => console.error(err));
}

const gitbtn = document.getElementById("gitbtn");
gitbtn.addEventListener("click", showGHusers);
const userSearch = document.getElementById("gitHub");
const list = document.getElementById("person");




