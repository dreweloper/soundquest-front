# SOUNDQUEST | Front-end

Proyecto de React con Vite inicializado con Vanilla JavaScript sin frameworks.

<div>
    <img alt="Static Badge" src="https://img.shields.io/badge/Node.js-18.14.2-%23339933?style=flat-square&logo=nodedotjs">
    <img alt="Static Badge" src="https://img.shields.io/badge/Express-4.18.2-%23000000?style=flat-square&logo=express">
    <img alt="Static Badge" src="https://img.shields.io/badge/MongoDB%20Compass-1.39.3-%2347A248?style=flat-square&logo=mongodb">
    <img alt="Static Badge" src="https://img.shields.io/badge/Git-2.39.1-%23F05032?style=flat-square&logo=git">
    <img alt="Static Badge" src="https://img.shields.io/badge/Jest-29.6.4-%23C21325?style=flat-square&logo=jest">
    <img alt="Static Badge" src="https://img.shields.io/badge/Docker-20.10.21-%232496ED?style=flat-square&logo=docker">
    <img alt="Static Badge" src="https://img.shields.io/badge/Postman-10.17.5-%23FF6C37?style=flat-square&logo=postman">
</div>

<br>

Welcome to SoundQuest, your random music explorer based on Spotify playlists!

Our web app utilizes a Spotify user ID to access its public playlists. It then randomly selects one playlist and displays a random song from that selection. This functionality is made possible through the collaborative efforts of our algorithm and the [Spotify Web API](https://developer.spotify.com/).

Below, you will find all the information related to the Front-end of our application. If you want to check the Back-end repository, [click here](https://github.com/dreweloper/soundquest-back).

---

## Installation

1. Clone the repository locally.

```shell
git clone https://github.com/dreweloper/soundquest-back.git
```

2. Change to the project directory.

```shell
cd soundquest
```

3. Install the dependencies using `npm`.

```shell
npm install
```

4. Create the `.env` file in the root of the project and set the following environment variables:

- `PORT`: port that the server listens to.
- `URI_CONNECT`: the connection URI of the MongoDB deployment.

5. Start the application in your local development environment.

```shell
npm run start
```

## Technologies

- **Node.js:** (Versión 18.14.2) - Asynchronous event-driven JavaScript runtime designed to build scalable network applications.
- **Express:** (Versión 4.18.2) - Web framework for building web applications and APIs.
- **Mongoose:** (Versión 7.3.3) - ODM (Object-Document Mapping) library used to interact with the MongoDB database in Node.js.
- **Jest:** (Versión 29.6.4) - JavaScript code testing library.
- **Docker:** (Versión 20.10.21, build baeda1f) - Container platform for application deployment.
- **Git:** (Versión 2.39.1) - Version control system used to track and manage the source code of this project.
- **JSDoc:** (Versión 4.0.2) - JSDoc format documentation generation tool for JavaScript code.
- **Postman:** (Versión 10.17.5) - Platform for testing and documenting APIs, used for the development and testing of this project's API.
- **node-fetch:** (Versión 2.6.11) - Library to make HTTP requests from Node.js. I install version 2 because the latest version is not compatible with CommonJS (JavaScript module system).

## Documentation

### API documentation

See the [documentation in Postman](https://documenter.getpostman.com/view/26092515/2s9Y5crf4P) for detailed information about the API endpoints, including sample requests, parameters and responses.

### Project documentation

For a detailed technical description of the Back-end functions and components, as well as information on how to use them, please refer to the [documentation generated with JSDoc](https://dreweloper.github.io/soundquest-back/).

## Deployment

The application has been deployed as a web service using a Docker image on the Render platform.

---

## Contact

If you have any questions, suggestions or comments, you can contact me via e-mail: [dreweloper@gmail.com](mailto:dreweloper@gmail.com).
