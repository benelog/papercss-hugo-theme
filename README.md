# PaperCSS


[![Netlify Status](https://api.netlify.com/api/v1/badges/3e3a0d5d-854f-45f2-9e30-e8a86907956a/deploy-status)](https://app.netlify.com/sites/papercss-hugo-theme/deploys)

A Hugo theme made with PaperCSS, the less formal CSS framework.

## Table of contents

- [Demo](#demo)
- [Minimum Hugo version](#minimum-hugo-version)
- [Installation](#installation)
- [Updating](#updating)
- [Run example site](#run-example-site)
- [Configuration](#configuration)
- [Favicons](#favicons)
- [Shortcodes](#shortcodes)
- [Disable toc for a blog post](#disable-toc-for-a-blog-post)
- [Disable summary for a blog post](#disable-summary-for-a-blog-post)
- [Getting help](#getting-help)
- [Credits](#credits)

## Demo

https://papercss-hugo-theme.netlify.com/

## Minimum Hugo version

Hugo version `0.148.2` or higher is required. View the [Hugo releases](https://github.com/gohugoio/hugo/releases) and download the binary for your OS.

## Installation

From the root of your site:

```
git submodule add https://github.com/zwbetz-gh/papercss-hugo-theme.git themes/papercss-hugo-theme
```

## Updating

From the root of your site:

```
git submodule update --remote --merge
```

## Run example site

From the root of `themes/papercss-hugo-theme/exampleSite`:

```
hugo server --themesDir ../..
```

## Configuration

Copy `config.yaml` from the [`exampleSite`](https://github.com/zwbetz-gh/papercss-hugo-theme/tree/master/exampleSite), then edit as desired. 

## Reading journal UI

The year-grouped book list supports title/tag search and year links. The tag index supports search and sorting by count or name. Search and sort state are kept in the URL, so links can be shared and restored after opening a book. With JavaScript disabled, all entries and navigation links remain available.

A standalone image at the start of a post is displayed as a book cover. A following standalone bookstore link is moved into a `figcaption`; YES24, Aladin and Kyobo links receive short labels. Introductory prose stays at the normal body size. H2/H3 headings appear in the collapsible table of contents.

UI strings are provided in Korean and English in `i18n/`. Common tag acronyms are formatted for display without changing their URLs.

## Favicons

Upload your image to [RealFaviconGenerator](https://realfavicongenerator.net/) then copy-paste the generated favicon files under `static`. 

## Shortcodes

See the [full list of supported shortcodes](https://papercss-hugo-theme.netlify.com/papercss-shortcodes/).

## Disable toc for a blog post

Blog posts with two or more H2/H3 headings automatically get a nested table of contents. More than six entries are collapsed by default; the native disclosure works without JavaScript. To disable this set `toc` to `false`. For example:

```
---
title: "My page with a few headings"
toc: false
---
```

## Disable summary for a blog post

The homepage blog post listing shows a summary for each post. To disable this for an individual post set `show_summary` to `false`. For example:

```
---
title: "My page with some stellar content"
show_summary: false
---
```

## Getting help

If you run into an issue that isn't answered by this documentation or the [`exampleSite`](https://github.com/zwbetz-gh/papercss-hugo-theme/tree/master/exampleSite), then visit the [Hugo forum](https://discourse.gohugo.io/). The folks there are helpful and friendly. **Before** asking your question, be sure to read the [requesting help guidelines](https://discourse.gohugo.io/t/requesting-help/9132).

## Credits

Thank you to [Rhyne Vlaservich](https://www.vlaservich.com/) for creating [PaperCSS](https://www.getpapercss.com/), and all the  [contributors](https://github.com/papercss/papercss/graphs/contributors).
