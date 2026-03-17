import { WikipediaFormattedPage } from "../../shared/types/wikipedia/Wikipedia";

/**
 * Anonymise a wikipedia page by replacing all occurences of a word by a replacement
 * @param page target page wikipedia
 * @param toReplace word to replace
 * @param replacementText optional replacement text
 * @returns anonymised wikipedia page
 */
export function anonymiseWikipediaPage(
  page: WikipediaFormattedPage,
  toReplace: string,
  replacementText: string = "???",
): WikipediaFormattedPage {
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
