// Access the container element
const container = document.getElementById('widget-container-inner');

// Create instances of widgets
let wordOfTheDay;
let nasaImage;
let historicalEventCarousel;

// Fetch data for NASA Image of the Day
fetch('https://api.nasa.gov/planetary/apod/?api_key=1pwnpcZhZkqNqxbEM9SgV5yKUwwbH7Ox8uRG8k0g')
   .then(response => response.json())
   .then(data => {
      console.log("Fetched NASA Image data:", data);
      nasaImage = new ImageWidget(data.title, data.url, "NASA Image of the Day", data.explanation);
      nasaImage.display(); // Call display() to show the widget
   })
   .catch(error => {
      console.error('Error fetching NASA Image data:', error);
   });

// Fetch data for Word of the Day
fetch('https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=nqhypfddjdobc1evtshdvf4xr32g04k28a6u93ig2l4t061sf')
   .then(response => response.json())
   .then(data => {
      console.log("Fetched Word of the Day data:", data);
      wordOfTheDay = new GeneralWidget(data.word.toUpperCase(), data.definitions[0].text);
      wordOfTheDay.display(); // Call display() to show the widget
   })
   .catch(error => {
      console.error('Error fetching Word of the Day data:', error);
   });

// Fetch data for Historical Events
const fetchHistoricalEvents = () => {
   const date = new Date();
   const month = date.getMonth() + 1;
   const day = date.getDate();

   return fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/selected/${month}/${day}`, {
      headers: {
         'Authorization': '92897198dbb9cecd6d874d5cea5028d1',
         'User-Agent': '_ of the day'
      }
   })
      .then(response => response.json())
      .then(data => {
         console.log("Fetched Historical Events data:", data);
         return data.selected.map(event => ({
            title: `${month}/${day}, ${event.year}`,
            imageUrl: event.pages[0].thumbnail?.source || '',
            altText: "Event Image",
            description: event.text,
            hyperlink: event.pages[0].content_urls.desktop.page
         }));
      });
};

fetchHistoricalEvents()
   .then(events => {
      historicalEventCarousel = new HistoricalEventCarouselWidget(container, events);
      historicalEventCarousel.display(); // Call display() to show the widget
   })
   .catch(error => {
      console.error('Error fetching Historical Events:', error);
   });