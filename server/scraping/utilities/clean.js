/**
 * Cette fonction formatte et clean les quantités en g
 *
 * @param {string} quantity - Le premier nombre à additionner.
 * @returns {string} La quantité en g au format 'XXXXg'
 */
function cleanQuantity(quantity) {
    // On vérifie si quantity n'est pas null
    if (quantity) {
        // Supprimer tous les espaces blancs de l'entrée pour éviter les erreurs de format
        const cleanedInput = quantity.replace(/\s+/g, '');
        // Vérifier si l'entrée est en kilogrammes (kg) ou grammes (g)
        if (cleanedInput.match(/^\d+\s*kg$/i)) {
            // Si l'entrée est en kilogrammes, la convertir en grammes (1 kg = 1000 g)
            const quantityInKg = parseFloat(cleanedInput);
            const quantityInGrams = quantityInKg * 1000;
            return `${quantityInGrams}g`;
        } else if (cleanedInput.match(/^\d+\s*g$/i)) {
            // Si l'entrée est déjà en grammes, la laisser telle quelle
            return cleanedInput;
        } else {
            // Si l'entrée n'est pas en un format reconnu, retourner l'entrée d'origine
            return quantity;
        }
    } else {
        return quantity;
    }
}

// Exporting the function, not its result
module.exports = {
    cleanQuantity
};