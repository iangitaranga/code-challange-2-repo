
    document.addEventListener('DOMContentLoaded', () => 
    {
    
    // Get information to HTML elements

    const animalNamesList = document.getElementById('name-animal');
    const animalDetailsContainer = document.getElementById('animal-details');
    const voteButton = document.getElementById('vote');
    const resetButton = document.getElementById('redo');
    const addAnimalForm = document.getElementById('animal-sheet');

    // Fetch of all cute animal names from server

    fetch('http://localhost:3000/characters')
    .then(response => response.json())
      .then(data => {
        // Display of all cute  animal names in the list
        data.forEach(animal => {
          const li = document.createElement('li');
          li.textContent = animal.name;
  
          // Event listener for the disply of cute animal details
          li.addEventListener('click', () => {
            displayAnimalDetails(animal);
          });
  
          animalNamesList.appendChild(li);
        });
      });
  
    // Display all cute animal details when an animal name is clicked on

    function displayAnimalDetails(animal) {
      animalDetailsContainer.innerHTML = `
        <h3>${animal.name}</h3>
        <img src="${animal.image}" alt="${animal.name}">
        <p>Votes: ${animal.votes}</p>
      `;
    }
  
    // Vote for the animal choosen

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
          // Handling of responce
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  
    // Reset votes back to 0
    resetButton.addEventListener('click', () => {
      const votesElements = document.querySelectorAll('.animal-info p');
      votesElements.forEach(votesElement => {
        votesElement.textContent = 'Votes: 0';
      });
    });
  
    // Add   list of cute animal form submission
    addAnimalForm.addEventListener('submit', event => {
      event.preventDefault();
  
      const nameInput = document.getElementById('name-input');
      const imageUrlInput = document.getElementById('image-url-input');
  
      const newAnimal = {
        name: nameInput.value,
        image: imageUrlInput.value,
        votes: 0,
      };
  
      // Send the new animal data to the server 
      fetch('http://localhost:3000/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnimal),
      })
        .then(response => response.json())
        .then(data => {
          // Clear the form field
          nameInput.value = '';
          imageUrlInput.value = ''; 
          // Add the new animal to the animal list   
          const li = document.createElement('li');
          li.textContent = data.name;
  
          // Event listener for displaying animal details
          li.addEventListener('click', () => {
            displayAnimalDetails(data);
          });
  
          animalNamesList.appendChild(li);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  });