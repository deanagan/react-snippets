# Nextjs version


## Project creation

1. Did `npm init -y`
2. `npm install react react-dom next`
3. Under scripts, added:

    ```
    "dev": "next",
    "build": "next build",
    "start": "next start"
    ```

4. Create a `pages` folder where we build our react home page.
5. Enter `npm run build`
6. Create `index.js` file.
    ```javascript
    import React from "react";

    const inputElement = () => {
        return <input placeholder="Test" />;
    }

    export default inputElement;
    ```
7. Created basic functional component.
8. Do `npm run dev`. Note, set port via `-- -p [portnumber]` if port already used.