const test = require("node:test");
const assert = require("node:assert");
const { createApp, greet } = require("../src/app");

test("greet returns a default greeting", () => {
  assert.strictEqual(greet(), "Hello, World!");
});

test("greet uses the provided name", () => {
  assert.strictEqual(greet("Asaver"), "Hello, Asaver!");
});

test("GET /health returns ok", async () => {
  const server = createApp().listen(0);
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/health`);
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(await res.json(), { status: "ok" });
  } finally {
    server.close();
  }
});

test("GET / returns the home page", async () => {
  const server = createApp().listen(0);
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/?name=Sam`);
    const body = await res.text();
    assert.strictEqual(res.status, 200);
    assert.ok(body.includes("Hello, Sam!"));
  } finally {
    server.close();
  }
});
