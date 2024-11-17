# PubQuiz24 Admin + Presenation App

Whole app is written in nuxt 3.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup CMS _(Directus)_

Follow a readme in https://github.com/LubosAngus/PubQuiz24-Directus-CMS

## App

First of all, use node in version 22. (check .nvmrc)

Next step is classic

```sh
# install depedencies
npm install

# build the app
npm run build

# run the app
npm run start
```

### Quiz Admin

When the app is up and running, you can go to [http://localhost:3000/admin](localhost:3000/admin).

There you need to choose quiz first and from that moment on, you're good to go.

#### Spotify authorization

Go to [spotify dashboard](https://developer.spotify.com/dashboard) and [create app](https://developer.spotify.com/dashboard/create).

You need to declare redirect url.

```
http://localhost:3000/admin
```

And enable APIs

```
Web API
Web Playback SDK
```

Then copy your Client ID and paste it to .env `NUXT_PUBLIC_SPOTIFY_CLIENT_ID`

### Presentation

Presentation is running on index of [http://localhost:3000/](localhost:3000).

All the data are loaded to cache on page enter.

After everything is loaded, you need to press start, for 2 main reasons:

1. You need to interact with the website in order to control audio _(play, etc.)_ via javascript
2. To set nosleep, to prevent device from getting into sleep mode

After data is loaded, you're redirected to the page, that's containing data.

After each refresh, you're redirected to index of the page. This is happening to prevent bad data loading and incorrect stores initialization.

## Running on local network

Before starting server, app will log possible network locations of the app, so connect to your local wifi and try those out on the other machine.

## Troubleshooting

On `npm install`, I was bulding it on windows. You might want to remove package-lock.json and run `npm install` again.
