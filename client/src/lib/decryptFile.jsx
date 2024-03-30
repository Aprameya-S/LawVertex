import toast from 'react-toastify'


function readfile(file){
  return new Promise((resolve, reject) => {
    var fr = new FileReader();  
    fr.onload = () => {
      resolve(fr.result )
    };
    fr.readAsArrayBuffer(file);
  });
}
export 	async function decryptfile(objFile,fileFormat,decPassPhrase) {

  var cipherbytes=await readfile(objFile)
  .catch(function(err){
    console.error(err);
  });	
  var cipherbytes=new Uint8Array(cipherbytes);

  var pbkdf2iterations=10000;
  var passphrasebytes=new TextEncoder("utf-8").encode(decPassPhrase);
  var pbkdf2salt=cipherbytes.slice(8,16);


  var passphrasekey=await window.crypto.subtle.importKey('raw', passphrasebytes, {name: 'PBKDF2'}, false, ['deriveBits'])
  .catch(function(err){
    console.error(err);

  });
  // console.log('passphrasekey imported');

  var pbkdf2bytes=await window.crypto.subtle.deriveBits({"name": 'PBKDF2', "salt": pbkdf2salt, "iterations": pbkdf2iterations, "hash": 'SHA-256'}, passphrasekey, 384)		
  .catch(function(err){
    console.error(err);
  });
  // console.log('pbkdf2bytes derived');
  pbkdf2bytes=new Uint8Array(pbkdf2bytes);

  var keybytes=pbkdf2bytes.slice(0,32);
  var ivbytes=pbkdf2bytes.slice(32);
  cipherbytes=cipherbytes.slice(16);

  var key=await window.crypto.subtle.importKey('raw', keybytes, {name: 'AES-CBC', length: 256}, false, ['decrypt']) 
  .catch(function(err){
    console.error(err);
  });
  // console.log('key imported');		

  var plaintextbytes=await window.crypto.subtle.decrypt({name: "AES-CBC", iv: ivbytes}, key, cipherbytes)
  .catch(function(err){
    console.error(err);
  });

  if(!plaintextbytes) {
    //  spnDecstatus.classList.add("redspan");
    // spnDecstatus.innerHTML='<p>Error decrypting file.  Password may be incorrect.</p>';
    // console.log("Error decrypting file")
    return;
  }

  // console.log('ciphertext decrypted');
  plaintextbytes=new Uint8Array(plaintextbytes);

  var blob=new Blob([plaintextbytes], {type: fileFormat});
  var blobUrl=URL.createObjectURL(blob);
  return {fileBlob:blob, fileLink:blobUrl}
}
