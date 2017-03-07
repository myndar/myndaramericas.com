## To get started

```sh
$ echo '.gems' > .rbenv-gemsets
$ bundle instsll
$ yarn install
```

In `_config.yml`, set `url` to Netlify url (or custom domain)

## Modifications

- no `rev()` on assets
- use `src` and `dist` as source and destination
- no `inject`
- links to `css` and `js` that point to `site.url` in production

## Netlify
```
Branch: master
Build Cmd: gulp build --prod
Public folder: dist/
```

## Cloud Cannon
```
JEKYLL_ENV: production
```
