"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import "./config/init";
const routes_1 = __importDefault(require("./routes/routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = __importDefault(require("./config/swagger-config"));
const app = (0, express_1.default)();
const jsonParser = body_parser_1.default.json();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app.use(jsonParser);
app.use((0, cors_1.default)());
app.use(express_1.default.static(`./public`));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default));
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
