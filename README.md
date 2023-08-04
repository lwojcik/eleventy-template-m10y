# M10y - RSS Aggregator Starter Based On Eleventy

**M10y** (abbreviation for 'multiplicity') is a simple starter pack based on [Eleventy static site generator](https://11ty.dev) that allows you to create RSS aggregator site.

Alongside the template code, it also contains a GitHub action required to keep the site up to date.

[View demo](https://eleventy-m10y.lkmt.us/)

Want to see in in action? Check out [Blogworm.eu](https://blogworm.eu/).

## Instant deploy

Netlify:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/lwojcik/eleventy-template-m10y)

Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lwojcik/eleventy-template-m10y)

## Features

- light / dark mode switcher + honoring color scheme preference
- pagination
- translation ready (separate file with static phrases)
- automatic favicon generation
- support for RSS and JSON feeds
- custom avatar alongside each feed item

## Setup and personalization

1. Fork the repository.
2. Configure the site according to your preferences - see [`siteConfig.js`](./content/_data/siteConfig.js) and template files.
3. Modify the list of feeds you want to aggregate - they are located in [`content/sites`](./content/sites/).
   1. Each site has the following properties:
      - `name` - name of the site
      - `url` - URL of the site
      - `avatar` - image to display alongside the site name (e.g. favicon). During the build process the image will be downloaded, resized and served locally
      - `feed` - URL of the RSS or JSON feed to fetch articles from
4. Deploy the site to Netlify or Vercel
5. Set up the GitHub action in [`.github/workflows/scheduled_build.yml`](./.github/workflows/scheduled_build.yml):
   1. Create a build hook URL and save it as a GitHub secret in your repository - e.g. `NETLIFY_BUILD_HOOK_URL` or `VERCEL_BUILD_HOOK_URL`
6. Done! Your aggregator is up and running.

## Translation file

See [`phrases.js`](./content/_data/phrases.js) for the list of translatable static phrases.

## Contributions

Contributions of the following kind are welcome:

- bug reports / fixes
- feature suggestions / improvements of existing features

Before contributing be sure to read [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

Licensed under the [MIT license](./LICENSE).
