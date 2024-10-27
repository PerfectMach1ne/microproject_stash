import * as http from 'node:http';
import { openSync, readFileSync, closeSync, /*writeFileSync*/ } from 'node:fs';
// import { Buffer } from 'node:buffer';

const YAPSON_PATH = "./yapstash/yapson-v2024-10-25.json";

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
  console.log(parseYapson(YAPFILE));
  closeYapson(YAPFILE); 

  // serve dat json at :5501
}

run();