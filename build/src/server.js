"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("../config/config");
app_1.app.listen(config_1.config.port, () => console.log(`Example app listening at ${config_1.config.baseURL}`));
