class GeneralWidget {
   constructor(title, content) {
      this.title = title;
      this.content = content;
   }

   display() {
      const widgetElement = document.createElement('div');
      widgetElement.classList.add('widget');

      const titleElement = document.createElement('h2');
      titleElement.textContent = this.title;

      const contentElement = document.createElement('p');
      contentElement.textContent = this.content;

      widgetElement.appendChild(titleElement);
      widgetElement.appendChild(contentElement);

      document.getElementById('widget-container-inner').appendChild(widgetElement);
   }
}

class ImageWidget extends GeneralWidget {
   constructor(title, imageUrl, altText, description) {
      super(title, ''); // Images may not have traditional content, use altText for accessibility
      this.imageUrl = imageUrl;
      this.altText = altText;
      this.description = description;

   }

   display() {
      const widgetElement = document.createElement('div');
      widgetElement.classList.add('widget');

      const titleElement = document.createElement('h2');
      titleElement.textContent = this.title;

      const imageElement = document.createElement('img');
      imageElement.src = this.imageUrl;
      imageElement.alt = this.altText;
      imageElement.style.width = '100%';
      imageElement.style.maxWidth = '800px';
      imageElement.style.maxHeight = '800px';

      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('widget-description');
      descriptionElement.textContent = this.description;
      descriptionElement.style.transition = 'max-height 0.5s'; // Add a smooth transition effect

      // Truncate the description if needed
      if (descriptionElement.scrollHeight > descriptionElement.clientHeight) {
         descriptionElement.classList.add('truncated');
      }

      descriptionElement.addEventListener('click', () => {
         descriptionElement.classList.toggle('truncated');

      });

      widgetElement.appendChild(titleElement);
      widgetElement.appendChild(imageElement);
      widgetElement.appendChild(descriptionElement);

      document.getElementById('widget-container-inner').appendChild(widgetElement);
   }
}

class HistoricalEventCarouselWidget {
   constructor(container, events) {
      this.container = container;
      this.events = events;
      this.currentIndex = 0;

   }

   display() {
      // Remove previous event widget if exists
      const previousEventWidget = this.container.querySelector('.historical-event-widget');
      if (previousEventWidget) {
         this.container.removeChild(previousEventWidget);
      }

      const event = this.events[this.currentIndex];

      const widgetElement = document.createElement('div');
      widgetElement.classList.add('widget', 'historical-event-widget');

      const titleContainer = document.createElement('div');
      titleContainer.classList.add('title-container');

      const titleElement = document.createElement('h2');
      titleElement.textContent = event.title;

      const navigationContainer = document.createElement('div');
      navigationContainer.classList.add('navigation-container');

      const prevButton = document.createElement('button');
      prevButton.classList.add('navigation-button');
      prevButton.innerHTML = '&#9664;'; // Unicode character for left arrow
      prevButton.addEventListener('click', () => this.showPreviousEvent());

      const nextButton = document.createElement('button');
      nextButton.classList.add('navigation-button');
      nextButton.innerHTML = '&#9654;'; // Unicode character for right arrow
      nextButton.addEventListener('click', () => this.showNextEvent());

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('carousel-buttons');
      buttonContainer.appendChild(prevButton);
      buttonContainer.appendChild(nextButton);

      titleContainer.appendChild(titleElement);
      titleContainer.appendChild(buttonContainer);

      widgetElement.appendChild(titleContainer);

      const imageElement = document.createElement('img');
      imageElement.src = event.imageUrl;
      imageElement.alt = event.altText;

      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('widget-description');
      descriptionElement.textContent = event.description;
      descriptionElement.style.transition = 'max-height 0.5s'; // Add a smooth transition effect

      // Truncate the description if needed
      if (descriptionElement.scrollHeight > descriptionElement.clientHeight) {
         descriptionElement.classList.add('truncated');
      }

      descriptionElement.addEventListener('click', () => {
         descriptionElement.classList.toggle('truncated');
      });

      widgetElement.appendChild(imageElement);
      widgetElement.appendChild(descriptionElement);

      // Append the new widget to the container
      this.container.appendChild(widgetElement);
   }


   showNextEvent() {
      this.currentIndex = (this.currentIndex + 1) % this.events.length;

      const event = this.events[this.currentIndex];
      const widgetElement = this.container.querySelector('.historical-event-widget');

      // Update title, image, and description
      widgetElement.querySelector('h2').textContent = event.title;
      widgetElement.querySelector('img').src = event.imageUrl;
      widgetElement.querySelector('img').alt = event.altText;
      widgetElement.querySelector('.widget-description').textContent = event.description;

      // Reset description truncation
      const descriptionElement = widgetElement.querySelector('.widget-description');
      descriptionElement.classList.remove('truncated');
      descriptionElement.style.maxHeight = 'none';
   }

   showPreviousEvent() {
      this.currentIndex = (this.currentIndex - 1 + this.events.length) % this.events.length;

      const event = this.events[this.currentIndex];
      const widgetElement = this.container.querySelector('.historical-event-widget');

      // Update title, image, and description
      widgetElement.querySelector('h2').textContent = event.title;
      widgetElement.querySelector('img').src = event.imageUrl;
      widgetElement.querySelector('img').alt = event.altText;
      widgetElement.querySelector('.widget-description').textContent = event.description;

      // Reset description truncation
      const descriptionElement = widgetElement.querySelector('.widget-description');
      descriptionElement.classList.remove('truncated');
      descriptionElement.style.maxHeight = 'none';
   }
}