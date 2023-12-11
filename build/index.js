"use strict";
// src/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const postgrid_node_client_1 = require("postgrid-node-client");
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
// Use middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // for parsing application/json
// Initialize the PostGrid client with your API keys.
const postGridClient = new postgrid_node_client_1.PostGrid({
    mail: process.env.POSTGRID_MAIL_API_KEY,
    addr: process.env.POSTGRID_ADDR_API_KEY,
});
// Root endpoint
app.get('/', (req, res) => {
    res.send('PostGrid Backend is running.');
});
// Route to create a letter
app.post('/create-letter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, to, from, pdf } = req.body;
        // Call the PostGrid API to create a letter 
        const response = yield postGridClient.letter.create({
            description: description,
            pdf: pdf, // PDF should be a URL or Base64 string according to PostGrid's API spec
            to: to,
            from: from,
        });
        res.json({ success: true, letter: response });
    }
    catch (error) {
        console.error('Error creating letter via PostGrid:', error);
        res.status(500).json({ success: false, message: "error.message" });
    }
}));
// Define port and start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
