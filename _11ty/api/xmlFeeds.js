const EleventyFetch = require("@11ty/eleventy-fetch");
const feedExtractor = import("@extractus/feed-extractor");
const siteMetadata = require("./siteMetadata");
const logger = require("../helpers/logger");
const { ELEVENTY_FETCH_OPTIONS } = require("../constants");
const getFulfilledValues = require("../helpers/getFulfilledValues");
const siteConfig = require("../../content/_data/siteConfig");
const stripAndTruncateHTML = require("../helpers/stripAndTruncateHTML");

module.exports = async () => {
  const xmlFeedSites = siteMetadata().filter((site) => site.feedType === "xml");
  const { extractFromXml } = await feedExtractor;

  const feedContents = await xmlFeedSites.map(async (site) => {
    try {
      const feedData = await EleventyFetch(site.feed, {
        ...ELEVENTY_FETCH_OPTIONS,
        type: "text",
      });

      const { entries } = extractFromXml(feedData);

      // TODO: Validate article items

      const articles = entries
        .map((item) => ({
          title: item.title || siteConfig.defaultArticleTitle,
          link: item.link,
          published: item.published || new Date().toISOString(),
          description: stripAndTruncateHTML(
            item.description,
            siteConfig.maxPostLength
          ),
        }))
        .filter((item) => item)
        .sort((a, b) => new Date(b.published) - new Date(a.published))
        .slice(0, siteConfig.maxItemsPerFeed);

      return {
        ...site,
        articles,
      };
    } catch (error) {
      logger.error(
        `[${site.file}] Error processing RSS/Atom feed: ${site.feed}`
      );
      console.error(error);
    }
  });

  return getFulfilledValues(feedContents);
};
