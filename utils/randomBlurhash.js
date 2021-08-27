const randomBlurhash = [
  'T6Pj0^i_.A_3t7t7*0o#Dg_3R*D%',
  'TKO2?U%2Tw]~RBVZ};RPxutLOtxZ',
  'TEHV6nWB2ypyoJad.7kCMdS#M|%1',
  'TDNb#[Di%z~EsWjZ4okDkCo_bERj',
  'T7KcCR4.9G?wtPE1;dMzJ*01xa-p',
  'TXKTxo00=|~pIUE1t7t7IUt7ofWA',
  'TDLoyQiwNZ_NRkt74URjxuNwRkbF',
  'TPKw8[00_4-;RPxu9aozobkUWBoM',
  'TPL|ZB00?I~qRjNFbct6M{x[V[V[',
  'TLK0Wtsl^j~WaxbuM{j[I:ocj[sn',
];
const getRandomBlurhash = () => {
  return randomBlurhash[Math.floor(Math.random() * 9)];
};
module.exports = getRandomBlurhash;
