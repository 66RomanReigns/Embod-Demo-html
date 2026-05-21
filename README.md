# Conquer demo site

Static project page for the Conquer real-robot demonstrations.

## Local preview

Use a static server that supports HTTP range requests so MP4 seeking works:

```powershell
npx serve . -l 8766 --no-clipboard
```

Then open:

```text
http://127.0.0.1:8766
```

Avoid `python -m http.server` for previewing these videos. It returns `200 OK`
for range requests, so browser video seeking can fail or feel broken.

## GitHub Pages

For a user site URL:

```text
https://<github-username>.github.io/
```

create a repository named exactly:

```text
<github-username>.github.io
```

and put the contents of this directory at the repository root.

For this project page URL:

```text
https://66RomanReigns.github.io/Embod-Demo-html/
```

the repository includes `.github/workflows/static.yml`. In GitHub Pages settings,
set `Source` to `GitHub Actions`, then push to `main`. The workflow will deploy
the static site.

## Video hosting note

GitHub blocks regular Git pushes containing files larger than 100 MiB. The large
tracking videos in this site have been remuxed/re-encoded to stay below that
limit while preserving 1080p resolution and 60 FPS playback.
