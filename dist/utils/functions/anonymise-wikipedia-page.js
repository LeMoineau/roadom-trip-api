"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anonymiseWikipediaPage = anonymiseWikipediaPage;
/**
 * Anonymise a wikipedia page by replacing all occurences of a word by a replacement
 * @param page target page wikipedia
 * @param toReplace word to replace
 * @param replacementText optional replacement text
 * @returns anonymised wikipedia page
 */
function anonymiseWikipediaPage(page, toReplace, replacementText = "???") {
    //TODO: improve anonymiser en mettant tout en uppercase, puis recuperer toutes les positions
    //  des occurences puis supprimer en gardant le reste du test bien formatter
    return [
        ...page.map((s) => ({
            title: s.title.split(toReplace).join(replacementText),
            paragraphes: [
                ...s.paragraphes.map((p) => p.split(toReplace).join(replacementText)),
            ],
        })),
    ];
}
