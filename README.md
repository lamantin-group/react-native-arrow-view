What is it
----------

Bootstrap template for create libraries in React Native environment

How to use it
-------------

Clone repository in development folder (it is created automatically)
```bash
git clone https://github.com/whalemare/react-native-library.git react-native-library-name
```

Move into cloned folder
```bash
cd react-native-library-name
```

Check that sample started correctly
```bash
npm run start:first
```

Reset git repository
```bash
npm run git:reset
```

Update library info in `package.json` to your own
```json
  "name": "react-native-library", // required for correct work renaming
  "author": "whalemare", // required for correct work renaming
  "version": "1.0.0",
  "description": "Library bootstrap",
  "license": "Apache 2.0",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/whalemare/react-native-library.git"
  }
```

Roadmap
--------

Common
- [x] TypeScript for library and example
- [x] Properly configured example for library
- [x] Autocomplete is working
- [x] ESLint and Prettier
- [x] .npmignore publish template
- [x] Automatically generating typings when publish
- [x] Hot library replacement in development 
- [x] MIT License template
- [x] VSCode configuration for run debugger
- [ ] Hot reloading for example (working only live reload)
- [ ] CI for checking build status

Android features
- [x] Android min api 16
- [x] Android target api 29
- [x] Kotlin 1.3.50
- [x] Gradle 5.6.2
- [x] Added most popular library-source repositories (jcenter, google, jitpack)
- [ ] Fix local.properties to work on independent environment
- [ ] Extensions mapper to language types from ReactNative types

iOS features
- [x] iOS library module support
- [x] Swift support for library ios module

---

```
The MIT License

Copyright (c) 2010-2019 Lamantin Group, LTD. https://lamantin.group

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```