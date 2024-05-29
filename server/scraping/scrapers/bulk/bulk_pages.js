// Import des id categories
const categories = require("../../product.category");

const bulk_selectors = {
  title: ".header-title",
  price: ".dropin-price--default",
  quantity: [
    ".dropin-text-swatch--selected",
    ".dropin-picker__select option:selected",
  ],
  description: ".attribute-content p",
  imageUrl: ".pdp-carousel__slide--active img",
};

const bulk_pages = [
  {
    url: "https://www.bulk.com/fr/products/proteine-whey-poudre/bpb-wpc8-0000",
    selectors: bulk_selectors,
    id_category: categories.Whey,
  },
  {
    url: "https://www.bulk.com/fr/isolat-90-de-lactoserum-pur.html",
    selectors: bulk_selectors,
    id_category: categories.Whey,
  },
  {
    url: "https://www.bulk.com/fr/isolat-de-lactoserum-clarifie.html",
    selectors: bulk_selectors,
    id_category: categories.ClearWhey,
  },
  {
    url: "https://www.bulk.com/fr/formulation-complete-prise-de-masse.html",
    selectors: bulk_selectors,
    id_category: categories.Gainer,
  },
  {
    url: "https://www.bulk.com/fr/creatine-monohydrate.html",
    selectors: bulk_selectors,
    id_category: categories.Creatine,
  },
  {
    url: "https://www.bulk.com/fr/creapure-creatine-monohydrate.html",
    selectors: bulk_selectors,
    id_category: categories.Creatine,
  },
  {
    url: "https://www.bulk.com/fr/formulation-complete-complexe-multivitamines.html",
    selectors: bulk_selectors,
    id_category: categories.Vitamines,
  },
  {
    url: "https://www.bulk.com/fr/multivitamines-et-multimineraux.html",
    selectors: bulk_selectors,
    id_category: categories.Vitamines,
  },
];

module.exports = bulk_pages;
