# Jobsity JS Challenge

## Run the project

In order to run the project, head to the project's folder and run the following script:

#### `npm start` or `npm run start`

This command runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Required configurations

### Google Places API
To take advantage of the Google Places API, you must provide an active API key.\
This can be done following these steps:

Open the project's folder in the following path `/public`\
Open the `index.html` file with an editor of your preference.\
Edit the following line `https://maps.googleapis.com/maps/api/js?key={API_KEY}&libraries=places` adding your key in replacement of `{API_KEY}`.

### OpenWeatherMap API
To take advantage of the OpenWeatherMap API, you must provide an active API key.\
This can be done following these steps:

Open the project's folder in the following path `/src/api`\
Open the `calls.js` file with an editor of your preference.\
Edit line 53 `const key = "{API_KEY}";` adding your key in replacement of `{API_KEY}`.

## Missing requirements from the scope

### Weather forecast
There was some great advance towards getting this requirement done:

You can query the Google Places API, first to retrieve any given place ID, and then for a detailed geometry of that one place.\
This means the application is actually receiving a latitude and longitude of any place the user selects.\
With latitude and longitude, calling the weather API is trivial, but this didn't get done as a consequence of the API key not getting activated.

### Unit test adding a reminder
I wasn't completely sure of the scope of what had to be tested.\
Anyway, and though I have some experience with unit testing, doing so in the frontend isn't my strenght, so I left this requirement aside.\
I'm currently rushing through videos so that I can get more familiar and reinforce whatever level of experience I currently have.

## Bonus requirements!

All of the bonus requirements are satisfied.\
Additionally, there's the extra of being able to search for any place around the world, as this project is using the Google Places API and the Material-UI autocomplete component to query as you write.
