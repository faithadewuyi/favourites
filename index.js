document.addEventListener('DOMContentLoaded', () => {
  // Tab functionality
  const tabsBox = document.querySelector(".tabs-box");
  const allTabs = tabsBox.querySelectorAll(".tab");
  const arrowIcons = document.querySelectorAll(".icon i");

  let isDragging = false;

  const handleIcons = (scrollVal) => {
    const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
  };

  arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
      handleIcons(scrollWidth);
    });
  });

  allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabsBox.querySelector(".active").classList.remove("active");
      tab.classList.add("active");
    });
  });

  const dragging = (e) => {
    if (!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
    handleIcons(tabsBox.scrollLeft);
  };

  const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
  };

  tabsBox.addEventListener("mousedown", () => isDragging = true);
  tabsBox.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  // Current Day and Time
  const currentTime = document.getElementById("currentTime");
  const currentDay = document.getElementById("currentDay");

  function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const dateParts = now.toLocaleDateString('en-US', options).split(' ');

    const formattedDate = `${dateParts[0]} ${dateParts[1]} ${dateParts[2]} ${dateParts[3]}`;

    currentTime.textContent = timeString;
    currentDay.textContent = formattedDate;
  }

  updateTime();
  setInterval(updateTime, 1000);

  // Self Typing text
  const textElement = document.getElementById('typingText');
  const textToType = "Welcome! Explore some of my favourite things as a frontend developer";

  function typeText(text, index) {
    if (index < text.length) {
      textElement.textContent += text.charAt(index);
      setTimeout(() => {
        typeText(text, index + 1);
      }, 100); 
    }
  }

  typeText(textToType, 0);

  // Random facts
  const facts = [
    "I love watching tv series at my leisure time.",
    "I'm a big fan of country music.",
    "My favorite cuisine is African.",
    "I enjoy cooking."
  ];

  function showRandomFact() {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('randomFacts').textContent = randomFact;
  }

  showRandomFact();
  setInterval(showRandomFact, 5000);

  // Displaying Favourite Foods
  const FavouriteFood = function(name, cuisineType, image) {
    let rating = 0; // Private variable

    return {
      getName() {
        return name;
      },
      getCuisineType() {
        return cuisineType;
      },
      getImage() {
        return image;
      },
      rate(newRating) {
        if (newRating >= 1 && newRating <= 5) {
          rating = newRating;
        }
      },
      getRating() {
        return rating;
      }
    };
  };

  const foods = [
    FavouriteFood('Jollof Rice', 'Continental', 'images/jollofrice.jpg'),
    FavouriteFood('Pounded Yam', 'African', 'images/poundedyam.jpg'),
    FavouriteFood('Meat Pie', 'Snacks', 'images/pie1.jpg'),
    FavouriteFood('Zobo', 'Drinks', 'images/zobo.jpg')
  ];

  
  // Rendering food cards in DOM
  const foodContainer = document.getElementById('foodCards');

  foods.forEach(food => {
    const card = document.createElement('div');
    card.classList.add('card');
    const image = document.createElement('img');
    image.src = food.getImage();
    image.alt = food.getName();
    card.appendChild(image);

    foodContainer.appendChild(card);

    const name = document.createElement('h2');
    name.textContent = food.getName();
    card.appendChild(name);

    const cuisineType = document.createElement('p');
    cuisineType.textContent = `Cuisine: ${food.getCuisineType()}`;
    card.appendChild(cuisineType);
  });

  // Using movieDataBase to render my favourite movies
  const apiKey = '93b357f8daa40ff8f33b1a6c94bb82d0'; 
  const favouriteMovies = [
    // { type: 'tv', id: '37680' }, 
    { type: 'tv', id: '76479' }, 
    { type: 'tv', id: '18165' }, 
    // { type: 'tv', id: '44242' }, 
    { type: 'tv', id: '1395' }, 
    // { type: 'movie', id: '974262' },
    // { type: 'movie', id: '343948' },
    { type: 'movie', id: '116741' },
  ];

  const fetchItem = async (type, id) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`);
      const item = await response.json();
      return item;
    } catch (error) {
      console.error('Error fetching item:', error);
      return null;
    }
  };

  const renderItems = async () => {
    const movieContainer = document.getElementById('movie');

    for (const fav of favouriteMovies) {
      const item = await fetchItem(fav.type, fav.id);
      if (item) {
        const card = document.createElement('div');
        card.classList.add('card');

        
        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        image.alt = item.title || item.name;
        card.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = item.title || item.name;
        card.appendChild(title);

        const overview = document.createElement('p');
        overview.textContent = item.overview;
        card.appendChild(overview);

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Release Date: ${item.release_date || item.first_air_date}`;
        card.appendChild(releaseDate);

        movieContainer.appendChild(card);
      }
    }
  };

  renderItems();
});


// My Projects

const projects = [
  {
    name: "MarketMate",
    description: "An application that connects users and service providers",
    liveLink: "https://market-mate.netlify.app/",
    repoLink: "https://github.com/faithadewuyi/MarketMate.git",
    imageSrc: "images/marketmate.png"
  },
  {
    name: "Luxe Trove",
    description: "A Thrift e-commerce website that connects buyers to luxury thrift items",
    liveLink: "https://luxtrove.vercel.app",
    repoLink: "https://github.com/faithadewuyi/Trove.git",
    imageSrc: "images/luxe.png"
  },
  {
    name: "Abitim Farms",
    description: "A responsive simple two-page farm website",
    liveLink: "https://abitim-farms.vercel.app/",
    repoLink: "https://github.com/faithadewuyi/Abitim-Farms.git",
    imageSrc: "images/abitim.png"
  },
  {
    name: "DecorDreams",
    description: "A website showcasing innovative decor solutions",
    liveLink: "https://decor-dreams.vercel.app",
    repoLink: "https://github.com/faithadewuyi/GIT-Assessment.git",
    imageSrc: "images/decordreams.png"
  }
];

function createProjectCard(project) {
  const card = document.createElement('div');
  card.classList.add('projectCard');

  const image = document.createElement('img');
  image.src = project.imageSrc;
  image.alt = project.name;
  card.appendChild(image);

  const title = document.createElement('h3');
  title.textContent = project.name;
  card.appendChild(title);

  const description = document.createElement('p');
  description.textContent = project.description;
  card.appendChild(description);

  const liveLink = document.createElement('a');
  liveLink.href = project.liveLink;
  liveLink.textContent = "Live Link";
  liveLink.target = "_blank";
  card.appendChild(liveLink);

  const repoLink = document.createElement('a');
  repoLink.href = project.repoLink;
  repoLink.textContent = "Repo Link";
  repoLink.target = "_blank";
  card.appendChild(repoLink);

  return card;
}

document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.getElementById('projectsContainer');
  
  projects.forEach(project => {
    const projectCard = createProjectCard(project);
    projectsContainer.appendChild(projectCard);
  });
});
