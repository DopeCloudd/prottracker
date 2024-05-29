const categories = require("../../product.category");

const selectors = {
  title: "h1.productName_title",
  price: "p.productPrice_price",
  quantity: "button.athenaProductVariations_box[data-selected]",
  description: "div.productDescription_contentProperties p",
  imageUrl: "img.athenaProductImageCarousel_image",
};

const myprotein_pages = [
  {
    url: "https://fr.myprotein.com/nutrition-sportive/impact-whey-protein/10530943.html",
    selectors: selectors,
    id_category: categories.Whey,
  },
  {
    url: "https://fr.myprotein.com/nutrition-sportive/impact-whey-isolate/10530911.html",
    selectors: selectors,
    id_category: categories.Whey,
  },
  {
    url: "https://fr.myprotein.com/nutrition-sportive/clear-whey-isolate/12081395.html",
    selectors: selectors,
    id_category: categories.ClearWhey,
  },
  {
    url: "https://fr.myprotein.com/nutrition-sportive/gainer-prise-de-masse/10529988.html",
    selectors: selectors,
    id_category: categories.Gainer,
  },
  {
    url: "https://fr.myprotein.com/nutrition-sportive/creapure-monohydrate-de-creatine/10529740.html",
    selectors: selectors,
    id_category: categories.Creatine,
  },
  {
    url: "https://fr.myprotein.com/nutrition-sportive/alpha-pre-workout/12941037.html",
    selectors: selectors,
    id_category: categories.PreWorkout,
  },
];

module.exports = myprotein_pages;
