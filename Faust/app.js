import { openSync, readFileSync, closeSync, writeFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';

const PRIVATED_WD_PATH = 'private_wd.json';
const PROTECTED_WD_PATH = 'protected_wd.json';
const PUBLIC_WD_PATH = 'public_wd.json';

function openItAll() {
  let private_file, protected_file, public_file = undefined;

  try {
    private_file = openSync(PRIVATED_WD_PATH);
    protected_file = openSync(PROTECTED_WD_PATH);
    public_file = openSync(PUBLIC_WD_PATH);
  } catch (err) {
    console.error("[ERROR] Wut da heeeeeeeeeeeeeeel!!! Oooh maa gaaaad No waaayyaayyaaaaae~~~!!");
  }

  try {
    let private_json = readFileSync(private_file, 'utf-8');
    private_json = JSON.parse(private_json);
    let protected_json = readFileSync(protected_file, 'utf-8');
    protected_json = JSON.parse(protected_json);
    let public_json = readFileSync(public_file, 'utf-8');
    public_json = JSON.parse(public_json);

    return [private_json, protected_json, public_json];
  } catch (err) {
    console.error("[ERROR] Wut da heeeeeeeeeeeeeeel!!! Oooh maa gaaaad No waaayyaayyaaaaae~~~!!");
  }
  
  try {
    closeSync(private_file);
    closeSync(protected_file);
    closeSync(public_file);
  } catch (err) {
    console.error("[ERROR] Wut da heeeeeeeeeeeeeeel!!! Oooh maa gaaaad No waaayyaayyaaaaae~~~!!");
  }
}

function listAllThingdoings(thingdoings, printMode = false) {
  let [priv, publ] = thingdoings;
  let privAndPubl = priv.thingdoings.concat(publ.thingdoings);

  function compareIDs(obj_a, obj_b) {
    return obj_a.id - obj_b.id;
  }
  privAndPubl.sort(compareIDs);

  if (!printMode) {
    return privAndPubl;
  } else {
    console.log(privAndPubl);
  }
}

function getLastID(privAndPubl) {
  return privAndPubl[privAndPubl.length - 1];
}

/**
 * 
 * @param {Array} thingdoings 
 * @param {number} lastID 
 */
function addPublic(publ, lastID) {
  let publ_ = publ.thingdoings;
  let id_ = Number(lastID.id + 1);
  let thingdoing = process.argv[4];

  publ_.push({
    id: id_,
    date: new Date(),
    thingdoing: thingdoing
  });

  return publ_;
}

/**
 * 
 * @param {[Array, Array]} thingdoigns 
 * @param {number} lastID 
 */
function addPrivate(thingdoigns_, lastID) {
  let [priv, prot] = thingdoigns_;
  priv = priv.thingdoings;
  prot = prot.thingdoings;
  let id_ = Number(lastID.id + 1);
  let thingdoing = process.argv[4];

  priv.push({
    id: id_,
    date: new Date(),
    thingdoing: thingdoing
  });

  prot.push({
    id: id_ 
  });

  return [priv, prot];
}

function writeAndSavePriv(priv, prot) {
  try {
    let private_json = JSON.stringify(priv, null, 4);
    let protected_json = JSON.stringify(prot, null, 4);

    private_json = new Uint8Array(Buffer.from(private_json));
    protected_json = new Uint8Array(Buffer.from(protected_json));

    writeFileSync(PRIVATED_WD_PATH, private_json);
    writeFileSync(PROTECTED_WD_PATH, protected_json);
  } catch (err) {
    console.log(err);
    console.error("[ERROR] Wut da heeeeeeeeeeeeeeel!!! Oooh maa gaaaad No waaayyaayyaaaaae~~~!!");
  }
}

function writeAndSavePubl(publ) {
  try {
    let public_json = JSON.stringify(publ, null, 4);

    public_json = new Uint8Array(Buffer.from(public_json));

    writeFileSync(PUBLIC_WD_PATH, public_json);
  } catch (err) {
    console.log(err);
    console.error("[ERROR] Wut da heeeeeeeeeeeeeeel!!! Oooh maa gaaaad No waaayyaayyaaaaae~~~!!");
  }
}

function main() {
  let [priv, prot, publ] = openItAll(); 
  // listAllThingdoings([priv, prot, publ]);

  switch (process.argv[2]) {
    case 'list':
      listAllThingdoings([priv, publ], true);
      break;
    case 'last':
      let thingdoings = listAllThingdoings([priv, publ]) 
      console.log(getLastID(thingdoings));
      break;
    case 'add':
      let lastID = getLastID(listAllThingdoings([priv, publ])) 

      if (process.argv[3] === 'priv') {
        let [priv_, prot_] = addPrivate([priv, prot], lastID);
        writeAndSavePriv(
          {class: "private", thingdoings: priv_},
          {class: "protected", thingdoings: prot_}
        );
      } else if (process.argv[3] === 'publ') {
        let publ_ = addPublic(publ, lastID);
        writeAndSavePubl(
          {class: "public", thingdoings: publ_}
        );
      }

      break;
  }
}

main();
