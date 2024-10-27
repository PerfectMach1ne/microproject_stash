import * as http from 'node:http';
import * as htmltpdf from 'html-pdf-node';
import { openSync, readFileSync, closeSync, /*writeFileSync*/ } from 'node:fs';
// import { Buffer } from 'node:buffer';

const YAPSON_PATH = "./yapstash/yapson-v2024-10-25.json";
const HOSTNAME = '192.168.1.177';
const PORT = 5501;


function openYapson(yapson_path) {
  let yapfile;

  try {
    yapfile = openSync(yapson_path);
  } catch (err) {
    console.log("[ERR] An error occurred while trying to open the yapfile.");
  }
  
  return yapfile;
}

function closeYapson(yapfile) {
  try {
    closeSync(yapfile);
  } catch (err) {
    console.log("[ERR] An error occurred while trying to close the yapfile.");
  }
}

function parseYapson(yapfile) {
  let raw = readFileSync(yapfile, 'utf-8');
  let parsedObj = JSON.parse(raw);
  return parsedObj;
}

function run() {
  const YAPFILE = openYapson(YAPSON_PATH);
  let yapjson = parseYapson(YAPFILE);
  yapjson = JSON.stringify(yapjson);
  closeYapson(YAPFILE); 

  const SERVER = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(yapjson)
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
  
  SERVER.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
  });
}

run();