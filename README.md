# The World Today — Wednesday 25 November 2026

[![news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/hadiba924-prog/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/hadiba924-prog/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

One image that sums up the world's news of Wednesday, 25 November 2026.

Instead of a single front-page story, the image is a dense one-page data
sheet: a lead story (Russia calling Ukraine's ship strikes "terrorism"),
then 37 more dated stories grouped by region and field — Europe, the
Middle East, Asia-Pacific, Africa, the Americas, Science & Tech, Business,
Sport, and a world round-up — so a reader who missed the day can tell what
happened from the picture alone. Every story was first reported on
25 November 2026, and the date is printed large at the top of the page.

The image is rendered programmatically (Python + Pillow) for perfectly
legible text at small sizes; `main.ts` simply copies it to the output
directory after checking its size, PNG magic bytes, and dimensions.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/entry.png` (1024×1024, under 1 MiB) and prints its
SHA-256. Running it twice produces byte-identical output.
