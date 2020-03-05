# Example

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.25. It is a minimal reproduction of the issue described in https://github.com/angular/angular-cli/issues/17146.

## Issue

The `ng build` and `ng serve` commands traverse the webpack compilation differently. This results in divergent experiences when code splitting utilizing wepback `optimizations.cachegroups`.

## Steps to Reproduce

### Build
Run `npm run build` to run a build\
Open `index.html` at `dist/example/index.html`\
Observe that `angular.[hash:20].js` is not present in the scripts but is present in `dist/example`

### Serve
Run `npm run serve` to serve the example app on `:4200`\
Inspect Elements in the browser\
Note that `angular.[hash:20].js` is present in the scripts added to the body

## Additional Info
This repo uses `ngx-build-plus` to extend the webpack config but any Angular app that extends the config to create cache groups will run into the exact same problem. If the CLI is only going to support adding the 5 hardcoded entry points to the index html and not the chunks created by the entry points also, we will have to extend the index.html creation process as well to accommodate our need in our Enterprise Hybrid app. I'd rather not deviate from the CLI as much as possible.

### webpack Bundle Analyzer
I've included the `webpack-bundle-analyzer` package. By running `npm run analyze` you can see a visualization of the bundles created by this app. Note that `angular.[hash:20].js` is ~220K of code a user will only download once...until we update to v9.