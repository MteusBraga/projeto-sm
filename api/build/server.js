"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.app.listen(process.env.PORT || 3333, () => {
    console.log(`Server is listening ${process.env.PORT || 3333}`);
});
