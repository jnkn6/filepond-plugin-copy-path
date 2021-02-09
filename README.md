# filepond-plugin-copy-path

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jnkn6/filepond-plugin-copy-path/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/filepond-plugin-copy-path.svg)](https://www.npmjs.com/package/filepond-plugin-copy-path)

This is a simple plugin of FilePond that adds button which copy uploaded file path(URL) at clipboard.

## Quick Start

Install using npm:

```bash
npm install filepond-plugin-copy-path
```

Then import in your project:

```js
import * as FilePond from "filepond";
import FilePondPluginCopyPath from "filepond-plugin-copy-path";
```

Or reference it by CDN

```html
<script src="https://unpkg.com/filepond-plugin-copy-path/dist/filepond-plugin-copy-path.min.js"></script>
```


Register the plugin:

```js
FilePond.registerPlugin(FilePondPluginCopyPath);
```

Create a new FilePond instance as normal.

```js
const pond = FilePond.create({
  name: "filepond",
});

// Add it to the DOM
document.body.appendChild(pond.element);
```

The functionality will become active after uploading a file.

## Change the defaults

If you want you can change the defaults for this plugin

in the javascript
```js
pond.setOptions({
    server: { // This plugin uses server option and serverID of file to get path.
        url: 'http://127.0.0.1:8080',
        load: '/custom_load_path/'
    }
    labelButtonCopyPath: 'Custom label', // by default 'Copy uploaded file path'
    copyRelativePath: true, // by default false
    alertCopyPath: true // by default true
 });
```

[View the demo](https://jnkn6.github.io/filepond-plugin-copy-path/)
