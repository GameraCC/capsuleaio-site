        /*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

/**
 * @typedef {Object} CollectionError
 * 
 * @property {false} success - Whether or not the data collection was successful
 * @property {string} err - Error associated with collection 
 */

 /**
  * @typedef FAkam
  * 
  * @property {string} id - Unique identifier
  * @property {Object} canvas - Canvas fingerprinting info
  * @property {Array.<string> | CollectionError} canvas.vals - 1000 canvas fingerprint hashes from generated numbers on canvases
  * @property {string} canvas.one - First unique canvas fingerprint hash
  * @property {string} canvas.two - Second unique canvas fingerprint hash
  * @property {Object} webgl - Webgl fingerprinting info
  * @property {Array.<{voiceURI: string, lang: string}> | CollectionError} webgl.supportedExtensions - Webgl supported extensions property
  * @property {string | CollectionError} webgl.vendor - Webgl vendor property
  * @property {string | CollectionError} webgl.renderer - Webgl renderer property
  * @property {Array.<{name: string, width: number, height: number}> | CollectionError} fonts - Offsets of various fonts
  * @property {Array.<{name: string, result: number}> | CollectionError} mr - Performance fingerprinting results
  * @property {Object} pixel - Pixel extra browser information script specific collected variables
  * @property {Object} window - Browser window variables
  * @property {Object} window.document - Window document variables
  * @property {string} window.document.documentMode
  * @property {boolean} window.document.webdriver
  * @property {boolean} window.document.selenium
  * @property {boolean} window.document.hidden
  * @property {boolean} window.document.mozHidden
  * @property {boolean} window.document.webkitHidden
  * @property {string} window.document.getComputedStyle
  * @property {boolean} window.document.$chrome_asyncScriptInfo
  * @property {Object} window.navigator - Window navigator vairables
  * @property {Array.<{name: string, description: string, filename: string, mimeTypes: Array.<type: string, description: string, suffixes: string>}> | CollectionError} window.navigator.plugins
  * @property {Array.<{type: string, description: string, suffixes: string}> | CollectionError} window.navigator.mimeTypes
  * @property {Array.<string>} window.navigator.languages
  * @property {string} window.navigator.language
  * @property {string} window.navigator.appName
  * @property {string} window.navigator.appCodeName
  * @property {string} window.navigator.userAgent
  * @property {string} window.navigator.productSub
  * @property {string} window.navigator.language
  * @property {string} window.navigator.product
  * @property {boolean} window.navigator.onLine
  * @property {string} window.navigator.vibrate
  * @property {string} window.navigator.getBattery
  * @property {boolean} window.navigator.credentials
  * @property {boolean} window.navigator.appMinorVersion
  * @property {boolean} window.navigator.getGamepads
  * @property {boolean} window.navigator.getStorageUpdates
  * @property {boolean} window.navigator.hardwareConcurrency
  * @property {boolean} window.navigator.mediaDevices
  * @property {boolean} window.navigator.mozAlarms
  * @property {boolean} window.navigator.mozConnection
  * @property {boolean} window.navigator.mozIsLocallyAvailable
  * @property {boolean} window.navigator.mozPhoneNumberService
  * @property {boolean} window.navigator.msManipulationViewsEnabled
  * @property {Object} window.navigator.permissions
  * @property {boolean} window.navigator.permissions.enabled
  * @property {?Array.<{success: boolean, name: string, result: string}> | CollectionError} window.navigator.permissions.checks
  * @property {boolean} window.navigator.registerProtocolHandler
  * @property {boolean} window.navigator.requestMediaKeySystemAccess
  * @property {boolean} window.navigator.requestWakeLock
  * @property {boolean} window.navigator.sendBeacon
  * @property {boolean} window.navigator.serviceWorker
  * @property {boolean} window.navigator.storeWebWideTrackingException
  * @property {boolean} window.navigator.webkitGetGamepads
  * @property {boolean} window.navigator.webkitTemporaryStorage
  * @property {boolean} window.navigator.webdriver
  * @property {boolean | -1} window.navigator.cookieEnabled
  * @property {boolean | -1} window.navigator.javaEnabled
  * @property {boolean | -1} window.navigator.doNotTrack
  * @property {boolean | -1} window.navigator.geolocation
  * @property {boolean | -1} window.navigator.brave
  * @property {string} window.navigator.appVersion
  * @property {Object} window.screen - Window screen variables
  * @property {number} window.screen.availWidth
  * @property {number} window.screen.availHeight
  * @property {number} window.screen.width
  * @property {number} window.screen.height
  * @property {number | -1} window.screen.colorDepth
  * @property {number | -1} window.screen.pixelDepth
  * @property {number} window.innerWidth
  * @property {number} window.innerHeight
  * @property {number} window.outerWidth
  * @property {number} window.outerHeight
  * @property {boolean} window.addEventListener
  * @property {boolean} window.XMLHttpRequest
  * @property {boolean} window.XDomainRequest
  * @property {boolean} window.emit
  * @property {boolean} window.DeviceOrientationEvent
  * @property {boolean} window.DeviceMotionEvent
  * @property {boolean} window.TouchEvent
  * @property {boolean} window.spawn
  * @property {boolean} window.chrome
  * @property {boolean} window.functionPrototypeBind
  * @property {boolean} window.Buffer
  * @property {boolean} window.PointerEvent
  * @property {boolean} window._phantom
  * @property {boolean} window.webdriver
  * @property {boolean} window.domAutomation
  * @property {boolean} window.callPhantom
  * @property {boolean} window.returnCCon
  * @property {boolean} window.opera
  * @property {string} window.InstallTrigger
  * @property {boolean} window.HTMLElement
  * @property {boolean} window.mozInnerScreenY
  * @property {boolean} window.ArrayprototypeforEach
  * @property {boolean} window.FileReader
  * @property {string} window.RTCPeerConnection
  * @property {string} window.mozRTCPeerConnection
  * @property {string} window.webkitRTCPeerConnection
  * @property {boolean} window.imul
  * @property {boolean} window.parseInt
  * @property {boolean} window.hypot
  * @property {boolean} window.sessionStorage
  * @property {boolean} window.localStorage
  * @property {boolean} window.$cdc_asdjflasutopfhvcZLmcfl_
  * @property {boolean} window.XPathResult
  * @property {string} window.EventSource
  * @property {number} window.devicePixelRatio
  * @property {Array.<{voiceURI: string, lang: string}> | CollectionError} window.speechSynthesis
  * @property {boolean} window.__nightmare
  * @property {boolean} window.cdc_adoQpoasnfa76pfcZLmcfl_Array
  * @property {boolean} window.cdc_adoQpoasnfa76pfcZLmcfl_Promise
  * @property {boolean} window.cdc_adoQpoasnfa76pfcZLmcfl_Symbol
  * @property {boolean} window.OSMJIF
  * @property {boolean} window._Selenium_IDE_Recorder
  * @property {boolean} window.__$webdriverAsyncExecutor
  * @property {boolean} window.__driver_evaluate
  * @property {boolean} window.__driver_unwrapped
  * @property {boolean} window.__fxdriver_evaluate
  * @property {boolean} window.__fxdriver_unwrapped
  * @property {boolean} window.__lastWatirAlert
  * @property {boolean} window.__lastWatirConfirm
  * @property {boolean} window.__lastWatirPrompt
  * @property {boolean} window.__phantomas
  * @property {boolean} window.__selenium_evaluate
  * @property {boolean} window.__selenium_unwrapped
  * @property {boolean} window.__webdriverFuncgeb
  * @property {boolean} window.__webdriver__chr
  * @property {boolean} window.__webdriver_evaluate
  * @property {boolean} window.__webdriver_script_fn
  * @property {boolean} window.__webdriver_script_func
  * @property {boolean} window.__webdriver_script_function
  * @property {boolean} window.__webdriver_unwrapped
  * @property {boolean} window.awesomium
  * @property {boolean} window.callSelenium
  * @property {boolean} window.calledPhantom
  * @property {boolean} window.calledSelenium
  * @property {boolean} window.domAutomationController
  * @property {boolean} window.watinExpressionError
  * @property {boolean} window.watinExpressionResult
  * @property {boolean} window.spynner_additional_js_loaded
  * @property {boolean} window.fmget_targets
  * @property {boolean} window.geb
  */

