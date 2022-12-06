# EPGER
The Easy Package Manager
EPGER works on macOS, and Linux.
- npm: [https://www.npmjs.com/package/epger](https://www.npmjs.com/package/epger)
## How to use
### Make new directory in current location
```bash
npx epger /newDirectory
```
### Make new file, myFile.txt, in ./newDirectory
```bash
npx epger /newDirectory myFile.txt
```
### If you make files with some extension EPGER support,
```bash
npx epger /newDirectory MyComponent.jsx
```
```jsx
// Created File
// ./newDirectory/MyComponent.jsx
import React from 'react';
const MyComponent = () => {};
export default MyComponent;
```
### More complex examples…
```bash
npx epger index.html style.css /pages Login.jsx SignUp.jsx .. /components MyButton.jsx MyInput.jsx
```
It can make:
```
root
├── index.html
├── style.css
├── pages
│   ├── Login.jsx
│   ├── SignUp.jsx
└── components
    ├── MyButton.jsx
    ├── MyInput.jsx
```