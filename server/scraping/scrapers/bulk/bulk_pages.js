// Import des id categories
const categories = require("../../product.category");

const bulk_pages = [
  {
    url: "https://www.bulk.com/fr/products/proteine-whey-poudre/bpb-wpc8-0000",
    id_category: categories.Whey,
  },
  {
    url: "https://www.bulk.com/fr/isolat-90-de-lactoserum-pur.html",
    id_category: categories.Whey,
  },
  {
    url: "https://www.bulk.com/fr/isolat-de-lactoserum-clarifie.html",
    id_category: categories.ClearWhey,
  },
  {
    url: "https://www.bulk.com/fr/formulation-complete-prise-de-masse.html",
    id_category: categories.Gainer,
  },
  {
    url: "https://www.bulk.com/fr/creatine-monohydrate.html",
    id_category: categories.Creatine,
  },
  {
    url: "https://www.bulk.com/fr/creapure-creatine-monohydrate.html",
    id_category: categories.Creatine,
  },
  {
    url: "https://www.bulk.com/fr/formulation-complete-complexe-multivitamines.html",
    id_category: categories.Vitamines,
  },
  {
    url: "https://www.bulk.com/fr/multivitamines-et-multimineraux.html",
    id_category: categories.Vitamines,
  },
];

module.exports = bulk_pages;
