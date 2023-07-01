# Power plant net generation map

#### Challenge
Suppose we want to show a map to visualize the annual net generation of power plants of the US. The
challenge consists of the following requirements:
• We want to display the top N plants.
• On the map we want to show absolute value and percentage of the plant's federal state.
• We want to be able to filter by state so we can zoom in.
• The data usually comes as excel file - https://www.epa.gov/egrid/download-data (eGRID2020
Data File)
• Feel free to save the data in any adequate format to feed the needs of your project.

> The application takes the static excel sheet; which is stored in the application, parses the data into a json format and caches it on load to a redis cache. The frontend gets the parsed data, stores it in a redux store and renders the location on the map. Sorting and pagination is done on the frontend.

⚙️Application features:

    ✨ Display the top 20 plants
    📲 Show absolute value and percentage of the plant's federal state
    📌 Filter by state, net generation, name, plantID, and net generation percentage
    🛠 View Details of plant on the map


## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [Front-end Development](#Front-endDevelopment)
- [Back-end API](#Back-endAPI)
- [Technologies Used](#TechnologiesUsed)
- [Further Development](#FurtherDevelopment)
- [Screenshots](#screenshots)
- [Contributing](#Contributing)
- [License](#License)

## Installation

1. Clone the repository: https://gitlab.com/bumsyalao1/power-plant-gen-map
2. Install all dependencies
- [Node.js](https://nodejs.org) version 18 or above.
3. Update environment variables
- Rename the client/.env.example file to .env and add your `REACT_APP_GOOGLE_MAP_API_KEY` Google API key string.

4. Install dependencies for the backend-end:
```bash
yarn  or npm install
```
Start server on http://localhost:8000/
```bash
yarn start-dev or npm run start-dev
```

5. Install dependencies for the front-end and start React-Redux app on http://localhost:3000/
```bash
cd client
yarn or npm install
yarn start or npm start 
```


## Front-end Development

The front-end of the project is built with React, Redux uses redux-persist store, to cache persisted data. The main files and directories are:

- `client/src`
    - `/components`: Contains the various components used in the application.
    - `/layouts`: Contains the various layouts used in the application.
    - `/pages`: Contains the various pages used in the application.
    - `/redux`: Manages the application state using Redux.
    - `/hooks`: Custom React hooks to handle API requests to the back-end server.
    - `/index.tsx`: The main entry point of the React application.

## Back-end API

The back-end API of the project is built with Node.js and Express and Redis cache for caching the request. The main files and directories are:
- `server/`    
    - `/routes`: Contains the API routes for handling plants data.
    - `/controllers`: Implements the logic for handling API requests.
    - `/utils`: Contains utility functions and helpers.
    - `/assets`: Contains the excel sheet.
    - `app.ts`: The main entry point of the back-end server.
### API Endpoints
    The following API endpoints are available:

- `GET /api/plants` - Get the power plants data.

## Technologies Used

- React
- Redux
- SCSS
- Typescript
- Node.js
- Express
- Redis
- Google Maps Developer APIs

## Further Development
This project is a starting point for developing a Power plant visualization map. There are a number of ways that you can further develop the project, such as:

- Adding additional features, such as the ability fetch the excel data and update with newer versions.
- Integrating with other data sources, such as weather data or traffic data.
- Developing mobile responsiveness for the project.
- Writing unit and integration tests for frontend and backend.


> Time spent developing: 3 days of 4hours per day.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## Screenshots
![1](https://res.cloudinary.com/dcpfdxsly/image/upload/v1687658756/Screen_Shot_2023-06-25_at_6.05.26_AM_pimdww.png)

![Video recording](https://res.cloudinary.com/dcpfdxsly/video/upload/v1687659002/Screen_Recording_2023-06-25_at_5.56.29_AM_ewyeh5.mov)

## License

This project is licensed under the [MIT License](LICENSE).
