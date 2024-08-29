document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        document.getElementById('login-modal').style.display = 'block';
    }

    const campsitesContainer = document.getElementById('campsites');
    const searchBar = document.getElementById('search-bar');

    fetch('data/campsites.json')
        .then(response => response.json())
        .then(data => {
            renderCampsites(data);

            searchBar.addEventListener('input', function(event) {
                const searchTerm = event.target.value.toLowerCase();
                const filteredCampsites = data.filter(campsite => 
                    campsite.title.toLowerCase().includes(searchTerm) ||
                    campsite.description.toLowerCase().includes(searchTerm)
                );
                renderCampsites(filteredCampsites);
            });
        })
        .catch(error => console.error('Error fetching campsites:', error));

    function renderCampsites(campsites) {
        campsitesContainer.innerHTML = '';
        campsites.forEach(campsite => {
            const campsiteElement = document.createElement('div');
            campsiteElement.classList.add('campsite');
            campsiteElement.innerHTML = `
                <img src="${campsite.image}" alt="${campsite.title}">
                <div class="campsite-info">
                    <h2 class="campsite-title">${campsite.title}</h2>
                    <p class="campsite-description">${campsite.description}</p>
                </div>
            `;
            campsitesContainer.appendChild(campsiteElement);
        });
    }
});
