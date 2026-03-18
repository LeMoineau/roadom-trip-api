import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import {
  WikipediaFormattedPage,
  WikipediaFormattedSection,
  WikipediaQuery,
  WikipediaResponse,
} from "../shared/types/wikipedia/Wikipedia";
import { parse } from "node-html-parser";

/**
 * Wikipedia API Service
 * @see https://www.mediawiki.org/wiki/API:Query
 */
class WikipediaService {
  baseURL: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURL = config.getEnv().wikipediaApiURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
      },
    });
  }

  /**
   * Get the formatted page of the target wikipedia page
   * @see https://fr.wikipedia.org/w/api.php?action=query&format=json&titles=Lalleu&prop=extracts&explaintext=false&exlimit=1&redirects=1
   * @param title target wikipedia page title
   * @returns preferred paragraphe of the target wikipedia page
   */
  async getFormattedPage({
    title,
  }: {
    title: string;
  }): Promise<WikipediaFormattedPage | undefined> {
    const params = {
      action: "query",
      titles: title,
      format: "json",
      prop: "extracts",
      //explaintext: false,
      redirects: 1,
    };
    const data = await this.instance
      .get("/api.php", {
        params,
      })
      .then((res) => {
        if (!!!res.data || !!res.data.error) {
          console.error(
            "no data or error in data getting wikipedia data for input: ",
            params,
            res.data,
          );
          return undefined;
        }
        return res.data as WikipediaResponse;
      })
      .catch((err) => {
        console.error("error getting wikipedia data for input: ", params, err);
        return undefined;
      });
    if (
      !!!data ||
      !!!data.query ||
      !!!data.query.pages ||
      Object.keys(data.query.pages).filter((k) => k !== "-1").length <= 0
    ) {
      console.warn(
        `no data or no pages in ${JSON.stringify(data)} for query ${JSON.stringify(params)}`,
      );
      return;
    }
    const page = Object.values(data.query.pages)[0];
    if (!!!page.extract) {
      console.warn(
        `no extract on page ${JSON.stringify(page)} for query ${JSON.stringify(params)}`,
      );
      return;
    }
    return this._parseWikipediaQuery(page);
  }

  /**
   * Parse a wikipedia query response to formatted page
   * @param query wikipedia query response
   * @returns formatted wikipedia page containing all sections of the targeted page
   */
  _parseWikipediaQuery(query: WikipediaQuery): WikipediaFormattedPage {
    const res: WikipediaFormattedPage = [];
    let current: WikipediaFormattedSection = {
      title: "Introduction",
      paragraphes: [],
    };
    const doc = parse(query.extract!.trim().split("\\n").join(""));
    for (let c of doc.children) {
      if (c.tagName === "P" && c.textContent.trim().length > 0) {
        current.paragraphes.push(c.textContent.trim());
      } else if (c.tagName.includes("H")) {
        if (current.paragraphes.length > 0) res.push({ ...current });
        current = {
          title: c.textContent,
          paragraphes: [],
        };
      } else if (c.tagName === "UL") {
        current.paragraphes.push(
          ...[...c.children].map((li) => li.textContent.trim()),
        );
      }
    }
    if (current.paragraphes.length > 0) res.push(current);
    return res;
  }
}

export default new WikipediaService();