class FakamCollector {
    constructor() {
        let id = window.localStorage.getItem("fakam_id");
        if (!id) {
            const _id = this.randomUUIDV4();
            window.localStorage.setItem("fakam_id", _id);
            id = _id;
        }

        this.fAkam = {
            id
        };
    }

    randomUUIDV4 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => (c == "x" ? Math.random() * 16 | 0 : (Math.random() * 16 | 0 & 0x3 | 0x8)).toString(16))
    sha1 = (e) => {let r;try{const t=require("crypto").createHash("sha1");t.update(e),r=t.digest("hex")}catch(e){r=void 0}if(void 0!==r)return r;const t=function(e,r){return e<<r|e>>>32-r},o=function(e){let r,t,o="";for(r=7;r>=0;r--)o+=(t=e>>>4*r&15).toString(16);return o};let c,a,h;const n=new Array(80);let s,d,u,f,C,A,i=1732584193,p=4023233417,l=2562383102,g=271733878,b=3285377520;const k=(e=unescape(encodeURIComponent(e))).length,w=[];for(a=0;a<k-3;a+=4)h=e.charCodeAt(a)<<24|e.charCodeAt(a+1)<<16|e.charCodeAt(a+2)<<8|e.charCodeAt(a+3),w.push(h);switch(k%4){case 0:a=2147483648;break;case 1:a=e.charCodeAt(k-1)<<24|8388608;break;case 2:a=e.charCodeAt(k-2)<<24|e.charCodeAt(k-1)<<16|32768;break;case 3:a=e.charCodeAt(k-3)<<24|e.charCodeAt(k-2)<<16|e.charCodeAt(k-1)<<8|128}for(w.push(a);w.length%16!=14;)w.push(0);for(w.push(k>>>29),w.push(k<<3&4294967295),c=0;c<w.length;c+=16){for(a=0;a<16;a++)n[a]=w[c+a];for(a=16;a<=79;a++)n[a]=t(n[a-3]^n[a-8]^n[a-14]^n[a-16],1);for(s=i,d=p,u=l,f=g,C=b,a=0;a<=19;a++)A=t(s,5)+(d&u|~d&f)+C+n[a]+1518500249&4294967295,C=f,f=u,u=t(d,30),d=s,s=A;for(a=20;a<=39;a++)A=t(s,5)+(d^u^f)+C+n[a]+1859775393&4294967295,C=f,f=u,u=t(d,30),d=s,s=A;for(a=40;a<=59;a++)A=t(s,5)+(d&u|d&f|u&f)+C+n[a]+2400959708&4294967295,C=f,f=u,u=t(d,30),d=s,s=A;for(a=60;a<=79;a++)A=t(s,5)+(d^u^f)+C+n[a]+3395469782&4294967295,C=f,f=u,u=t(d,30),d=s,s=A;i=i+s&4294967295,p=p+d&4294967295,l=l+u&4294967295,g=g+f&4294967295,b=b+C&4294967295}return(A=o(i)+o(p)+o(l)+o(g)+o(b)).toLowerCase()};   
    
    getCanvasVals() {
        try {
            const _promises = [];

            const _canvas = document.createElement("canvas");

            if (typeof _canvas.getContext === "function") {
                for (let i = 0; i < 1000; i++) {
                    _promises.push(
                        new Promise(resolve => {
                            setTimeout(() => {
                                const canvas = document.createElement("canvas");
                                      canvas.width = 16;
                                      canvas.height = 16;
                                
                                const context = canvas.getContext("2d");
                                      context.font = "6pt Arial";
                                      context.fillText(i, 1, 12);
                                    
                                for (var url = canvas.toDataURL(), hash = 0, j = 0; j < url.length; j++) {
                                    hash = (hash << 5) - hash + url.charCodeAt(j);
                                    hash &= hash;
                                }
        
                                return resolve(hash.toString());
                            }, 0)
                        })
                    );
                }    
            } else throw new Error(`Type of canvas.getContext is not a function, type is ${typeof canvas.getContext}`);
    
            return Promise.all(_promises);    
        } catch (err) {
            return {success: false, err};
        }
    }

    getCanvasOne() {
        try {
            const canvas = document.createElement("canvas");
                  canvas.width = 280;
                  canvas.height = 60;
                  canvas.style.display = "none";

            if (typeof canvas.getContext === "function") {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const context = canvas.getContext("2d");
                              context.fillStyle = "rgb(102, 204, 0)";
                              context.fillRect(100, 5, 80, 50);
                              context.fillStyle = "#f60";
                              context.font = "16pt Arial";
                              context.fillText("<@nv45. F1n63r,Pr1n71n6!", 10, 40);
                              context.strokeStyle = "rgb(120, 186, 176)";
                              context.arc(80, 10, 20, 0, Math.PI, !1);
                              context.stroke();
                            
                        for (var url = canvas.toDataURL(), hash = 0, i = 0; i < url.length; i++) {
                            hash = (hash << 5) - hash + url.charCodeAt(i);
                            hash &= hash;
                        }
                        
                        return resolve(hash.toString());
                    }, 0)
                });
            } else throw new Error(`Type of canvas.getContext is not a function, type is ${typeof canvas.getContext}`);
        } catch (err) {
            return {success: false, err};
        }
    }

    getCanvasTwo() {
        try {
            const canvas = document.createElement("canvas");
                  canvas.width = 280;
                  canvas.height = 60;
                  canvas.style.display = "none";

            if (typeof canvas.getContext === "function") {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const context = canvas.getContext("2d");
                              context.fillStyle = "rgb(102, 204, 0)";
                              context.fillRect(100, 5, 80, 50);
                              context.fillStyle = "#f60";
                              context.font = "16pt Arial";
                              context.fillText("m,Ev!xV67BaU> eh2m<f3AG3@", 10, 40);
                              context.strokeStyle = "rgb(120, 186, 176)";
                              context.arc(80, 10, 20, 0, Math.PI, !1);
                              context.stroke();
                            
                        for (var url = canvas.toDataURL(), hash = 0, i = 0; i < url.length; i++) {
                            hash = (hash << 5) - hash + url.charCodeAt(i);
                            hash &= hash;
                        }
                        
                        return resolve(hash.toString());
                    }, 0)
                });
            } else throw new Error(`Type of canvas.getContext is not a function, type is ${typeof canvas.getContext}`);
        } catch (err) {
            return {success: false, err};
        }
    }

    getWebglSupportedExtensions() {
        try {
            const canvas = document.createElement("canvas");

            if (typeof canvas.getContext === "function") {
                const context = canvas.getContext("webgl");
                return context.getSupportedExtensions();
            } else throw new Error(`Type of canvas.getContext is not a function, type is ${typeof canvas.getContext}`);
        } catch (err) {
            return {success: false, err};
        }
    }

    getWebglVendor() {
        try {
            const canvas = document.createElement("canvas");

            if (typeof canvas.getContext === "function") {
                const context = canvas.getContext("webgl");
                if (context.getSupportedExtensions().indexOf("WEBGL_debug_renderer_info") >= 0) {
                    return context.getParameter(context.getExtension("WEBGL_debug_renderer_info").UNMASKED_VENDOR_WEBGL);
                } else throw new Error(`Index of WEBGL_debug_renderer_info is not greater or equal to 0, index is ${context.getSupportedExtensions().indexOf("WEBGL_debug_renderer_info")}`);
            } else throw new Error(`Type of canvas.getContext is not a function, type is ${typeof canvas.getContext}`);
        } catch (err) {
            return {success: false, err};
        }
    }

    getWebglRenderer() {
        try {
            const canvas = document.createElement("canvas");

            if (typeof canvas.getContext === "function") {
                const context = canvas.getContext("webgl");
                if (context.getSupportedExtensions().indexOf("WEBGL_debug_renderer_info") >= 0) {
                    return context.getParameter(context.getExtension("WEBGL_debug_renderer_info").UNMASKED_RENDERER_WEBGL);
                } else throw new Error(`Index of WEBGL_debug_renderer_info is not greater or equal to 0, index is ${context.getSupportedExtensions().indexOf("WEBGL_debug_renderer_info")}`);
            } else throw new Error(`Type of canvas.getContext is not a function, type is ${typeof canvas.getContext}`);
        } catch (err) {
            return {success: false, err};
        }
    }

    getSpeechSynthesis() {
        try {
            if (window.speechSynthesis) {
                return new Promise(resolve => {
                    window.speechSynthesis.addEventListener("voiceschanged", () => {
                        return resolve(window.speechSynthesis.getVoices().map(voice => ({voiceURI: voice.voiceURI, lang: voice.lang})));
                    })
                })
            } else throw new Error('Property "speechSynthesis" in "window" not found');
        } catch (err) {
            return {success: false, err};
        }
    }


    getMr() {
        try {
            if (typeof performance === "undefined") throw new Error("Type of performance is undefined");
            if (typeof performance.now === "undefined") throw new Error("Type of performance.now is undefined");
            if (typeof JSON === "undefined") throw new Error("Type of JSON is undefined");

            const checks = [
                {name: "Math.abs", value: Math.abs, result: 0},
                {name: "Math.acos", value: Math.acos, result: 0},
                {name: "Math.asin", value: Math.asin, result: 0},
                {name: "Math.atanh", value: Math.atanh, result: 0},
                {name: "Math.cbrt", value: Math.cbrt, result: 0},
                {name: "Math.exp", value: Math.exp, result: 0},
                {name: "Math.random", value: Math.random, result: 0},
                {name: "Math.round", value: Math.round, result: 0},
                {name: "Math.sqrt", value: Math.sqrt, result: 0},
                {name: "isFinite", value: isFinite, result: 0},
                {name: "isNaN", value: isNaN, result: 0},
                {name: "parseFloat", value: parseFloat, result: 0},
                {name: "parseInt", value: parseInt, result: 0},
                {name: "JSON.parse", value: JSON.parse, result: 0}
            ]

            for (var i = 0; i < checks.length; i++) {
                const initialTime = performance.now(),
                      speeds = [];

                let totalTime = 0;

                for (let j = 0; j < 1e3 && totalTime < 0.6; j++) {
                    const firstTime = performance.now();
                    for (let k = 0; k < 4e3; k++) checks[i].value(3.14);
                    const secondTime = performance.now();
                    speeds.push(Math.round(1e3 * (secondTime - firstTime)));
                    totalTime = secondTime - initialTime;
                }
                const sortedSpeeds = speeds.sort();
                checks[i].result = sortedSpeeds[Math.floor(sortedSpeeds.length / 2)] / 5;;
            }

            return checks.reduce((acc, current) => { return acc.push({name: current.name, result: current.result}), acc }, []);
        } catch (err) {
            return {success: false, err};
        }
    }

    getPlugins() {
        try {
            const plugins = [];
            for (let i = 0; i < window.navigator.plugins.length; i++) {
                const plugin = window.navigator.plugins[i];
                const mimeTypes = [];
                for (let j = 0; j < plugin.length; j++) mimeTypes.push({type: plugin[j].type, description: plugin[j].description, suffixes: plugin[j].suffixes});
                plugins.push({name: plugin.name, description: plugin.description, filename: plugin.filename, mimeTypes});
            }
            return plugins;
        } catch (err) {
            return {success: false, err};
        }
    }

    getMimeTypes() {
        try {
            const mimeTypes = [];
            for (let i = 0; i < window.navigator.mimeTypes.length; i++) {
                const mimeType = window.navigator.mimeTypes[i];
                mimeTypes.push({type: mimeType.type, description: mimeType.description, suffixes: mimeType.suffixes});
            }
            return mimeTypes;
        } catch (err) {
            return {sucess: false, err};
        }
    }

    getPermissions() {
        try {
            const permissions = ["geolocation", "notifications", "push", "midi", "camera", "microphone", "speaker", "device-info", "background-sync", "bluetooth", "persistent-storage", "ambient-light-sensor", "accelerometer", "gyroscope", "magnetometer", "clipboard", "accessibility-events", "clipboard-read", "clipboard-write", "payment-handler"];
            const _promises = [];

            if (navigator.permissions) {
                permissions.forEach(permission => {
                    _promises.push(
                        new Promise(async resolve => {
                            navigator.permissions.query({
                                name: permission,
                            }).then(result => resolve({success: true, name: permission, result: result.state}))
                            .catch(err => resolve({success: false, name: permission, result: err.toString()}));
                        })
                    )
                });
            } else throw new Error('Property "permissions" in "window.navigator" not found');
            
            return Promise.all(_promises);
        } catch (err) {
            return {success: false, err};
        }
    }

    getFontOffsets() {
        try {
            const fonts = ["Monospace", "Wingdings 2", "ITC Bodoni 72 Bold", "Menlo", "Gill Sans MT", "Lucida Sans", "Bodoni 72", "Serif", "Shree Devanagari 714", "Microsoft Tai Le", "Nimbus Roman No 9 L", "Candara", "Press Start 2P", "Waseem"];
            const results = [];

            const span = document.createElement("span");
                  span.innerHTML = 'mmmmmmmmlli';
                  span.style.fontSize = '192px';
                  
            const body = document.getElementsByTagName("body")[0];

            if (span) {
                if (body) {
                    fonts.forEach(font => {
                        span.style.fontFamily = font;
                        body.appendChild(span);
                        results.push({name: font, width: span.offsetWidth, height: span.offsetHeight});
                        body.removeChild(span);
                    })
                } else throw new Error('Element "body" could not be retrieved by tag name');
            } else throw new Error('Element "span" could not be created in "document"');

            return results;
        } catch (err) {
            return {success: false, err};
        }
    }

    getTypeResult(variable) {
        try {
            return undefined === variable ? "tr_false" : (
                !variable ||
                Object.prototype.toString.call(variable) === "[object Array]" ||
                typeof variable !== "object" && typeof variable !== "function" ? variable : "tr_true"
            )    
        } catch (err) {
            return {success: false, err}
        }
    }

    getPixelCanvasOne() {
        try {
            const canvas = document.createElement('canvas')

            if (typeof canvas.getContext === 'function') {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const context = canvas.getContext("2d");
                              context.fillStyle = 'rgba(255,153,153, 0.5)',
                              context.font = '18pt Tahoma',
                              context.textBaseline = 'top',
                              context.fillText('Soft Ruddy Foothold 2', 2, 2),
                              context.fillStyle = '#0000FF',
                              context.fillRect(100, 25, 30, 10),
                              context.fillStyle = '#E0E0E0',
                              context.fillRect(100, 25, 20, 30),
                              context.fillStyle = '#FF3333',
                              context.fillRect(100, 25, 10, 15),
                              context.fillText('!H71JCaj)]# 1@#', 4, 8)

                        const dataUrl = canvas.toDataURL()

                        return resolve(this.sha1(dataUrl))
                    }, 0)
                })
            } else throw new Error(`Type of canvas.getContext is not a function, type is ${typeof canvas.getContext}`)
        } catch (err) {
            return {success: false, err}
        }
    }
    
    getPixelShockwave() {
        try {
            let found = false
            let version = ''

            if (navigator.plugins && navigator.plugins.length) {
                if (navigator.plugins['Shockwave Flash']) {
                    const plugin = navigator.plugins['Shockwave Flash']
                    found = true
                    plugin.description && (version = (e) => (e = e.match(/[\d]+/g), e.length = 3, e.join('.'))(plugin.description))
                } else if (navigator.plugins['Shockwave Flash 2.0']) {
                    found = true
                    version = '2.0.0.11'
                }
            } else {
                if (navigator.mimeTypes['application/x-shockwave-flash']) {
                    found = navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin
                    version = (e) => (e = e.match(/[\d]+/g), e.length = 3, e.join('.'))(navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin.description)
                } else try {
                    const obj = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash.7')
                    found = true
                    version = (e) => (e = e.match(/[\d]+/g), e.length = 3, e.join('.'))(obj.GetVariable('$version'))
                } catch (err) {
                    try {
                        const obj = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash.6')
                        found = true
                        version = '6.0.21'    
                    } catch (err) {
                        try {
                            const obj = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                            found = true
                            version = (e) => (e = e.match(/[\d]+/g), e.length = 3, e.join('.'))(obj.GetVariable('$version'))     
                        } catch (err) {}
                    }
                }
            }
      
            return found && version
        } catch (err) {
            return {success: false, err}
        }
    }

    getPixelSilverlight() {
        try {
            const test = (l) => {null==l&&(l=null);var n=!1;try{var r=!1;try{var t=navigator.plugins["Silverlight Plug-In"];if(t)if(null===l)n=!0;else{for(var e=t.description.split(".");e.length>3;)e.pop();for(;e.length<4;)e.push(0);for(var i=l.split(".");i.length>4;)i.pop();var o,a,p=0;do{o=window.parseInt(i[p]),a=window.parseInt(e[p]),p++}while(p<i.length&&o===a);o<=a&&!isNaN(o)&&(n=!0)}else r=!0}catch(l){r=!0}if(r){var s=new f.ActiveXObject("AgControl.AgControl");null===l?n=!0:s.IsVersionSupported(l)&&(n=!0),s=null}}catch(l){n=!1}return n}
        
            const versions = ['1.0', '2.0', '3.0', '4.0', '5.0'], found = []
            for (let i = 0; i < versions.length; i++) test(versions[i]) && found.push(versions[i]);
  
            if (0 === found.length) return false
            else return found
        } catch (err) {
            return {success: false, err}
        }
    }

    getPixelBrowserType() {
        try {
            const _opera = window.opera || navigator.userAgent.indexOf(' OPR/') >= 0 ? 'Opera' : 0,
                  _firefox = 'undefined' != typeof InstallTrigger ? 'Firefox' : 0,
                  _safari = (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || window.safari && window.safari.pushNotification && '[object SafariRemoteNotification]' === window.safari.pushNotification.toString() || window.ApplePaySession) ? 'Safari' : 0,
                  _chromeios = _safari && navigator.userAgent.match('CriOS') ? 'Chrome IOS' : 0,
                  _chrome = window.chrome && !_opera ? 'Chrome' : 0,
                  _internet = eval('/*@cc_on!@*/false') || document.documentMode ? 'IE' : 0,
                  _edge = !_internet && window.StyleMedia ? 'Edge' : 0

          return _opera || _firefox || _safari || _chromeios || _chrome || _internet || _edge || ''
        } catch (err) {
            return {success: false, err}
        }
    }

    getPixelInternetExplorerSave() {
        try {
            const div = document.createElement('div')
            let found = false

            try {
                div.style.behavior = 'url(#default#userData)'
                document.body.appendChild(div),
                div.setAttribute('fAkam', 'test'),
                div.save('oXMLStore'),
                div.removeAttribute('fAkam'),
                div.load('oXMLStore'),
                found = 'test' === div.getAttribute('fAkam')    
            } catch (err) {}
            
            try {
                div && document.body.removeChild(div);
            } catch (err) {}

            return found
        } catch (err) {
            return {success: false, err}
        }
    }
    
    getPixelAcrobatPDF() {
        try {
            for (let i = 2; i < 10; i++) {
                try {
                    return Boolean(new f.ActiveXObject(`PDF.PdfCtrl.${i}`)) && t
                } catch (err) {}
            }

            try {
                return Boolean(new f.ActiveXObject('PDF.PdfCtrl.1')) && '4'
            } catch (e) {}
      
            try {
                return Boolean(new f.ActiveXObject('AcroPDF.PDF.1')) && '7'
            } catch (e) {}

            return false;
        } catch (err) {
            return {success: false, err}
        }
    }

    getPixelJavascriptVersion() {
        try {
            const versions = ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0"]
            const head = document.getElementsByTagName('head')[0]
            const appended = []

            try {
                versions.forEach(version => {
                    const script = document.createElement('script')
                    script.setAttribute('language', `Javascript${version}`)
                    script.text = `javascriptVersion = "${version}"`
                    head.appendChild(script)
                    appended.push(script)
                })

                appended.forEach(script => head.removeChild(script))
            } catch (err) {}

            const version = window.javascriptVersion
            window.javascriptVersion = undefined

            return version
        } catch (err) {
            return {success: false, err}
        }
    }

    getPixelAPNGSupported() {
        try {
            const canvas = document.createElement('canvas')

            if (typeof canvas.getContext === 'function') {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if (window.Image) {
                            const image = new window.Image()
                            const context = document.createElement("canvas").getContext("2d")
            
                            image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg=='
            
                            return image.onload = () => {
                                context.drawImage(image, 0, 0);
                                const result = 0 === context.getImageData(0, 0, 1, 1).data[3];
                                return resolve(result)
                            }
                        } else return resolve(null)
                    }, 0)
                })
            } else throw new Error(`Type of canvas.getContext is not a function, type is ${typeof canvas.getContext}`)
        } catch (err) {
            return {success: false, err}
        }
    }

    getPixelBattery() {
        try {
            return new Promise((resolve) => {
                if (!navigator.getBattery) return resolve(0)

                navigator.getBattery().then((result) => {
                    const fixed = {}
    
                    for (const key in result) {
                        const value = result[key]
                        fixed[key] = value === Infinity ? 'Infinity' : value
                    }
    
                    return resolve(fixed)
                })    
            })
        } catch (err) {
            return {success: false, err}
        }
    }

    getPixelFonts() {
        try {

            const compareOffsetWidth = (div, offsetWidth) => {
                const childNodeOffsetWidth = div.childNodes[0].offsetWidth
                return childNodeOffsetWidth !== offsetWidth || childNodeOffsetWidth === div.childNodes[1].offsetWidth
            }

            const getFontHTML = font => `<div><b style="position: absolute; display:inline !important; width:auto !important; font:normal 10px/1 ${font},monospace !important">wi wi</b><b style="position: absolute; display:inline !important; width:auto !important; font:normal 10px/1 ${font},sans-serif !important">wi wi</b></div>`

            const calculateFound = (div, html, defaultOffsetWidth, sevens) => {
                const found = []

                div.innerHTML = html

                let j = 0
                for (let i = 0; i < fonts.length; i++) {
                    if (sevens ? i % 7 === 0 : i % 7 !== 0) {
                        compareOffsetWidth(div.childNodes[j], defaultOffsetWidth) && found.push(i)
                        j++
                    }
                }

                return found
            }
            
            const fonts = ['Party LET', 'Academy Engraved LET', 'David', 'Palatino Linotype', 'Microsoft Sans Serif', 'Segoe UI', 'Malgun Gothic', 'Nirmala UI', 'Segoe Pseudo', 'Gadugi', 'Leelawadee UI Bold', 'Sitka Subheading Italic', 'Yu Gothic UI Light', 'Bahnschrift', 'Trattatello', 'Skia', 'Muna', 'PingFang', 'San Francisco UI', 'San Francisco Mono', 'Monotype LingWai Medium', 'American Typewriter', 'Rockwell', 'Al Nile', 'Roboto', 'Noto', 'Ubuntu', 'Century Schoolbook L', 'URW Chancery L', 'URW Gothic L', 'URW Bookman L', 'Nimbus Mono L', 'FreeMono', 'FreeSans', 'FreeSerif', 'Bitstream Vera Sans', 'Bitstream Charter', 'Liberation Sans', 'Liberation Serif', 'Liberation Mono', 'Luxi', 'Nimbus Mono', 'Nimbus Sans L', 'Nimbus Roman No 9 L', 'DejaVu Sans', 'MONO', 'DB LCD Temp', 'Oriya Sangam MN', 'Sinhala Sangam MN', 'Apple Color Emoji', 'Chalkboard', 'Andale Mono', 'Sitka Banner', 'Segoe UI Emoji', 'Leelawadee UI', 'Vijaya', 'Utsaah', 'Shonar Bangla', 'Aparajita', 'Khmer UI', 'Franklin Gothic', 'MV Boli', 'Corbel', 'Cambria', 'Segoe UI Light', 'MS Gothic'],
                  main = document.createElement('div'),
                  div_one = document.createElement('div'),
                  div_two = document.createElement('div')

            main.style.cssText = 'position: relative; left: -9999px; visibility: hidden; display: block !important'
            div_one.innerHTML = `<b style="position: absolute; display:inline !important; width:auto !important; font:normal 10px/1 monospace !important">wi wi</b>`

            main.appendChild(div_one)
            main.appendChild(div_two)
            document.body.insertBefore(main, document.body.firstChild)
            
            const defaultOffsetWidth = div_one.childNodes[0].offsetWidth
            const sevensInnerHTML = fonts.reduce((acc, cur, i, arr) => (i === arr.length - 1 && (acc += getFontHTML('RYelrZVIUa')), i % 7 === 0 && (acc += getFontHTML(cur)), acc), '')
            const othersInnerHTML = fonts.reduce((acc, cur, i) => (i % 7 !== 0 && (acc += getFontHTML(cur)), acc), '')

            const found = [...calculateFound(div_two, sevensInnerHTML, defaultOffsetWidth, true), ...calculateFound(div_two, othersInnerHTML, defaultOffsetWidth, false)].sort((a, b) => a - b)

            document.body.removeChild(main)

            return found

        } catch (err) {
            return {success: false, err}
        }
    }

    calculateFakam() {
        return new Promise(async (resolve, reject) => {
            try {
                this.fAkam = {
                    ...this.fAkam,
                    canvas: {
                        vals: await this.getCanvasVals(),
                        one: await this.getCanvasOne(),
                        two: await this.getCanvasTwo()
                    },
                    webgl: {
                        supportedExtensions: this.getWebglSupportedExtensions(),
                        vendor: this.getWebglVendor(),
                        renderer: this.getWebglRenderer()
                    },
                    fonts: this.getFontOffsets(),
                    mr: this.getMr(),
                    window: {
                        document: {
                            documentMode: typeof document.documentMode,
                            webdriver: document.documentElement.getAttribute("webdriver") != null,
                            driver: document.documentElement.getAttribute("driver") != null,
                            selenium: document.documentElement.getAttribute("selenium") != null,
                            hidden: document.hidden,
                            mozHidden: document.mozHidden,
                            msHidden: document.msHidden,
                            webkitHidden: document.webkitHidden,
                            getComputedStyle: typeof document.defaultView.getComputedStyle,
                            $chrome_asyncScriptInfo: Boolean(document.$chrome_asyncScriptInfo)
                        },
                        navigator: {
                            plugins: this.getPlugins(),
                            mimeTypes: this.getMimeTypes(),
                            languages: navigator.languages,
                            language: navigator.language,
                            appName: navigator.appName,
                            appCodeName: navigator.appCodeName,
                            userAgent: window.navigator.userAgent,
                            productSub: navigator.productSub,
                            product: navigator.product,
                            onLine: navigator.onLine,
                            vibrate: typeof navigator.vibrate,
                            getBattery: typeof navigator.getBattery,
                            credentials: Boolean(navigator.credentials),
                            appMinorVersion: Boolean(navigator.appMinorVersion),
                            bluetooth: Boolean(navigator.bluetooth),
                            storage: Boolean(navigator.storage),
                            getGamepads: Boolean(navigator.getGamepads),
                            getStorageUpdates: Boolean(navigator.getStorageUpdates),
                            hardwareConcurrency: Boolean(navigator.hardwareConcurrency),
                            mediaDevices: Boolean(navigator.mediaDevices),
                            mozAlarms: Boolean(navigator.mozAlarms),
                            mozConnection: Boolean(navigator.mozConnection),
                            mozIsLocallyAvailable: Boolean(navigator.mozIsLocallyAvailable),
                            mozPhoneNumberService: Boolean(navigator.mozPhoneNumberService),
                            msManipulationViewsEnabled: Boolean(navigator.msManipulationViewsEnabled),
                            permissions: {
                                enabled: Boolean(navigator.permissions),
                                checks: await this.getPermissions(),
                            },
                            registerProtocolHandler: Boolean(navigator.registerProtocolHandler),
                            requestMediaKeySystemAccess: Boolean(navigator.requestMediaKeySystemAccess),
                            requestWakeLock: Boolean(navigator.requestWakeLock),
                            sendBeacon: Boolean(navigator.sendBeacon),
                            serviceWorker: Boolean(navigator.serviceWorker),
                            storeWebWideTrackingException: Boolean(navigator.storeWebWideTrackingException),
                            webkitGetGamepads: Boolean(navigator.webkitGetGamepads),
                            webkitTemporaryStorage: Boolean(navigator.webkitTemporaryStorage),
                            webdriver: navigator.webdriver,
                            cookieEnabled: navigator.cookieEnabled ? navigator.cookieEnabled : -1,
                            javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : -1,
                            doNotTrack: navigator.doNotTrack ? navigator.doNotTrack : -1,
                            geolocation: navigator.geolocation ? navigator.geolocation : -1,
                            brave: navigator.brave ? navigator.brave.isBrave() : -1,
                            appVersion: navigator.appVersion
                        },
                        screen: {
                            availWidth: window.screen.availWidth,
                            availHeight: window.screen.availHeight,
                            width: window.screen.width,
                            height: window.screen.height,
                            colorDepth: window.screen.colorDepth ? window.screen.colorDepth : -1,
                            pixelDepth: window.screen.pixelDepth ? window.screen.colorDepth : -1        
                        },
                        innerWidth: window.innerWidth || document.body.clientWidth,
                        innerHeight: window.innerHeight || document.body.clientHeight,
                        outerWidth: window.outerWidth || document.body.outerWidth,
                        outerHeight: window.outerHeight || document.body.outerHeight,
                        pageXOffset: window.pageXOffset,
                        pageYOffset: window.pageYOffset,
                        screenX: window.screenX,
                        screenY: window.screenY,
                        addEventListener: Boolean(window.addEventListener),
                        XMLHttpRequest: Boolean(window.XMLHttpRequest),
                        XDomainRequest: Boolean(window.XDomainRequest),
                        emit: Boolean(window.emit),
                        DeviceOrientationEvent: Boolean(window.DeviceOrientationEvent),
                        DeviceMotionEvent: Boolean(window.DeviceMotionEvent),
                        TouchEvent: Boolean(window.TouchEvent),
                        spawn: Boolean(window.spawn),
                        chrome: Boolean(window.chrome),
                        chromeWebStore: Boolean(window.chrome && window.chromeWebStore),
                        functionPrototypeBind: Boolean(Function.prototype.bind),
                        Buffer: Boolean(window.Buffer),
                        PointerEvent: Boolean(window.PointerEvent),
                        _phantom: Boolean(window._phantom),
                        webdriver: Boolean(window.webdriver),
                        domAutomation: Boolean(window.domAutomation),
                        callPhantom: Boolean(window.callPhantom),
                        returnCCon: Boolean(new Function("return/*@cc_on!@*/!1")()),
                        opera: Boolean(window.opera),
                        InstallTrigger: typeof InstallTrigger,
                        HTMLElement: (window.HTMLElement && Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0) ? true : false,
                        mozInnerScreenY: "mozInnerScreenY" in window && window.mozInnerScreenY,
                        ArrayprototypeforEach: Boolean(Array.prototype.forEach),
                        FileReader: "FileReader" in window,
                        ActiveXObject: "ActiveXObject" in window,
                        RTCPeerConnection: typeof window.RTCPeerConnection,
                        mozRTCPeerConnection: typeof window.mozRTCPeerConnection,
                        webkitRTCPeerConnection: typeof window.webkitRTCPeerConnection,
                        imul: Boolean(Math.imul),
                        parseInt: Boolean(Number.parseInt),
                        hypot: Boolean(Math.hypot),
                        sessionStorage: !!window.sessionStorage,
                        localStorage: !!window.localStorage,
                        indexedDB: !!window.indexedDB,
                        timezoneOffset: new Date().getTimezoneOffset(),
                        $cdc_asdjflasutopfhvcZLmcfl_: Boolean(window.$cdc_asdjflasutopfhvcZLmcfl_ || document.$cdc_asdjflasutopfhvcZLmcfl_),
                        XPathResult: void 0 !== window.XPathResult || void 0 !== document.XPathResult,
                        EventSource: typeof window.EventSource ,
                        devicePixelRatio: window.devicePixelRatio ? window.devicePixelRatio : -1,
                        speechSynthesis: await this.getSpeechSynthesis(),
                        __nightmare: Boolean(window.__nightmare),
                        cdc_adoQpoasnfa76pfcZLmcfl_Array: Boolean(window.cdc_adoQpoasnfa76pfcZLmcfl_Array),
                        cdc_adoQpoasnfa76pfcZLmcfl_Promise: Boolean(window.cdc_adoQpoasnfa76pfcZLmcfl_Promise),
                        cdc_adoQpoasnfa76pfcZLmcfl_Symbol: Boolean(window.cdc_adoQpoasnfa76pfcZLmcfl_Symbol),
                        OSMJIF: Boolean(window.OSMJIF),
                        _Selenium_IDE_Recorder: Boolean(window._Selenium_IDE_Recorder),
                        __$webdriverAsyncExecutor: Boolean(window.__$webdriverAsyncExecutor),
                        __driver_evaluate: Boolean(window.__driver_evaluate),
                        __driver_unwrapped: Boolean(window.__driver_unwrapped),
                        __fxdriver_evaluate: Boolean(window.__fxdriver_evaluate),
                        __fxdriver_unwrapped: Boolean(window.__fxdriver_unwrapped),
                        __lastWatirAlert: Boolean(window.__lastWatirAlert),
                        __lastWatirConfirm: Boolean(window.__lastWatirConfirm),
                        __lastWatirPrompt: Boolean(window.__lastWatirPrompt),
                        __phantomas: Boolean(window.__phantomas),
                        __selenium_evaluate: Boolean(window.__selenium_evaluate),
                        __selenium_unwrapped: Boolean(window.__selenium_unwrapped),
                        __webdriverFuncgeb: Boolean(window.__webdriverFuncgeb),
                        __webdriver__chr: Boolean(window.__webdriver__chr),
                        __webdriver_evaluate: Boolean(window.__webdriver_evaluate),
                        __webdriver_script_fn: Boolean(window.__webdriver_script_fn),
                        __webdriver_script_func: Boolean(window.__webdriver_script_func),
                        __webdriver_script_function: Boolean(window.__webdriver_script_function),
                        __webdriver_unwrapped: Boolean(window.__webdriver_unwrapped),
                        awesomium: Boolean(window.awesomium),
                        callSelenium: Boolean(window.callSelenium),
                        calledPhantom: Boolean(window.calledPhantom),
                        calledSelenium: Boolean(window.calledSelenium),
                        domAutomationController: Boolean(window.domAutomationController),
                        watinExpressionError: Boolean(window.watinExpressionError),
                        watinExpressionResult: Boolean(window.watinExpressionResult),
                        spynner_additional_js_loaded: Boolean(window.spynner_additional_js_loaded),
                        fmget_targets: Boolean(window.fmget_targets),
                        geb: Boolean(window.geb),
                    },
                    pixel: {
                        canvas: {
                            one: await this.getPixelCanvasOne()
                        },
                        shockwave: this.getPixelShockwave(),
                        silverlight: this.getPixelSilverlight(),
                        browser: this.getPixelBrowserType(),
                        internet: this.getPixelInternetExplorerSave(),
                        acrobat: this.getPixelAcrobatPDF(),
                        javascript: this.getPixelJavascriptVersion(),
                        apng: await this.getPixelAPNGSupported(),
                        battery: await this.getPixelBattery(),
                        fonts: this.getPixelFonts(),
                        window: {
                            document: {
                                querySelector: this.getTypeResult(document.querySelector),
                                getElementsByClassName: this.getTypeResult(document.getElementsByClassName),
                                images: this.getTypeResult(document.images),
                                compatMode: this.getTypeResult(document.compatMode),
                                documentMode: this.getTypeResult(document.documentMode),    
                                all: undefined !== document.all,
                                documentElementContextMenu: this.getTypeResult(document.documentElement.contextMenu)
                            },
                            navigator: {
                                userAgent: this.getTypeResult(navigator.userAgent),
                                appName: this.getTypeResult(navigator.appName),
                                appCodeName: this.getTypeResult(navigator.appCodeName),
                                appVersion: this.getTypeResult(navigator.appVersion),
                                appMinorVersion: this.getTypeResult(navigator.appMinorVersion),
                                product: this.getTypeResult(navigator.product),
                                productSub: this.getTypeResult(navigator.productSub),            
                                vendor: this.getTypeResult(navigator.vendor),
                                vendorSub: this.getTypeResult(navigator.vendorSub),
                                buildID: this.getTypeResult(navigator.buildID),
                                oscpu: this.getTypeResult(navigator.oscpu),
                                platform: this.getTypeResult(navigator.platform),
                                hardwareConcurrency: this.getTypeResult(navigator.hardwareConcurrency),
                                language: this.getTypeResult(navigator.language),
                                languages: this.getTypeResult(navigator.languages),
                                systemLanguage: this.getTypeResult(navigator.systemLanguages),
                                userLanguage: this.getTypeResult(navigator.userLanguage),
                                doNotTrack: this.getTypeResult(navigator.doNotTrack),
                                msDoNotTrack: this.getTypeResult(navigator.msDoNotTrack),
                                cookieEnabled: this.getTypeResult(navigator.cookieEnabled),
                                geolocation: this.getTypeResult(navigator.geolocation),
                                vibrate: this.getTypeResult(navigator.vibrate),
                                maxTouchPoints: this.getTypeResult(navigator.maxTouchPoints),
                                appMinorVersion: this.getTypeResult(navigator.appMinorVersion)
                            },
                            XDomainRequest: this.getTypeResult(window.XDomainRequest),
                            createPopup: this.getTypeResult(window.createPopup),
                            removeEventListener: this.getTypeResult(window.removeEventListener),
                            globalStorage: this.getTypeResult(window.globalStorage),
                            openDatabase: this.getTypeResult(window.openDatabase),
                            indexedDB: this.getTypeResult(window.indexedDB),
                            attachEvent: this.getTypeResult(window.attachEvent),
                            ActiveXObject: this.getTypeResult(window.ActiveXObject),
                            dispatchEvent: this.getTypeResult(window.dispatchEvent),
                            addBehavior: this.getTypeResult(window.addBehavior),
                            addEventListener: this.getTypeResult(window.addEventListener),
                            detachEvent: this.getTypeResult(window.detachEvent),
                            fireEvent: this.getTypeResult(window.fireEvent),
                            MutationObserver: this.getTypeResult(window.MutationObserver),
                            HTMLMenuItemElement: this.getTypeResult(window.HTMLMenuItemElement),
                            Int8Array: this.getTypeResult(window.Int8Array),
                            postMessage: this.getTypeResult(window.postMessage),
                            querySelector: this.getTypeResult(window.querySelector),
                            performanceNow: this.getTypeResult(window.performance.now),
                            chrome: window.chrome || false // window.chrome.runtime is not loaded on non-https sites
                        }
                    }
                }
    
                return resolve({success: true});
            } catch (err) {
                return reject({success: false, err});
            }
        })
    }

    submitFakam() {
        return new Promise((resolve, reject) => {
            try {
                const botRegex = /(Googlebot\/|Googlebot-Mobile|Googlebot-Image|Googlebot-News|Googlebot-Video|AdsBot-Google([^-]|$)|AdsBot-Google-Mobile|Feedfetcher-Google|Mediapartners-Google|Mediapartners \(Googlebot\)|APIs-Google|bingbot|Slurp|[wW]get|LinkedInBot|Python-urllib|python-requests|aiohttp|httpx|libwww-perl|httpunit|nutch|Go-http-client|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|BIGLOTRON|Teoma|convera|seekbot|Gigabot|Gigablast|exabot|ia_archiver|GingerCrawler|webmon |HTTrack|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|findlink|msrbot|panscient|yacybot|AISearchBot|ips-agent|tagoobot|MJ12bot|woriobot|yanga|buzzbot|mlbot|YandexBot|YandexImages|YandexAccessibilityBot|YandexMobileBot|YandexMetrika|YandexTurbo|YandexImageResizer|YandexVideo|YandexAdNet|YandexBlogs|YandexCalendar|YandexDirect|YandexFavicons|YaDirectFetcher|YandexForDomain|YandexMarket|YandexMedia|YandexMobileScreenShotBot|YandexNews|YandexOntoDB|YandexPagechecker|YandexPartner|YandexRCA|YandexSearchShop|YandexSitelinks|YandexSpravBot|YandexTracker|YandexVertis|YandexVerticals|YandexWebmaster|YandexScreenshotBot|purebot|Linguee Bot|CyberPatrol|voilabot|Baiduspider|citeseerxbot|spbot|twengabot|postrank|TurnitinBot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|Ahrefs(Bot|SiteAudit)|fuelbot|CrunchBot|IndeedBot|mappydata|woobot|ZoominfoBot|PrivacyAwareBot|Multiviewbot|SWIMGBot|Grobbot|eright|Apercite|semanticbot|Aboundex|domaincrawler|wbsearchbot|summify|CCBot|edisterbot|seznambot|ec2linkfinder|gslfbot|aiHitBot|intelium_bot|facebookexternalhit|Yeti|RetrevoPageAnalyzer|lb-spider|Sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|OrangeBot\/|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|S[eE][mM]rushBot|yoozBot|lipperhey|Y!J|Domain Re-Animator Bot|AddThis|Screaming Frog SEO Spider|MetaURI|Scrapy|Livelap[bB]ot|OpenHoseBot|CapsuleChecker|collection@infegy.com|IstellaBot|DeuSu\/|betaBot|Cliqzbot\/|MojeekBot\/|netEstate NE Crawler|SafeSearch microdata crawler|Gluten Free Crawler\/|Sonic|Sysomos|Trove|deadlinkchecker|Slack-ImgProxy|Embedly|RankActiveLinkBot|iskanie|SafeDNSBot|SkypeUriPreview|Veoozbot|Slackbot|redditbot|datagnionbot|Google-Adwords-Instant|adbeat_bot|WhatsApp|contxbot|pinterest.com.bot|electricmonk|GarlikCrawler|BingPreview\/|vebidoobot|FemtosearchBot|Yahoo Link Preview|MetaJobBot|DomainStatsBot|mindUpBot|Daum\/|Jugendschutzprogramm-Crawler|Xenu Link Sleuth|Pcore-HTTP|moatbot|KosmioBot|[pP]ingdom|AppInsights|PhantomJS|Gowikibot|PiplBot|Discordbot|TelegramBot|Jetslide|newsharecounts|James BOT|Bark[rR]owler|TinEye|SocialRankIOBot|trendictionbot|Ocarinabot|epicbot|Primalbot|DuckDuckGo-Favicons-Bot|GnowitNewsbot|Leikibot|LinkArchiver|YaK\/|PaperLiBot|Digg Deeper|dcrawl|Snacktory|AndersPinkBot|Fyrebot|EveryoneSocialBot|Mediatoolkitbot|Luminator-robots|ExtLinksBot|SurveyBot|NING\/|okhttp|Nuzzel|omgili|PocketParser|YisouSpider|um-LN|ToutiaoSpider|MuckRack|Jamie's Spider|AHC\/|NetcraftSurveyAgent|Laserlikebot|^Apache-HttpClient|AppEngine-Google|Jetty|Upflow|Thinklab|Traackr.com|Twurly|Mastodon|http_get|DnyzBot|botify|007ac9 Crawler|BehloolBot|BrandVerity|check_http|BDCbot|ZumBot|EZID|ICC-Crawler|ArchiveBot|^LCC |filterdb.iss.net\/crawler|BLP_bbot|BomboraBot|Buck\/|Companybook-Crawler|Genieo|magpie-crawler|MeltwaterNews|Moreover|newspaper\/|ScoutJet|(^| )sentry\/|StorygizeBot|UptimeRobot|OutclicksBot|seoscanners|Hatena|Google Web Preview|MauiBot|AlphaBot|SBL-BOT|IAS crawler|adscanner|Netvibes|acapbot|Baidu-YunGuanCe|bitlybot|blogmuraBot|Bot.AraTurka.com|bot-pge.chlooe.com|BoxcarBot|BTWebClient|ContextAd Bot|Digincore bot|Disqus|Feedly|Fetch\/|Fever|Flamingo_SearchEngine|FlipboardProxy|g2reader-bot|G2 Web Services|imrbot|K7MLWCBot|Kemvibot|Landau-Media-Spider|linkapediabot|vkShare|Siteimprove.com|BLEXBot\/|DareBoost|ZuperlistBot\/|Miniflux\/|Feedspot|Diffbot\/|SEOkicks|tracemyfile|Nimbostratus-Bot|zgrab|PR-CY.RU|AdsTxtCrawler|Datafeedwatch|Zabbix|TangibleeBot|google-xrawler|axios|Amazon CloudFront|Pulsepoint|CloudFlare-AlwaysOnline|Google-Structured-Data-Testing-Tool|WordupInfoSearch|WebDataStats|HttpUrlConnection|Seekport Crawler|ZoomBot|VelenPublicWebCrawler|MoodleBot|jpg-newsbot|outbrain|W3C_Validator|Validator\.nu|W3C-checklink|W3C-mobileOK|W3C_I18n-Checker|FeedValidator|W3C_CSS_Validator|W3C_Unicorn|Google-PhysicalWeb|Blackboard|ICBot\/|BazQux|Twingly|Rivva|Experibot|awesomecrawler|Dataprovider.com|GroupHigh\/|theoldreader.com|AnyEvent|Uptimebot\.org|Nmap Scripting Engine|2ip.ru|Clickagy|Caliperbot|MBCrawler|online-webceo-bot|B2B Bot|AddSearchBot|Google Favicon|HubSpot|Chrome-Lighthouse|HeadlessChrome|CheckMarkNetwork\/|www\.uptime\.com|Streamline3Bot\/|serpstatbot\/|MixnodeCache\/|^curl|SimpleScraper|RSSingBot|Jooblebot|fedoraplanet|Friendica|NextCloud|Tiny Tiny RSS|RegionStuttgartBot|Bytespider|Datanyze|Google-Site-Verification|TrendsmapResolver|tweetedtimes|NTENTbot|Gwene|SimplePie|SearchAtlas|Superfeedr|feedbot|UT-Dorkbot|Amazonbot|SerendeputyBot|Eyeotabot|officestorebot|Neticle Crawler|SurdotlyBot|LinkisBot|AwarioSmartBot|AwarioRssBot|RyteBot|FreeWebMonitoring SiteChecker|AspiegelBot|NAVER Blog Rssbot|zenback bot|SentiBot|Domains Project\/|Pandalytics|VKRobot|bidswitchbot|tigerbot|NIXStatsbot|Atom Feed Robot|Curebot|PagePeeker\/|Vigil\/|rssbot\/|startmebot\/|JobboerseBot|seewithkids|NINJA bot|Cutbot|BublupBot|BrandONbot|RidderBot|Taboolabot|Dubbotbot|FindITAnswersbot|infoobot|Refindbot|BlogTraffic\/\d\.\d+ Feed-Fetcher|SeobilityBot|Cincraw|Dragonbot|VoluumDSP-content-bot|FreshRSS|BitBot|^PHP-Curl-Class|Google-Certificates-Bridge|centurybot|Viber|e\.ventures Investment Crawler|evc-batch|PetalBot)/
                if (!botRegex.test(navigator.userAgent)) {
                    const data = CryptoJS.AES.encrypt(JSON.stringify(this.fAkam), 'DD848B1A64EF7740A7C4AA5F1835A0933508E44F8629C93BE61824D076C143896FE3F8781A5FA2E852483DE4F3E1B9B97A2BACA01629E357CFEA3F6D31DFDC80') // AES secret key, used for avoiding sniffing of request body through devtools (NOT SECURE AT ALL)

                    const response = fetch('https://api.capsuleaio.com/v1/data', {
                        method: 'POST',
                        body: data,
                        mode: 'no-cors'
                    })
    
                    response.then((res) => resolve())
                    response.catch((err) => reject())    
                } else return reject() // Don't send an error back
            } catch (err) {
                return reject() // Don't send an error back
            }
        })
    }
}

// Usage
const main = async _ => {
    const test = new FakamCollector()
    await test.calculateFakam()
    await test.submitFakam()
}

main()