const http = require("http");

const data = JSON.stringify({
  role: "computer engineering grad",
  headline: "building websites",
  headline_1: "Aspiring frontend dev",
  shortbio: "Testing update",
  cta: "hire me",
  about: "Test about section",
  image_src: "/img/profileimg.png"
});

const req = http.request({
  hostname: "localhost",
  port: 3000,
  path: "/api/hero",
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
}, (res) => {
  let body = "";
  res.on("data", (chunk) => body += chunk);
  res.on("end", () => console.log("Response:", body));
});

req.on("error", (e) => console.error(e));
req.write(data);
req.end();
