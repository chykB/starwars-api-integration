//  Function to fetch data from SWAPI
const planet_ctn = document.getElementById('planet-ctn')
const previous = document.getElementById('previous')
const next = document.getElementById('next')

// Variables for planet
let currentPage = 1;
let totalPage = 1;
let planet_url = `https://swapi.dev/api/planets/?page=${currentPage}`;

previous.addEventListener('click', previousPage);
next.addEventListener('click', nextPage)

async function fetchPlanet(){
    try {
            const results = await fetch(planet_url);
            const data = await results.json();
            console.log(data);
            let planets = data.results;
            totalPage = Math.ceil(data.count / 10)
            let output = ' ';
            planets.forEach(item =>{
                output += `<div class="planet-card">
                                <h2>${item.name}</h2>
                                <h5>Climate: ${item.climate}</h5>
                                <h5>Terrain: ${item.terrain}</h5>
                                <h5>Population: ${item.population}</h5>
                        
                            </div>`
                
            })
            planet_ctn.innerHTML = output;
            console.log(planets)
            
            
    } catch (error){
            console.error("Error fetching planets", error)
        }
}

function nextPage(){
    if (currentPage < totalPage){
        currentPage++;
        planet_url = `https://swapi.dev/api/planets/?page=${currentPage}`;
        fetchPlanet()
    }
}

function previousPage(){
    if (currentPage > 1){
        currentPage--;
        planet_url = `https://swapi.dev/api/planets/?page=${currentPage}`;
        fetchPlanet()
    }
}
fetchPlanet()

// People 
const people_ctn = document.getElementById('people-ctn')
const previous_p = document.getElementById('previous-p')
const next_p = document.getElementById('next-p')

// Variables for People
let currentPage_p = 1;
let totalPage_p = 1;
let people_url = `https://swapi.dev/api/people/?page=${currentPage_p}`;

previous_p.addEventListener('click', previousPageP);
next_p.addEventListener('click', nextPageP)

async function fetchPeople(){
    try {
            const results = await fetch(people_url);
            const data = await results.json();
            console.log(data);
            let people = data.results;
            totalPage_p = Math.ceil(data.count / 10)
            let output = ' ';
            people.forEach(item =>{
                output += `<div class="people-card">
                                <h2>${item.name}</h2>
                                <h5>Gender: ${item.gender}</h5>
                                <h5>Birth Year: ${item.birth_year}</h5>
                                <h5>Height: ${item.height}</h5>
                        
                            </div>`
                
            })
            people_ctn.innerHTML = output;
            
    } catch (error){
            console.error("Error fetching planets", error)
        }
}

function nextPageP(){
    if (currentPage_p < totalPage_p){
        currentPage_p++;
        people_url = `https://swapi.dev/api/people/?page=${currentPage_p}`;
        fetchPeople()
    }
}

function previousPageP(){
    if (currentPage_p > 1){
        currentPage_p--;
        people_url = `https://swapi.dev/api/people/?page=${currentPage_p}`;
        fetchPeople()
    }
}
fetchPeople()

// Films section
const films_ctn = document.getElementById('films-ctn');

let films_url = `https://swapi.dev/api/films/?page=1`;



async function fetchFilms(){
    try {
            const results = await fetch(films_url);
            const data = await results.json();
            console.log(data);
            let films = data.results;
            console.log(results)
            totalPage_F = Math.ceil(data.count / 10)
            let output = ' ';
            films.forEach(item =>{
                output += `<div class="films-card">
                                <h2>${item.title}</h2>
                                <h5>Gender: ${item.producer}</h5>
                                <h5>Birth Year: ${item.release_date}</h5>
                                <h5>Height: ${item.episode_id}</h5>
                        
                            </div>`
                
            })
            films_ctn.innerHTML = output;
            
    } catch (error){
            console.error("Error fetching planets", error)
        }
}

fetchFilms()
