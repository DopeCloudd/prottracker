const categories = require("../../product.category");

const selectors = {
  title: "p.product-name",
  price: "p.final-price",
  quantity: "p.product-name",
  description: [
    "div#description div.block02 h6",
    "div#description div.block04 h4",
  ],
  imageUrl: "div.main-block picture img",
};

const prozis_pages = [
  {
    url: "https://www.prozis.com/fr/fr/prozis/100-real-whey-protein-1000-g",
    selectors: selectors,
    id_category: categories.Whey,
  },
  {
    url: "https://www.prozis.com/fr/fr/prozis/100-real-whey-isolate-1000-g",
    selectors: selectors,
    id_category: categories.Whey,
  },
  {
    url: "https://www.prozis.com/fr/fr/prozis/real-mass-gainer-2722-g",
    selectors: selectors,
    id_category: categories.Gainer,
  },
  {
    url: "https://www.prozis.com/fr/fr/prozis/big-shot-pre-workout-46-servings",
    selectors: selectors,
    id_category: categories.PreWorkout,
  },
  {
    url: "https://www.prozis.com/fr/fr/prozis/ripped-pre-workout-46-doses",
    selectors: selectors,
    id_category: categories.PreWorkout,
  },
];

module.exports = prozis_pages;
