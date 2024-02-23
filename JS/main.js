// function for the tabs
const tabs = document.querySelectorAll('nav .tab-btn')
const sections = document.querySelectorAll('.section')

tabs.forEach((tab, index) =>{
    tab.addEventListener('click', ()=>{
        tabs.forEach(tab=>{tab.classList.remove('active')})
        tab.classList.add('active')
        sections.forEach(section =>{section.classList.remove('active')})
        sections[index].classList.add('active')
    })
})

async function fetchData(url, currentPage, containerElement, resourceType) {
    try{
        const results = await fetch(url);
        const data = await results.json();
        console.log(data);
        
        let resources = data.results;
        let totalPage = Math.ceil(data.count / 10);
        let output = ' ';
        
        resources.forEach(item => {
            output += `<div class="${resourceType}-card card" data-type="${resourceType}" data-id="${item.url.split('/').filter(Boolean).pop()}">
                            <h2>${item.name || item.title}</h2>
                            ${resourceType === 'planets' ?`
                                <p>Name: ${item.name}</p>
                                <p>Climate: ${item.climate}</p>
                                <p>Terrain: ${item.terrain}</p>
                                <p>Population: ${item.population}</p>`:
                            resourceType === 'people' ?`
                                <p>Gender: ${item.gender}</p>
                                <p>Birth Year: ${item.birth_year}</P>
                                <p>Height: ${item.height}</p>` :
                            resourceType === 'films'?`
                                <p>Producer: ${item.producer}</p>
                                <p>Release Date: ${item.release_date}</p>
                                <p>Episode: ${item.episode_id}</p>` : ''}
                        </div>`
        });
        containerElement.innerHTML = output;
        
        // Pagination Logic
        previous.disabled = currentPage === 1;
        next.disabled = currentPage === totalPage
        
    }catch (error){
        console.log(`Error fetching ${resourceType}`, error)
    }
}



// Resource sections
const planetContainer = document.getElementById('planets-ctn')
const peopleContainer = document.getElementById('people-ctn')
const filmsContainer = document.getElementById('films-ctn')

// Pagination button
const previous = document.getElementById('previous')
const next = document.getElementById('next')

// Variable for Pagination
let currentPage = 1
let totalPage = 1
let currentUrl = `https://swapi.dev/api/planets/?page=${currentPage}`

async function fetchNextPPage(){
    if (currentPage < totalPage){
        currentPage++
        await fetchAndUpdate()
    }
}
async function fetchPreviousPage(){
    if (currentPage > 1){
        currentPage--
        await fetchAndUpdate()
    }
}

// Fetch and update function
async function fetchAndUpdate(){
    try {
        await fetchData(currentUrl, currentPage, planetContainer, 'planets')
        await fetchData(currentUrl.replace('planets', 'people'), currentPage, peopleContainer, 'people')
        await fetchData(currentUrl.replace('planets', 'films'), currentPage, filmsContainer, 'films')
    }catch (error){
        console.log("Error fetching and updating data", error)
    }
}   
fetchAndUpdate()

next.addEventListener('click', fetchNextPPage)
previous.addEventListener('click', fetchPreviousPage)

// Fetcing resources for the modal
async function fetchResourceDetails(resourceType, resourceId){
    try {
        const response = await fetch(`https://swapi.dev/api/${resourceType}/${resourceId}/`)
        const data = await response.json()
        console.log(data)
        displayModalContent(data)
    }catch (error) {
        console.error('Error fetching data', error)
    }
}

document.addEventListener('click', event => {
    const card = event.target.closest('.card')
    if (card && card.hasAttribute('data-type') && card.hasAttribute('data-id')){
        const resourceType = card.getAttribute('data-type')
        const resourceId = card.getAttribute('data-id')
        fetchResourceDetails(resourceType, resourceId)
    }
})


function displayModalContent(data) {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = '';
    if (data.name){
        if (data.climate){
            modalContent.innerHTML = `
            <h2>${data.name}</h2>
            <h3>Climate:  <span>${data.climate}</span></h3>
            <h3>Population: <span>${data.population}</span></h3>
            <h3>Diameter: <span>${data.diameter}</span></h3>
            <h3>Orbital Period: <span>${data.orbital_period}</span></h3>
            <h3>Rotation Period: <span>${data.rotation_period}</span></h3>
            <h3>Terrain: <span>${data.terrain}</span></h3>
            <h3>Surface Water: <span>${data.surface_water}</span></h3>
        `;
        }else { 
            modalContent.innerHTML = `
            <h2>${data.name}</h2>
            <h3>Gender: <span>${data.gender}</span></h3>
            <h3>Birth Year: <span>${data.birth_year}</span></h3>
            <h3>Height: <span>${data.height}</span></3>
            <h3>Eye Color: <span>${data.eye_color}</span></h3>
            <h3>Hair Color: <span>${data.hair_color}</span></h3>
            <h3>Skin Color: <span>${data.skin_color}</span></h3>
            <h3>Created: <span>${data.created}</span></h3>
            
        `;
        }
        
    }else if (data.title){
        modalContent.innerHTML = `
            <h2>${data.title}</h2>
            <h3>Director: <span>${data.director}</span></h3>
            <h3>Producer: <span>${data.producer}</span></h3>
            <h3>Release Date: <span>${data.release_date}</span></h3>
            <h3>Episode: <span>${data.episode_id}</span></h3>
            <h3>Description: <span>${data.opening_crawl}</span></h3>

            
        `;
    }

    const modal = document.getElementById('resourceModal')
    modal.style.display ='block'
}
// Close the modal
const close = document.querySelector('.close')
    close.addEventListener('click', () => {
        const modal = document.getElementById('resourceModal')
        modal.style.display = 'none'
        })

