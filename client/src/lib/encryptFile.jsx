function readfile(file){
  return new Promise((resolve, reject) => {
    var fr = new FileReader();  
    fr.onload = () => {
      resolve(fr.result )
    };
    fr.readAsArrayBuffer(file);
  });
}

export async function encryptfile(objFile,encPassPhrase,aEncsavefile) {

  var plaintextbytes=await readfile(objFile)
  .catch(function(err){
    console.error(err);
  });	
  var plaintextbytes=new Uint8Array(plaintextbytes);

  var pbkdf2iterations=10000;
  var passphrasebytes=new TextEncoder("utf-8").encode(encPassPhrase);
  var pbkdf2salt=window.crypto.getRandomValues(new Uint8Array(8));

  var passphrasekey=await window.crypto.subtle.importKey('raw', passphrasebytes, {name: 'PBKDF2'}, false, ['deriveBits'])
  .catch(function(err){
    console.error(err);
  });
  console.log('passphrasekey imported');

  var pbkdf2bytes=await window.crypto.subtle.deriveBits({"name": 'PBKDF2', "salt": pbkdf2salt, "iterations": pbkdf2iterations, "hash": 'SHA-256'}, passphrasekey, 384)		
  .catch(function(err){
    console.error(err);
  });
  console.log('pbkdf2bytes derived');
  pbkdf2bytes=new Uint8Array(pbkdf2bytes);

  keybytes=pbkdf2bytes.slice(0,32);
  ivbytes=pbkdf2bytes.slice(32);

  var key=await window.crypto.subtle.importKey('raw', keybytes, {name: 'AES-CBC', length: 256}, false, ['encrypt']) 
  .catch(function(err){
    console.error(err);
  });
  console.log('key imported');		

  var cipherbytes=await window.crypto.subtle.encrypt({name: "AES-CBC", iv: ivbytes}, key, plaintextbytes)
  .catch(function(err){
    console.error(err);
  });

  // if(!cipherbytes) {
  //    spnEncstatus.classList.add("redspan");
  //   spnEncstatus.innerHTML='<p>Error encrypting file.  See console log.</p>';
  //   return;
  // }

  console.log('plaintext encrypted');
  cipherbytes=new Uint8Array(cipherbytes);

  var resultbytes=new Uint8Array(cipherbytes.length+16)
  resultbytes.set(new TextEncoder("utf-8").encode('Salted__'));
  resultbytes.set(pbkdf2salt, 8);
  resultbytes.set(cipherbytes, 16);

  var blob=new Blob([resultbytes], {type: 'application/download'});
  var blobUrl=URL.createObjectURL(blob);
  aEncsavefile.href=blobUrl;
  aEncsavefile.download=objFile.name + '.enc';

  // spnEncstatus.classList.add("greenspan");
  // spnEncstatus.innerHTML='<p>File encrypted.</p>';
  // aEncsavefile.hidden=false;
}
