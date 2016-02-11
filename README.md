# Tinderlicht

First:
``` npm install ```

Copy `config.example.json` to `config.json` and adjust all the values.

Backend (the [secure](https://www.firebase.com/docs/web/guide/login/custom.html#section-authenticating-servers) connection to Firebase):
``` npm run backend ```


Deploy:
Creates a deployable bundle.
``` npm run deploy ```

Deploying works by configuring the backend server's host in `config.json` and deploying it, 
and deploying the website ( index.html, bundle.js and vendor.bundle.js ).

## debugging purposes

Webpack test server:
``` npm run dev ```


Output debug messages of the backend server
``` npm run backend:dev ```

