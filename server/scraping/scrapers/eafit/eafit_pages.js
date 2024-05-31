const categories = require("../../product.category");

const selectors = {
  title: 'meta[property="og:title"]',
  price: 'meta[property="product:price:amount"]',
  quantity: "h1",
  description: "details#description",
  imageUrl: 'meta[property="og:image"]',
};

const eafit_pages = [
  {
    url: "https://www.eafit.com/eafit-pure-whey.html",
    selectors: selectors,
    id_category: categories.Whey,
  },
  {
    url: "https://www.eafit.com/eafit-pure-isolate.html",
    selectors: selectors,
    id_category: categories.Whey,
  },
  {
    url: "https://www.eafit.com/eafit-milk-egg-95-micellaire.html",
    selectors: selectors,
    id_category: categories.Whey,
  },
  {
    url: "https://www.eafit.com/whey-gainer.html",
    selectors: selectors,
    id_category: categories.Gainer,
  },
  {
    url: "https://www.eafit.com/eafit-pure-creatine-300-g-poudre.html",
    selectors: selectors,
    id_category: categories.Creatine,
  },
  {
    url: "https://www.eafit.com/sport-vitamines-60-comprimes.html",
    selectors: selectors,
    id_category: categories.Vitamines,
  },
  {
    url: "https://www.eafit.com/eafit-pre-workout-330-g.html",
    selectors: selectors,
    id_category: categories.PreWorkout,
  },
];

module.exports = eafit_pages;
