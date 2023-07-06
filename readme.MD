

# Cutest Animal Vote

This is a web application that allows users to vote for the cutest animal from a list of animals. Users can view the list of animal names, click on a name to view the animal details, vote for their favorite animal, reset all votes to zero, and add new animals to the list.

## Features

- Display of a list of animal names.
- Clicking on an animal name displays the animal details, including an image and the number of votes.
- Voting for an animal increments the number of votes by 1 and updates the server.
- Resetting all votes sets the number of votes for all animals to zero.
- Adding a new animal to the list by providing a name and an image URL.
- Sending the new animal data to the server to update the list.
- Use of Fetch API to communicate with the server and handle data.

## Usage

1. Open the `code.html` file in a web browser.
2. The list of animal names will be displayed.
3. Click on an animal name to view its details.
4. Click the "Vote Now!" button to vote for the selected animal.
5. Click the "Reset All Votes" button to reset all votes to zero.
6. Fill out the "Add Animal" form with a name and an image URL to add a new animal to the list.
7. Click the "Add" button to add the new animal.

## Server Communication

The application communicates with a server running on `http://127.0.0.1:5500/`. The server provides the list of animals and handles updating the votes and adding new animals. Ensure that the server is running and properly configured before using the application.

## Resources

- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

  