# inline-tailwindcss

> use tailwindcss for HTML emails and Embedding HTML in 3rd-party websites

- [inline-tailwindcss](#inline-tailwindcss)
  - [How to use?](#how-to-use)
    - [Install](#install)
    - [Create tailwind.config.js](#create-tailwindconfigjs)
    - [CLI](#cli)
      - [`npx inline-tailwindcss dev`](#npx-inline-tailwindcss-dev)
      - [`npx inline-tailwindcss build`](#npx-inline-tailwindcss-build)
    - [JS API](#js-api)
  - [Options](#options)

## How to use?

### Install

`npm i -D inline-tailwindcss tailwindcss` / `yarn add -D inline-tailwindcss tailwindcss`

### Create tailwind.config.js

`npx tailwindcss init`

### CLI

and put your html fragments into this folder:

create a html file: `index.html`:

```html
<h1 class="text-3xl font-bold underline text-pink-500 flex h-full ">
  Hello world!
</h1>
```

#### `npx inline-tailwindcss dev`

it will generate inline html in your `dist/*.html` files and keep watching your file changes.

#### `npx inline-tailwindcss build`

generate files without watch

### JS API

```js
// cjs
const { build } = require('inline-tailwindcss')

await build()
```

## Options

```ts
export interface UserDefinedOptions {
  /**
   * @description html file abs path
   */
  filepath?: string
  /**
   * @description tailwind config path
   * @default `process.cwd() + tailwind.config.js`
   */
  tailwindConfigPath?: string
  /**
   * @description base tailwindcss
   * @default `@tailwind utilities;`
   */
  baseCss?: string
  /**
   * @description out put dir
   * @default 'dist''
   */
  outDir?: string
  /**
   * @description if write to disk
   * @default true
   */
  write?: boolean
  /**
   * @description juiceOptions
   */
  juiceOptions?: JuiceOptions
}
```
