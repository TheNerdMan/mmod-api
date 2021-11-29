"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path = __importStar(require("path"));
const rootPath = path.normalize(__dirname + '/..'), env = process.env.NODE_ENV || 'development';
const configs = {
    test: {
        root: rootPath,
        baseURL: 'http://localhost:30002',
        baseURL_API: 'http://localhost:30002',
        baseURL_Auth: 'http://localhost:30002',
        baseURL_CDN: 'http://localhost:30002',
        domain: 'localhost',
        port: 30002,
        accessToken: {
            secret: 'G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x!A',
            expTime: '15m',
            gameExpTime: '24h'
        },
        discord: {
            clientID: 'discord1234',
            clientSecret: 'shhhhh!',
        },
        twitch: {
            clientID: 'twitch1234',
            clientSecret: '*hey lil mama lemme whisper in your ear*',
        },
        twitter: {
            consumerKey: 'twitter12354',
            consumerSecret: '*lemme tell ya somethin youd like to hear*',
        },
        steam: {
            webAPIKey: (_a = process.env.STEAM_WEB_API_KEY) !== null && _a !== void 0 ? _a : "undefined",
            preventLimited: true,
        },
        db: {
            name: 'momentum_test',
            userName: 'mom_test',
            password: 'password',
            host: 'db',
            logging: false,
            pool: {
                max: 15,
                min: 0,
                acquire: 15000,
                idle: 500
            }
        },
        session: {
            secret: 'keyboard cat',
        },
    },
    development: {
        root: rootPath,
        baseURL: 'http://localhost:30002',
        baseURL_API: 'http://localhost:30002',
        baseURL_Auth: 'http://localhost:30002',
        baseURL_CDN: 'http://localhost:30002',
        domain: 'localhost',
        port: 30002,
        accessToken: {
            secret: 'G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x!A',
            expTime: '15m',
            gameExpTime: '24h'
        },
        discord: {
            clientID: (_b = process.env.DISCORD_CLIENT_ID) !== null && _b !== void 0 ? _b : "undefined",
            clientSecret: (_c = process.env.DISCORD_CLIENT_SECRET) !== null && _c !== void 0 ? _c : "undefined",
        },
        twitch: {
            clientID: (_d = process.env.TWITCH_CLIENT_ID) !== null && _d !== void 0 ? _d : "undefined",
            clientSecret: (_e = process.env.TWITCH_CLIENT_SECRET) !== null && _e !== void 0 ? _e : "undefined",
        },
        twitter: {
            consumerKey: (_f = process.env.TWITTER_CONSUMER_KEY) !== null && _f !== void 0 ? _f : "undefined",
            consumerSecret: (_g = process.env.TWITTER_CONSUMER_SECRET) !== null && _g !== void 0 ? _g : "undefined",
        },
        steam: {
            webAPIKey: (_h = process.env.STEAM_WEB_API_KEY) !== null && _h !== void 0 ? _h : "undefined",
            preventLimited: true,
        },
        db: {
            name: 'momentum',
            userName: 'mom',
            password: 'password',
            host: 'db',
            logging: console.log,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        },
        session: {
            secret: 'keyboard cat',
        },
    },
    production: {
        root: rootPath,
        baseURL: (_j = process.env.BASE_URL) !== null && _j !== void 0 ? _j : "undefined",
        baseURL_API: (_k = process.env.API_URL) !== null && _k !== void 0 ? _k : "undefined",
        baseURL_Auth: (_l = process.env.AUTH_URL) !== null && _l !== void 0 ? _l : "undefined",
        baseURL_CDN: (_m = process.env.CDN_URL) !== null && _m !== void 0 ? _m : "undefined",
        domain: 'momentum-mod.org',
        port: +((_o = process.env.NODE_PORT) !== null && _o !== void 0 ? _o : "undefined"),
        accessToken: {
            secret: (_p = process.env.JWT_SECRET) !== null && _p !== void 0 ? _p : "undefined",
            expTime: '15m',
            gameExpTime: '24h'
        },
        discord: {
            clientID: (_q = process.env.DISCORD_CLIENT_ID) !== null && _q !== void 0 ? _q : "undefined",
            clientSecret: (_r = process.env.DISCORD_CLIENT_SECRET) !== null && _r !== void 0 ? _r : "undefined",
        },
        twitch: {
            clientID: (_s = process.env.TWITCH_CLIENT_ID) !== null && _s !== void 0 ? _s : "undefined",
            clientSecret: (_t = process.env.TWITCH_CLIENT_SECRET) !== null && _t !== void 0 ? _t : "undefined",
        },
        twitter: {
            consumerKey: (_u = process.env.TWITTER_CONSUMER_KEY) !== null && _u !== void 0 ? _u : "undefined",
            consumerSecret: (_v = process.env.TWITTER_CONSUMER_SECRET) !== null && _v !== void 0 ? _v : "undefined",
        },
        steam: {
            webAPIKey: (_w = process.env.STEAM_WEB_API_KEY) !== null && _w !== void 0 ? _w : "undefined",
            preventLimited: true,
        },
        db: {
            name: 'momentum',
            userName: (_x = process.env.MOM_DATABASE_USER) !== null && _x !== void 0 ? _x : "undefined",
            password: (_y = process.env.MOM_DATABASE_PW) !== null && _y !== void 0 ? _y : "undefined",
            host: 'db',
            logging: false,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        },
        session: {
            secret: (_z = process.env.EXPRESS_SESSION_SECRET) !== null && _z !== void 0 ? _z : "undefined",
        },
    }
};
// @ts-expect-error: We are using the enviroment string to get the config
exports.config = configs[env];
