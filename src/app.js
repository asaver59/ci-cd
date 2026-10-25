const express = require("express");

function greet(name) {
  const clean = (name || "World").toString().trim();
  return `Hello, ${clean || "World"}!`;
}

function createApp() {
  const app = express();

  app.get("/", (req, res) => {
    const appName = process.env.APP_NAME || "CI/CD Demo";
    res.send(
      `<!doctype html><html><head><meta charset="utf-8"><title>${appName}</title></head>` +
        `<body style="font-family:sans-serif;text-align:center;margin-top:15vh">` +
        `<h1>${greet(req.query.name)}</h1>` +
        `<p>Welcome to <b>${appName}</b>. This page was deployed automatically.</p>` +
        `</body></html>`
    );
  });

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  return app;
}

module.exports = { createApp, greet };
