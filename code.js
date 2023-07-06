document.addEventListener('DOMContentLoaded', () => {
  // Get information to HTML elements
  const animalNamesList = document.getElementById('name-animal');
  const animalDetailsContainer = document.getElementById('animal-info');
  const voteButton = document.getElementById('vote');
  const resetButton = document.getElementById('reset');
  const addAnimalForm = document.getElementById('animal-sheet');

  // Fetch all cute animal names from the server
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => {
      // Display all cute animal names in the list
      data.forEach(animal => {
        const li = document.createElement('li');
        li.textContent = animal.name;

        // Event listener for displaying cute animal details
        li.addEventListener('click', () => {
          displayAnimalDetails(animal);
        });

        animalNamesList.appendChild(li);
      });
    });

  // Display cute animal details when an animal name is clicked on
  function displayAnimalDetails(animal) {
    animalDetailsContainer.innerHTML = `
      <h3>${animal.name}</h3>
      <img src="${animal.image}" alt="${animal.name}">
      <p>Votes: ${animal.votes}</p>
    `;
  }

  // Vote for the chosen animal
  voteButton.addEventListener('click', () => {
    const selectedAnimal = animalDetailsContainer.querySelector('h3').textContent;
    const votesElement = animalDetailsContainer.querySelector('p');
    const votes = parseInt(votesElement.textContent.split(' ')[1]);

    // Increment the number of votes by 1
    votesElement.textContent = `Votes: ${votes + 1}`;

    // Update the votes in the server
    fetch(`http://localhost:3000/characters/${selectedAnimal}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ votes: votes + 1 }),
    })
      .then(response => response.json())
      .then(data => {
        // Handling of response
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
})