window.addEventListener('click', event => {
    const modal = document.getElementById('resourceModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});





// document.querySelectorAll('.planets-card').forEach(card => {
//     card.addEventListener('click', ()=>{
//         const planetId = card.getAttribute('data-planet-id');
//         const modal = document.getElementById('planetModals')
//         modal.style.display = 'block'
//         fetchPlanetDetails(planetId)
//     })
// })


// //  Function to fetch data from SWAPI
// const planet_ctn = document.getElementById('planet-ctn')
// const previous = document.getElementById('previous')
// const next = document.getElementById('next')

// // Variables for planet
// let currentPage = 1;
// let totalPage = 1;
// let planet_url = `https://swapi.dev/api/planets/?page=${currentPage}`;

// previous.addEventListener('click', previousPage);
// next.addEventListener('click', nextPage)

// async function fetchPlanet(){
//     try {
//             const results = await fetch(planet_url);
//             const data = await results.json();
//             // console.log(data);
//             let planets = data.results;
//             totalPage = Math.ceil(data.count / 10)
//             let output = ' ';
//             planets.forEach(item =>{
//                 output += `<div class="planet-card">
//                                 <h2>${item.name}</h2>
//                                 <p>Climate: ${item.climate}</p>
//                                 <p>Terrain: ${item.terrain}</p>
//                                 <p>Population: ${item.population}</p>
                        
//                             </div>`
                
//             })
//             planet_ctn.innerHTML = output;
//             console.log(planets)
            
            
//     } catch (error){
//             console.error("Error fetching planets", error)
//         }
// }

// function nextPage(){
//     if (currentPage < totalPage){
//         currentPage++;
//         planet_url = `https://swapi.dev/api/planets/?page=${currentPage}`;
//         fetchPlanet()
//     }
// }

// function previousPage(){
//     if (currentPage > 1){
//         currentPage--;
//         planet_url = `https://swapi.dev/api/planets/?page=${currentPage}`;
//         fetchPlanet()
//     }
// }
// fetchPlanet()

// // People 
// const people_ctn = document.getElementById('people-ctn')
// const previous_p = document.getElementById('previous-p')
// const next_p = document.getElementById('next-p')

// // Variables for People
// let currentPage_p = 1;
// let totalPage_p = 1;
// let people_url = `https://swapi.dev/api/people/?page=${currentPage_p}`;

// previous_p.addEventListener('click', previousPageP);
// next_p.addEventListener('click', nextPageP)

// async function fetchPeople(){
//     try {
//             const results = await fetch(people_url);
//             const data = await results.json();
//             console.log(data);
//             let people = data.results;
//             totalPage_p = Math.ceil(data.count / 10)
//             let output = ' ';
//             people.forEach(item =>{
//                 output += `<div class="people-card">
//                                 <h2>${item.name}</h2>
//                                 <p>Gender: ${item.gender}</p>
//                                 <p>Birth Year: ${item.birth_year}</p>
//                                 <p>Height: ${item.height}</p>
                        
//                             </div>`
                
//             })
//             people_ctn.innerHTML = output;
            
//     } catch (error){
//             console.error("Error fetching planets", error)
//         }
// }

// function nextPageP(){
//     if (currentPage_p < totalPage_p){
//         currentPage_p++;
//         people_url = `https://swapi.dev/api/people/?page=${currentPage_p}`;
//         fetchPeople()
//     }
// }

// function previousPageP(){
//     if (currentPage_p > 1){
//         currentPage_p--;
//         people_url = `https://swapi.dev/api/people/?page=${currentPage_p}`;
//         fetchPeople()
//     }
// }
// fetchPeople()

// // Films section
// const films_ctn = document.getElementById('films-ctn');

// let films_url = `https://swapi.dev/api/films/?page=1`;



// async function fetchFilms(){
//     try {
//             const results = await fetch(films_url);
//             const data = await results.json();
//             console.log(data);
//             let films = data.results;
//             console.log(results)
//             totalPage_F = Math.ceil(data.count / 10)
//             let output = ' ';
//             films.forEach(item =>{
//                 output += `<div class="films-card">
//                                 <h2>${item.title}</h2>
//                                 <p>Gender: ${item.producer}</p>
//                                 <p>Birth Year: ${item.release_date}</p>
//                                 <p>Height: ${item.episode_id}</p>
                        
//                             </div>`
                
//             })
//             films_ctn.innerHTML = output;
            
//     } catch (error){
//             console.error("Error fetching planets", error)
//         }
// }

// fetchFilms()
