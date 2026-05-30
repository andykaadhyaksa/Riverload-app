(function(){var _m={exports:{}};(function(module,exports){/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).JSZip=e()}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});})(_m,_m.exports);window.JSZip=_m.exports;})();

// ═══════════════════════════════════════════════════════════════
// DATABASE PP 22/2021 LAMPIRAN VI — 49 Parameter
// ═══════════════════════════════════════════════════════════════
const WQDB = [
  {no:1,  name:'Temperatur',                      unit:'°C',         k1:'Dev 3',k2:'Dev 3',k3:'Dev 3',k4:'Dev 3',        ket:'Perbedaan dengan suhu udara di atas permukaan air'},
  {no:2,  name:'Padatan Terlarut Total (TDS)',     unit:'mg/L',       k1:1000,   k2:1000,   k3:1000,   k4:2000,           ket:'Tidak berlaku untuk muara'},
  {no:3,  name:'Padatan Tersuspensi Total (TSS)',  unit:'mg/L',       k1:40,     k2:50,     k3:100,    k4:400,            ket:null},
  {no:4,  name:'Warna',                           unit:'Pt-Co Unit', k1:15,     k2:50,     k3:100,    k4:'-',            ket:'Tidak berlaku untuk air gambut'},
  {no:5,  name:'Derajat Keasaman (pH)',            unit:'-',          k1:'6-9',  k2:'6-9',  k3:'6-9',  k4:'6-9',          ket:'Tidak berlaku untuk air gambut'},
  {no:6,  name:'BOD₅',                            unit:'mg/L',       k1:2,      k2:3,      k3:6,      k4:12,             ket:null},
  {no:7,  name:'COD',                             unit:'mg/L',       k1:10,     k2:25,     k3:40,     k4:80,             ket:null},
  {no:8,  name:'Oksigen Terlarut (DO)',            unit:'mg/L',       k1:6,      k2:4,      k3:3,      k4:1,              ket:'Batas minimal'},
  {no:9,  name:'Sulfat (SO₄²⁻)',                  unit:'mg/L',       k1:300,    k2:300,    k3:300,    k4:400,            ket:null},
  {no:10, name:'Klorida (Cl⁻)',                   unit:'mg/L',       k1:300,    k2:300,    k3:300,    k4:600,            ket:null},
  {no:11, name:'Nitrat (sebagai N)',              unit:'mg/L',       k1:10,     k2:10,     k3:20,     k4:20,             ket:null},
  {no:12, name:'Nitrit (sebagai N)',              unit:'mg/L',       k1:0.06,   k2:0.06,   k3:0.06,   k4:'-',            ket:null},
  {no:13, name:'Amoniak (sebagai N)',             unit:'mg/L',       k1:0.1,    k2:0.2,    k3:0.5,    k4:'-',            ket:null},
  {no:14, name:'Total Nitrogen',                  unit:'mg/L',       k1:15,     k2:15,     k3:25,     k4:'-',            ket:null},
  {no:15, name:'Total Fosfat (sebagai P)',        unit:'mg/L',       k1:0.2,    k2:0.2,    k3:1,      k4:'-',            ket:null},
  {no:16, name:'Fluorida (F⁻)',                   unit:'mg/L',       k1:1,      k2:1.5,    k3:1.5,    k4:'-',            ket:null},
  {no:17, name:'Belerang sebagai H₂S',            unit:'mg/L',       k1:0.002,  k2:0.002,  k3:0.002,  k4:'-',            ket:null},
  {no:18, name:'Sianida (CN⁻)',                   unit:'mg/L',       k1:0.02,   k2:0.02,   k3:0.02,   k4:'-',            ket:null},
  {no:19, name:'Klorin Bebas',                    unit:'mg/L',       k1:0.03,   k2:0.03,   k3:0.03,   k4:'-',            ket:'Bagi air baku air minum tidak dipersyaratkan'},
  {no:20, name:'Barium (Ba) Terlarut',            unit:'mg/L',       k1:1,      k2:'-',    k3:'-',    k4:'-',            ket:null},
  {no:21, name:'Boron (B) Terlarut',             unit:'mg/L',       k1:1,      k2:1,      k3:1,      k4:1,              ket:null},
  {no:22, name:'Merkuri (Hg) Terlarut',           unit:'mg/L',       k1:0.001,  k2:0.002,  k3:0.002,  k4:0.005,          ket:null},
  {no:23, name:'Arsen (As) Terlarut',             unit:'mg/L',       k1:0.05,   k2:0.05,   k3:0.05,   k4:0.1,            ket:null},
  {no:24, name:'Selenium (Se) Terlarut',          unit:'mg/L',       k1:0.01,   k2:0.05,   k3:0.05,   k4:0.05,           ket:null},
  {no:25, name:'Besi (Fe) Terlarut',              unit:'mg/L',       k1:0.3,    k2:'-',    k3:'-',    k4:'-',            ket:null},
  {no:26, name:'Kadmium (Cd) Terlarut',           unit:'mg/L',       k1:0.01,   k2:0.01,   k3:0.01,   k4:0.01,           ket:null},
  {no:27, name:'Kobalt (Co) Terlarut',            unit:'mg/L',       k1:0.2,    k2:0.2,    k3:0.2,    k4:0.2,            ket:null},
  {no:28, name:'Mangan (Mn) Terlarut',            unit:'mg/L',       k1:0.1,    k2:'-',    k3:'-',    k4:'-',            ket:null},
  {no:29, name:'Nikel (Ni) Terlarut',             unit:'mg/L',       k1:0.05,   k2:0.05,   k3:0.05,   k4:0.1,            ket:null},
  {no:30, name:'Seng (Zn) Terlarut',              unit:'mg/L',       k1:0.05,   k2:0.05,   k3:0.05,   k4:2,              ket:null},
  {no:31, name:'Tembaga (Cu) Terlarut',           unit:'mg/L',       k1:0.02,   k2:0.02,   k3:0.02,   k4:0.2,            ket:null},
  {no:32, name:'Timbal (Pb) Terlarut',            unit:'mg/L',       k1:0.03,   k2:0.03,   k3:0.03,   k4:0.5,            ket:null},
  {no:33, name:'Kromium Heksavalen (Cr-VI)',       unit:'mg/L',       k1:0.05,   k2:0.05,   k3:0.05,   k4:1,              ket:null},
  {no:34, name:'Minyak dan Lemak',                unit:'mg/L',       k1:1,      k2:1,      k3:1,      k4:10,             ket:null},
  {no:35, name:'Deterjen Total',                  unit:'mg/L',       k1:0.2,    k2:0.2,    k3:0.2,    k4:'-',            ket:null},
  {no:36, name:'Fenol',                           unit:'mg/L',       k1:0.002,  k2:0.005,  k3:0.01,   k4:0.02,           ket:null},
  {no:37, name:'Aldrin/Dieldrin',                 unit:'µg/L',       k1:17,     k2:'-',    k3:'-',    k4:'-',            ket:null},
  {no:38, name:'BHC',                             unit:'µg/L',       k1:210,    k2:210,    k3:210,    k4:'-',            ket:null},
  {no:39, name:'Chlordane',                       unit:'µg/L',       k1:3,      k2:'-',    k3:'-',    k4:'-',            ket:null},
  {no:40, name:'DDT',                             unit:'µg/L',       k1:2,      k2:2,      k3:2,      k4:2,              ket:null},
  {no:41, name:'Endrin',                          unit:'µg/L',       k1:1,      k2:4,      k3:4,      k4:'-',            ket:null},
  {no:42, name:'Heptachlor',                      unit:'µg/L',       k1:18,     k2:'-',    k3:'-',    k4:'-',            ket:null},
  {no:43, name:'Lindane',                         unit:'µg/L',       k1:56,     k2:'-',    k3:'-',    k4:'-',            ket:null},
  {no:44, name:'Methoxychlor',                    unit:'µg/L',       k1:35,     k2:'-',    k3:'-',    k4:'-',            ket:null},
  {no:45, name:'Toxapan',                         unit:'µg/L',       k1:5,      k2:'-',    k3:'-',    k4:'-',            ket:null},
  {no:46, name:'Fecal Coliform',                  unit:'MPN/100 mL', k1:100,    k2:1000,   k3:2000,   k4:2000,           ket:null},
  {no:47, name:'Total Coliform',                  unit:'MPN/100 mL', k1:1000,   k2:5000,   k3:10000,  k4:10000,          ket:null},
  {no:48, name:'Sampah',                          unit:'-',          k1:'nihil',k2:'nihil',k3:'nihil',k4:'nihil',        ket:null},
  {no:49, name:'Radioaktivitas Gross Alpha / Beta',unit:'Bq/L',      k1:'0.1/1',k2:'0.1/1',k3:'0.1/1',k4:'0.1/1',       ket:null},
];

function getKVal(row, cls) {
  return row['k'+cls];
}
function valStr(v) {
  if (v === null || v === undefined) return '—';
  return String(v);
}
function numVal(v) {
  if (v === null || v === undefined || v === '-' || v === 'nihil') return null;
  if (typeof v === 'string') {
    if (v.startsWith('Dev')) return null;
    if (v.includes('-') && v.includes('0')) return null; // ranges like 6-9
    const n = parseFloat(v.replace(/[^0-9.]/g,''));
    return isNaN(n) ? null : n;
  }
  return parseFloat(v);
}

const CLASS_DESC = {
  '1': 'Air baku untuk air minum dan/atau peruntukan lain yang mempersyaratkan mutu air yang sama',
  '2': 'Rekreasi air, budidaya ikan air tawar, peternakan, pertanian, dan/atau peruntukan lain',
  '3': 'Pembudidayaan ikan air tawar, peternakan, pertanian, dan/atau peruntukan lain',
  '4': 'Mengairi pertanaman dan/atau peruntukan lain yang mempersyaratkan mutu air yang sama'
};

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════
let params = [];   // {id, no, name, unit, bm, bmNum, cDry, cWet, ...computed}
let pid = 0;
let wasteSources = [];  // {id, typeId, typeLabel, name, qDay}
let wsId = 0;
// wsTypePicked declared below;
let _season = 'dry';  // active season tab
let _dbFilter = '';

// ═══════════════════════════════════════════════════════════════
// NAV & THEME
// ═══════════════════════════════════════════════════════════════
function nav(p) {
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));
  document.getElementById('page-'+p).classList.add('active');
  const ni=document.getElementById('nav-'+p);
  if(ni) ni.classList.add('active');
  if(p==='db') renderDB();
  if(p==='report') buildReport();
  if(p==='ubm') { ubmSyncFromBPM(); ubmRenderSources(); ubmRenderParams(); }
  if(p==='modeling') { mdlSync(); }
}
function toggleTheme() {
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')!=='light';
  html.setAttribute('data-theme',isDark?'light':'dark');
  document.getElementById('tlbl').textContent=isDark?'● DARK':'○ LIGHT';
  document.getElementById('tico').textContent=isDark?'●':'○';
  localStorage.setItem('rl_theme',isDark?'light':'dark');
  setTimeout(()=>{ if(document.getElementById('rpt-body').style.display!=='none') buildReport(); },50);
}
function applyTheme() {
  const t=localStorage.getItem('rl_theme')||'dark';
  document.documentElement.setAttribute('data-theme',t);
  const isL=t==='light';
  document.getElementById('tlbl').textContent=isL?'● DARK':'○ LIGHT';
  document.getElementById('tico').textContent=isL?'●':'○';
}

// ═══════════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════════
let _tt;
function toast(msg,type) {
  const el=document.getElementById('toast');
  el.textContent=msg;
  el.style.borderLeftColor=type==='ok'?'var(--green)':type==='err'?'var(--red)':'var(--accent)';
  el.style.borderLeftWidth='3px';
  el.classList.add('show');
  clearTimeout(_tt);
  _tt=setTimeout(()=>el.classList.remove('show'),3200);
}

// ═══════════════════════════════════════════════════════════════
// FORMAT
// ═══════════════════════════════════════════════════════════════
function fN(v,d=4) {
  if(v==null||isNaN(v)) return '—';
  if(v===0) return '0';
  if(Math.abs(v)<0.0001 && v!==0) return v.toExponential(3);
  return parseFloat(v.toFixed(d)).toLocaleString('id-ID',{minimumFractionDigits:d,maximumFractionDigits:d});
}
function pNum(s) {
  if(typeof s==='number') return s;
  return parseFloat(String(s||'').replace(/\./g,'').replace(',','.'))||0;
}

// ═══════════════════════════════════════════════════════════════
// CLASS CHANGE
// ═══════════════════════════════════════════════════════════════
function onClassChange() {
  const cls=document.getElementById('r-class').value;
  const info=document.getElementById('class-info');
  if(cls) {
    info.style.display='block';
    document.getElementById('class-desc').textContent=CLASS_DESC[cls]||'';
  } else {
    info.style.display='none';
  }
  // Update BM dari WQDB sesuai kelas sungai — SELALU re-fetch agar tidak mismatch
  params.forEach(p=>{
    const dbRow=WQDB.find(r=>r.no===p.no);
    if(dbRow && cls) {
      p.bm    = getKVal(dbRow, cls);   // nilai dari PP 22/2021 Lamp.VI sesuai kelas
      p.bmNum = numVal(p.bm);           // konversi ke angka untuk kalkulasi BPM
    }
  });
  recalcAll();
  renderParams();
  saveAuto();
}

// ═══════════════════════════════════════════════════════════════
// ADD FROM DB
// ═══════════════════════════════════════════════════════════════
function addFromDB(no) {
  if(params.find(p=>p.no===no)) { toast('⚠ Parameter sudah ditambahkan','err'); return; }
  const row=WQDB.find(r=>r.no===no);
  if(!row) return;
  const cls=document.getElementById('r-class').value;
  const bm=cls?getKVal(row,cls):'';
  pid++;
  params.push({
    id:pid, no:row.no, name:row.name, unit:row.unit,
    bm:bm, bmNum:numVal(bm),
    cDry:'', cWet:'',
    bpmDry:null,bpaDry:null,statusDry:null,
    bpmWet:null,bpaWet:null,statusWet:null
  });
  recalcAll();
  renderParams();
  saveAuto();
  toast(`✓ ${row.name} ditambahkan`,'ok');
}

// ═══════════════════════════════════════════════════════════════
// DELETE PARAM
// ═══════════════════════════════════════════════════════════════
function delParam(id) {
  params=params.filter(p=>p.id!==id);
  recalcAll(); renderParams(); saveAuto();
}

// ═══════════════════════════════════════════════════════════════
// PARAM CHANGE (C Aktual input)
// ═══════════════════════════════════════════════════════════════
function pChange(id, field, val) {
  const p = params.find(x => x.id === id);
  if (!p) return;
  p[field] = val;
  // Recalc satu parameter (tidak re-render list agar input tidak kehilangan fokus)
  const qDry = pNum(document.getElementById('q-dry').value);
  const qWet = pNum(document.getElementById('q-wet').value);
  const cD = pNum(p.cDry), cW = pNum(p.cWet);
  const bmStr = String(p.bm || '');
  const isPH  = bmStr.includes('6') && bmStr.includes('9') && p.bmNum === null;
  const isDash = !isPH && p.bmNum === null;
  if (isPH) {
    p.bpmDry = null; p.bpmWet = null; p.bpaDry = null; p.bpaWet = null;
    p.statusDry = (p.cDry !== '' && cD >= 6 && cD <= 9) ? 'ok' : (p.cDry !== '' && cD > 0 ? 'ng' : null);
    p.statusWet = (p.cWet !== '' && cW >= 6 && cW <= 9) ? 'ok' : (p.cWet !== '' && cW > 0 ? 'ng' : null);
  } else if (isDash) {
    p.bpmDry = null; p.bpmWet = null;
    p.bpaDry = (qDry > 0 && cD > 0) ? qDry * cD * 3.6 : null;
    p.bpaWet = (qWet > 0 && cW > 0) ? qWet * cW * 3.6 : null;
    p.statusDry = p.bpaDry != null ? 'ok' : null;
    p.statusWet = p.bpaWet != null ? 'ok' : null;
  } else {
    p.bpmDry = (qDry > 0 && p.bmNum != null) ? qDry * p.bmNum * 3.6 : null;
    p.bpmWet = (qWet > 0 && p.bmNum != null) ? qWet * p.bmNum * 3.6 : null;
    p.bpaDry = (qDry > 0 && cD > 0) ? qDry * cD * 3.6 : null;
    p.bpaWet = (qWet > 0 && cW > 0) ? qWet * cW * 3.6 : null;
    p.statusDry = p.bpmDry === null
      ? (p.bpaDry != null ? 'ok' : (cD > 0 ? 'ok' : null))
      : (p.bpaDry != null ? (p.bpaDry <= p.bpmDry ? 'ok' : 'ng') : null);
    p.statusWet = p.bpmWet === null
      ? (p.bpaWet != null ? 'ok' : (cW > 0 ? 'ok' : null))
      : (p.bpaWet != null ? (p.bpaWet <= p.bpmWet ? 'ok' : 'ng') : null);
  }
  _updateRowDisplay(p);
  updateResultKPI();
  saveAuto();
}

function _updateRowDisplay(p) {
  const row = document.getElementById('pr-' + p.id);
  if (!row) return;
  const s = _season;
  const bpm    = s === 'dry' ? p.bpmDry : p.bpmWet;
  const bpa    = s === 'dry' ? p.bpaDry : p.bpaWet;
  const status = s === 'dry' ? p.statusDry : p.statusWet;
  // Update BPM cell
  const isPH_u = typeof p.bm==='string' && p.bm.includes('6') && p.bm.includes('9') && p.bmNum===null;
  const isDash_u = !isPH_u && p.bmNum === null;
  const bpmCell = row.querySelector('[data-cell="bpm"]');
  if (bpmCell) {
    if (isPH_u) bpmCell.innerHTML = '<span style="font-size:9px;color:var(--mute)">— (Rentang pH)</span>';
    else if (isDash_u) bpmCell.innerHTML = '<span style="font-size:9px;color:var(--green)">— (Tdk Dipersyaratkan)</span>';
    else bpmCell.textContent = bpm != null ? fN(bpm) : '—';
  }
  // Update BPA cell
  const bpaCell = row.querySelector('[data-cell="bpa"]');
  if (bpaCell) {
    if (isPH_u) bpaCell.innerHTML = '<span style="font-size:9px;color:var(--mute)">Lihat Status</span>';
    else bpaCell.textContent = bpa != null ? fN(bpa) : '—';
    bpaCell.style.color = status === 'ng' ? 'var(--red)' : status === 'ok' ? 'var(--green)' : 'var(--txt2)';
  }
  // Update status badge
  const stCell = row.querySelector('[data-cell="status"]');
  if (stCell) {
    stCell.innerHTML = status === 'ok'
      ? '<span class="badge b-ok">✓ MEMENUHI</span>'
      : status === 'ng'
      ? '<span class="badge b-ng">✗ MELEBIHI</span>'
      : '<span class="badge b-na">—</span>';
  }
  // Update row border color
  row.classList.remove('ok', 'ng');
  if (status) row.classList.add(status);
}

// ═══════════════════════════════════════════════════════════════
// RECALC
// ═══════════════════════════════════════════════════════════════
function recalcAll() {
  const qDry = pNum(document.getElementById('q-dry').value);
  const qWet = pNum(document.getElementById('q-wet').value);
  const cls  = document.getElementById('r-class').value;

  params.forEach(p => {
    // ── Selalu re-fetch C Maks dari WQDB berdasarkan kelas sungai aktif ──
    // Ini memastikan kolom C Maks selalu dari PP 22/2021 Lamp.VI, bukan nilai lama
    if(p.no && cls) {
      const dbRow = WQDB.find(r => r.no === p.no);
      if(dbRow) {
        p.bm    = getKVal(dbRow, cls);
        p.bmNum = numVal(p.bm);
      }
    }

    const cD = pNum(p.cDry), cW = pNum(p.cWet);

    // Deteksi tipe BM
    const bmStr = String(p.bm || '');
    const isPH  = (bmStr.includes('6') && bmStr.includes('9') && p.bmNum === null);
    const isDash = !isPH && p.bmNum === null; // "–", "-", deviatif, null, dll

    // ── pH (rentang 6–9) ──────────────────────────────────
    if (isPH) {
      p.bpmDry = null; p.bpmWet = null;
      p.bpaDry = null; p.bpaWet = null;
      p.statusDry = (p.cDry !== '' && cD >= 6 && cD <= 9) ? 'ok' : (p.cDry !== '' && cD > 0 ? 'ng' : null);
      p.statusWet = (p.cWet !== '' && cW >= 6 && cW <= 9) ? 'ok' : (p.cWet !== '' && cW > 0 ? 'ng' : null);
      return;
    }

    // ── BM "–" / tidak dipersyaratkan ────────────────────
    if (isDash) {
      p.bpmDry = null; p.bpmWet = null;
      p.bpaDry = (qDry > 0 && cD > 0) ? qDry * cD * 3.6 : null;
      p.bpaWet = (qWet > 0 && cW > 0) ? qWet * cW * 3.6 : null;
      p.statusDry = p.bpaDry != null ? 'ok' : null;
      p.statusWet = p.bpaWet != null ? 'ok' : null;
      return;
    }

    // ── Normal: BM numerik — BPM dari BM Sungai ──────────
    // BPM = Q_sungai (m³/s) × C_Maks_BM_Sungai (mg/L) × 3.6  → kg/jam
    p.bpmDry = (qDry > 0 && p.bmNum != null) ? qDry * p.bmNum * 3.6 : null;
    p.bpmWet = (qWet > 0 && p.bmNum != null) ? qWet * p.bmNum * 3.6 : null;
    // BPA = Q_sungai (m³/s) × C_aktual (mg/L) × 3.6  → kg/jam
    p.bpaDry = (qDry > 0 && cD > 0) ? qDry * cD * 3.6 : null;
    p.bpaWet = (qWet > 0 && cW > 0) ? qWet * cW * 3.6 : null;
    p.statusDry = p.bpmDry === null
      ? (p.bpaDry != null ? 'ok' : (cD > 0 ? 'ok' : null))
      : (p.bpaDry != null ? (p.bpaDry <= p.bpmDry ? 'ok' : 'ng') : null);
    p.statusWet = p.bpmWet === null
      ? (p.bpaWet != null ? 'ok' : (cW > 0 ? 'ok' : null))
      : (p.bpaWet != null ? (p.bpaWet <= p.bpmWet ? 'ok' : 'ng') : null);
  });
  updateResultKPI();
  saveAuto();
}

// ═══════════════════════════════════════════════════════════════
// RENDER PARAMS
// ═══════════════════════════════════════════════════════════════
function renderParams() {
  const el=document.getElementById('param-list');
  const em=document.getElementById('param-empty');
  const hdr=document.getElementById('param-hdr');
  const footer=document.getElementById('param-footer');
  const tabs=document.getElementById('season-tabs');

  if(!params.length) {
    el.innerHTML=''; em.style.display='flex';
    hdr.style.display='none'; footer.style.display='none';
    tabs.style.display='none';
    document.getElementById('result-kpi').style.display='none';
    return;
  }
  em.style.display='none';
  hdr.style.display='grid';
  footer.style.display='flex';
  tabs.style.display='flex';

  const s=_season;
  el.innerHTML=params.map((p,i)=>{
    const bmDisp = valStr(p.bm);
    const bpm    = s==='dry' ? p.bpmDry : p.bpmWet;
    const bpa    = s==='dry' ? p.bpaDry : p.bpaWet;
    const status = s==='dry' ? p.statusDry : p.statusWet;
    const cVal   = s==='dry' ? p.cDry : p.cWet;
    const cField = s==='dry'?'cDry':'cWet';
    const isPH   = typeof p.bm==='string' && p.bm.includes('6') && p.bm.includes('9') && p.bmNum===null;
    const isDash = !isPH && p.bmNum === null;

    // BPM display
    const bpmDisp = isPH
      ? '<span style="font-size:9px;color:var(--mute)">— (Rentang pH)</span>'
      : isDash
      ? '<span style="font-size:9px;color:var(--green)">— (Tdk Dipersyaratkan)</span>'
      : (bpm != null ? fN(bpm) : '<span style="font-size:9px;color:var(--mute)">Isi Debit</span>');

    // BPA display
    const bpaDisp = isPH
      ? '<span style="font-size:9px;color:var(--mute)">Lihat Status</span>'
      : (bpa != null ? fN(bpa) : '—');

    // Status badge
    const stBadge = status==='ok'
      ? '<span class="badge b-ok">✓ MEMENUHI</span>'
      : status==='ng'
      ? '<span class="badge b-ng">✗ MELEBIHI</span>'
      : '<span class="badge b-na">—</span>';
    const rowCls = status==='ok'?'ok':status==='ng'?'ng':'';
    const bpaColor = status==='ng'?'var(--red)':status==='ok'?'var(--green)':'var(--txt2)';

    return `<div class="param-row ${rowCls}" id="pr-${p.id}">
      <div style="text-align:center;font-family:var(--mono);font-size:10px;color:var(--mute)">${i+1}</div>
      <div>
        <div style="font-weight:600;font-size:12.5px;color:var(--txt)">${p.name}</div>
        <div style="font-family:var(--mono);font-size:9px;color:var(--mute);margin-top:1px">${p.unit}</div>
      </div>
      <div style="text-align:center;font-family:var(--mono);font-size:10.5px;color:var(--mute)">${p.unit}</div>
      <div style="text-align:right;font-family:var(--mono);font-size:11.5px;color:var(--accent)">${bmDisp}</div>
      <div data-cell="bpm" style="text-align:right;font-family:var(--mono);font-size:11.5px;color:var(--txt2)">${bpmDisp}</div>
      <div>
        <input class="inp-sm" value="${cVal}" placeholder="0.000" inputmode="decimal"
          oninput="pChange(${p.id},'${cField}',this.value)"
          style="text-align:right">
      </div>
      <div data-cell="bpa" style="text-align:right;font-family:var(--mono);font-size:11.5px;color:${bpaColor}">${bpaDisp}</div>
      <div data-cell="status" style="text-align:center">${stBadge}</div>
      <div><button onclick="delParam(${p.id})" class="btn btn-danger btn-xs">✕</button></div>
    </div>`;
  }).join('');

  // footer stats
  const s2=_season;
  const ok=params.filter(p=>(s2==='dry'?p.statusDry:p.statusWet)==='ok').length;
  const ng=params.filter(p=>(s2==='dry'?p.statusDry:p.statusWet)==='ng').length;
  document.getElementById('footer-stats').innerHTML=
    `<span style="color:var(--green)">✓ ${ok} MEMENUHI</span> &nbsp; <span style="color:var(--red)">✗ ${ng} MELEBIHI</span>`;
}

function updateParamCalc(p) {
  _updateRowDisplay(p);
}

// ═══════════════════════════════════════════════════════════════
// SEASON SWITCH
// ═══════════════════════════════════════════════════════════════
function switchSeason(s) {
  _season=s;
  document.getElementById('tab-dry').className='season-tab'+(s==='dry'?' active-dry':'');
  document.getElementById('tab-wet').className='season-tab'+(s==='wet'?' active-wet':'');
  document.getElementById('result-season-lbl').textContent=
    s==='dry'?'// HASIL PERHITUNGAN — ☀ MUSIM KEMARAU':'// HASIL PERHITUNGAN — 🌧 MUSIM HUJAN';
  renderParams();
  updateResultKPI();
}

// ═══════════════════════════════════════════════════════════════
// RESULT KPI
// ═══════════════════════════════════════════════════════════════
function updateResultKPI() {
  const hasAny = params.some(p => p.bpmDry != null || p.bpmWet != null || p.statusDry != null || p.statusWet != null);
  const hasDryInput = pNum(document.getElementById('q-dry').value) > 0;
  const hasWetInput = pNum(document.getElementById('q-wet').value) > 0;
  const showAny = params.length > 0 && (hasDryInput || hasWetInput);
  const ri = document.getElementById('result-kpi');
  ri.style.display = showAny ? 'block' : 'none';
  if (!showAny) return;

  const s = _season;
  const qDry = pNum(document.getElementById('q-dry').value);
  const qWet = pNum(document.getElementById('q-wet').value);

  // KPI strip
  const okD = params.filter(p => p.statusDry === 'ok').length;
  const ngD = params.filter(p => p.statusDry === 'ng').length;
  const okW = params.filter(p => p.statusWet === 'ok').length;
  const ngW = params.filter(p => p.statusWet === 'ng').length;
  const okCur = s === 'dry' ? okD : okW;
  const ngCur = s === 'dry' ? ngD : ngW;
  const anaCur = okCur + ngCur;
  document.getElementById('kpi-grid').innerHTML = [
    {lbl:'Parameter', val:params.length, unit:'total', kc:'var(--accent)'},
    {lbl:'Memenuhi',  val:okCur, unit:'parameter', kc:'var(--green)'},
    {lbl:'Melebihi BPM', val:ngCur, unit:'parameter', kc:'var(--red)'},
    {lbl:'Kepatuhan', val:anaCur ? Math.round(okCur/anaCur*100)+'%' : '—', unit:'', kc:'var(--blue)'},
  ].map(k => `<div class="kpi" style="--kc:${k.kc}"><div class="kpi-lbl">${k.lbl}</div><div class="kpi-val">${k.val}</div><div class="kpi-unit">${k.unit}</div></div>`).join('');

  // ── Rekap tabel ──────────────────────────────────────────
  function buildRekapRows(seasonKey) {
    const qVal = seasonKey === 'dry' ? qDry : qWet;
    if (!qVal) return '<tr><td colspan="9" style="padding:14px;text-align:center;font-family:var(--mono);font-size:10.5px;color:var(--mute)">Debit musim ini belum diisi</td></tr>';

    const isOk = st => st === 'ok';
    let prevQShown = false;
    return params.map((p, i) => {
      const bpm    = seasonKey === 'dry' ? p.bpmDry : p.bpmWet;
      const bpa    = seasonKey === 'dry' ? p.bpaDry : p.bpaWet;
      const status = seasonKey === 'dry' ? p.statusDry : p.statusWet;
      const cAkt   = seasonKey === 'dry' ? p.cDry : p.cWet;
      const isPH   = typeof p.bm === 'string' && p.bm.includes('6') && p.bm.includes('9') && p.bmNum === null;
      const isDash = !isPH && p.bmNum === null;

      const bmDisp  = valStr(p.bm);
      const bpmDisp = isPH ? '—' : (bpm != null ? fN(bpm, 2) : '—');
      const bpaDisp = isPH ? (cAkt !== '' ? cAkt : '—') : (bpa != null ? fN(bpa, 2) : '—');
      const cDisp   = cAkt !== '' ? cAkt : '—';

      const stBadge = status === 'ok'
        ? `<span style="color:var(--green);font-family:var(--mono);font-size:9.5px;font-weight:700">✓ Memenuhi</span>`
        : status === 'ng'
        ? `<span style="color:var(--red);font-family:var(--mono);font-size:9.5px;font-weight:700">✗ Melebihi</span>`
        : `<span style="color:var(--mute);font-family:var(--mono);font-size:9.5px">—</span>`;

      const rowBg = status === 'ng' ? 'rgba(255,60,60,0.04)' : status === 'ok' ? 'rgba(0,232,122,0.03)' : '';
      const bpaColor = status === 'ng' ? 'var(--red)' : status === 'ok' ? 'var(--green)' : 'var(--txt2)';

      // Debit sungai: tampilkan hanya di baris pertama (rowspan visual — kita tampilkan di setiap baris tapi hanya tulis sekali)
      const qCell = `<td style="padding:7px 10px;text-align:right;font-family:var(--mono);font-size:11px;color:var(--accent)">${i===0?fN(qVal,3):''}</td>`;

      // BPM & BPA display untuk rekap
      const rBpmDisp = isPH ? '— (pH)' : isDash ? '— (Tdk Dipersyaratkan)' : (bpm!=null ? fN(bpm,4) : '—');
      const rBpaDisp = isPH ? (cAkt !== '' ? cAkt : '—') : (bpa!=null ? fN(bpa,4) : '—');
      // Kolom: No | Parameter | Debit (m³/s) | Satuan | C Maks/BM (mg/L) | BPM (kg/jam) | C Aktual (mg/L) | BPA (kg/jam) | Status
      return `<tr style="background:${rowBg};border-bottom:1px solid var(--brd2)">
        <td style="padding:7px 10px;text-align:center;font-family:var(--mono);font-size:10px;color:var(--mute)">${i+1}</td>
        <td style="padding:7px 10px;font-size:12px;font-weight:600;color:var(--txt)">${esc(p.name)}</td>
        <td style="padding:7px 10px;text-align:right;font-family:var(--mono);font-size:11px;color:var(--accent)">${fN(qVal,4)}</td>
        <td style="padding:7px 10px;text-align:center;font-family:var(--mono);font-size:10.5px;color:var(--mute)">${esc(p.unit)}</td>
        <td style="padding:7px 10px;text-align:right;font-family:var(--mono);font-size:11px;color:var(--accent);font-weight:600">${bmDisp}</td>
        <td style="padding:7px 10px;text-align:right;font-family:var(--mono);font-size:11px;color:var(--amber)">${rBpmDisp}</td>
        <td style="padding:7px 10px;text-align:right;font-family:var(--mono);font-size:11px;color:var(--txt2)">${cDisp}</td>
        <td style="padding:7px 10px;text-align:right;font-family:var(--mono);font-size:11px;color:${bpaColor};font-weight:${status?'600':'400'}">${rBpaDisp}</td>
        <td style="padding:7px 10px;text-align:center">${stBadge}</td>
      </tr>`;
    }).join('');
  }

  const dryTbody = document.getElementById('rekap-dry-tbody');
  const wetTbody = document.getElementById('rekap-wet-tbody');
  const dryQlbl  = document.getElementById('rekap-dry-q');
  const wetQlbl  = document.getElementById('rekap-wet-q');

  if (dryTbody) dryTbody.innerHTML = buildRekapRows('dry');
  if (wetTbody) wetTbody.innerHTML = buildRekapRows('wet');
  if (dryQlbl) dryQlbl.textContent = qDry > 0 ? `Debit: ${fN(qDry,3)} m³/s` : 'Debit belum diisi';
  if (wetQlbl) wetQlbl.textContent = qWet > 0 ? `Debit: ${fN(qWet,3)} m³/s` : 'Debit belum diisi';

  // Tampilkan/sembunyikan section sesuai data
  const drySection = document.getElementById('rekap-dry');
  const wetSection = document.getElementById('rekap-wet');
  if (drySection) drySection.style.display = 'block';
  if (wetSection) wetSection.style.display = 'block';
}

// ═══════════════════════════════════════════════════════════════
// CALC BUTTON
// ═══════════════════════════════════════════════════════════════
function calcAll() {
  const qDry=pNum(document.getElementById('q-dry').value);
  const qWet=pNum(document.getElementById('q-wet').value);
  if(!qDry&&!qWet) { toast('⚠ Masukkan minimal satu nilai debit sungai','err'); return; }
  if(!params.length) { toast('⚠ Tambahkan parameter dari Database BM','err'); return; }
  recalcAll();
  renderParams();
  toast('✓ Perhitungan BPM & BPA selesai','ok');
  document.getElementById('result-kpi').scrollIntoView({behavior:'smooth',block:'nearest'});
}

function resetAll() {
  if(!confirm('Reset semua parameter?')) return;
  params=[]; pid=0;
  document.getElementById('r-name').value='';
  document.getElementById('r-class').value='';
  document.getElementById('q-dry').value='';
  document.getElementById('q-wet').value='';
  document.getElementById('class-info').style.display='none';
  renderParams();
  saveAuto();
}

// ═══════════════════════════════════════════════════════════════
// DATABASE RENDER
// ═══════════════════════════════════════════════════════════════
function dbFilter(cls) {
  _dbFilter=cls;
  ['','1','2','3','4'].forEach(c=>{
    const btn=document.getElementById('dbf-'+(c||'all'));
    if(btn) btn.className='btn btn-xs '+(c===cls?'btn-primary':'btn-outline');
  });
  const lbl=['SEMUA KELAS','KELAS I','KELAS II','KELAS III','KELAS IV'][parseInt(cls)||0];
  document.getElementById('db-filter-lbl').textContent=lbl;
  renderDB();
}

function renderDB() {
  const search=(document.getElementById('db-search')?.value||'').toLowerCase();
  const tbody=document.getElementById('db-tbody');
  const filtered=WQDB.filter(r=>
    (!search||r.name.toLowerCase().includes(search))
  );
  document.getElementById('db-count').textContent=`${filtered.length} parameter`;
  const cls=document.getElementById('r-class').value;

  tbody.innerHTML=filtered.map(row=>{
    const already=params.find(p=>p.no===row.no);
    const cv=(v,highlight)=>{
      const isBm=_dbFilter&&row['k'+_dbFilter]===v;
      const col=String(v)==='-'?'var(--mute)':String(v).startsWith('Dev')?'var(--amber)':String(v)==='nihil'?'var(--mute)':'var(--txt)';
      const bg=highlight&&isBm?'background:rgba(62,207,178,0.08);font-weight:600;':'';
      return `<td class="td-c" style="font-family:var(--mono);font-size:11px;color:${col};${bg}">${valStr(v)}</td>`;
    };
    return `<tr>
      <td class="td-c" style="font-family:var(--mono);font-size:10px;color:var(--mute)">${row.no}</td>
      <td>
        <div style="font-weight:600;font-size:12.5px">${row.name}</div>
        ${row.ket?`<div style="font-size:9.5px;color:var(--mute);font-family:var(--mono);margin-top:1px">${row.ket}</div>`:''}
      </td>
      <td class="td-c" style="font-family:var(--mono);font-size:10.5px;color:var(--mute2)">${row.unit}</td>
      ${cv(row.k1)} ${cv(row.k2)} ${cv(row.k3)} ${cv(row.k4)}
      <td class="td-mu" style="font-size:10px">${row.ket||''}</td>
      <td class="td-c">
        ${already
          ? `<span style="font-family:var(--mono);font-size:9.5px;color:var(--green)">✓ ADDED</span>`
          : `<button class="btn btn-xs btn-outline" onclick="addFromDB(${row.no})">+ TAMBAH</button>`
        }
      </td>
    </tr>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════════════════════════
let _charts={};
function killChart(id){try{if(_charts[id]){_charts[id].destroy();_charts[id]=null;}}catch(e){}}

function buildReport() {
  const hasData=params.some(p=>p.bpmDry!=null||p.bpmWet!=null);
  document.getElementById('rpt-empty').style.display=hasData?'none':'flex';
  document.getElementById('rpt-body').style.display=hasData?'block':'none';
  if(!hasData) return;

  const isDark=document.documentElement.getAttribute('data-theme')!=='light';
  const GC=isDark?'rgba(62,207,178,0.08)':'rgba(0,120,100,0.08)';
  const TC=isDark?'#3a6660':'#2a6055';
  const TBG=isDark?'#0a1e2e':'#fff';

  const rn=document.getElementById('r-name').value.trim()||'—';
  const rc=document.getElementById('r-class').value;
  const qDry=pNum(document.getElementById('q-dry').value);
  const qWet=pNum(document.getElementById('q-wet').value);

  document.getElementById('rpt-meta').innerHTML=
    new Date().toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'})+'<br>RiverLoad v2.0 / PP 22/2021';

  document.getElementById('rpt-river').innerHTML=[
    ['Nama Sungai',rn],
    ['Kelas Sungai',rc?`Kelas ${['I','II','III','IV'][rc-1]}`:'—'],
    ['Q Kemarau',qDry?fN(qDry)+' m³/det':'—'],
    ['Q Hujan',qWet?fN(qWet)+' m³/det':'—'],
    ['Peruntukan',rc?(CLASS_DESC[rc]||'—'):'—'],
  ].map(([k,v])=>`<div>
    <div style="font-family:var(--mono);font-size:8.5px;color:var(--mute);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">${k}</div>
    <div style="font-family:var(--mono);font-size:12.5px;font-weight:600;color:var(--txt)">${v}</div>
  </div>`).join('');

  // Render table helper
  function renderRptTable(tbodyId, kpiId, seasonKey) {
    const bpmKey=seasonKey==='dry'?'bpmDry':'bpmWet';
    const bpaKey=seasonKey==='dry'?'bpaDry':'bpaWet';
    const stKey =seasonKey==='dry'?'statusDry':'statusWet';
    const cKey  =seasonKey==='dry'?'cDry':'cWet';
    const ok=params.filter(p=>p[stKey]==='ok').length;
    const ng=params.filter(p=>p[stKey]==='ng').length;
    document.getElementById(kpiId).innerHTML=
      `<span style="color:var(--green)">✓ ${ok} Memenuhi</span> &nbsp; <span style="color:var(--red)">✗ ${ng} Melebihi</span>`;
    document.getElementById(tbodyId).innerHTML=params.map((p,i)=>{
      const bpm=p[bpmKey]; const bpa=p[bpaKey]; const st=p[stKey]; const c=p[cKey];
      const badge=st==='ok'?'<span class="badge b-ok">✓ MEMENUHI</span>':st==='ng'?'<span class="badge b-ng">✗ MELEBIHI</span>':'<span class="badge b-na">—</span>';
      const bg=i%2?'var(--card2)':'';
      return `<tr class="${st==='ok'?'result-ok':st==='ng'?'result-ng':''}" style="${bg?'background:'+bg:''}">
        <td class="td-c td-mu">${i+1}</td>
        <td style="font-weight:600">${p.name}</td>
        <td class="td-c" style="font-family:var(--mono);font-size:10.5px;color:var(--mute)">${p.unit}</td>
        <td class="td-r" style="color:var(--accent)">${valStr(p.bm)}</td>
        <td class="td-r">${bpm!=null?fN(bpm):'—'}</td>
        <td class="td-r">${c||'—'}</td>
        <td class="td-r" style="color:${st==='ng'?'var(--red)':st==='ok'?'var(--green)':'var(--txt2)'}">${bpa!=null?fN(bpa):'—'}</td>
        <td class="td-c">${badge}</td>
      </tr>`;
    }).join('');
  }
  renderRptTable('rpt-dry-tbody','rpt-dry-kpi','dry');
  renderRptTable('rpt-wet-tbody','rpt-wet-kpi','wet');
  document.getElementById('rpt-dry-card').style.display=qDry?'block':'none';
  document.getElementById('rpt-wet-card').style.display=qWet?'block':'none';

  // Charts
  function mkChart(id,seasonKey) {
    killChart(id);
    const bpmK=seasonKey==='dry'?'bpmDry':'bpmWet';
    const bpaK=seasonKey==='dry'?'bpaDry':'bpaWet';
    const stK =seasonKey==='dry'?'statusDry':'statusWet';
    const cp=params.filter(p=>p[bpmK]!=null);
    if(!cp.length) return;
    _charts[id]=new Chart(document.getElementById(id).getContext('2d'),{
      type:'bar',
      data:{
        labels:cp.map(p=>p.name.length>12?p.name.substring(0,12)+'…':p.name),
        datasets:[
          {label:'BPM',data:cp.map(p=>p[bpmK]),backgroundColor:'rgba(62,207,178,0.25)',borderColor:'var(--accent)',borderWidth:1.5,borderRadius:2},
          {label:'BPA',data:cp.map(p=>p[bpaK]||0),backgroundColor:cp.map(p=>p[stK]==='ng'?'rgba(255,68,68,0.5)':'rgba(0,232,122,0.4)'),borderColor:cp.map(p=>p[stK]==='ng'?'var(--red)':'var(--green)'),borderWidth:1.5,borderRadius:2},
        ]
      },
      options:{responsive:true,maintainAspectRatio:false,
        plugins:{legend:{labels:{color:TC,font:{family:'Inter',size:10}}},
          tooltip:{backgroundColor:TBG,titleColor:'var(--accent)',bodyColor:TC,borderColor:'var(--brd)',borderWidth:1,
            callbacks:{label:c=>` ${c.dataset.label}: ${fN(c.parsed.y)} kg/jam`}}},
        scales:{x:{grid:{color:GC},ticks:{color:TC,font:{family:'Inter',size:8},maxRotation:35}},
                y:{grid:{color:GC},ticks:{color:TC,font:{family:'Inter',size:8}}}}}
    });
  }
  if(qDry) mkChart('ch-dry','dry');
  if(qWet) mkChart('ch-wet','wet');

  // Populate rekap UBM di Laporan (jika ada data UBM)
  if(ubmParams.length > 0) {
    const totalQi = ubmSources.reduce((s,x)=>s+pNum(x.qDay)/86400, 0);
    if(totalQi > 0) {
      _ubmCalcAndShowResults(); // ini akan mengisi rpt-ubm-rekap-* sekarang
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// EXPORT WORD
// ═══════════════════════════════════════════════════════════════
async function exportWord() {
  const JSZip=window.JSZip;
  if(!JSZip){toast('⚠ JSZip tidak tersedia','err');return;}
  if(!params.length){toast('⚠ Belum ada data','err');return;}
  toast('⏳ Membuat dokumen…','');
  await new Promise(r=>setTimeout(r,30));

  const rn=document.getElementById('r-name').value.trim()||'—';
  const rc=document.getElementById('r-class').value;
  const qDry=pNum(document.getElementById('q-dry').value);
  const qWet=pNum(document.getElementById('q-wet').value);
  const clsRom=rc?['I','II','III','IV'][rc-1]:'—';
  const dateStr=new Date().toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'});

  const esc=s=>String(s==null?'—':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const CW=9026; // Total page width in twips (for A4: 210mm width - 2.5cm margins each side = 160mm = ~9026 twips)
  const clr=h=>`<w:color w:val="${h||'000000'}"/>`;
  const sz=p=>`<w:sz w:val="${p}"/><w:szCs w:val="${p}"/>`;
  const fnt=`<w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>`;
  const run=(t,o={})=>`<w:r><w:rPr>${fnt}${sz(o.sz||22)}${o.b?'<w:b/>':''}${o.it?'<w:i/>':''}${clr(o.c||'1e293b')}</w:rPr><w:t xml:space="preserve">${esc(t)}</w:t></w:r>`;
  const par=(ct,o={})=>`<w:p><w:pPr><w:jc w:val="${o.ctr?'center':'both'}"/><w:spacing w:before="${o.bef||0}" w:after="${o.aft||120}" w:line="280" w:lineRule="auto"/></w:pPr>${ct}</w:p>`;
  const sp=()=>`<w:p><w:pPr><w:spacing w:after="80"/></w:pPr></w:p>`;
  const pb=()=>`<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
  const tc=(t,o={})=>`<w:tc><w:tcPr><w:tcW w:w="${o.w||1000}" w:type="dxa"/><w:tcBorders><w:top w:val="single" w:sz="6" w:color="cbd5e1"/><w:bottom w:val="single" w:sz="6" w:color="cbd5e1"/><w:left w:val="single" w:sz="6" w:color="cbd5e1"/><w:right w:val="single" w:sz="6" w:color="cbd5e1"/></w:tcBorders>${o.bg?`<w:shd w:val="clear" w:color="auto" w:fill="${o.bg}"/>`:''}${o.vm?`<w:vAlign w:val="center"/>`:''}${o.mar||''}</w:tcPr><w:p><w:pPr><w:jc w:val="${o.ctr?'center':'left'}"/><w:spacing w:before="0" w:after="0"/></w:pPr>${run(t,{sz:o.sz||20,b:o.b,c:o.c||'1e293b'})}</w:p></w:tc>`;
  const tr2=(cells,hdr=false)=>`<w:tr${hdr?' w:tblHeader="true"':''}>${cells}</w:tr>`;
  const mkTbl=(cws,rows)=>{const tot=cws.reduce((a,b)=>a+b,0);const grid=cws.map(w=>`<w:gridCol w:w="${w}"/>`).join('');return `<w:tbl><w:tblPr><w:tblW w:w="${tot}" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="6" w:color="cbd5e1"/><w:bottom w:val="single" w:sz="6" w:color="cbd5e1"/><w:left w:val="single" w:sz="6" w:color="cbd5e1"/><w:right w:val="single" w:sz="6" w:color="cbd5e1"/><w:insideH w:val="single" w:sz="6" w:color="cbd5e1"/><w:insideV w:val="single" w:sz="6" w:color="cbd5e1"/></w:tblBorders><w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:left w:w="80" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${grid}</w:tblGrid>${rows.join('')}</w:tbl>`;};
  const hc=(t,w)=>tc(t,{w,b:true,ctr:true,bg:'004d45',c:'FFFFFF',sz:20});

  let xml='';
  // Cover
  xml+=Array(7).fill(sp()).join('');
  xml+=par(run('RIVERLOAD',{sz:72,b:true,c:'00897b'}),{ctr:true,aft:40,bef:0});
  xml+=par(run('LAPORAN ANALISIS BEBAN PENCEMARAN SUNGAI',{sz:38,b:true,c:'004d45'}),{ctr:true,aft:60});
  xml+=par(run('Berdasarkan PP No. 22 Tahun 2021 — Lampiran VI',{sz:22,it:true,c:'546e7a'}),{ctr:true,aft:0});
  xml+=par(run('',{sz:4}),{ctr:true,bef:160,aft:160});
  xml+=par(run(dateStr,{sz:22,c:'37474f'}),{ctr:true,aft:40});
  xml+=par(run(`${rn} · Kelas ${clsRom}`,{sz:24,b:true,c:'004d45'}),{ctr:true,aft:0});
  xml+=pb();

  // Info sungai
  xml+=par(run('BAB 1  DATA SUNGAI',{sz:28,b:true,c:'004d45'}),{bef:0,aft:160});
  const iW=[3000,6026];
  xml+=mkTbl(iW,[
    tr2(hc('Parameter',iW[0])+hc('Keterangan',iW[1]),true),
    tr2(tc('Nama Sungai / Badan Air',{w:iW[0]})+tc(rn,{w:iW[1],b:true})),
    tr2(tc('Kelas Sungai (PP 22/2021)',{w:iW[0]})+tc(`Kelas ${clsRom}`,{w:iW[1],b:true,bg:'e0f2f1'})),
    tr2(tc('Peruntukan',{w:iW[0]})+tc(rc?CLASS_DESC[rc]:'—',{w:iW[1]})),
    tr2(tc('Debit Musim Kemarau (Q)',{w:iW[0]})+tc(qDry?fN(qDry)+' m³/det':'—',{w:iW[1],b:true,bg:'fff9e6'})),
    tr2(tc('Debit Musim Hujan (Q)',{w:iW[0]})+tc(qWet?fN(qWet)+' m³/det':'—',{w:iW[1],b:true,bg:'e3f0ff'})),
  ]);

  // Season table helper
  function seasonSection(title, seasonKey, Q) {
    if(!Q) return '';
    const bpmK=seasonKey==='dry'?'bpmDry':'bpmWet';
    const bpaK=seasonKey==='dry'?'bpaDry':'bpaWet';
    const stK =seasonKey==='dry'?'statusDry':'statusWet';
    const cK  =seasonKey==='dry'?'cDry':'cWet';
    const okP=params.filter(p=>p[stK]==='ok');
    const ngP=params.filter(p=>p[stK]==='ng');
    const bg=seasonKey==='dry'?'fff9e6':'e3f0ff';
    const hbg=seasonKey==='dry'?'f57c00':'1565c0';
    let s='';
    s+=sp()+sp();
    s+=par(run(title,{sz:28,b:true,c:'004d45'}),{bef:240,aft:120});
    s+=par(run(`Debit Q = ${fN(Q)} m³/det · ${okP.length} Parameter Memenuhi · ${ngP.length} Parameter Melebihi`,{sz:20,c:'546e7a'}),{aft:120});
    const cw9=[350,2000,580,750,850,700,850,750];
    s+=mkTbl(cw9,[
      tr2(hc('No',cw9[0])+hc('Parameter',cw9[1])+hc('Satuan',cw9[2])+hc('Baku Mutu',cw9[3])+hc('BPM (kg/jam)',cw9[4])+hc('C Aktual',cw9[5])+hc('BPA (kg/jam)',cw9[6])+hc('Status',cw9[7]),true),
      ...params.map((p,i)=>{
        const bpm=p[bpmK]; const bpa=p[bpaK]; const st=p[stK]; const c=p[cK];
        const ket=st==='ok'?'✓':st==='ng'?'✗':'—';
        const ketCol=st==='ok'?'1b5e20':st==='ng'?'b71c1c':'546e7a';
        const rowBg=i%2?'f5f5f5':null;
        return tr2(
          tc(i+1,{w:cw9[0],ctr:true,bg:rowBg,sz:19})+
          tc(p.name||'—',{w:cw9[1],bg:rowBg,sz:19})+
          tc(p.unit||'—',{w:cw9[2],ctr:true,bg:rowBg,sz:18})+
          tc(valStr(p.bm),{w:cw9[3],ctr:true,bg:rowBg,sz:19})+
          tc(bpm!=null?fN(bpm):'—',{w:cw9[4],ctr:true,bg:rowBg,sz:19,c:'004d45',b:true})+
          tc(c||'—',{w:cw9[5],ctr:true,bg:rowBg,sz:19})+
          tc(bpa!=null?fN(bpa):'—',{w:cw9[6],ctr:true,bg:rowBg,sz:19,c:st==='ng'?'b71c1c':'1e293b',b:true})+
          tc(ket,{w:cw9[7],ctr:true,bg:rowBg,sz:20,b:true,c:ketCol})
        );
      }),
      tr2(tc(`${params.length} Parameter · ${okP.length} Memenuhi · ${ngP.length} Melebihi`,{w:CW,b:true,sz:20,bg:'e0f2f1',c:'004d45'}))
    ]);
    return s;
  }

  xml+=seasonSection('BAB 2  HASIL BPM & BPA — MUSIM KEMARAU','dry',qDry);
  xml+=seasonSection('BAB 3  HASIL BPM & BPA — MUSIM HUJAN','wet',qWet);

  // ─── BAB UBM ─────────────────────────────────────────────────
  const babNum = (qDry&&qWet) ? 4 : 3;
  const ubmRiverName = document.getElementById('ubm-river')?.value?.trim() || rn;
  const ubmCls  = document.getElementById('ubm-class')?.value || rc;
  const ubmClsRom = ubmCls ? ['I','II','III','IV'][ubmCls-1] : clsRom;
  const ubmQsDry = getQsDry();
  const ubmQsWet = getQsWet();
  const ubmTotalQi = ubmSources.reduce((s,x)=>s+pNum(x.qDay)/86400, 0);
  const ubmDenomDry = ubmQsDry + ubmTotalQi;
  const ubmDenomWet = ubmQsWet + ubmTotalQi;

  if(ubmParams.length && ubmTotalQi > 0) {
    xml+=pb();
    xml+=par(run(`BAB ${babNum}  USULAN BAKU MUTU AIR LIMBAH`,{sz:28,b:true,c:'004d45'}),{bef:0,aft:160});
    xml+=par(run(`Analisis usulan baku mutu dilakukan pada ${ubmRiverName} (Kelas ${ubmClsRom}) berdasarkan metode Neraca Massa PermenLHK No. 5 Tahun 2021. Terdapat ${ubmSources.length} sumber air limbah dengan total debit ${fmtN(ubmTotalQi,6)} m³/det.`,{sz:21}),{aft:120});

    // Formula box
    xml+=par(run('Formula: CR Hilir = (Qs × C_hulu + ΣQi × Ci) / (Qs + ΣQi)  |  C_maks = [BM × (Qs + ΣQi) − Qs × C_hulu] / ΣQi',{sz:19,it:true,c:'546e7a'}),{aft:80});
    xml+=par(run('Alokasi Beban (kg/hari) = Usulan BM (mg/L) × ΣQ_limbah (m³/det) × 86.400 (det/hari) ÷ 1.000 (L→kg)',{sz:19,it:true,c:'546e7a'}),{aft:120});

    // Sumber air limbah table
    xml+=par(run('Tabel Sumber Air Limbah',{sz:22,b:true,c:'1e293b'}),{bef:80,aft:80});
    const swCols=[380,3000,1400,1200,1046];
    xml+=mkTbl(swCols,[
      tr2(hc('No',swCols[0])+hc('Nama Sumber / Titik Penaatan',swCols[1])+hc('Debit (m³/hari)',swCols[2])+hc('Debit (m³/jam)',swCols[3])+hc('Debit (m³/det)',swCols[4]),true),
      ...ubmSources.map((s,i)=>{
        const qd=pNum(s.qDay);
        const rowBg=i%2?'f5f5f5':null;
        return tr2(tc(i+1,{w:swCols[0],ctr:true,bg:rowBg,sz:18})+tc(s.name||'—',{w:swCols[1],bg:rowBg,sz:18})+tc(fmtN(qd,2),{w:swCols[2],ctr:true,bg:rowBg,sz:18})+tc(fmtN(qd/24,3),{w:swCols[3],ctr:true,bg:rowBg,sz:18})+tc(fmtN(qd/86400,6),{w:swCols[4],ctr:true,bg:rowBg,sz:18}));
      }),
      tr2(tc('TOTAL',{w:swCols[0]+swCols[1],b:true,bg:'e0f2f1',c:'004d45',sz:19})+tc(fmtN(ubmSources.reduce((s,x)=>s+pNum(x.qDay),0),2),{w:swCols[2],ctr:true,b:true,bg:'e0f2f1',c:'004d45',sz:19})+tc('—',{w:swCols[3],ctr:true,bg:'e0f2f1',sz:18})+tc(fmtN(ubmTotalQi,6),{w:swCols[4],ctr:true,b:true,bg:'e0f2f1',c:'004d45',sz:18}))
    ]);

    // Helper: build UBM season table
    function ubmSeasonSection(seasonLabel, Qs, denomQs, hdrBg, hdrTxt) {
      if(!Qs) return '';
      if(!denomQs || denomQs <= 0) return '';
      let xs = '';
      xs += sp();
      xs += par(run(seasonLabel+`  (Q Sungai = ${fmtN(Qs,4)} m³/det)`,{sz:23,b:true,c:hdrTxt}),{bef:160,aft:100});

      // Hitung CR dan Cmax per parameter — gunakan C Hulu sesuai musim
      const calcRows = ubmParams.map(p=>{
        const cHuluRaw = seasonLabel.toLowerCase().includes('hujan')
          ? (p.cHuluWet ?? p.cHulu ?? '')
          : (p.cHuluDry ?? p.cHulu ?? '');
        const cHulu = pNum(cHuluRaw);
        let sumQiCi = 0;
        ubmSources.forEach(s=>{ sumQiCi += (pNum(s.qDay)/86400)*pNum(p.cSrc[s.id]); });
        const cr = denomQs>0 ? (Qs*cHulu+sumQiCi)/denomQs : null;
        const bm = p.bmVal;
        const status = cr!=null&&bm!=null ? (cr<=bm?'ok':'ng') : null;
        const cmRaw = bm!=null&&ubmTotalQi>0 ? (bm*denomQs-Qs*cHulu)/ubmTotalQi : null;
        const cMax  = cmRaw!=null ? Math.max(0, cmRaw) : null;
        // Usulan BM: dari input form pengguna
        const usulanBMRaw = p.usulanBM ?? '';
        const usulanBMVal = usulanBMRaw !== '' ? pNum(usulanBMRaw) : null;
        const alokasi = usulanBMVal!=null&&ubmTotalQi>0 ? usulanBMVal*ubmTotalQi*86400/1000 : null;
        return {p, cr, bm, status, cmRaw, cMax, usulanBMVal, alokasi};
      });

      // ── Kumpulkan uniqueJenis dari ubmSources ─────────────
      const _ubmJenisCols = ubmSources.filter(s=>s.typeId)
        .map(s=>({srcId:s.id, name:s.name||s.typeLabel||`Sumber ${s.id}`, typeId:s.typeId}));
      const _uniqueJenis = []; const _seenType = new Set();
      _ubmJenisCols.forEach(j=>{ if(!_seenType.has(j.typeId)){_seenType.add(j.typeId);_uniqueJenis.push(j);} });

      // ── Alias mapping (sama dengan buildCRSection di layar) ──
      const _JALIAS = {
        'padatan tersuspensi total (tss)':['residu tersuspensi (tss)','residu tersuspensi','tss'],
        'besi (fe) terlarut':['besi (fe) total','fe'],
        'mangan (mn) terlarut':['mangan (mn) total','mn'],
        'derajat keasaman (ph)':['ph (tingkat keasaman)','ph'],
        'bod₅':['bod'], 'amoniak (sebagai n)':['amoniak (nh₃-n)','amoniak'],
        'deterjen total':['deterjen total (mbas)'],
        'minyak dan lemak':['minyak & lemak','minyak dan lemak'],
        'klorin bebas':['sisa klorin (cl₂)','residual klorin','klorin bebas'],
        'fecal coliform':['fecal coliform'],
        'tembaga (cu) terlarut':['cu'],'kadmium (cd) terlarut':['cd'],
        'seng (zn) terlarut':['zn'],'timbal (pb) terlarut':['pb'],
        'arsen (as) terlarut':['as'],'nikel (ni) terlarut':['ni'],
        'kromium heksavalen (cr-vi)':['cr'],'sianida (cn⁻)':['cn'],
        'merkuri (hg) terlarut':['hg'],'nitrat (sebagai n)':['nitrat (sebagai n)'],
      };
      const _norm = s => s.toLowerCase().replace(/[^a-z0-9]/g,'');

      // Helper: dapatkan nilai BM Jenis untuk satu parameter dan satu jenis
      function _getBMJenis(paramName, typeId) {
        const t = BMALLDB.find(x=>x.id===typeId);
        if (!t) return '—';
        const tgtNorm = _norm(paramName||'');
        const acceptNorms = new Set([tgtNorm]);
        Object.entries(_JALIAS).forEach(([key, aliases]) => {
          if (_norm(key)===tgtNorm || aliases.some(a=>_norm(a)===tgtNorm)) {
            acceptNorms.add(_norm(key));
            aliases.forEach(a=>acceptNorms.add(_norm(a)));
          }
        });
        const matches = t.params.filter(px => {
          const pnorm = _norm(px.param);
          if (acceptNorms.has(pnorm)) return true;
          if (pnorm.length>=4 && tgtNorm.length>=4 && (pnorm.includes(tgtNorm)||tgtNorm.includes(pnorm))) return true;
          return false;
        });
        if (!matches.length) return '—';
        const nums = matches.map(m=>m.num).filter(n=>n!=null&&!isNaN(n));
        if (nums.length>0) return fmtN(Math.min(...nums), 4);
        return matches[0].kadarMaks;
      }

      // Kolom: No|Parameter|Satuan|C Hulu|C Sumber...|CR Hilir|BM Kelas|[BM Jenis...]|Status|C_maks Hitung|Usulan BM|Alokasi
      const nSrc = ubmSources.length;
      const nJenis = _uniqueJenis.length;
      const srcW = nSrc > 0 ? Math.min(900, Math.floor(1600/Math.max(nSrc,1))) : 0;
      const jenisW = nJenis > 0 ? Math.min(850, Math.floor(1400/Math.max(nJenis,1))) : 0;
      const fixedW = [340,1500,500,600];
      const trailW = [700,700]; // CR, BM Kelas
      const afterJenisW = [700,700,700,700]; // Status, C_maks Hitung, Usulan BM, Alokasi
      const used = fixedW.reduce((a,b)=>a+b,0)+nSrc*srcW+trailW.reduce((a,b)=>a+b,0)+nJenis*jenisW+afterJenisW.reduce((a,b)=>a+b,0);
      const alokasiW = Math.max(600, 9026-used+afterJenisW[3]);
      const allCols=[...fixedW,...ubmSources.map(()=>srcW),...trailW,..._uniqueJenis.map(()=>jenisW),...afterJenisW.slice(0,3),alokasiW];
      const hdrBgHex = hdrBg; const hdrC = hdrTxt;

      const hdrRow = tr2(
        tc('No',       {w:allCols[0],b:true,ctr:true,bg:hdrBgHex,c:hdrC,sz:18})+
        tc('Parameter',{w:allCols[1],b:true,ctr:true,bg:hdrBgHex,c:hdrC,sz:18})+
        tc('Satuan',   {w:allCols[2],b:true,ctr:true,bg:hdrBgHex,c:hdrC,sz:18})+
        tc('C Hulu Sungai (mg/L)',{w:allCols[3],b:true,ctr:true,bg:hdrBgHex,c:hdrC,sz:18})+
        ubmSources.map((s,si)=>tc((s.name||`Sumber ${si+1}`)+' (mg/L)',{w:allCols[4+si],b:true,ctr:true,bg:hdrBgHex,c:hdrC,sz:17})).join('')+
        tc('CR Hilir (mg/L)',{w:allCols[4+nSrc],b:true,ctr:true,bg:hdrBgHex,c:hdrC,sz:18})+
        tc('BM Kelas Sungai (mg/L)',{w:allCols[5+nSrc],b:true,ctr:true,bg:hdrBgHex,c:hdrC,sz:17})+
        _uniqueJenis.map((j,ji)=>{
          const t=BMALLDB.find(x=>x.id===j.typeId);
          const label=t?t.label.replace(/–.*/,'').trim().slice(0,25):j.name;
          return tc('BM '+label+' (mg/L)',{w:allCols[6+nSrc+ji],b:true,ctr:true,bg:'fff0c8',c:'78350f',sz:16});
        }).join('')+
        tc('Status Mutu',{w:allCols[6+nSrc+nJenis],b:true,ctr:true,bg:hdrBgHex,c:hdrC,sz:18})+
        tc('C_maks Hitung (mg/L)',{w:allCols[7+nSrc+nJenis],b:true,ctr:true,bg:hdrBgHex,c:hdrC,sz:17})+
        tc('Usulan BM (mg/L)',{w:allCols[8+nSrc+nJenis],b:true,ctr:true,bg:'fef3c7',c:'78350f',sz:17})+
        tc('Alokasi Beban (kg/hari)',{w:alokasiW,b:true,ctr:true,bg:'fef3c7',c:'78350f',sz:17}),
        true
      );

      const dataRows = calcRows.map(({p,cr,bm,status,cmRaw,cMax,usulanBMVal,alokasi},i)=>{
        const rowBg = i%2 ? 'f5f5f5' : null;
        const ket   = status==='ok'?'Memenuhi':status==='ng'?'Melebihi':'—';
        const ketC  = status==='ok'?'1b5e20':status==='ng'?'b71c1c':'546e7a';
        const cmStr = cmRaw==null?'—':cmRaw<0?'< 0 (tdk ada ruang)':fmtN(cMax,4);
        const cmC   = cmRaw!=null&&cmRaw<0?'b71c1c':cmRaw!=null?'004d45':'546e7a';
        const cHuluDisp = seasonLabel.toLowerCase().includes('hujan')
          ? (p.cHuluWet!==undefined&&p.cHuluWet!==''?p.cHuluWet:p.cHulu)
          : (p.cHuluDry!==undefined&&p.cHuluDry!==''?p.cHuluDry:p.cHulu);
        // Usulan BM: tampilkan nilai yang diinput, beri tanda jika melebihi C_maks
        const ubmStr = p.isPH ? '6-9 (rentang)' : (usulanBMVal!=null ? fmtN(usulanBMVal,4) : '— (belum diisi)');
        const ubmC   = p.isPH ? '004d45' : usulanBMVal!=null ? (cMax!=null&&usulanBMVal>cMax?'b71c1c':'e65100') : '546e7a';
        const ubmBg  = p.isPH ? null : usulanBMVal!=null&&cMax!=null&&usulanBMVal>cMax ? 'ffebee' : usulanBMVal!=null ? 'fffbe6' : null;
        return tr2(
          tc(i+1,           {w:allCols[0],ctr:true,bg:rowBg,sz:18})+
          tc(p.name||'—',  {w:allCols[1],bg:rowBg,sz:18,b:true})+
          tc(p.unit||'—',  {w:allCols[2],ctr:true,bg:rowBg,sz:17})+
          tc(cHuluDisp||'—',{w:allCols[3],ctr:true,bg:rowBg,sz:18})+
          ubmSources.map((s,si)=>tc(p.cSrc[s.id]||'—',{w:allCols[4+si],ctr:true,bg:rowBg,sz:17})).join('')+
          tc(cr!=null?fmtN(cr,4):'—',{w:allCols[4+nSrc],ctr:true,bg:rowBg,sz:18,b:true,c:cr!=null&&bm!=null&&cr>bm?'b71c1c':'004d45'})+
          tc(bm!=null?fmtN(bm,4):'—',{w:allCols[5+nSrc],ctr:true,bg:rowBg,sz:18})+
          _uniqueJenis.map((j,ji)=>tc(_getBMJenis(p.name,j.typeId),{w:allCols[6+nSrc+ji],ctr:true,bg:'fffbe6',c:'92400e',sz:17})).join('')+
          tc(ket,{w:allCols[6+nSrc+nJenis],ctr:true,bg:status==='ng'?'ffebee':status==='ok'?'e8f5e9':rowBg,sz:18,b:true,c:ketC})+
          tc(cmStr,{w:allCols[7+nSrc+nJenis],ctr:true,bg:rowBg,sz:18,c:cmC})+
          tc(ubmStr,{w:allCols[8+nSrc+nJenis],ctr:true,bg:ubmBg,sz:18,b:usulanBMVal!=null,c:ubmC})+
          tc(alokasi!=null?fmtN(alokasi,2):'—',{w:alokasiW,ctr:true,bg:alokasi!=null?'fffbe6':rowBg,sz:18,b:alokasi!=null,c:alokasi!=null?'e65100':'546e7a'})
        );
      });

      xs += mkTbl(allCols, [hdrRow, ...dataRows]);
      return xs;
    }

    xml += ubmSeasonSection('MUSIM HUJAN 🌧', ubmQsWet, ubmDenomWet, 'dbeafe', '1e3a8a');
    xml += ubmSeasonSection('MUSIM KEMARAU ☀', ubmQsDry, ubmDenomDry, 'fef3c7', '78350f');

    // ─── CR HILIR SUNGAI DARI USULAN BAKU MUTU ────────────────
    const hasUsulanBM = ubmParams.filter(p=>(p.usulanBM??'')!=='').length;
    if(hasUsulanBM > 0) {
      xml += sp() + sp() + pb();
      xml += par(run(`BAB ${babNum}.1  CR HILIR SUNGAI — HASIL USULAN BAKU MUTU`,{sz:26,b:true,c:'004d45'}),{bef:0,aft:140});
      xml += par(run(`Perhitungan CR menggunakan nilai Usulan Baku Mutu sebagai konsentrasi air limbah (C_i) dari seluruh sumber. Formula: CR = (Q_s × C_hulu + ΣQ_i × C_i,usulan) / (Q_s + ΣQ_i)`,{sz:20,it:true,c:'546e7a'}),{aft:100});

      function crUsulanSeasonSection(seasonLabel, Qs, denom, hdrBgHex, hdrC) {
        if(!Qs||Qs<=0) return '';
        let xs = '';
        xs += sp();
        xs += par(run(seasonLabel,{sz:24,b:true,c:hdrC}),{bef:120,aft:100});
        xs += par(run(`Q Sungai = ${fmtN(Qs,4)} m³/det  |  ΣQ Limbah = ${fmtN(ubmTotalQi,6)} m³/det`,{sz:19,c:'546e7a'}),{aft:80});

        // Lebar kolom: Parameter | Satuan | C Hulu | [per sumber] | CR Hilir | BM Sungai | Alokasi | Status
        // Hitung lebar dinamis berdasarkan jumlah sumber
        const nSrc = ubmSources.length || 1;
        const srcColW = Math.max(700, Math.min(950, Math.floor(2800 / nSrc)));
        const fixedW = 1800 + 600 + 800 + 900 + 950 + 900 + 1076; // kolom tetap
        const totalSrcW = srcColW * nSrc;
        const crCols = [
          1800, 600, 800,
          ...ubmSources.map(() => srcColW),
          900, 950, 900, 1076
        ];

        // Header sumber — satu kolom per sumber
        const srcHdrCells = ubmSources.map(s =>
          tc(`${s.name||`Sumber ${s.id}`}\n(mg/L) = Usulan BM`,{w:srcColW,b:true,ctr:true,bg:'78350f',c:'fef3c7',sz:15})
        ).join('');

        const hdrRow = tr2(
          tc('Parameter',{w:crCols[0],b:true,ctr:true,bg:hdrBgHex,c:'FFFFFF',sz:18})+
          tc('Satuan',{w:crCols[1],b:true,ctr:true,bg:hdrBgHex,c:'FFFFFF',sz:18})+
          tc('C Hulu (mg/L)',{w:crCols[2],b:true,ctr:true,bg:hdrBgHex,c:'FFFFFF',sz:17})+
          srcHdrCells+
          tc('CR Hilir (mg/L)',{w:crCols[crCols.length-4],b:true,ctr:true,bg:hdrBgHex,c:'FFFFFF',sz:17})+
          tc('BM Air Sungai (PP 22/2021)',{w:crCols[crCols.length-3],b:true,ctr:true,bg:hdrBgHex,c:'FFFFFF',sz:16})+
          tc('Alokasi Beban (kg/hari)',{w:crCols[crCols.length-2],b:true,ctr:true,bg:'78350f',c:'fef3c7',sz:15})+
          tc('Status Mutu',{w:crCols[crCols.length-1],b:true,ctr:true,bg:hdrBgHex,c:'FFFFFF',sz:17}),
          true
        );

        const seasonKey = seasonLabel.includes('KEMARAU') ? 'dry' : 'wet';
        const dataRows = ubmParams.map((p,i) => {
          const cHuluRaw = seasonKey==='dry' ? (p.cHuluDry ?? p.cHulu ?? '') : (p.cHuluWet ?? p.cHulu ?? '');
          const cHulu = pNum(cHuluRaw);
          const usulanBMVal = (p.usulanBM ?? '') !== '' ? pNum(p.usulanBM) : null;

          // Hitung CR menggunakan Usulan BM sebagai C_i untuk semua sumber
          let sumQiCi = 0;
          ubmSources.forEach(s => {
            const Qi = pNum(s.qDay) / 86400;
            const Ci = usulanBMVal != null ? usulanBMVal : 0;
            sumQiCi += Qi * Ci;
          });
          const cr = denom > 0 ? (Qs * cHulu + sumQiCi) / denom : null;
          const bm = p.bmVal;

          let status;
          if (p.isPH) {
            status = cr!=null ? (cr>=6&&cr<=9?'ok':'ng') : null;
          } else {
            status = cr!=null&&bm!=null ? (cr<=bm?'ok':'ng') : null;
          }

          // Alokasi Beban = Usulan BM × ΣQi × 86400 / 1000
          const alokasi = (!p.isPH && usulanBMVal!=null && ubmTotalQi>0)
            ? usulanBMVal * ubmTotalQi * 86400 / 1000 : null;

          const rowBg = i % 2 ? 'f5f5f5' : null;
          const ket = status==='ok' ? 'Memenuhi' : status==='ng' ? 'Melebihi' : '—';
          const ketC = status==='ok' ? '1b5e20' : status==='ng' ? 'b71c1c' : '546e7a';
          const bmDisp = p.isPH ? '6–9' : (bm!=null ? fmtN(bm,4) : '—');
          const usulanDisp = usulanBMVal!=null ? fmtN(usulanBMVal,4) : '— (belum diisi)';

          // Satu kolom per sumber — semua menampilkan usulan BM
          const srcDataCells = ubmSources.map(() =>
            tc(usulanDisp,{w:srcColW,ctr:true,bg:usulanBMVal!=null?'fffbe6':rowBg,sz:18,b:usulanBMVal!=null,c:usulanBMVal!=null?'e65100':'546e7a'})
          ).join('');

          return tr2(
            tc(p.name||'—',{w:crCols[0],bg:rowBg,sz:18,b:true})+
            tc(p.unit||'—',{w:crCols[1],ctr:true,bg:rowBg,sz:17})+
            tc(cHulu>0?fmtN(cHulu,4):'—',{w:crCols[2],ctr:true,bg:rowBg,sz:18})+
            srcDataCells+
            tc(cr!=null?fmtN(cr,4):'—',{w:crCols[crCols.length-4],ctr:true,bg:rowBg,sz:18,b:true,c:status==='ng'?'b71c1c':'004d45'})+
            tc(bmDisp,{w:crCols[crCols.length-3],ctr:true,bg:rowBg,sz:18})+
            tc(alokasi!=null?fmtN(alokasi,4):'—',{w:crCols[crCols.length-2],ctr:true,bg:alokasi!=null?'fffbe6':rowBg,sz:18,b:alokasi!=null,c:alokasi!=null?'e65100':'546e7a'})+
            tc(ket,{w:crCols[crCols.length-1],ctr:true,bg:status==='ng'?'ffebee':status==='ok'?'e8f5e9':rowBg,sz:18,b:true,c:ketC})
          );
        });

        xs += mkTbl(crCols, [hdrRow, ...dataRows]);
        return xs;
      }

      xml += crUsulanSeasonSection('MUSIM HUJAN 🌧', ubmQsWet, ubmDenomWet, '1565c0', '1e3a8a');
      xml += crUsulanSeasonSection('MUSIM KEMARAU ☀', ubmQsDry, ubmDenomDry, 'f57c00', '78350f');

      xml += sp();
      const srcNamesKet = ubmSources.length > 0
        ? ubmSources.map(s => s.name || `Sumber ${s.id}`).join(', ')
        : 'sumber air limbah';
      xml += par(run(`Keterangan: CR Hilir Sungai dihitung berdasarkan nilai Usulan Baku Mutu yang diinput sebagai konsentrasi air limbah dari seluruh sumber (${srcNamesKet}). ${hasUsulanBM} dari ${ubmParams.length} parameter telah diisi nilai Usulan BM.`,{sz:19,it:true,c:'546e7a'}),{aft:100});
    }

    // Conclusion UBM
    xml+=sp()+sp();
    const okUbmD=ubmParams.filter(p=>{ const cr=_ubmCrForWord(p,ubmQsDry,ubmDenomDry,'dry'); return cr!=null&&p.bmVal!=null&&cr<=p.bmVal; }).length;
    const okUbmW=ubmParams.filter(p=>{ const cr=_ubmCrForWord(p,ubmQsWet,ubmDenomWet,'wet');  return cr!=null&&p.bmVal!=null&&cr<=p.bmVal; }).length;
    xml+=par(run(`Dari ${ubmParams.length} parameter yang dianalisis, musim kemarau: ${okUbmD} parameter memenuhi BM, musim hujan: ${okUbmW} parameter memenuhi BM.`,{sz:21}),{aft:80});
    xml+=par(run(`Nilai C_maks Hitung merupakan ambang batas teoritis konsentrasi air limbah agar CR hilir sungai tepat sama dengan baku mutu kelas ${ubmClsRom}. Kolom Usulan BM diisi oleh pengguna berdasarkan pertimbangan teknis dan regulasi yang berlaku (${hasUsulanBM} dari ${ubmParams.length} parameter telah diisi Usulan BM).`,{sz:21}),{aft:80});
    xml+=par(run(`Alokasi Beban Pencemar (kg/hari) = Usulan BM (mg/L) × ΣQ limbah (m³/det) × 86.400 (det/hari) ÷ 1.000 (L→kg). Nilai alokasi beban hanya dihitung untuk parameter yang telah diisi nilai Usulan BM.`,{sz:21}),{aft:100});
  }

  // Conclusion (BAB terakhir)
  const concBab = ubmParams.length&&ubmTotalQi>0 ? babNum+1 : babNum;
  xml+=sp()+sp();
  xml+=par(run(`BAB ${concBab}  KESIMPULAN`,{sz:28,b:true,c:'004d45'}),{bef:240,aft:120});
  const okD=params.filter(p=>p.statusDry==='ok').length;
  const ngD=params.filter(p=>p.statusDry==='ng').length;
  const okW=params.filter(p=>p.statusWet==='ok').length;
  const ngW=params.filter(p=>p.statusWet==='ng').length;
  const anaD=params.filter(p=>p.statusDry!=null).length;
  const anaW=params.filter(p=>p.statusWet!=null).length;
  let conc=`Analisis beban pencemaran dilakukan pada ${rn} (Kelas ${clsRom}) dengan ${params.length} parameter. `;
  if(qDry) conc+=`Musim Kemarau (Q = ${fN(qDry)} m³/det): ${okD}/${anaD} parameter memenuhi baku mutu. `;
  if(qWet) conc+=`Musim Hujan (Q = ${fN(qWet)} m³/det): ${okW}/${anaW} parameter memenuhi baku mutu. `;
  const allNg=[...new Set([...params.filter(p=>p.statusDry==='ng'),params.filter(p=>p.statusWet==='ng')].flat().map(p=>p.name))];
  if(allNg.length) conc+=`Parameter yang melebihi BPM: ${allNg.join(', ')}.`;
  xml+=par(run(conc,{sz:22}),{aft:100});
  xml+=par(run('Metode: BPM = Q × Baku Mutu × 3,6 (kg/jam), BPA = Q × C Aktual × 3,6 (kg/jam). Status Memenuhi jika BPA < BPM.',{sz:19,it:true,c:'546e7a'}),{aft:60});
  xml+=par(run('Referensi: PP No. 22 Tahun 2021 Lampiran VI — Baku Mutu Air Sungai. Dihitung menggunakan RiverLoad v2.0.',{sz:19,it:true,c:'546e7a'}),{aft:60});

  // Helper: hitung CR untuk word export (season-aware)
  function _ubmCrForWord(p, Qs, denom, seasonKey){
    if(!denom||denom<=0) return null;
    const cHuluRaw = seasonKey==='dry'
      ? (p.cHuluDry ?? p.cHulu ?? '')
      : (p.cHuluWet ?? p.cHulu ?? '');
    const cHulu=pNum(cHuluRaw);
    let sumQiCi=0;
    ubmSources.forEach(s=>{ sumQiCi+=(pNum(s.qDay)/86400)*pNum(p.cSrc[s.id]); });
    return (Qs*cHulu+sumQiCi)/denom;
  }

  const sectPr='<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr>';
  const docXml='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+xml+sectPr+'</w:body></w:document>';
  const zip=new JSZip();
  zip.file('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>');
  zip.file('_rels/.rels','<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
  zip.file('word/_rels/document.xml.rels','<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>');
  zip.file('word/document.xml',docXml);
  zip.file('word/styles.xml','<?xml version="1.0" encoding="UTF-8"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/></w:rPr></w:rPrDefault></w:docDefaults></w:styles>');
  const buf=await zip.generateAsync({type:'arraybuffer',compression:'DEFLATE',compressionOptions:{level:6}});
  const blob=new Blob([buf],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  const d=new Date(),stamp=d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0');
  a.href=url; a.download=`RiverLoad_BPM_${rn.replace(/\s+/g,'_')}_${stamp}.docx`;
  a.click(); URL.revokeObjectURL(url);
  toast('✓ Word berhasil diunduh!','ok');
}

// ═══════════════════════════════════════════════════════════════
// SAVE / LOAD
// ═══════════════════════════════════════════════════════════════
const KEY='riverload_v4';

function getState(){
  return {
    _v: 4,
    // ── BPM page ──────────────────────────────────
    bpm: {
      name:  document.getElementById('r-name')?.value  || '',
      cls:   document.getElementById('r-class')?.value || '',
      qDry:  document.getElementById('q-dry')?.value   || '',
      qWet:  document.getElementById('q-wet')?.value   || '',
      params:       JSON.parse(JSON.stringify(params)),
      pid,
      wasteSources: JSON.parse(JSON.stringify(wasteSources)),
      wsId,
      season: _season,
    },
    // ── UBM page — nama & kelas sungai diambil dari BPM (r-name, r-class) ──
    ubm: {
      river:     document.getElementById('r-name')?.value?.trim()  || '',
      cls:       document.getElementById('r-class')?.value         || '',
      sources:   JSON.parse(JSON.stringify(ubmSources)),
      ubmSrcId,
      params:    JSON.parse(JSON.stringify(ubmParams)),
      ubmPId,
    },
    // ── Modeling page ─────────────────────────────
    mdl: {
      items: JSON.parse(JSON.stringify(mdlItems)),
    },
  };
}

function restoreState(s){
  if(!s) return;

  // ── Support legacy formats ─────────────────────
  if(!s.bpm && s.params !== undefined){
    // very old flat format
    if(s.name  !== undefined) document.getElementById('r-name').value  = s.name;
    if(s.cls   !== undefined) document.getElementById('r-class').value = s.cls;
    if(s.qDry  !== undefined) document.getElementById('q-dry').value   = s.qDry;
    if(s.qWet  !== undefined) document.getElementById('q-wet').value   = s.qWet;
    params = Array.isArray(s.params) ? s.params : []; pid = s.pid || 0;
    onClassChange(); recalcAll(); renderParams();
    return;
  }

  // ── BPM ──────────────────────────────────────
  const b = s.bpm || {};
  document.getElementById('r-name').value  = b.name  || '';
  document.getElementById('r-class').value = b.cls   || '';
  document.getElementById('q-dry').value   = b.qDry  || '';
  document.getElementById('q-wet').value   = b.qWet  || '';
  params       = Array.isArray(b.params)       ? b.params       : [];
  pid          = b.pid   || 0;
  wasteSources = Array.isArray(b.wasteSources) ? b.wasteSources : [];
  wsId         = b.wsId  || 0;
  _season      = b.season || 'dry';

  // ── UBM ──────────────────────────────────────
  const u = s.ubm || {};
  document.getElementById('ubm-river').value = u.river || '';
  document.getElementById('ubm-class').value = u.cls   || '';
  ubmSources = Array.isArray(u.sources) ? u.sources : [];
  ubmSrcId   = u.ubmSrcId || 0;
  ubmParams  = Array.isArray(u.params)  ? u.params.map(p=>{
    // Migrate legacy single cHulu → cHuluDry + cHuluWet
    if(p.cHulu !== undefined && p.cHuluDry === undefined){
      p.cHuluDry = p.cHulu;
      p.cHuluWet = p.cHulu;
    }
    if(p.cHuluDry === undefined) p.cHuluDry = '';
    if(p.cHuluWet === undefined) p.cHuluWet = '';
    if(p.usulanBM === undefined) p.usulanBM = '';
    return p;
  }) : [];
  ubmPId     = u.ubmPId   || 0;

  // ── Modeling ─────────────────────────────────
  const mdlData = s.mdl || {};
  mdlItems = Array.isArray(mdlData.items) ? mdlData.items : [];

  // ── Re-render BPM page ───────────────────────
  const cls = document.getElementById('r-class').value;
  if(cls){
    const clsInfo = document.getElementById('class-info');
    const clsDesc = document.getElementById('class-desc');
    if(clsInfo) clsInfo.style.display = 'block';
    if(clsDesc) clsDesc.textContent   = CLASS_DESC[cls] || '';
    // Re-attach BM values from DB
    params.forEach(p => {
      const dbRow = WQDB.find(r => r.no === p.no);
      if(dbRow) { p.bm = getKVal(dbRow, cls); p.bmNum = numVal(p.bm); }
    });
  }
  recalcAll();
  // Restore season tab state
  const tabDry = document.getElementById('tab-dry');
  const tabWet = document.getElementById('tab-wet');
  if(tabDry) tabDry.className = 'season-tab' + (_season==='dry'?' active-dry':'');
  if(tabWet) tabWet.className = 'season-tab' + (_season==='wet'?' active-wet':'');
  const seasonLbl = document.getElementById('result-season-lbl');
  if(seasonLbl) seasonLbl.textContent = _season==='dry'
    ? '// HASIL PERHITUNGAN — ☀ MUSIM KEMARAU'
    : '// HASIL PERHITUNGAN — 🌧 MUSIM HUJAN';
  renderParams();
  updateResultKPI();
  renderWasteSources();
  ubmSyncFromBPM(); // sync nama & kelas sungai dari BPM ke UBM (r-name, r-class)

  // ── Re-render UBM page ───────────────────────
  ubmRenderSources();
  ubmRenderParams();
  _ubmCalcAndShowResults();

  // ── Re-render Modeling page ──────────────────
  mdlSync();
}

let _st;
function saveAuto(){
  clearTimeout(_st);
  _st=setTimeout(()=>{
    try{ localStorage.setItem(KEY, JSON.stringify(getState())); }
    catch(e){}
  }, 600);
}

function saveProject(){
  const s   = getState();
  const rn  = (document.getElementById('r-name')?.value.trim() || 'sungai').replace(/\s+/g,'_');
  const blob= new Blob([JSON.stringify(s,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  const d   = new Date();
  const stamp=d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0');
  a.href=url; a.download=`RiverLoad_${rn}_${stamp}.riverload`;
  a.click(); URL.revokeObjectURL(url);
  toast('✓ Proyek disimpan — semua data tersimpan','ok');
}

function loadProject(input){
  const file=input.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=e=>{
    try{
      restoreState(JSON.parse(e.target.result));
      toast('✓ Proyek dimuat — semua data berhasil dipulihkan','ok');
    } catch(err){
      toast('⚠ File tidak valid atau rusak','err');
      console.error(err);
    }
    input.value='';
  };
  reader.readAsText(file);
}

// ═══════════════════════════════════════════════════════════════
// SUMBER AIR LIMBAH (BPM page)
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// DATABASE BAKU MUTU AIR LIMBAH (PermenLHK)
// Struktur: { id, label, params: [{param, unit, kadarMaks, ket}] }
// ═══════════════════════════════════════════════════════════════
const BMALLDB = [
  {
    id:'batubara-tambang', label:'Penambangan Batu Bara', kategori:'Pertambangan',
    params:[
      {param:'pH',                      unit:'—',    kadarMaks:'6 – 9', num:null},
      {param:'Residu Tersuspensi (TSS)', unit:'mg/L', kadarMaks:'400',  num:400},
      {param:'Besi (Fe) Total',          unit:'mg/L', kadarMaks:'7',    num:7},
      {param:'Mangan (Mn) Total',        unit:'mg/L', kadarMaks:'4',    num:4},
    ]
  },
  {
    id:'batubara-olah', label:'Pengolahan/Pencucian Batu Bara', kategori:'Pertambangan',
    params:[
      {param:'pH',                      unit:'—',    kadarMaks:'6 – 9', num:null},
      {param:'Residu Tersuspensi (TSS)', unit:'mg/L', kadarMaks:'200',  num:200},
      {param:'Besi (Fe) Total',          unit:'mg/L', kadarMaks:'7',    num:7},
      {param:'Mangan (Mn) Total',        unit:'mg/L', kadarMaks:'4',    num:4},
    ]
  },
  {
    id:'emas-tambang', label:'Penambangan Bijih Emas dan/atau Tembaga', kategori:'Pertambangan',
    params:[
      {param:'pH',  unit:'—',    kadarMaks:'6 – 9', num:null},
      {param:'TSS', unit:'mg/L', kadarMaks:'200',   num:200},
      {param:'Cu',  unit:'mg/L', kadarMaks:'2',     num:2},
      {param:'Cd',  unit:'mg/L', kadarMaks:'0,1',   num:0.1},
      {param:'Zn',  unit:'mg/L', kadarMaks:'5',     num:5},
      {param:'Pb',  unit:'mg/L', kadarMaks:'1',     num:1},
      {param:'As',  unit:'mg/L', kadarMaks:'0,5',   num:0.5},
      {param:'Ni',  unit:'mg/L', kadarMaks:'0,5',   num:0.5},
      {param:'Cr',  unit:'mg/L', kadarMaks:'1',     num:1},
      {param:'Hg',  unit:'mg/L', kadarMaks:'0,005', num:0.005},
    ]
  },
  {
    id:'emas-olah', label:'Pengolahan Bijih Emas dan/atau Tembaga', kategori:'Pertambangan',
    params:[
      {param:'pH',  unit:'—',    kadarMaks:'6 – 9', num:null},
      {param:'TSS', unit:'mg/L', kadarMaks:'200',   num:200},
      {param:'Cu',  unit:'mg/L', kadarMaks:'2',     num:2},
      {param:'Cd',  unit:'mg/L', kadarMaks:'0,1',   num:0.1},
      {param:'Zn',  unit:'mg/L', kadarMaks:'5',     num:5},
      {param:'Pb',  unit:'mg/L', kadarMaks:'1',     num:1},
      {param:'As',  unit:'mg/L', kadarMaks:'0,5',   num:0.5},
      {param:'Ni',  unit:'mg/L', kadarMaks:'0,5',   num:0.5},
      {param:'Cr',  unit:'mg/L', kadarMaks:'1',     num:1},
      {param:'CN',  unit:'mg/L', kadarMaks:'0,5',   num:0.5, ket:'Khusus proses Sianidasi; CN bebas'},
      {param:'Hg',  unit:'mg/L', kadarMaks:'0,005', num:0.005},
    ]
  },
  // ── DOMESTIK ────────────────────────────────────────────────
  {
    id:'domestik-kakus', label:'Air Limbah Kakus – IPLT (Media Air)', kategori:'Domestik',
    params:[
      {param:'pH (Tingkat Keasaman)',  unit:'—',          kadarMaks:'6 – 9',  num:null},
      {param:'BOD',                    unit:'mg/L',       kadarMaks:'150',    num:150},
      {param:'COD',                    unit:'mg/L',       kadarMaks:'300',    num:300},
      {param:'TSS',                    unit:'mg/L',       kadarMaks:'100',    num:100},
      {param:'Amoniak (NH₃-N)',        unit:'mg/L',       kadarMaks:'50',     num:50},
      {param:'Fecal Coliform',         unit:'MPN/100 mL', kadarMaks:'1.000',  num:1000},
    ]
  },
  // Nonkakus/Gabungan Media Air — x > 50 m³/hari  (PermenLHK Lmp. I)
  {
    id:'domestik-nonkakus-besar', label:'Nonkakus/Gabungan – Media Air (x > 50 m³/hari)', kategori:'Domestik',
    params:[
      {param:'pH (Tingkat Keasaman)',  unit:'—',          kadarMaks:'6 – 9',  num:null},
      {param:'BOD',                    unit:'mg/L',       kadarMaks:'30',     num:30},
      {param:'COD',                    unit:'mg/L',       kadarMaks:'100',    num:100},
      {param:'TSS',                    unit:'mg/L',       kadarMaks:'30',     num:30},
      {param:'Amoniak (NH₃-N)',        unit:'mg/L',       kadarMaks:'10',     num:10},
      {param:'Deterjen Total (MBAS)',  unit:'mg/L',       kadarMaks:'5',      num:5,    ket:'Sebagai surfactant anionic; khusus pencucian/laundry'},
      {param:'Minyak & Lemak',         unit:'mg/L',       kadarMaks:'5',      num:5},
      {param:'Sisa Klorin (Cl₂)',      unit:'mg/L',       kadarMaks:'1',      num:1},
      {param:'Salmonela',              unit:'—',          kadarMaks:'Negatif',num:null},
      {param:'Shigela',                unit:'—',          kadarMaks:'Negatif',num:null},
      {param:'Vibrio cholera',         unit:'—',          kadarMaks:'Negatif',num:null},
      {param:'Streptococcus',          unit:'—',          kadarMaks:'Negatif',num:null},
      {param:'Fecal Coliform',         unit:'MPN/100 mL', kadarMaks:'1.000',  num:1000},
    ]
  },
  // Nonkakus/Gabungan Media Air — 3 < x ≤ 50 m³/hari
  {
    id:'domestik-nonkakus-sedang', label:'Nonkakus/Gabungan – Media Air (3 < x ≤ 50 m³/hari)', kategori:'Domestik',
    params:[
      {param:'pH (Tingkat Keasaman)',  unit:'—',          kadarMaks:'6 – 9',  num:null},
      {param:'BOD',                    unit:'mg/L',       kadarMaks:'50',     num:50},
      {param:'COD',                    unit:'mg/L',       kadarMaks:'100',    num:100},
      {param:'TSS',                    unit:'mg/L',       kadarMaks:'50',     num:50},
      {param:'Amoniak (NH₃-N)',        unit:'mg/L',       kadarMaks:'20',     num:20},
      {param:'Deterjen Total (MBAS)',  unit:'mg/L',       kadarMaks:'10',     num:10,   ket:'Sebagai surfactant anionic; khusus pencucian/laundry'},
      {param:'Minyak & Lemak',         unit:'mg/L',       kadarMaks:'10',     num:10},
      {param:'Sisa Klorin (Cl₂)',      unit:'mg/L',       kadarMaks:'1',      num:1,    ket:'Khusus Faskes yang tidak mengolah limbah B3'},
      {param:'Salmonela',              unit:'—',          kadarMaks:'Negatif',num:null},
      {param:'Shigela',                unit:'—',          kadarMaks:'Negatif',num:null},
      {param:'Vibrio cholera',         unit:'—',          kadarMaks:'Negatif',num:null},
      {param:'Streptococcus',          unit:'—',          kadarMaks:'Negatif',num:null},
      {param:'Fecal Coliform',         unit:'MPN/100 mL', kadarMaks:'1.000',  num:1000},
    ]
  },
  // Nonkakus/Gabungan Media Air — x ≤ 3 m³/hari
  {
    id:'domestik-nonkakus-kecil', label:'Nonkakus/Gabungan – Media Air (x ≤ 3 m³/hari)', kategori:'Domestik',
    params:[
      {param:'pH (Tingkat Keasaman)',  unit:'—',          kadarMaks:'6 – 9',  num:null},
      {param:'BOD',                    unit:'mg/L',       kadarMaks:'75',     num:75},
      {param:'Minyak & Lemak',         unit:'mg/L',       kadarMaks:'10',     num:10},
      {param:'Fecal Coliform',         unit:'MPN/100 mL', kadarMaks:'1.000',  num:1000},
    ]
  },
  {
    id:'domestik-drainase', label:'Nonkakus/Gabungan – Drainase/Irigasi', kategori:'Domestik',
    params:[
      {param:'pH (Tingkat Keasaman)',  unit:'—',          kadarMaks:'6 – 9',  num:null},
      {param:'BOD',                    unit:'mg/L',       kadarMaks:'12',     num:12},
      {param:'COD',                    unit:'mg/L',       kadarMaks:'80',     num:80},
      {param:'TSS',                    unit:'mg/L',       kadarMaks:'30',     num:30},
      {param:'Fecal Coliform',         unit:'MPN/100 mL', kadarMaks:'200',    num:200},
      {param:'Residual Klorin',        unit:'mg/L',       kadarMaks:'1',      num:1,    ket:'Bila pengolahan menggunakan klorinasi'},
      {param:'Salmonela',              unit:'—',          kadarMaks:'Negatif',num:null, ket:'Khusus Faskes tidak olah B3'},
      {param:'Shigela',                unit:'—',          kadarMaks:'Negatif',num:null, ket:'Khusus Faskes tidak olah B3'},
      {param:'Vibrio cholera',         unit:'—',          kadarMaks:'Negatif',num:null, ket:'Khusus Faskes tidak olah B3'},
      {param:'Streptococcus',          unit:'—',          kadarMaks:'Negatif',num:null, ket:'Khusus Faskes tidak olah B3'},
    ]
  },
  // ── PEMANFAATAN ──────────────────────────────────────────────
  {
    id:'pemanfaatan-penyiraman', label:'Pemanfaatan – Penyiraman/Pencucian', kategori:'Pemanfaatan',
    params:[
      {param:'pH (Tingkat Keasaman)',  unit:'—',          kadarMaks:'6 – 9',  num:null},
      {param:'BOD',                    unit:'mg/L',       kadarMaks:'12',     num:12},
      {param:'COD',                    unit:'mg/L',       kadarMaks:'80',     num:80},
      {param:'TSS',                    unit:'mg/L',       kadarMaks:'30',     num:30},
      {param:'Fecal Coliform',         unit:'MPN/100 mL', kadarMaks:'200',    num:200},
      {param:'Residual Klorin',        unit:'mg/L',       kadarMaks:'1',      num:1},
    ]
  },
  {
    id:'pemanfaatan-resapan', label:'Pemanfaatan – Resapan/Intrusi Laut', kategori:'Pemanfaatan',
    params:[
      {param:'pH (Tingkat Keasaman)',  unit:'—',          kadarMaks:'6 – 9',  num:null},
      {param:'BOD',                    unit:'mg/L',       kadarMaks:'6',      num:6},
      {param:'COD',                    unit:'mg/L',       kadarMaks:'40',     num:40},
      {param:'TSS',                    unit:'mg/L',       kadarMaks:'20',     num:20},
      {param:'Fecal Coliform',         unit:'MPN/100 mL', kadarMaks:'200',    num:200},
      {param:'Nitrat (sebagai N)',      unit:'mg/L',       kadarMaks:'10',     num:10},
    ]
  },
];

// State: jenis limbah yang dipilih untuk picker
let wsTypePicked = new Set(); // set of BMALLDB.id

function wsShowTypePicker() {
  wsTypePicked = new Set(wasteSources.filter(w=>w.typeId).map(w=>w.typeId));
  document.getElementById('ws-type-search').value = '';
  document.getElementById('ws-type-modal').style.display = 'flex';
  wsFilterTypes();
}
function wsCloseTypePicker() {
  document.getElementById('ws-type-modal').style.display = 'none';
}
function wsFilterTypes() {
  const q = document.getElementById('ws-type-search').value.toLowerCase();
  const list = document.getElementById('ws-type-list');
  // Group by kategori
  const grouped = {};
  BMALLDB.forEach(t => {
    if (!q || t.label.toLowerCase().includes(q) || t.kategori.toLowerCase().includes(q)) {
      if (!grouped[t.kategori]) grouped[t.kategori] = [];
      grouped[t.kategori].push(t);
    }
  });
  const catColors = {Pertambangan:'#e67e22', Domestik:'#1a7fd4', Pemanfaatan:'#27ae60'};
  list.innerHTML = Object.entries(grouped).map(([kat, items]) => `
    <div style="padding:6px 20px 3px;font-family:var(--mono);font-size:9px;color:${catColors[kat]||'var(--accent)'};text-transform:uppercase;letter-spacing:1px;font-weight:700">${kat}</div>
    ${items.map(t => {
      const checked = wsTypePicked.has(t.id);
      return `<div onclick="wsToggleType('${t.id}')" style="display:flex;align-items:center;gap:12px;padding:9px 20px;cursor:pointer;transition:background 0.12s;border-bottom:1px solid var(--brd2)"
        onmouseover="this.style.background='rgba(62,207,178,0.06)'" onmouseout="this.style.background=''"
      >
        <div style="width:16px;height:16px;border:2px solid ${checked?'var(--accent)':'var(--brd)'};border-radius:3px;background:${checked?'var(--accent)':'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.12s">
          ${checked?'<svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#000" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>':''}
        </div>
        <div>
          <div style="font-size:12px;font-weight:500;color:var(--txt1)">${t.label}</div>
          <div style="font-size:10px;color:var(--mute);font-family:var(--mono);margin-top:1px">${t.params.length} parameter · ${t.params.map(p=>p.param).slice(0,4).join(', ')}${t.params.length>4?'…':''}</div>
        </div>
      </div>`;
    }).join('')}
  `).join('') || '<div style="padding:24px;text-align:center;color:var(--mute);font-size:12px">Tidak ada hasil</div>';
  document.getElementById('ws-type-count').textContent = wsTypePicked.size + ' jenis dipilih';
}
function wsToggleType(id) {
  if (wsTypePicked.has(id)) wsTypePicked.delete(id);
  else wsTypePicked.add(id);
  wsFilterTypes();
}
function wsConfirmTypes() {
  // Add new types that aren't already in waste sources
  const existing = new Set(wasteSources.filter(w=>w.typeId).map(w=>w.typeId));
  // Remove types that were unchecked
  wasteSources = wasteSources.filter(w => !w.typeId || wsTypePicked.has(w.typeId));
  // Add newly checked types
  wsTypePicked.forEach(typeId => {
    if (!existing.has(typeId)) {
      const t = BMALLDB.find(x=>x.id===typeId);
      if (!t) return;
      wsId++;
      wasteSources.push({id:wsId, typeId:t.id, typeLabel:t.label, name:t.label, qDay:''});
    }
  });
  wsCloseTypePicker();
  renderWasteSources();
  renderBMGabungan();
  saveAuto();
}

// Override renderWasteSources — Jenis Air Limbah, tanpa kolom debit
function renderWasteSources(){
  const list  = document.getElementById('ws-list');
  const empty = document.getElementById('ws-empty');
  const hdr   = document.getElementById('ws-hdr');
  if (!list) return;
  if (!wasteSources.length) {
    list.innerHTML = '';
    empty.style.display = 'block';
    if (hdr) hdr.style.display = 'none';
    const card = document.getElementById('bm-gabungan-card');
    if (card) card.style.display = 'none';
    const btnImp = document.getElementById('btn-import-bm-gabungan');
    if (btnImp) { btnImp.style.display = 'inline-flex'; btnImp.style.opacity='0.5'; btnImp.title='Pilih Jenis Air Limbah terlebih dahulu'; }
    return;
  }
  empty.style.display = 'none';
  if (hdr) hdr.style.display = 'grid';
  const hasTyped = wasteSources.some(w=>w.typeId);
  const btnImp = document.getElementById('btn-import-bm-gabungan');
  if (btnImp) { btnImp.style.display='inline-flex'; btnImp.style.opacity=hasTyped?'1':'0.5'; btnImp.title=hasTyped?'':'Pilih Jenis Air Limbah terlebih dahulu'; }

  list.innerHTML = wasteSources.map(w => {
    const typeLabel = w.typeLabel || '(Manual)';
    const typeBadge = w.typeId
      ? `<span style="font-size:10px;font-family:var(--mono);color:var(--accent);background:rgba(62,207,178,0.1);border:1px solid rgba(62,207,178,0.25);border-radius:4px;padding:3px 10px;font-weight:600">${esc(typeLabel)}</span>`
      : `<span style="font-size:10px;font-family:var(--mono);color:var(--mute);border:1px solid var(--brd2);border-radius:4px;padding:3px 10px">Manual</span>`;
    return `<div id="ws-row-${w.id}" style="display:grid;grid-template-columns:1fr 32px;gap:8px;padding:9px 12px;align-items:center;background:var(--bg2);border:1px solid var(--brd2);border-radius:var(--rs);margin-bottom:5px">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;overflow:hidden">
        ${typeBadge}
      </div>
      <button onclick="delWasteSource(${w.id})" style="width:28px;height:28px;background:rgba(255,80,80,0.1);border:1px solid rgba(255,80,80,0.25);border-radius:var(--rs);color:#ff6060;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0">×</button>
    </div>`;
  }).join('');
  renderBMGabungan();
}

// ─── Tabel BM Gabungan ────────────────────────────────────────
function renderBMGabungan() {
  const card = document.getElementById('bm-gabungan-card');
  const thead = document.getElementById('bm-gabungan-thead');
  const tbody = document.getElementById('bm-gabungan-tbody');
  const tfoot = document.getElementById('bm-gabungan-tfoot');
  if (!card || !thead || !tbody || !tfoot) return;

  // Hanya jenis yang memiliki typeId
  const typedSources = wasteSources.filter(w => w.typeId);
  if (!typedSources.length) { card.style.display='none'; return; }
  card.style.display = 'block';

  // Kumpulkan semua jenis unik
  const uniqueTypeIds = [...new Set(typedSources.map(w=>w.typeId))];
  const types = uniqueTypeIds.map(id => BMALLDB.find(t=>t.id===id)).filter(Boolean);

  // Kumpulkan semua parameter unik dari semua jenis yang dipilih
  // Gunakan normalisasi nama untuk menggabungkan parameter yang "sama" tapi beda penulisan
  const allParams = new Map(); // param_name_normalized -> {displayName, unit, values: {typeId: {...}}}
  const normKey = s => s.toLowerCase().replace(/[^a-z0-9]/g,'');

  types.forEach(t => {
    t.params.forEach(p => {
      const nk = normKey(p.param);
      // Cari apakah sudah ada entry yang cocok (nama normalized sama)
      let found = null;
      allParams.forEach((v, k) => { if (normKey(k) === nk) found = k; });
      const key = found || p.param;
      if (!allParams.has(key)) allParams.set(key, {unit:p.unit, values:{}});
      allParams.get(key).values[t.id] = {kadarMaks:p.kadarMaks, num:p.num, ket:p.ket||''};
    });
  });

  const catColors = {Pertambangan:'#e67e22', Domestik:'#1a7fd4', Pemanfaatan:'#27ae60'};
  const TH = (v,extra='') => `<th style="padding:8px 10px;text-align:center;font-size:9.5px;font-family:var(--mono);font-weight:700;border-bottom:2px solid var(--brd);white-space:nowrap;${extra}">${v}</th>`;
  const TD = (v,extra='') => `<td style="padding:7px 10px;font-size:11px;font-family:var(--mono);text-align:center;border-bottom:1px solid var(--brd2);${extra}">${v}</td>`;

  // Thead
  thead.innerHTML = `<tr style="background:rgba(62,207,178,0.08)">
    ${TH('Parameter','text-align:left')}
    ${TH('Satuan')}
    ${types.map(t=>{
      const kat = t.kategori;
      const col = catColors[kat]||'var(--accent)';
      return TH(`<div style="color:${col};max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${t.label}">${t.label}</div>`);
    }).join('')}
    ${TH('⭐ Nilai Paling Ketat','color:#f39c12;background:rgba(243,156,18,0.08)')}
  </tr>`;

  // Tbody
  const rows = [];
  allParams.forEach((info, param) => {
    const vals = types.map(t => info.values[t.id] || null);
    // Determine strictest value
    const nums = vals.filter(v=>v&&v.num!==null&&v.num!==undefined).map(v=>v.num);
    let ketatVal = null, ketatStr = '—';
    if (nums.length > 0) {
      ketatVal = Math.min(...nums);
      ketatStr = fmtN(ketatVal, 4);
    } else {
      // If all non-numeric but same → show them
      const strs = vals.filter(v=>v).map(v=>v.kadarMaks);
      if (strs.length > 0) ketatStr = strs[0]; // e.g., "6 – 9"
    }
    const cells = vals.map(v => {
      if (!v) return TD('—', 'color:var(--mute)');
      const isKetat = v.num !== null && v.num === ketatVal;
      return TD(v.kadarMaks, isKetat && nums.length > 1 ? 'color:#f39c12;font-weight:700' : 'color:var(--txt1)');
    }).join('');
    rows.push(`<tr>
      ${TD(param, 'text-align:left;font-weight:600;color:var(--txt1)')}
      ${TD(info.unit, 'color:var(--mute);font-size:10px')}
      ${cells}
      ${TD(ketatStr, 'color:#f39c12;font-weight:700;background:rgba(243,156,18,0.06);font-size:12px')}
    </tr>`);
  });
  tbody.innerHTML = rows.join('') || `<tr><td colspan="${types.length+3}" style="text-align:center;padding:20px;color:var(--mute)">Belum ada parameter</td></tr>`;

  // Tfoot — ringkasan jumlah parameter per jenis
  tfoot.innerHTML = `<tr style="background:rgba(62,207,178,0.06);border-top:2px solid var(--brd)">
    <td colspan="2" style="padding:8px 10px;font-family:var(--mono);font-size:10px;color:var(--mute);font-weight:700">JUMLAH PARAMETER</td>
    ${types.map(t => `<td style="padding:8px 10px;font-family:var(--mono);font-size:11px;color:var(--accent);text-align:center;font-weight:700">${t.params.length}</td>`).join('')}
    <td style="padding:8px 10px;font-family:var(--mono);font-size:10px;color:var(--mute);text-align:center">${allParams.size} total</td>
  </tr>`;
}

function delWasteSource(id){
  wasteSources=wasteSources.filter(w=>w.id!==id);
  renderWasteSources();
  renderBMGabungan();
  saveAuto();
}

function addWasteSource(){
  wsId++;
  wasteSources.push({id:wsId, typeId:null, typeLabel:null, name:'', qDay:''});
  renderWasteSources();
}


function wsChange(id,field,val){
  const w=wasteSources.find(x=>x.id===id);
  if(!w) return;
  w[field]=val;
  // Update only the display cells for this row (no DOM rebuild)
  if(field==='qDay'){
    const qDay=pNum(val), qHr=qDay/24, qSec=qDay/86400;
    const row=document.getElementById('ws-row-'+id);
    if(row){
      const hrCell=row.querySelector('[data-cell="hr"]');
      const secCell=row.querySelector('[data-cell="sec"]');
      if(hrCell)  hrCell.textContent  = qDay>0 ? fmtN(qHr,3)  : '—';
      if(secCell) secCell.textContent = qDay>0 ? fmtN(qSec,6) : '—';
    }
    updateWsTotals();
  }
  saveAuto();
}
function updateWsTotals(){
  let totalDay=0;
  wasteSources.forEach(w=>{totalDay+=pNum(w.qDay);});
  const totalHr=totalDay/24, totalSec=totalDay/86400;
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v>0?fmtN(v,4):'—';};
  set('ws-total-day',totalDay); set('ws-total-hr',totalHr); set('ws-total-sec',totalSec);
}

// ─── Import parameter dari Tabel BM Gabungan ke Parameter & Perhitungan ────
function importParamsFromGabungan() {
  const typedSources = wasteSources.filter(w => w.typeId);
  if (!typedSources.length) {
    alert('⚠ Belum ada jenis air limbah dipilih.\n\nCara:\n1. Klik "+ Pilih Jenis Limbah" di bagian Jenis Air Limbah\n2. Centang jenis yang sesuai\n3. Klik "Tambahkan"\n4. Kembali ke sini dan klik tombol ini');
    return;
  }

  const cls = document.getElementById('r-class')?.value;
  if (!cls) {
    alert('⚠ Pilih Kelas Sungai terlebih dahulu (bagian atas halaman ini).');
    return;
  }

  // Kumpulkan semua parameter unik dari jenis terpilih
  // → Import HANYA nama parameternya; nilai C Maks diambil dari BM Sungai (WQDB)
  const uniqueParams = new Map(); // param_name → unit
  [...new Set(typedSources.map(w => w.typeId))].forEach(tid => {
    const t = BMALLDB.find(x => x.id === tid);
    if (!t) return;
    t.params.forEach(p => { if (!uniqueParams.has(p.param)) uniqueParams.set(p.param, p.unit); });
  });

  // Mapping nama parameter air limbah → nama di WQDB (PP 22/2021 Lampiran VI)
  const PM = {
    'pH':                       'Derajat Keasaman (pH)',
    'pH (Tingkat Keasaman)':    'Derajat Keasaman (pH)',
    'BOD':                      'BOD₅',
    'COD':                      'COD',
    'TSS':                      'Padatan Tersuspensi Total (TSS)',
    'Residu Tersuspensi (TSS)': 'Padatan Tersuspensi Total (TSS)',
    'Amoniak (NH₃-N)':          'Amoniak (sebagai N)',
    'Deterjen Total (MBAS)':    'Deterjen Total',
    'Minyak & Lemak':           'Minyak dan Lemak',
    'Sisa Klorin (Cl₂)':        'Klorin Bebas',
    'Residual Klorin':          'Klorin Bebas',
    'Nitrat (sebagai N)':       'Nitrat (sebagai N)',
    'Fecal Coliform':           'Fecal Coliform',
    'Besi (Fe) Total':          'Besi (Fe) Terlarut',
    'Mangan (Mn) Total':        'Mangan (Mn) Terlarut',
    'Cu':  'Tembaga (Cu) Terlarut',
    'Cd':  'Kadmium (Cd) Terlarut',
    'Zn':  'Seng (Zn) Terlarut',
    'Pb':  'Timbal (Pb) Terlarut',
    'As':  'Arsen (As) Terlarut',
    'Ni':  'Nikel (Ni) Terlarut',
    'Cr':  'Kromium Heksavalen (Cr-VI)',
    'CN':  'Sianida (CN⁻)',
    'Hg':  'Merkuri (Hg) Terlarut',
  };

  // Parameter non-numerik: skip (tidak ada di WQDB dengan nilai numerik)
  const SKIP = new Set(['Salmonela','Shigela','Vibrio cholera','Streptococcus']);

  // Parameter yang sudah ada
  const existingNos = new Set(params.map(p => p.no));
  let added = 0, skipped = 0, notFound = [];

  uniqueParams.forEach((unit, paramName) => {
    if (SKIP.has(paramName)) { skipped++; return; }

    // Cari di WQDB — exact match dulu
    const wqName = PM[paramName] || paramName;
    let dbRow = WQDB.find(r => r.name === wqName);

    // Fallback: cari berdasarkan keyword pertama (lebih toleran typo/unicode)
    if (!dbRow) {
      const kw = wqName.toLowerCase().replace(/[₁₂₃₄₅⁻₆₇₈₉₀]/g,'').replace(/[^a-z0-9 ]/g,'').split(' ')[0];
      dbRow = WQDB.find(r => r.name.toLowerCase().replace(/[^a-z0-9 ]/g,'').startsWith(kw));
    }

    if (!dbRow) { notFound.push(paramName); return; }
    if (existingNos.has(dbRow.no)) { skipped++; return; }

    // Nilai BM diambil dari WQDB berdasarkan KELAS SUNGAI (PP 22/2021 Lamp.VI)
    // Bukan dari nilai BM jenis air limbah di BMALLDB
    const bm = getKVal(dbRow, cls);
    pid++;
    params.push({
      id: pid, no: dbRow.no, name: dbRow.name, unit: dbRow.unit,
      bm: bm, bmNum: numVal(bm),
      cDry: '', cWet: '',
      bpmDry: null, bpaDry: null, statusDry: null,
      bpmWet: null, bpaWet: null, statusWet: null
    });
    existingNos.add(dbRow.no);
    added++;
  });

  recalcAll();
  renderParams();
  saveAuto();

  if (added > 0) {
    toast(`✓ ${added} parameter berhasil diimpor (nama dari jenis air limbah, C Maks dari BM Sungai Kelas ${['I','II','III','IV'][cls-1]})`, 'ok');
  } else if (skipped > 0 && !notFound.length) {
    toast('Semua parameter sudah ada di tabel', 'ok');
  } else {
    toast('Tidak ada parameter yang bisa diimpor', 'err');
  }
  if (notFound.length) {
    alert(`⚠ Parameter berikut tidak ditemukan di WQDB PP 22/2021:\n• ${notFound.join('\n• ')}\n\nParameter-parameter ini bisa ditambahkan manual dari Database BM.`);
  }
}


// [renderWasteSources lama dihapus — versi baru di atas]

// ═══════════════════════════════════════════════════════════════
// USULAN BAKU MUTU — STATE & HELPERS
// ═══════════════════════════════════════════════════════════════
let ubmSources=[], ubmSrcId=0;  // sumber air limbah untuk CR
let ubmParams=[], ubmPId=0;     // parameter CR
const CL_DESC={
  '1':'Air Baku Minum — baku mutu paling ketat',
  '2':'Rekreasi, Budidaya Ikan, Pertanian',
  '3':'Budidaya Ikan, Pertanian',
  '4':'Pengairan Pertanian'
};

function pNum(s){if(typeof s==='number')return s;return parseFloat(String(s||'').replace(/\./g,'').replace(',','.'))||0;}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function fmtN(v,dec){
  if(v==null||isNaN(v)) return '—';
  dec=dec??2;
  return parseFloat(v.toFixed(dec)).toLocaleString('id-ID',{minimumFractionDigits:dec,maximumFractionDigits:dec});
}

function ubmSave(){ saveAuto(); }


// ─── Sync data sungai dari Beban Pencemar ke UBM ────────────────
function ubmSyncFromBPM() {
  const rName = document.getElementById('r-name')?.value?.trim() || '';
  const rCls  = document.getElementById('r-class')?.value || '';

  // Update hidden fields (kompatibilitas save/load)
  const ubmRiverEl = document.getElementById('ubm-river');
  const ubmClsEl   = document.getElementById('ubm-class');
  if(ubmRiverEl) ubmRiverEl.value = rName;
  if(ubmClsEl)   ubmClsEl.value   = rCls;

  // Update display read-only
  const dispName = document.getElementById('ubm-river-display');
  const dispCls  = document.getElementById('ubm-class-display');
  if(dispName) dispName.textContent = rName || '(belum diisi di menu Beban Pencemar)';
  if(dispCls)  dispCls.textContent  = rCls
    ? `Kelas ${['I','II','III','IV'][rCls-1]} · ${CL_DESC[rCls]||''}`
    : '(belum dipilih di menu Beban Pencemar)';

  // Update class info text
  const info = document.getElementById('ubm-class-info');
  if(info) {
    info.textContent = rCls
      ? `Kelas ${['I','II','III','IV'][rCls-1]} · ${CL_DESC[rCls]||''}`
      : 'Pilih kelas sungai terlebih dahulu di menu Beban Pencemar.';
  }

  // Update bmVal ubmParams berdasarkan kelas dari BPM
  if(rCls) {
    ubmParams.forEach(p=>{
      if(p.dbId){
        const row=WQDB.find(r=>r.no===p.dbId);
        if(row){
          const rawKval=getKVal(row,parseInt(rCls));
          const rawStr=String(rawKval||'');
          const isRange=rawStr.includes('-')&&!rawStr.startsWith('-');
          p.isPH=isRange;
          p.bmVal=isRange?null:numVal(rawKval);
          p.bmStr=isRange?rawStr.replace('-','–'):(p.bmVal!=null?fmtN(p.bmVal,4):'—');
          const bmCell=document.getElementById('ubm-bm-'+p.id);
          if(bmCell) bmCell.textContent=p.bmStr;
        }
      }
    });
  }
}

function ubmOnClassChange(){
  // Delegate ke ubmSyncFromBPM — kelas dibaca dari menu Beban Pencemar
  ubmSyncFromBPM();
  ubmRenderParams();
  ubmCalc();
  ubmSave();
}

// ─── Sumber air limbah (UBM) ────────────────────────────────
function ubmAddSource(){
  ubmSrcId++;
  ubmSources.push({id:ubmSrcId, name:'Sumber '+ubmSrcId, qDay:'', typeId:null, typeLabel:null});
  ubmRenderSources();
  ubmRenderParams(); // rebuild columns
}
function ubmDelSource(id){
  ubmSources=ubmSources.filter(s=>s.id!==id);
  ubmRenderSources();
  ubmRenderParams();
  ubmCalc();
  ubmSave();
}
function ubmSrcChange(id,field,val){
  const s=ubmSources.find(x=>x.id===id);
  if(!s) return;
  s[field]=val;
  // Update only display cells — NO DOM rebuild (fixes input patah)
  if(field==='qDay'){
    const qDay=pNum(val), qHr=qDay/24, qSec=qDay/86400;
    const row=document.getElementById('ubm-src-row-'+id);
    if(row){
      const hrCell=row.querySelector('[data-cell="hr"]');
      const secCell=row.querySelector('[data-cell="sec"]');
      if(hrCell)  hrCell.textContent  = qDay>0 ? fmtN(qHr,2)  : '—';
      if(secCell) secCell.textContent = qDay>0 ? fmtN(qSec,6) : '—';
    }
    _ubmUpdateSrcTotals();
    _ubmCalcAndShowResults();
  }
  ubmSave();
}



// [renderWasteSources lama dihapus — versi baru di atas]

// ═══════════════════════════════════════════════════════════════
// USULAN BAKU MUTU — STATE & HELPERS
// ═══════════════════════════════════════════════════════════════
// ubmSources declared above
// ubmParams declared above
// [dup removed] const CL_DESC={
// [dup removed]   '1':'Air Baku Minum — baku mutu paling ketat',
// [dup removed]   '2':'Rekreasi, Budidaya Ikan, Pertanian',
// [dup removed]   '3':'Budidaya Ikan, Pertanian',
// [dup removed]   '4':'Pengairan Pertanian'
// [dup removed] };

function pNum(s){if(typeof s==='number')return s;return parseFloat(String(s||'').replace(/\./g,'').replace(',','.'))||0;}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
// fmtN defined above




// ubmOnClassChange defined above

// ─── Sumber air limbah (UBM) ────────────────────────────────
function ubmAddSource(){
  ubmSrcId++;
  ubmSources.push({id:ubmSrcId, name:'Sumber '+ubmSrcId, qDay:'', typeId:null, typeLabel:null});
  ubmRenderSources();
  ubmRenderParams(); // rebuild columns
}
function ubmDelSource(id){
  ubmSources=ubmSources.filter(s=>s.id!==id);
  ubmRenderSources();
  ubmRenderParams();
  ubmCalc();
  ubmSave();
}
function ubmSrcChange(id,field,val){
  const s=ubmSources.find(x=>x.id===id);
  if(!s) return;
  s[field]=val;
  // Update only display cells — NO DOM rebuild (fixes input patah)
  if(field==='qDay'){
    const qDay=pNum(val), qHr=qDay/24, qSec=qDay/86400;
    const row=document.getElementById('ubm-src-row-'+id);
    if(row){
      const hrCell=row.querySelector('[data-cell="hr"]');
      const secCell=row.querySelector('[data-cell="sec"]');
      if(hrCell)  hrCell.textContent  = qDay>0 ? fmtN(qHr,2)  : '—';
      if(secCell) secCell.textContent = qDay>0 ? fmtN(qSec,6) : '—';
    }
    _ubmUpdateSrcTotals();
    _ubmCalcAndShowResults();
  }
  ubmSave();
}

function ubmSrcTypeChange(id, typeId){
  const s=ubmSources.find(x=>x.id===id);
  if(!s) return;
  s.typeId = typeId || null;
  const t = typeId ? BMALLDB.find(x=>x.id===typeId) : null;
  s.typeLabel = t ? t.label : null;
  _ubmCalcAndShowResults();
  ubmSave();
}

function _ubmUpdateSrcTotals(){
  const totalDay=ubmSources.reduce((s,x)=>s+pNum(x.qDay),0);
  const td=document.getElementById('ubm-total-day');
  const ts=document.getElementById('ubm-total-sec');
  if(td) td.textContent=totalDay>0?fmtN(totalDay,2):'—';
  if(ts) ts.textContent=totalDay>0?fmtN(totalDay/86400,6):'—';
}
function ubmRenderSources(){
  const list=document.getElementById('ubm-src-list');
  const empty=document.getElementById('ubm-src-empty');
  const footer=document.getElementById('ubm-src-footer');
  const hdr=document.getElementById('ubm-src-hdr');
  if(!list) return;
  if(!ubmSources.length){
    list.innerHTML=''; empty.style.display='block';
    if(footer) footer.style.display='none';
    if(hdr) hdr.style.display='none';
    const td=document.getElementById('ubm-total-day');
    const ts=document.getElementById('ubm-total-sec');
    if(td) td.textContent='—'; if(ts) ts.textContent='—';
    return;
  }
  empty.style.display='none';
  if(hdr) hdr.style.display='grid';
  if(footer) footer.style.display='flex';
  const GRID='display:grid;grid-template-columns:180px 1fr 120px 90px 90px 32px;gap:6px;padding:6px 8px;align-items:center;background:var(--bg2);border:1px solid var(--brd2);border-radius:var(--rs);margin-bottom:4px';
  // Build type options
  const catColors={'Pertambangan':'#e67e22','Domestik':'#1a7fd4','Pemanfaatan':'#27ae60'};
  const typeOpts='<option value="">— Jenis Limbah —</option>'+
    Object.entries(BMALLDB.reduce((g,t)=>{(g[t.kategori]=g[t.kategori]||[]).push(t);return g;},{}))
    .map(([kat,items])=>`<optgroup label="${esc(kat)}">`+items.map(t=>`<option value="${t.id}">${esc(t.label)}</option>`).join('')+'</optgroup>')
    .join('');
  list.innerHTML=ubmSources.map(function(s){
    var qDay=pNum(s.qDay),qHr=qDay/24,qSec=qDay/86400;
    var selOpts='<option value="">— Jenis Limbah —</option>';
    var grouped=BMALLDB.reduce(function(g,t){(g[t.kategori]=g[t.kategori]||[]).push(t);return g;},{});
    Object.keys(grouped).forEach(function(kat){
      selOpts+='<optgroup label="'+esc(kat)+'">';
      grouped[kat].forEach(function(t){
        selOpts+='<option value="'+t.id+'"'+(s.typeId===t.id?' selected':'')+'>'+esc(t.label)+'</option>';
      });
      selOpts+='</optgroup>';
    });
    var row='<div id="ubm-src-row-'+s.id+'" style="'+GRID+'">';
    row+='<select class="fselect" style="font-size:11px;padding:4px 6px" onchange="ubmSrcTypeChange('+s.id+',this.value)">'+selOpts+'</select>';
    row+='<input class="finput" style="font-size:12px;padding:5px 8px" value="'+esc(s.name)+'" placeholder="Nama sumber" data-sid="'+s.id+'" data-field="name" oninput="ubmSrcChange(+this.dataset.sid,this.dataset.field,this.value)">';
    row+='<input class="finput" style="font-size:12px;padding:5px 8px;text-align:right;font-family:var(--mono)" inputmode="decimal" value="'+s.qDay+'" placeholder="0.00" data-sid="'+s.id+'" data-field="qDay" oninput="ubmSrcChange(+this.dataset.sid,this.dataset.field,this.value)">';
    row+='<div data-cell="hr" style="font-family:var(--mono);font-size:11px;color:var(--txt2);text-align:right;padding-right:4px">'+(qDay>0?fmtN(qHr,2):'—')+'</div>';
    row+='<div data-cell="sec" style="font-family:var(--mono);font-size:11px;color:var(--accent);text-align:right;padding-right:4px">'+(qDay>0?fmtN(qSec,6):'—')+'</div>';
    row+='<button onclick="ubmDelSource('+s.id+')" style="width:28px;height:28px;background:rgba(255,80,80,0.1);border:1px solid rgba(255,80,80,0.25);border-radius:var(--rs);color:#ff6060;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center">🗑</button>';
    row+='</div>';
    return row;
  }).join('');
  _ubmUpdateSrcTotals();
}

// ─── Parameter (UBM) ─────────────────────────────────────────
function ubmShowDBPicker(){
  const picker=document.getElementById('ubm-db-picker');
  picker.style.display=picker.style.display==='none'?'block':'none';
  if(picker.style.display==='block'){
    document.getElementById('ubm-import-panel').style.display='none';
  }
  renderUbmDB();
}

// ── Impor dari Beban Pencemar ─────────────────────────────────
function ubmImportFromBPM(){
  const panel=document.getElementById('ubm-import-panel');
  panel.style.display=panel.style.display==='none'?'block':'none';
  if(panel.style.display==='block'){
    document.getElementById('ubm-db-picker').style.display='none';
    // Show preview of params available
    _ubmShowImportPreview();
  }
}

function _ubmShowImportPreview(){
  const prev=document.getElementById('ubm-import-preview');
  if(!prev) return;
  if(!params.length){
    prev.style.display='block';
    prev.textContent='⚠ Belum ada parameter di menu Beban Pencemar. Tambahkan parameter di sana terlebih dahulu.';
    return;
  }
  const lines=params.map(p=>`${p.name} (C Kemarau: ${p.cDry||'—'} | C Hujan: ${p.cWet||'—'} ${p.unit})`);
  prev.style.display='block';
  prev.innerHTML='<span style="color:var(--accent)">'+params.length+' parameter tersedia:</span><br>'+
    lines.map(l=>'· '+l).join('<br>');
}

function ubmDoImport(season){
  // season: 'dry' | 'wet' | 'avg'
  if(!params.length){
    toast('⚠ Tidak ada parameter di menu Beban Pencemar','err'); return;
  }
  const cls=document.getElementById('r-class')?.value||document.getElementById('ubm-class')?.value||'';
  let added=0, skipped=0, updated=0;

  params.forEach(bpmP=>{
    // Tentukan nilai C hulu dari musim yang dipilih
    let cVal='';
    if(season==='dry')       cVal=bpmP.cDry||'';
    else if(season==='wet')  cVal=bpmP.cWet||'';
    else {
      // avg: rata-rata kemarau & hujan jika keduanya ada
      const d=pNum(bpmP.cDry), w=pNum(bpmP.cWet);
      cVal=(d>0&&w>0) ? fmtN((d+w)/2,4) : (bpmP.cDry||bpmP.cWet||'');
    }

    // Cek apakah parameter sudah ada di ubmParams (by no/dbId)
    const existing=ubmParams.find(u=>u.dbId===bpmP.no);
    if(existing){
      // Update cHuluDry / cHuluWet berdasarkan musim import
      if(season==='dry'||season==='avg') existing.cHuluDry=cVal;
      if(season==='wet'||season==='avg') existing.cHuluWet=cVal;
      if(season==='avg'){ existing.cHuluDry=bpmP.cDry||''; existing.cHuluWet=bpmP.cWet||''; }
      // Update display cells
      const cellD=document.querySelector(`#ubm-param-list [data-chulud="${existing.id}"]`);
      const cellW=document.querySelector(`#ubm-param-list [data-chuluW="${existing.id}"]`);
      if(cellD) cellD.value=existing.cHuluDry;
      if(cellW) cellW.value=existing.cHuluWet;
      updated++;
      return;
    }

    // Tambah baru
    ubmPId++;
    const wqRow=WQDB.find(r=>r.no===bpmP.no);
    const bm=cls&&wqRow ? numVal(getKVal(wqRow,parseInt(cls))) : null;
    ubmParams.push({
      id:ubmPId, dbId:bpmP.no,
      name:bpmP.name, unit:bpmP.unit||'mg/L',
      cHuluDry: season==='dry'?cVal : season==='avg'?cVal : bpmP.cDry||'',
      cHuluWet: season==='wet'?cVal : season==='avg'?cVal : bpmP.cWet||'',
      cSrc:{},
      bmVal:bm,
      bmStr:bm!=null?fmtN(bm,4):'—',
      finalBM:'',
      usulanBM:''
    });
    // Inisialisasi slot untuk sumber yang sudah ada
    ubmSources.forEach(s=>{ ubmParams[ubmParams.length-1].cSrc[s.id]=''; });
    added++;
  });

  document.getElementById('ubm-import-panel').style.display='none';
  ubmRenderParams();
  _ubmCalcAndShowResults();
  ubmSave();

  const seasonLabel=season==='dry'?'Kemarau ☀':season==='wet'?'Hujan 🌧':'Rata-rata';
  const msg=`✅ Impor ${seasonLabel}: ${added} ditambahkan${updated?', '+updated+' diperbarui C Hulu':''}${skipped?' ('+skipped+' dilewati)':''}`;
  toast(msg,'ok');
}
function renderUbmDB(){
  const q=(document.getElementById('ubm-db-search')?.value||'').toLowerCase();
  const tbody=document.getElementById('ubm-db-tbody');
  if(!tbody) return;
  const filtered=WQDB.filter(r=>r.name.toLowerCase().includes(q));
  const cls=document.getElementById('r-class')?.value||document.getElementById('ubm-class')?.value||'';
  tbody.innerHTML=filtered.map(r=>{
    const v=k=>{ const n=numVal(r[k]); return n!=null?fmtN(n,4):'Dev'; };
    const bmCur=cls?v('k'+cls):'—';
    return `<tr>
      <td style="padding:7px 10px;font-size:12.5px;font-weight:600">${r.name}</td>
      <td style="text-align:center;font-family:var(--mono);font-size:11px;color:var(--mute);padding:7px 8px">${r.unit}</td>
      <td style="text-align:center;font-family:var(--mono);font-size:11px;padding:7px 6px">${v('k1')}</td>
      <td style="text-align:center;font-family:var(--mono);font-size:11px;padding:7px 6px">${v('k2')}</td>
      <td style="text-align:center;font-family:var(--mono);font-size:11px;padding:7px 6px">${v('k3')}</td>
      <td style="text-align:center;font-family:var(--mono);font-size:11px;padding:7px 6px">${v('k4')}</td>
      <td style="text-align:center;padding:7px 8px">
        <button class="btn btn-outline btn-sm" style="font-size:10.5px;padding:3px 10px;cursor:pointer"
          onclick="ubmAddParamFromDB(${r.no})">＋ Tambah</button>
      </td>
    </tr>`;
  }).join('');
}
function ubmAddParamFromDB(dbId){
  dbId=Number(dbId);
  if(ubmParams.find(p=>p.dbId===dbId)){toast('Parameter sudah ada','err');return;}
  const row=WQDB.find(r=>r.no===dbId);
  if(!row) return;
  ubmPId++;
  const cls=document.getElementById('r-class')?.value||document.getElementById('ubm-class')?.value||'';
  const bm=cls?numVal(getKVal(row,parseInt(cls))):null;
  const p={id:ubmPId,dbId,name:row.name,unit:row.unit,
    cHuluDry:'',cHuluWet:'',cSrc:{},bmVal:bm, bmStr:cls&&bm!=null?fmtN(bm,4):'—', finalBM:'',usulanBM:''};
  ubmSources.forEach(s=>{p.cSrc[s.id]='';});
  ubmParams.push(p);
  document.getElementById('ubm-db-picker').style.display='none';
  ubmRenderParams(); ubmCalc(); ubmSave();
  toast(`✓ ${row.name} ditambahkan`,'ok');
}
function ubmAddParamManual(){
  ubmPId++;
  const cls=document.getElementById('r-class')?.value||document.getElementById('ubm-class')?.value||'';
  const p={id:ubmPId,dbId:null,name:'',unit:'mg/L',cHuluDry:'',cHuluWet:'',cSrc:{},bmVal:null,bmStr:'',finalBM:'',usulanBM:''};
  ubmSources.forEach(s=>{p.cSrc[s.id]='';});
  ubmParams.push(p);
  ubmRenderParams(); ubmSave();
}
function ubmDelParam(id){
  ubmParams=ubmParams.filter(p=>p.id!==id);
  ubmRenderParams(); ubmCalc(); ubmSave();
}
function ubmPChange(id,field,val){
  const p=ubmParams.find(x=>x.id===id);
  if(!p) return;
  if(field==='cSrc'){
    // val = {srcId, v}
    p.cSrc[val.srcId]=val.v;
  } else {
    p[field]=val;
  }
  ubmCalc(); ubmSave();
}

function ubmRenderParams(){
  const list=document.getElementById('ubm-param-list');
  const empty=document.getElementById('ubm-param-empty');
  const colHdr=document.getElementById('ubm-col-hdr');
  if(!list) return;
  if(!ubmParams.length){
    list.innerHTML=''; empty.style.display='block';
    if(colHdr) colHdr.style.display='none';
    return;
  }
  empty.style.display='none';
  // Ensure all params have slots for current sources
  ubmParams.forEach(p=>{
    ubmSources.forEach(s=>{ if(!(s.id in p.cSrc)) p.cSrc[s.id]=''; });
    // Remove slots for deleted sources
    Object.keys(p.cSrc).forEach(k=>{
      if(!ubmSources.find(s=>s.id==k)) delete p.cSrc[k];
    });
  });

  // Shared grid definition (2 C Hulu columns: kemarau + hujan + Usulan BM)
  const widths=`1fr 70px 90px 90px ${ubmSources.map(()=>'90px').join(' ')} 90px 100px 32px`;
  const srcCols=ubmSources.length;

  // Column header
  if(colHdr){
    colHdr.style.display='grid';
    const hdrSrcCols=ubmSources.map(s=>`<div style="text-align:right">C<sub>${esc(s.name||'Sumber')}</sub><br><span style="font-size:8px;color:var(--mute)">(mg/L)</span></div>`).join('');
    colHdr.style.cssText=`display:grid;grid-template-columns:${widths};gap:6px;padding:6px 8px;font-family:var(--mono);font-size:9px;color:var(--mute);text-transform:uppercase;letter-spacing:0.7px;border-bottom:1px solid var(--brd2);margin-bottom:4px`;
    colHdr.innerHTML=`<div>Parameter</div><div style="text-align:center">Satuan</div><div style="text-align:right;color:#f5a623">C Hulu ☀<br><span style="font-size:8px;font-weight:400">Kemarau (mg/L)</span></div><div style="text-align:right;color:#4488ff">C Hulu 🌧<br><span style="font-size:8px;font-weight:400">Hujan (mg/L)</span></div>${hdrSrcCols}<div style="text-align:right">BM Kelas</div><div style="text-align:right;color:var(--amber)">Usulan BM<br><span style="font-size:8px;font-weight:400">(mg/L)</span></div><div></div>`;
  }
  const ROW='border:1px solid var(--brd2);border-radius:var(--rs);padding:6px 8px;margin-bottom:4px;background:var(--bg2)';
  const INP='style="width:100%;background:var(--inp);border:1px solid var(--brd2);border-radius:3px;color:var(--txt);font-family:var(--mono);font-size:11.5px;padding:4px 6px;text-align:right;outline:none"';
  const INP_DRY='style="width:100%;background:var(--inp);border:1px solid rgba(245,166,35,0.5);border-radius:3px;color:var(--txt);font-family:var(--mono);font-size:11.5px;padding:4px 6px;text-align:right;outline:none"';
  const INP_WET='style="width:100%;background:var(--inp);border:1px solid rgba(68,136,255,0.5);border-radius:3px;color:var(--txt);font-family:var(--mono);font-size:11.5px;padding:4px 6px;text-align:right;outline:none"';

  list.innerHTML=ubmParams.map(p=>{
    const srcInputs=ubmSources.map(s=>`<input ${INP} inputmode="decimal" value="${p.cSrc[s.id]||''}" placeholder="0.000" oninput="ubmPChange(${p.id},'cSrc',{srcId:${s.id},v:this.value})">`).join('');
    const nameField=p.dbId
      ? `<div style="font-size:12.5px;font-weight:600;color:var(--txt2)">${esc(p.name)}</div>`
      : `<input class="finput" style="font-size:12px;padding:4px 8px" value="${esc(p.name)}" placeholder="Nama parameter" oninput="ubmPChange(${p.id},'name',this.value)">`;
    const unitField=p.dbId
      ? `<div style="font-family:var(--mono);font-size:10.5px;color:var(--mute);text-align:center">${esc(p.unit)}</div>`
      : `<input class="finput" style="font-size:11px;padding:4px 6px;text-align:center" value="${esc(p.unit)}" placeholder="mg/L" oninput="ubmPChange(${p.id},'unit',this.value)">`;
    const bmField=p.dbId
      ? `<div id="ubm-bm-${p.id}" style="font-family:var(--mono);font-size:11px;color:var(--accent);text-align:right">${p.bmStr||'—'}</div>`
      : `<input class="finput" style="font-size:11px;padding:4px 6px;text-align:right;font-family:var(--mono)" inputmode="decimal" value="${p.bmStr}" placeholder="BM" oninput="ubmPChange(${p.id},'bmStr',this.value);ubmPChange(${p.id},'bmVal',parseFloat(this.value.replace(',','.'))||null)">`;
    const cHD = p.cHuluDry ?? p.cHulu ?? '';
    const cHW = p.cHuluWet ?? p.cHulu ?? '';
    const usulanBMVal = p.usulanBM ?? '';
    const INP_AMB=`style="width:100%;background:var(--inp);border:1px solid rgba(245,166,35,0.6);border-radius:3px;color:var(--amber);font-family:var(--mono);font-size:11.5px;padding:4px 6px;text-align:right;outline:none;font-weight:600"`;
    return `<div style="${ROW};display:grid;grid-template-columns:${widths};gap:6px;align-items:center">
      ${nameField}
      ${unitField}
      <input ${INP_DRY} data-chulud="${p.id}" inputmode="decimal" value="${cHD}" placeholder="0.000" oninput="ubmPChange(${p.id},'cHuluDry',this.value)">
      <input ${INP_WET} data-chuluw="${p.id}" inputmode="decimal" value="${cHW}" placeholder="0.000" oninput="ubmPChange(${p.id},'cHuluWet',this.value)">
      ${srcInputs}
      ${bmField}
      <input ${INP_AMB} data-usulanbm="${p.id}" inputmode="decimal" value="${usulanBMVal}" placeholder="Isi BM…" title="Usulan Baku Mutu (digunakan untuk alokasi beban)" oninput="ubmPChange(${p.id},'usulanBM',this.value)">
      <button onclick="ubmDelParam(${p.id})" style="width:26px;height:26px;background:rgba(255,80,80,0.1);border:1px solid rgba(255,80,80,0.25);border-radius:3px;color:#ff6060;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center">🗑</button>
    </div>`;
  }).join('');
  // Do NOT call ubmCalc here — avoids input patah (cursor loss)
  // ubmCalc is called separately when values change
}

// ─── Kalkulasi CR (Fix 1,3,4,5) ──────────────────────────────
// Ambil Qs dari BPM page (q-dry / q-wet)
function getQsDry(){ return pNum(document.getElementById('q-dry')?.value); }
function getQsWet(){  return pNum(document.getElementById('q-wet')?.value);  }

function ubmPChange(id,field,val){
  const p=ubmParams.find(x=>x.id===id);
  if(!p) return;
  if(field==='cSrc') p.cSrc[val.srcId]=val.v;
  else p[field]=val;
  // FIX 1: hanya update kalkulasi + tabel hasil, JANGAN re-render param list
  _ubmCalcAndShowResults();
  ubmSave();
}

function ubmCalc(){
  _ubmCalcAndShowResults();
}

// Pisah: kalkulasi + render result tables (tidak rebuild input list)
function _ubmCalcAndShowResults(){
  // Update label Q sungai dari BPM page
  const qd=getQsDry(), qw=getQsWet();
  const lblD=document.getElementById('ubm-qs-dry-lbl');
  const lblW=document.getElementById('ubm-qs-wet-lbl');
  if(lblD) lblD.textContent=qd>0?fmtN(qd,4):'(belum diisi)';
  if(lblW) lblW.textContent=qw>0?fmtN(qw,4):'(belum diisi)';
  if(!ubmParams.length){
    ['ubm-result-card','ubm-max-card','ubm-final-card','ubm-cr-usulan-card'].forEach(id=>{
      const el=document.getElementById(id); if(el) el.style.display='none';
    });
    // ubm-rekap-card hanya tampil di laporan, selalu hidden di menu UBM
    const rekapCard=document.getElementById('ubm-rekap-card');
    if(rekapCard) rekapCard.style.display='none';
    return;
  }
  const cls=document.getElementById('r-class')?.value||document.getElementById('ubm-class')?.value||'';
  const totalQi=ubmSources.reduce((s,x)=>s+pNum(x.qDay)/86400,0); // m³/det
  
  const PASS='<span class="badge b-ok" style="font-size:10px;padding:2px 8px">✓ Memenuhi</span>';
  const FAIL='<span class="badge b-ng" style="font-size:10px;padding:2px 8px">✗ Melebihi</span>';
  const NA='<span class="badge b-na" style="font-size:10px;padding:2px 8px">—</span>';

  // Update bmVal dari kelas saat ini untuk param DB
  ubmParams.forEach(p=>{
    if(p.dbId && cls){
      const row=WQDB.find(r=>r.no===p.dbId);
      if(row){
        const rawKval = getKVal(row,parseInt(cls));
        const rawStr  = String(rawKval||'');
        // Deteksi pH / rentang: nilai seperti "6-9" → isPH = true, bmVal = null
        const isRange = rawStr.includes('-') && !rawStr.startsWith('-');
        p.isPH  = isRange;
        p.bmVal = isRange ? null : numVal(rawKval);
        p.bmStr = isRange ? rawStr.replace('-','–') : (p.bmVal!=null ? fmtN(p.bmVal,4) : '—');
        // Update tampilan BM cell
        const bmCell=document.getElementById('ubm-bm-'+p.id);
        if(bmCell) bmCell.textContent=p.bmStr;
      }
    }
  });

  // FIX 4: hitung untuk kedua musim (kemarau + hujan)
  const seasons=[
    {key:'dry', label:'Kemarau ☀', Qs:getQsDry()},
    {key:'wet', label:'Hujan 🌧',  Qs:getQsWet()}
  ];

  // Render header sumber
  const crSrcHdr=document.getElementById('cr-src-hdr');
  if(crSrcHdr) crSrcHdr.innerHTML=ubmSources.map(s=>`<th class="th" style="text-align:right">C ${esc(s.name||'Sumber')} (mg/L)</th>`).join('');

  // Hitung hasil per musim — gunakan C Hulu sesuai musim
  function calcSeason(Qs, seasonKey){
    const denom=Qs+totalQi;
    return ubmParams.map(p=>{
      // Prioritas: cHuluDry/cHuluWet (baru), fallback ke cHulu (legacy)
      const cHuluRaw = seasonKey==='dry'
        ? (p.cHuluDry ?? p.cHulu ?? '')
        : (p.cHuluWet ?? p.cHulu ?? '');
      const cHulu=pNum(cHuluRaw);
      let sumQiCi=0;
      ubmSources.forEach(s=>{
        const Qi=pNum(s.qDay)/86400, Ci=pNum(p.cSrc[s.id]);
        sumQiCi+=Qi*Ci;
      });
      const cr=denom>0?(Qs*cHulu+sumQiCi)/denom:null;
      const bm=p.bmVal;
      // pH: rentang 6–9 — status berdasarkan apakah CR hilir masuk rentang
      let status;
      if(p.isPH){
        status = cr!=null ? (cr>=6&&cr<=9?'ok':'ng') : null;
      } else {
        status = cr!=null&&bm!=null ? (cr<=bm?'ok':'ng') : null;
      }
      let cMax=null;
      if(bm!=null&&totalQi>0){
        cMax=(bm*denom-Qs*cHulu)/totalQi;
        if(cMax<0) cMax=0;
      }
      return {p,cr,bm,status,cMax,totalQi,Qs,denom,cHulu};
    });
  }

  const resDry=calcSeason(getQsDry(),'dry');
  const resWet=calcSeason(getQsWet(),'wet');

  // Show/hide cards — rekap hanya di laporan, tidak di menu UBM
  const hasQ=getQsDry()>0||getQsWet()>0;
  const showCards=ubmParams.length>0&&totalQi>0&&hasQ;
  ['ubm-result-card','ubm-max-card','ubm-final-card'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.style.display=showCards?'block':'none';
  });
  // ubm-rekap-card selalu tersembunyi di menu UBM — hanya muncul di Laporan
  const rekapCard=document.getElementById('ubm-rekap-card');
  if(rekapCard) rekapCard.style.display='none';
  // ubm-cr-usulan-card: ditangani setelah kalkulasi usulan di bawah
  if(!showCards){
    const crUsulanCardEarly=document.getElementById('ubm-cr-usulan-card');
    if(crUsulanCardEarly) crUsulanCardEarly.style.display='none';
  }
  if(!showCards) return;

  // ── CR table — dual section (Kemarau + Hujan) per template ──
  const TH = (v,extra='') => `<th style="padding:8px 10px;font-family:var(--mono);font-size:9.5px;font-weight:700;color:var(--mute);border-bottom:1px solid var(--brd);white-space:nowrap;${extra}">${v}</th>`;
  const TD = (v,extra='') => `<td style="padding:7px 10px;font-family:var(--mono);font-size:11px;${extra}">${v}</td>`;

  // Collect BM Jenis columns dari sumber yang punya typeId
  const ubmJenisCols = ubmSources
    .filter(s => s.typeId)
    .map(s => ({ srcId: s.id, name: s.name||s.typeLabel||`Sumber ${s.id}`, typeId: s.typeId }));
  // Deduplicate by typeId (satu kolom per jenis unik)
  const uniqueJenis = [];
  const seenType = new Set();
  ubmJenisCols.forEach(j => {
    if (!seenType.has(j.typeId)) { seenType.add(j.typeId); uniqueJenis.push(j); }
  });

  function buildCRSection(seasonKey, Qs, resArr, colorHex, seasonLabel) {
    const theadId = `ubm-cr-thead-${seasonKey}`;
    const tbodyId = `ubm-cr-tbody-${seasonKey}`;
    const thead = document.getElementById(theadId);
    const tbody  = document.getElementById(tbodyId);
    if (!thead || !tbody) return;

    // Header row
    const srcHeaders = ubmSources.map(s =>
      TH(`${esc(s.name||`Sumber ${s.id}`)}<br><span style="font-weight:400;font-size:8.5px;color:var(--mute)">(mg/L)</span>`, 'text-align:right')
    ).join('');
    const jenisHeaders = uniqueJenis.map(j => {
      const t = BMALLDB.find(x=>x.id===j.typeId);
      const label = t ? t.label.replace(/–.*/,'').trim() : j.name;
      return TH(`BM ${esc(label.length>22?label.slice(0,20)+'…':label)}<br><span style="font-weight:400;font-size:8.5px;color:var(--mute)">(mg/L)</span>`, `text-align:right;color:#f39c12`);
    }).join('');

    thead.innerHTML = `<tr style="background:rgba(0,0,0,0.04)">
      ${TH('Parameter','text-align:left')}
      ${TH('Satuan','text-align:center')}
      ${TH('C Hulu<br>(mg/L)','text-align:right')}
      ${srcHeaders}
      ${TH(`CR Hilir<br>(mg/L)`,`text-align:right;color:${colorHex}`)}
      ${TH('BM Air Sungai<br>(Sesuai Kelas)','text-align:right;color:var(--accent)')}
      ${jenisHeaders}
      ${TH('Keterangan','text-align:center')}
    </tr>`;

    tbody.innerHTML = resArr.map(({p, cr, bm, status, cHulu}) => {
      const srcCols = ubmSources.map(s =>
        TD(p.cSrc[s.id] ? fmtN(pNum(p.cSrc[s.id]),4) : '—', 'text-align:right;color:var(--txt2)')
      ).join('');

      // BM per jenis limbah per parameter
      // Alias: nama parameter di WQDB (ubmParams.name) → sinonim di BMALLDB
      const _JALIAS = {
        'padatan tersuspensi total (tss)': ['residu tersuspensi (tss)','residu tersuspensi','tss'],
        'besi (fe) terlarut':  ['besi (fe) total','fe'],
        'mangan (mn) terlarut':['mangan (mn) total','mn'],
        'derajat keasaman (ph)':['ph (tingkat keasaman)','ph'],
        'bod₅': ['bod'],
        'amoniak (sebagai n)': ['amoniak (nh₃-n)','amoniak'],
        'deterjen total':      ['deterjen total (mbas)'],
        'minyak dan lemak':    ['minyak & lemak','minyak dan lemak'],
        'klorin bebas':        ['sisa klorin (cl₂)','residual klorin','klorin bebas'],
        'fecal coliform':      ['fecal coliform'],
        'tembaga (cu) terlarut':['cu'],
        'kadmium (cd) terlarut':['cd'],
        'seng (zn) terlarut':  ['zn'],
        'timbal (pb) terlarut':['pb'],
        'arsen (as) terlarut': ['as'],
        'nikel (ni) terlarut': ['ni'],
        'kromium heksavalen (cr-vi)':['cr'],
        'sianida (cn⁻)':       ['cn'],
        'merkuri (hg) terlarut':['hg'],
        'nitrat (sebagai n)':  ['nitrat (sebagai n)'],
      };
      const _norm = s => s.toLowerCase().replace(/[^a-z0-9]/g,'');

      const jenisCols = uniqueJenis.map(j => {
        const t = BMALLDB.find(x=>x.id===j.typeId);
        if (!t) return TD('—','text-align:right;color:var(--mute)');

        const tgtRaw  = (p.name||'').toLowerCase();
        const tgtNorm = _norm(tgtRaw);

        // Build set of acceptable normalized names for this ubmParam
        const acceptNorms = new Set([tgtNorm]);
        // Add aliases: if tgtRaw matches a key, add its alias values
        Object.entries(_JALIAS).forEach(([key, aliases]) => {
          if (_norm(key) === tgtNorm || tgtNorm === _norm(key)) {
            aliases.forEach(a => acceptNorms.add(_norm(a)));
          }
          // Also reverse: if tgtNorm matches an alias, add the key and all other aliases
          if (aliases.some(a => _norm(a) === tgtNorm)) {
            acceptNorms.add(_norm(key));
            aliases.forEach(a => acceptNorms.add(_norm(a)));
          }
        });

        // Find matching params in this jenis type
        const matches = t.params.filter(px => {
          const pnorm = _norm(px.param);
          if (acceptNorms.has(pnorm)) return true;
          // Fallback: mutual contains (only for longer names, avoid false positives)
          if (pnorm.length >= 4 && tgtNorm.length >= 4) {
            if (pnorm.includes(tgtNorm) || tgtNorm.includes(pnorm)) return true;
          }
          return false;
        });

        if (!matches.length) return TD('—','text-align:right;color:var(--mute)');

        const nums = matches.map(m=>m.num).filter(n=>n!=null&&!isNaN(n));
        let display;
        if (nums.length > 0) {
          const best = Math.min(...nums);
          display = fmtN(best, 4);
        } else {
          display = matches[0].kadarMaks;
        }
        return TD(display, 'text-align:right;color:#f39c12;font-weight:600');
      }).join('');

      const crColor = status==='ok' ? 'var(--green)' : status==='ng' ? 'var(--red)' : 'var(--txt2)';
      const ketBadge = status==='ok'
        ? `<span style="color:var(--green);font-weight:700;font-family:var(--mono);font-size:9.5px">Memenuhi</span>`
        : status==='ng'
        ? `<span style="color:var(--red);font-weight:700;font-family:var(--mono);font-size:9.5px">Melebihi</span>`
        : `<span style="color:var(--mute);font-family:var(--mono);font-size:9.5px">—</span>`;
      const rowBg = status==='ng' ? 'rgba(255,60,60,0.04)' : status==='ok' ? 'rgba(0,232,122,0.03)' : '';

      return `<tr style="background:${rowBg};border-bottom:1px solid var(--brd2)">
        ${TD(`<strong>${esc(p.name||'—')}</strong>`, 'text-align:left;font-size:12px')}
        ${TD(esc(p.unit), 'text-align:center;color:var(--mute)')}
        ${TD(cHulu!=null&&cHulu>0?fmtN(cHulu,4):'—', 'text-align:right;color:var(--txt2)')}
        ${srcCols}
        ${TD(cr!=null?fmtN(cr,4):'—', `text-align:right;color:${crColor};font-weight:700;font-size:12px`)}
        ${TD(p.isPH ? '<span style="color:var(--accent);font-weight:600">6–9</span>' : (bm!=null?fmtN(bm,4):'—'), 'text-align:right;color:var(--accent);font-weight:600')}
        ${jenisCols}
        ${TD(ketBadge, 'text-align:center')}
      </tr>`;
    }).join('');
  }

  buildCRSection('dry', getQsDry(), resDry, '#f5a623', 'Kemarau');
  buildCRSection('wet', getQsWet(), resWet, '#4488ff', 'Hujan');

  // ── CR Hilir Sungai dari Usulan BM (baru) ─────────────────────
  // Hitung CR per parameter menggunakan usulanBM sebagai C_i sumber
  function calcSeasonUsulan(Qs, seasonKey) {
    const denom = Qs + totalQi;
    return ubmParams.map(p => {
      const cHuluRaw = seasonKey==='dry'
        ? (p.cHuluDry ?? p.cHulu ?? '')
        : (p.cHuluWet ?? p.cHulu ?? '');
      const cHulu = pNum(cHuluRaw);
      const usulanBMVal = (p.usulanBM ?? '') !== '' ? pNum(p.usulanBM) : null;
      let sumQiCi = 0;
      ubmSources.forEach(s => {
        const Qi = pNum(s.qDay) / 86400;
        const Ci = usulanBMVal != null ? usulanBMVal : 0;
        sumQiCi += Qi * Ci;
      });
      const cr = denom > 0 ? (Qs * cHulu + sumQiCi) / denom : null;
      const bm = p.bmVal;
      let status;
      if (p.isPH) {
        status = cr!=null ? (cr>=6&&cr<=9?'ok':'ng') : null;
      } else {
        status = cr!=null&&bm!=null ? (cr<=bm?'ok':'ng') : null;
      }
      return { p, cr, bm, status, cHulu, usulanBMVal };
    });
  }

  const resDryUsulan = calcSeasonUsulan(getQsDry(), 'dry');
  const resWetUsulan = calcSeasonUsulan(getQsWet(), 'wet');

  // Tampilkan card CR Usulan BM jika ada parameter dan ada setidaknya satu Usulan BM
  const hasAnyUsulan = ubmParams.some(p=>(p.usulanBM??'')!=='');
  const crUsulanCard = document.getElementById('ubm-cr-usulan-card');
  if (crUsulanCard) crUsulanCard.style.display = (showCards && hasAnyUsulan) ? 'block' : 'none';
  if (showCards && hasAnyUsulan) {
    _buildCRUsulanTable(resDryUsulan, resWetUsulan, totalQi);
  }

  // ── BM Maks table ─────────────────────────────────────────────
  // Cmax = [BM*(Qs+totalQi) - Qs*Chulu] / totalQi
  // → nilai konsentrasi limbah max agar CR hilir = BM (titik batas)
  // → ambil nilai terkecil antara kemarau & hujan (kondisi paling kritis)
  const maxTbody=document.getElementById('ubm-max-tbody');
  if(maxTbody){
    maxTbody.innerHTML=resDry.map(({p,cr:crD,bm,cMax:cmD},i)=>{
      const {cr:crW,cMax:cmW}=resWet[i];
      // Gunakan C Hulu sesuai musim masing-masing
      const cHuluDryVal = pNum(p.cHuluDry ?? p.cHulu ?? '');
      const cHuluWetVal = pNum(p.cHuluWet ?? p.cHulu ?? '');

      // Cmax per musim (sudah dihitung di calcSeason dengan cMax<0 → null → set 0)
      // Tapi kita perlu nilai aslinya (termasuk negatif) untuk keterangan
      // Recalc tanpa clamp ke 0:
      const QsDry=getQsDry(), QsWet=getQsWet();
      const denomDry=QsDry+totalQi, denomWet=QsWet+totalQi;
      const cmDraw = bm!=null&&totalQi>0 ? (bm*denomDry - QsDry*cHuluDryVal)/totalQi : null;
      const cmWraw = bm!=null&&totalQi>0 ? (bm*denomWet - QsWet*cHuluWetVal)/totalQi : null;

      // Konservatif = min dari kedua musim (menggunakan nilai raw, bukan clamp)
      let cMaxFinal=null, cMaxFinalRaw=null;
      if(cmDraw!=null&&cmWraw!=null){
        cMaxFinalRaw=Math.min(cmDraw,cmWraw);
      } else {
        cMaxFinalRaw=cmDraw??cmWraw;
      }
      cMaxFinal=cMaxFinalRaw;
      if(cMaxFinal!=null) p._cMaxHint=Math.max(0,cMaxFinal);

      // Keterangan
      let ket='', ketColor='var(--mute)';
      if(p.isPH){
        ket='pH: BM adalah rentang 6–9 (bukan nilai tunggal)'; ketColor='var(--accent)';
      } else if(bm==null){
        ket='BM tidak tersedia'; ketColor='var(--mute)';
      } else if(totalQi<=0){
        ket='Tidak ada debit limbah'; ketColor='var(--mute)';
      } else if(cMaxFinal==null){
        ket='Data tidak lengkap'; ketColor='var(--mute)';
      } else if(cMaxFinal<0){
        ket='⚠ C hulu > BM — tidak ada ruang pencampuran'; ketColor='var(--red)';
      } else if(cMaxFinal===0){
        ket='Batas nol — limbah harus bebas parameter ini'; ketColor='var(--orange)';
      } else {
        ket='✓ Ada ruang pencampuran'; ketColor='var(--green)';
      }

      const fmtCmax=(v)=>{
        if(v==null) return '—';
        if(v<0) return `<span style="color:var(--red);font-weight:700">${fmtN(v,2)} ⚠</span>`;
        return `<span style="color:var(--accent);font-weight:700">${fmtN(v,4)}</span>`;
      };
      const rowBg=cMaxFinal!=null&&cMaxFinal<0?'background:rgba(239,68,68,0.04)':'';
      return `<tr style="${rowBg}">
        <td style="font-weight:700;font-size:12.5px">${esc(p.name||'—')}</td>
        <td class="td-c" style="color:var(--mute);font-size:11px">${esc(p.unit)}</td>
        <td class="td-r" style="color:var(--mute2)">${cHuluDryVal>0||cHuluWetVal>0?fmtN(cHuluDryVal,4)+(cHuluWetVal!==cHuluDryVal?' / '+fmtN(cHuluWetVal,4):''):'—'}</td>
        <td class="td-c" style="font-family:var(--mono);font-size:12px">${p.isPH ? '<span style=\"color:var(--accent)\">6–9</span>' : (bm!=null?fmtN(bm,4):'—')}</td>
        <td class="td-r" style="color:#f5a623">${crD!=null?fmtN(crD,4):'—'}</td>
        <td class="td-r" style="color:#4488ff">${crW!=null?fmtN(crW,4):'—'}</td>
        <td class="td-r">${fmtCmax(cmDraw)}</td>
        <td class="td-r">${fmtCmax(cmWraw)}</td>
        <td class="td-c">${cMaxFinal!=null&&cMaxFinal>=0?`<span style="font-family:var(--mono);font-size:13px;font-weight:700;color:var(--accent)">${fmtN(cMaxFinal,4)}</span>`:`<span style="color:var(--red);font-weight:700">Tidak tersedia</span>`}</td>
        <td style="font-size:11px;color:${ketColor};padding:6px 10px">${ket}</td>
      </tr>`;
    }).join('');
  }

  // ── BM Akhir + Alokasi ───────────────────────────────────────
  const finTbody=document.getElementById('ubm-final-tbody');
  if(finTbody){
    finTbody.innerHTML=ubmParams.map(p=>{
      const cMaxHint = p._cMaxHint;  // dari perhitungan BM Maks
      // Usulan BM: dari input form di Parameter Kualitas Air
      const usulanBMRaw = p.usulanBM ?? '';
      const usulanBMVal = usulanBMRaw !== '' ? pNum(usulanBMRaw) : null;
      // Alokasi dihitung dari Usulan BM (bukan BM kelas sungai)
      const alokasi  = usulanBMVal!=null&&totalQi>0 ? usulanBMVal*totalQi*86400/1000 : null;
      const cMaxStr  = cMaxHint!=null ? fmtN(cMaxHint,4) : '—';
      // Status: apakah Usulan BM ≤ Cmax (masih dalam batas)
      const overLimit = cMaxHint!=null && usulanBMVal!=null && usulanBMVal > cMaxHint;
      const ok        = cMaxHint!=null && usulanBMVal!=null && usulanBMVal <= cMaxHint;
      const noInput   = usulanBMVal == null;
      const rowBg     = overLimit ? 'background:rgba(239,68,68,0.05)' : '';
      // Tampilan nilai Usulan BM
      const usulanBMDisp = p.isPH
        ? `<span style="color:var(--accent);font-weight:700">6–9</span>`
        : noInput
          ? `<span style="color:var(--mute);font-size:10px;font-family:var(--mono)">— isi di tabel atas —</span>`
          : `<div style="font-family:var(--mono);font-size:13px;font-weight:700;color:${overLimit?'var(--red)':ok?'var(--amber)':'var(--mute2)'}">${fmtN(usulanBMVal,4)}</div>
             ${overLimit?`<div style="font-size:9px;color:var(--red)">⚠ Melebihi C<sub>maks</sub></div>`:''}
             ${ok?`<div style="font-size:9px;color:var(--green)">✓ Di bawah C<sub>maks</sub></div>`:''}`;
      return `<tr style="${rowBg}">
        <td style="font-weight:700;font-size:12.5px">${esc(p.name||'—')}</td>
        <td class="td-c" style="color:var(--mute);font-size:11px">${esc(p.unit)}</td>
        <td class="td-r" style="color:var(--mute)">${cMaxStr}</td>
        <td class="td-c">
          <div style="display:flex;flex-direction:column;align-items:center;gap:3px">
            ${usulanBMDisp}
          </div>
        </td>
        <td class="td-r" style="color:var(--amber);font-weight:700">${alokasi!=null?fmtN(alokasi,4):'—'}</td>
      </tr>`;
    }).join('');
  }
  // ── Build Rekap Table ─────────────────────────────────────────
  _buildRekapTable(resDry, resWet, totalQi);
}

// FIX 1: finalBM input hanya update nilai + kalkulasi, TIDAK re-render param list
function _ubmFinalBMInput(id, val){
  const p=ubmParams.find(x=>x.id===id);
  if(p){ p.finalBM=val; _ubmCalcAndShowResults(); ubmSave(); }
}

// ── Rekap Table Builder (Image 2 format) ─────────────────────────
function _buildRekapTable(resDry, resWet, totalQi){
  // Header cells: Parameter | Satuan | Hulu Sungai | Src1..N | CR Sungai | BM Air Sungai | Status Mutu | Usulan Max BM | Usulan Max BM | Alokasi (kg/hari)
  const TH = (txt, extra='') =>
    `<th style="padding:8px 10px;border:1px solid var(--brd);font-family:var(--mono);font-size:9px;font-weight:700;color:var(--txt);text-transform:uppercase;letter-spacing:0.6px;white-space:nowrap;text-align:center;${extra}">${txt}</th>`;
  const TD = (txt, extra='') =>
    `<td style="padding:7px 10px;border:1px solid var(--brd2);font-size:11.5px;${extra}">${txt}</td>`;
  const TDr = (txt, extra='') =>
    `<td style="padding:7px 10px;border:1px solid var(--brd2);font-size:11.5px;text-align:right;font-family:var(--mono);${extra}">${txt}</td>`;
  const TDc = (txt, extra='') =>
    `<td style="padding:7px 10px;border:1px solid var(--brd2);font-size:11.5px;text-align:center;${extra}">${txt}</td>`;

  const srcNames = ubmSources.map(s=>s.name||'Sumber');
  const riverName = document.getElementById('r-name')?.value || 'Sungai';

  // Build header row
  function buildHdr(seasonColor){
    return TH('Parameter', `background:${seasonColor}22`) +
      TH('Satuan', `background:${seasonColor}22`) +
      TH('Hulu Sungai', `background:${seasonColor}22`) +
      srcNames.map(n=>TH(n, `background:${seasonColor}22`)).join('') +
      TH(`CR Sungai ${riverName}`, `background:${seasonColor}22`) +
      TH('Baku Mutu Air Sungai<br>(PP No. 22 Tahun 2021)', `background:${seasonColor}22`) +
      TH('Status Mutu', `background:${seasonColor}22`) +
      TH('Usulan Max Baku Mutu Air Limbah', `background:${seasonColor}22;color:#3ecfb2`) +
      TH('Usulan BM', `background:${seasonColor}22;color:#f5a623`) +
      TH('Alokasi Beban Pencemaran (Kg/hari)', `background:${seasonColor}22;color:#f5a623`);
  }

  // Build body rows
  function buildBody(results, totalQi){
    return results.map(({p, cr, bm, status, cMax}, i)=>{
      // Usulan BM: dari input form
      const usulanBMRaw = p.usulanBM ?? '';
      const usulanBMVal = usulanBMRaw !== '' ? pNum(usulanBMRaw) : null;
      const alokasi  = usulanBMVal!=null&&totalQi>0 ? usulanBMVal*totalQi*86400/1000 : null;
      // Tampilan BM Sungai: "6–9" untuk pH, angka untuk lainnya
      const bmSungaiDisp = p.isPH ? '<span style="color:var(--accent);font-weight:700">6–9</span>'
                                  : (bm!=null ? fmtN(bm,4) : '—');
      const cMaxDisp = p.isPH ? '<span style="color:var(--mute);font-size:9.5px">Rentang 6–9</span>'
                               : (cMax!=null ? fmtN(cMax,4) : '—');
      const usulanBMDisp = p.isPH ? '<span style="color:var(--accent)">6–9</span>'
                                 : (usulanBMVal!=null ? fmtN(usulanBMVal,4) : '—');
      // Status badge
      const statusBadge = status==='ok'
        ? `<span style="color:#22c55e;font-weight:700;font-size:10px">✓ Memenuhi</span>`
        : status==='ng'
        ? `<span style="color:#ef4444;font-weight:700;font-size:10px">✗ Tidak</span>`
        : `<span style="color:var(--mute);font-size:10px">—</span>`;
      const rowBg = i%2===1 ? 'background:rgba(255,255,255,0.02)' : '';

      return `<tr style="${rowBg}">` +
        TD(`<span style="font-weight:700">${esc(p.name||'—')}</span>`) +
        TDc(esc(p.unit||'—'), 'color:var(--mute)') +
        TDr(p.cHuluDry!==undefined&&p.cHuluDry!==''
              ? fmtN(pNum(p.cHuluDry),4)+' / '+fmtN(pNum(p.cHuluWet??p.cHuluDry),4)
              : p.cHulu ? fmtN(pNum(p.cHulu),4) : '—') +
        ubmSources.map(s => TDr(p.cSrc[s.id] ? fmtN(pNum(p.cSrc[s.id]),4) : '—')).join('') +
        TDr(cr!=null ? fmtN(cr,4) : '—', 'color:var(--accent);font-weight:700') +
        TDc(bmSungaiDisp) +
        TDc(statusBadge) +
        TDr(cMaxDisp, 'color:var(--accent)') +
        TDr(usulanBMDisp, 'color:#f5a623;font-weight:700') +
        TDr(alokasi!=null ? fmtN(alokasi,2) : '—', 'color:#f5a623;font-weight:700') +
        `</tr>`;
    }).join('');
  }

  // WET
  const wetHdr = document.getElementById('ubm-rekap-wet-hdr');
  const wetTbody = document.getElementById('ubm-rekap-wet-tbody');
  const wetQs = document.getElementById('rekap-wet-qs');
  if(wetHdr) wetHdr.innerHTML = buildHdr('#4488ff');
  if(wetTbody) wetTbody.innerHTML = buildBody(resWet, totalQi);
  if(wetQs) wetQs.textContent = `Q Sungai = ${fmtN(getQsWet(),4)} m³/det  |  ΣQ Limbah = ${fmtN(totalQi,6)} m³/det`;

  // DRY
  const dryHdr = document.getElementById('ubm-rekap-dry-hdr');
  const dryTbody = document.getElementById('ubm-rekap-dry-tbody');
  const dryQs = document.getElementById('rekap-dry-qs');
  if(dryHdr) dryHdr.innerHTML = buildHdr('#f5a623');
  if(dryTbody) dryTbody.innerHTML = buildBody(resDry, totalQi);
  if(dryQs) dryQs.textContent = `Q Sungai = ${fmtN(getQsDry(),4)} m³/det  |  ΣQ Limbah = ${fmtN(totalQi,6)} m³/det`;

  // Tulis juga ke elemen Laporan (rpt-ubm-rekap-*)
  const rptWetHdr   = document.getElementById('rpt-ubm-rekap-wet-hdr');
  const rptWetTbody = document.getElementById('rpt-ubm-rekap-wet-tbody');
  const rptWetQs    = document.getElementById('rpt-rekap-wet-qs');
  if(rptWetHdr)   rptWetHdr.innerHTML   = buildHdr('#4488ff');
  if(rptWetTbody) rptWetTbody.innerHTML = buildBody(resWet, totalQi);
  if(rptWetQs)    rptWetQs.textContent  = `Q Sungai = ${fmtN(getQsWet(),4)} m³/det  |  ΣQ Limbah = ${fmtN(totalQi,6)} m³/det`;

  const rptDryHdr   = document.getElementById('rpt-ubm-rekap-dry-hdr');
  const rptDryTbody = document.getElementById('rpt-ubm-rekap-dry-tbody');
  const rptDryQs    = document.getElementById('rpt-rekap-dry-qs');
  if(rptDryHdr)   rptDryHdr.innerHTML   = buildHdr('#f5a623');
  if(rptDryTbody) rptDryTbody.innerHTML = buildBody(resDry, totalQi);
  if(rptDryQs)    rptDryQs.textContent  = `Q Sungai = ${fmtN(getQsDry(),4)} m³/det  |  ΣQ Limbah = ${fmtN(totalQi,6)} m³/det`;

  // Tampilkan section rekap di Laporan jika ada data UBM
  const rptUbmRekap = document.getElementById('rpt-ubm-rekap');
  if(rptUbmRekap) rptUbmRekap.style.display = (ubmParams.length>0&&totalQi>0) ? 'block' : 'none';
}

// ── CR Hilir Sungai Hasil Usulan BM Table Builder ─────────────
function _buildCRUsulanTable(resDryUsulan, resWetUsulan, totalQi) {
  const TH = (v, extra='') => `<th style="padding:8px 10px;font-family:var(--mono);font-size:9.5px;font-weight:700;color:var(--mute);border-bottom:1px solid var(--brd);white-space:nowrap;${extra}">${v}</th>`;
  const TD = (v, extra='') => `<td style="padding:7px 10px;font-family:var(--mono);font-size:11px;${extra}">${v}</td>`;

  function buildSection(seasonKey, resArr, colorHex) {
    const thead = document.getElementById(`ubm-cr-usulan-thead-${seasonKey}`);
    const tbody  = document.getElementById(`ubm-cr-usulan-tbody-${seasonKey}`);
    if (!thead || !tbody) return;

    // Satu kolom per sumber — sama seperti tabel CR HILIR biasa
    const srcHeaders = ubmSources.map(s =>
      TH(`${esc(s.name||`Sumber ${s.id}`)}<br><span style="font-weight:400;font-size:8.5px;color:var(--amber)">(mg/L) = Usulan BM</span>`, 'text-align:right;color:var(--amber)')
    ).join('');

    thead.innerHTML = `<tr style="background:rgba(0,0,0,0.04)">
      ${TH('Parameter', 'text-align:left')}
      ${TH('Satuan', 'text-align:center')}
      ${TH('C Hulu<br>(mg/L)', 'text-align:right')}
      ${srcHeaders}
      ${TH('CR Hilir<br>(mg/L)', `text-align:right;color:${colorHex}`)}
      ${TH('BM Air Sungai<br>(Sesuai Kelas)', 'text-align:right;color:var(--accent)')}
      ${TH('Alokasi Beban Pencemar<br>Berdasarkan Usulan BM<br>(kg/hari)', 'text-align:right;color:var(--amber)')}
      ${TH('Keterangan', 'text-align:center')}
    </tr>`;

    tbody.innerHTML = resArr.map(({p, cr, bm, status, cHulu, usulanBMVal}) => {
      const crColor = status==='ok' ? 'var(--green)' : status==='ng' ? 'var(--red)' : 'var(--txt2)';
      const ketBadge = status==='ok'
        ? `<span style="color:var(--green);font-weight:700;font-family:var(--mono);font-size:9.5px">Memenuhi</span>`
        : status==='ng'
        ? `<span style="color:var(--red);font-weight:700;font-family:var(--mono);font-size:9.5px">Melebihi</span>`
        : `<span style="color:var(--mute);font-family:var(--mono);font-size:9.5px">—</span>`;
      const rowBg = status==='ng' ? 'rgba(255,60,60,0.04)' : status==='ok' ? 'rgba(0,232,122,0.03)' : '';

      // Satu kolom per sumber, semua menampilkan nilai Usulan BM (bukan C aktual)
      const srcCols = ubmSources.map(() =>
        TD(
          usulanBMVal != null
            ? `<span style="color:var(--amber);font-weight:600">${fmtN(usulanBMVal,4)}</span>`
            : '<span style="color:var(--mute);font-size:9.5px">— (belum diisi)</span>',
          'text-align:right'
        )
      ).join('');

      // Alokasi Beban Pencemar = Usulan BM × ΣQi × 86400 / 1000 (kg/hari)
      const alokasi = (!p.isPH && usulanBMVal != null && totalQi > 0)
        ? usulanBMVal * totalQi * 86400 / 1000
        : null;
      const alokasiDisp = p.isPH
        ? '<span style="color:var(--mute);font-size:9.5px">—</span>'
        : alokasi != null
          ? `<span style="color:var(--amber);font-weight:700">${fmtN(alokasi, 4)}</span>`
          : '<span style="color:var(--mute);font-size:9.5px">—</span>';

      return `<tr style="background:${rowBg};border-bottom:1px solid var(--brd2)">
        ${TD(`<strong>${esc(p.name||'—')}</strong>`, 'text-align:left;font-size:12px')}
        ${TD(esc(p.unit), 'text-align:center;color:var(--mute)')}
        ${TD(cHulu!=null&&cHulu>0 ? fmtN(cHulu,4) : '—', 'text-align:right;color:var(--txt2)')}
        ${srcCols}
        ${TD(cr!=null ? fmtN(cr,4) : '—', `text-align:right;color:${crColor};font-weight:700;font-size:12px`)}
        ${TD(p.isPH ? '<span style="color:var(--accent);font-weight:600">6–9</span>' : (bm!=null?fmtN(bm,4):'—'), 'text-align:right;color:var(--accent);font-weight:600')}
        ${TD(alokasiDisp, 'text-align:right')}
        ${TD(ketBadge, 'text-align:center')}
      </tr>`;
    }).join('');
  }

  buildSection('dry', resDryUsulan, '#f5a623');
  buildSection('wet', resWetUsulan, '#4488ff');

  // Update Q labels
  const lblD = document.getElementById('ubm-cr-usulan-qs-dry');
  const lblW = document.getElementById('ubm-cr-usulan-qs-wet');
  if(lblD) lblD.textContent = getQsDry()>0 ? fmtN(getQsDry(),4) : '(belum diisi)';
  if(lblW) lblW.textContent = getQsWet()>0 ? fmtN(getQsWet(),4) : '(belum diisi)';
}

// ═══════════════════════════════════════════════════════════════
// EXPORT EXCEL  — v9 Rich Color Edition
// ═══════════════════════════════════════════════════════════════
async function exportExcel(){
  if(typeof XLSX==='undefined'){
    toast('⚠ Library XLSX belum siap, coba lagi sebentar','err'); return;
  }
  if(!params.length&&!ubmParams.length){
    toast('⚠ Belum ada data untuk diekspor','err'); return;
  }

  const WB  = XLSX.utils.book_new();
  const rn  = document.getElementById('r-name')?.value?.trim() || 'Sungai';
  const rc  = document.getElementById('r-class')?.value;
  const clsRom  = rc ? ['I','II','III','IV'][rc-1] : '—';
  const qDry = pNum(document.getElementById('q-dry')?.value);
  const qWet = pNum(document.getElementById('q-wet')?.value);
  const dateStr = new Date().toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'});

  // ═══════════════════════════════════════════════════════
  // PALETTE  — rich, eye-friendly
  // ═══════════════════════════════════════════════════════
  const C = {
    // Primary teal / brand
    teal1:  '003D35', teal2:  '00574D', teal3:  '007A6A',
    tealBg: 'D6F5F0', tealBg2:'EBF9F7',
    // Kemarau / amber / warm
    amb1:   '7A3B00', amb2:   'B85A00', amb3:   'E07B00',
    ambBg:  'FFF3E0', ambBg2: 'FFFAF0',
    // Hujan / blue / cool
    blu1:   '0A2E6A', blu2:   '1450A3', blu3:   '2176D4',
    bluBg:  'E8F0FE', bluBg2: 'F3F7FF',
    // Status
    grnDk:  '1A4D2E', grnMd:  '2E7D52', grnBg:  'E6F5EC', grnBg2: 'F2FAF5',
    redDk:  '7A1515', redMd:  'C0392B', redBg:  'FDECEA', redBg2: 'FFF5F5',
    // Rasio / gold / warning
    gldDk:  '704900', gldMd:  'B8860B', gldBg:  'FFFAEB', gldBg2: 'FFF7D6',
    // Neutral
    ink:    '1E2A3A', ink2:   '374151', muted:  '6B7280',
    divider:'CBD5E1', slateL: 'F1F5F9', slateLL:'F8FAFC',
    white:  'FFFFFF',
    // Banner accent
    banner: '00292A',
  };

  // ═══════════════════════════════════════════════════════
  // STYLE HELPERS
  // ═══════════════════════════════════════════════════════
  const font  = (bold,sz,color,name='Calibri')=>({name,bold:!!bold,sz:sz||11,color:{rgb:color||C.ink}});
  const fill  = hex=>({type:'pattern',pattern:'solid',fgColor:{rgb:hex}});
  const align = (h='left',v='center',wrap=false)=>({horizontal:h,vertical:v,wrapText:wrap});
  const bdr   = (c='CBD5E1',style='thin')=>{ const s={style,color:{rgb:c}}; return {top:s,bottom:s,left:s,right:s}; };
  const bdrT  = (c,style='medium')=>bdr(c||C.teal2,style);
  const bdrThick=(c)=>bdr(c||C.teal1,'thick');

  // ─── Style presets ──────────────────────────────────────
  const S={
    // Banner row (very top, rich dark)
    banner:  {font:font(true,17,C.white),fill:fill(C.banner),alignment:align('center','center',true),border:bdrThick(C.teal3)},
    bannerA: {font:font(true,17,C.white),fill:fill(C.amb2),  alignment:align('center','center',true),border:bdrThick(C.amb3)},
    bannerB: {font:font(true,17,C.white),fill:fill(C.blu1),  alignment:align('center','center',true),border:bdrThick(C.blu3)},
    bannerG: {font:font(true,17,C.white),fill:fill('1A4D2E'),alignment:align('center','center',true),border:bdrThick(C.grnMd)},
    bannerR: {font:font(true,17,C.white),fill:fill(C.redDk), alignment:align('center','center',true),border:bdrThick(C.redMd)},
    // Meta row (subtitle)
    meta:    {font:font(false,9,C.muted), fill:fill(C.slateL), alignment:align('center','center',false),border:bdr()},
    metaA:   {font:font(false,9,C.amb1),  fill:fill(C.ambBg2), alignment:align('center','center',false),border:bdr(C.amb3)},
    metaB:   {font:font(false,9,C.blu1),  fill:fill(C.bluBg2), alignment:align('center','center',false),border:bdr(C.blu3)},
    // Section header
    secT:    {font:font(true,10,C.white),fill:fill(C.teal2),  alignment:align('center','center',false),border:bdr(C.teal1)},
    secA:    {font:font(true,10,C.white),fill:fill(C.amb2),   alignment:align('center','center',false),border:bdr(C.amb1)},
    secB:    {font:font(true,10,C.white),fill:fill(C.blu2),   alignment:align('center','center',false),border:bdr(C.blu1)},
    secG:    {font:font(true,10,C.white),fill:fill(C.grnMd),  alignment:align('center','center',false),border:bdr(C.grnDk)},
    secR:    {font:font(true,10,C.white),fill:fill(C.redMd),  alignment:align('center','center',false),border:bdr(C.redDk)},
    // Column header
    hdr:     {font:font(true,10,C.white),fill:fill(C.teal2),  alignment:align('center','center',true), border:bdrT()},
    hdrA:    {font:font(true,10,C.white),fill:fill(C.amb3),   alignment:align('center','center',true), border:bdrT(C.amb1)},
    hdrB:    {font:font(true,10,C.white),fill:fill(C.blu2),   alignment:align('center','center',true), border:bdrT(C.blu1)},
    hdrG:    {font:font(true,10,C.white),fill:fill(C.grnMd),  alignment:align('center','center',true), border:bdrT(C.grnDk)},
    hdrGold: {font:font(true,10,C.gldDk),fill:fill(C.gldBg), alignment:align('center','center',true), border:bdrT(C.gldDk)},
    // Data rows — alternating white / pale slate
    dat:     {font:font(false,10,C.ink),  fill:fill(C.white),   alignment:align('left','center',true), border:bdr()},
    datC:    {font:font(false,10,C.ink),  fill:fill(C.white),   alignment:align('center','center',false),border:bdr()},
    datR:    {font:font(false,10,C.ink),  fill:fill(C.white),   alignment:align('right','center',false),border:bdr()},
    datAlt:  {font:font(false,10,C.ink),  fill:fill(C.slateLL), alignment:align('left','center',true), border:bdr()},
    datAltC: {font:font(false,10,C.ink),  fill:fill(C.slateLL), alignment:align('center','center',false),border:bdr()},
    datAltR: {font:font(false,10,C.ink),  fill:fill(C.slateLL), alignment:align('right','center',false),border:bdr()},
    // Key value cells
    lbl:     {font:font(true,10,C.teal2), fill:fill(C.tealBg2), alignment:align('left','center',false), border:bdr(C.teal3)},
    val:     {font:font(false,11,C.ink),  fill:fill(C.white),   alignment:align('left','center',false), border:bdr()},
    valBig:  {font:font(true,14,C.teal2), fill:fill(C.tealBg),  alignment:align('center','center',false),border:bdrT()},
    valA:    {font:font(true,14,C.amb2),  fill:fill(C.ambBg),   alignment:align('center','center',false),border:bdrT(C.amb2)},
    valB:    {font:font(true,14,C.blu2),  fill:fill(C.bluBg),   alignment:align('center','center',false),border:bdrT(C.blu2)},
    valGrn:  {font:font(true,14,C.grnMd), fill:fill(C.grnBg),  alignment:align('center','center',false),border:bdrT(C.grnMd)},
    valRed:  {font:font(true,14,C.redMd), fill:fill(C.redBg),   alignment:align('center','center',false),border:bdrT(C.redMd)},
    // Status
    ok:      {font:font(true,10,C.grnDk), fill:fill(C.grnBg),   alignment:align('center','center',false),border:bdr(C.grnMd)},
    ng:      {font:font(true,10,C.redDk), fill:fill(C.redBg),   alignment:align('center','center',false),border:bdr(C.redMd)},
    na:      {font:font(false,10,C.muted),fill:fill(C.slateL),   alignment:align('center','center',false),border:bdr()},
    // BPA highlight
    bpaOk:   {font:font(true,10,C.grnMd), fill:fill(C.grnBg2),  alignment:align('right','center',false), border:bdr(C.grnMd)},
    bpaNg:   {font:font(true,10,C.redDk), fill:fill(C.redBg),   alignment:align('right','center',false), border:bdr(C.redMd)},
    // Ratio
    ratioOk: {font:font(false,10,C.grnDk),fill:fill(C.grnBg2),  alignment:align('right','center',false), border:bdr(C.grnMd)},
    ratioWrn:{font:font(true,10,C.gldDk), fill:fill(C.gldBg),   alignment:align('right','center',false), border:bdr(C.gldMd)},
    ratioNg: {font:font(true,10,C.redDk), fill:fill(C.redBg),   alignment:align('right','center',false), border:bdr(C.redMd)},
    // Totals footer
    totT:    {font:font(true,10,C.teal1), fill:fill(C.tealBg),   alignment:align('center','center',false),border:bdrT()},
    totA:    {font:font(true,10,C.amb1),  fill:fill(C.ambBg),    alignment:align('center','center',false),border:bdrT(C.amb2)},
    totB:    {font:font(true,10,C.blu1),  fill:fill(C.bluBg),    alignment:align('center','center',false),border:bdrT(C.blu2)},
    // CR / UBM
    cr:      {font:font(true,11,C.teal2), fill:fill(C.tealBg2),  alignment:align('right','center',false), border:bdrT()},
    crNg:    {font:font(true,11,C.redDk), fill:fill(C.redBg),    alignment:align('right','center',false), border:bdrT(C.redMd)},
    cmax:    {font:font(false,10,C.amb1), fill:fill(C.ambBg2),   alignment:align('right','center',false), border:bdr(C.amb3)},
    cmaxNeg: {font:font(true,10,C.redDk), fill:fill(C.redBg),    alignment:align('right','center',false), border:bdr(C.redMd)},
    alok:    {font:font(true,11,C.gldDk), fill:fill(C.gldBg),    alignment:align('right','center',false), border:bdrT(C.gldMd)},
    bmFin:   {font:font(true,11,C.teal1), fill:fill(C.tealBg),   alignment:align('right','center',false), border:bdrT()},
  };

  // ═══════════════════════════════════════════════════════
  // CELL & SHEET HELPERS
  // ═══════════════════════════════════════════════════════
  const mkCell = (v,style)=>({v:(v==null||v==='—'?null:v), t:typeof v==='number'?'n':'s', s:style});
  const nCell  = (v,style)=>({v:(v==null?null:typeof v==='string'?parseFloat(v.replace(',','.'))||null:v), t:'n', s:style||S.datR});
  const blank  = (style)=>({v:null,t:'s',s:style||S.dat});
  const fmtV   = (v,d=4)=>v!=null&&!isNaN(v)?parseFloat(v.toFixed(d)):null;
  const fmtS   = (v,d=4)=>v!=null&&!isNaN(v)?parseFloat(v.toFixed(d)).toLocaleString('id-ID',{minimumFractionDigits:d,maximumFractionDigits:d}):'—';

  function addSheet(wb, name, aoa, colWidths, merges, rowHeights){
    const ws = XLSX.utils.aoa_to_sheet([]);
    aoa.forEach((row,r)=>(row||[]).forEach((cell,c)=>{
      const addr=XLSX.utils.encode_cell({r,c});
      if(cell&&typeof cell==='object'&&'v' in cell){ ws[addr]=cell; }
      else { ws[addr]={v:cell==null?'':cell, t:typeof cell==='number'?'n':'s'}; }
    }));
    const maxC=Math.max(...aoa.map(r=>(r||[]).length))-1;
    ws['!ref']=XLSX.utils.encode_range({s:{r:0,c:0},e:{r:aoa.length-1,c:maxC}});
    ws['!cols']=colWidths.map(w=>({wch:w}));
    if(merges) ws['!merges']=merges;
    ws['!rows']=aoa.map((_,i)=>({hpt:(rowHeights&&rowHeights[i])||20}));
    XLSX.utils.book_append_sheet(wb,ws,name);
    return ws;
  }

  // Row-height helper: banner=40, meta=16, section=22, hdr=24, data=20, total=24, gap=10
  const RH = { banner:40, meta:16, formula:14, sec:22, hdr:24, data:20, tot:24, gap:10, kpi:36 };

  // ═══════════════════════════════════════════════════════
  // SHEET 1 — RINGKASAN EKSEKUTIF  (rich dashboard layout)
  // ═══════════════════════════════════════════════════════
  {
    const okD=params.filter(p=>p.statusDry==='ok').length;
    const ngD=params.filter(p=>p.statusDry==='ng').length;
    const okW=params.filter(p=>p.statusWet==='ok').length;
    const ngW=params.filter(p=>p.statusWet==='ng').length;
    const totalP=params.length;
    const ubmTotalQi=ubmSources.reduce((s,x)=>s+pNum(x.qDay)/86400,0);
    const pctD=totalP?Math.round(okD/totalP*100):0;
    const pctW=totalP?Math.round(okW/totalP*100):0;

    const NC=8; // number of columns
    // Helper: fill blank cells to complete row
    const row=(...cells)=>{
      while(cells.length<NC) cells.push(blank(S.dat));
      return cells;
    };

    const aoa=[
      // Row 0: main banner
      [mkCell('RIVERLOAD  ·  LAPORAN ANALISIS BEBAN PENCEMARAN SUNGAI',{...S.banner,font:font(true,18,C.white)}),...Array(NC-1).fill(null)],
      // Row 1: subtitle
      [mkCell(`PP No. 22 Tahun 2021 – Lampiran VI   ·   ${rn}   ·   Kelas ${clsRom}   ·   ${dateStr}`,S.meta),...Array(NC-1).fill(null)],
      // Row 2: gap
      Array(NC).fill(blank({...S.dat,fill:fill(C.slateL)})),
      // Row 3: info header | kpi header
      [mkCell('  INFORMASI SUNGAI',{...S.secT,alignment:align('left')}),null,null,null,
       mkCell('  RINGKASAN KEPATUHAN PARAMETER',{...S.secA,alignment:align('left')}),null,null,null],
      // Row 4: Nama | kpi kemarau ok
      [mkCell('Nama Sungai',S.lbl),mkCell(rn||'—',{...S.val,font:font(true,11,C.teal2)}),null,null,
       mkCell('✓ Memenuhi — Kemarau',S.lbl),mkCell(okD,{...S.valGrn,font:font(true,22,C.grnMd)}),null,null],
      // Row 5: Kelas | kpi kemarau ng
      [mkCell('Kelas Sungai',S.lbl),mkCell('Kelas '+clsRom,S.val),null,null,
       mkCell('✗ Melebihi — Kemarau',S.lbl),mkCell(ngD,{...S.valRed,font:font(true,22,C.redMd)}),null,null],
      // Row 6: Q Kemarau | kpi hujan ok
      [mkCell('Q Kemarau (m³/det)',S.lbl),mkCell(fmtV(qDry,4)||'—',{...S.val,font:font(true,11,C.amb3)}),null,null,
       mkCell('✓ Memenuhi — Hujan',S.lbl),mkCell(okW,{...S.valGrn,font:font(true,22,C.grnMd)}),null,null],
      // Row 7: Q Hujan | kpi hujan ng
      [mkCell('Q Hujan (m³/det)',S.lbl),mkCell(fmtV(qWet,4)||'—',{...S.val,font:font(true,11,C.blu3)}),null,null,
       mkCell('✗ Melebihi — Hujan',S.lbl),mkCell(ngW,{...S.valRed,font:font(true,22,C.redMd)}),null,null],
      // Row 8: Peruntukan | kepatuhan %
      [mkCell('Peruntukan Sungai',S.lbl),mkCell(rc?CLASS_DESC[rc]:'—',{...S.val,font:font(false,9,C.muted)}),null,null,
       mkCell('Total Parameter',S.lbl),mkCell(totalP,{...S.valBig,font:font(true,22,C.teal2)}),null,null],
      // Row 9: gap
      Array(NC).fill(blank({...S.dat,fill:fill(C.slateL)})),
      // Row 10: compliance bar header
      [mkCell('  TINGKAT KEPATUHAN',{...S.secT,alignment:align('left')}),null,null,null,null,null,null,null],
      // Row 11: compliance kemarau
      [mkCell('Kemarau ☀',{...S.lbl,font:font(true,11,C.amb1)}),
       mkCell(pctD+'%',{...S.valA,font:font(true,18,C.amb2)}),
       mkCell(okD+' / '+totalP+' parameter memenuhi BPM',{...S.dat,font:font(false,10,C.muted)}),null,null,null,null,null],
      // Row 12: compliance hujan
      [mkCell('Hujan 🌧',{...S.lbl,font:font(true,11,C.blu1)}),
       mkCell(pctW+'%',{...S.valB,font:font(true,18,C.blu2)}),
       mkCell(okW+' / '+totalP+' parameter memenuhi BPM',{...S.dat,font:font(false,10,C.muted)}),null,null,null,null,null],
      // Row 13: gap
      Array(NC).fill(blank({...S.dat,fill:fill(C.slateL)})),
    ];
    const rh=[RH.banner,RH.meta,RH.gap,RH.sec,RH.kpi,RH.kpi,RH.kpi,RH.kpi,RH.kpi,RH.gap,RH.sec,RH.kpi,RH.kpi,RH.gap];

    // Parameter melebihi
    const ngParamsDry=params.filter(p=>p.statusDry==='ng');
    const ngParamsWet=params.filter(p=>p.statusWet==='ng');
    aoa.push([mkCell('  PARAMETER YANG MELEBIHI BPM',{...S.secR,alignment:align('left')}),...Array(NC-1).fill(null)]);
    rh.push(RH.sec);
    if(!ngParamsDry.length&&!ngParamsWet.length){
      aoa.push([mkCell('  ✓ Semua parameter memenuhi BPM di kedua musim',{...S.ok,alignment:align('left'),font:font(true,11,C.grnDk)}),...Array(NC-1).fill(null)]);
      rh.push(RH.data);
    } else {
      const colsNG=['Parameter','Satuan','BPM Kemarau (kg/jam)','BPA Kemarau (kg/jam)','Status ☀','BPM Hujan (kg/jam)','BPA Hujan (kg/jam)','Status 🌧'];
      aoa.push([mkCell(colsNG[0],S.hdr),mkCell(colsNG[1],S.hdr),mkCell(colsNG[2],S.hdrA),mkCell(colsNG[3],S.hdrA),mkCell(colsNG[4],S.hdrA),mkCell(colsNG[5],S.hdrB),mkCell(colsNG[6],S.hdrB),mkCell(colsNG[7],S.hdrB)]);
      rh.push(RH.hdr);
      const allNg=[...new Map([...ngParamsDry,...ngParamsWet].map(p=>[p.id,p])).values()];
      allNg.forEach((p,i)=>{
        const alt=i%2, stD=p.statusDry, stW=p.statusWet;
        const lD=stD==='ok'?'✓ Memenuhi':stD==='ng'?'✗ Melebihi':'—';
        const lW=stW==='ok'?'✓ Memenuhi':stW==='ng'?'✗ Melebihi':'—';
        aoa.push([
          mkCell(p.name, alt?S.datAlt:S.dat),
          mkCell(p.unit, alt?S.datAltC:S.datC),
          nCell(fmtV(p.bpmDry,4), stD==='ng'?{...S.datAltR,fill:fill(C.ambBg)}:(alt?S.datAltR:S.datR)),
          nCell(fmtV(p.bpaDry,4), stD==='ng'?S.bpaNg:(alt?S.datAltR:S.datR)),
          mkCell(lD, stD==='ng'?S.ng:stD==='ok'?S.ok:S.na),
          nCell(fmtV(p.bpmWet,4), stW==='ng'?{...S.datAltR,fill:fill(C.bluBg)}:(alt?S.datAltR:S.datR)),
          nCell(fmtV(p.bpaWet,4), stW==='ng'?S.bpaNg:(alt?S.datAltR:S.datR)),
          mkCell(lW, stW==='ng'?S.ng:stW==='ok'?S.ok:S.na),
        ]);
        rh.push(RH.data);
      });
    }

    // UBM summary
    if(ubmParams.length&&ubmTotalQi>0){
      aoa.push(Array(NC).fill(blank({...S.dat,fill:fill(C.slateL)})));
      rh.push(RH.gap);
      aoa.push([mkCell('  RINGKASAN USULAN BAKU MUTU (UBM)',{...S.secG,alignment:align('left')}),...Array(NC-1).fill(null)]);
      rh.push(RH.sec);
      aoa.push(['Sumber','Total Debit (m³/hari)','Total Debit (m³/det)','Parameter','Kelas UBM','Tanggal','',''].map((c,i)=>mkCell(c,i<6?S.hdrG:S.dat)));
      rh.push(RH.hdr);
      const ubmCls=document.getElementById('ubm-class')?.value||rc;
      const ubmClsRom=ubmCls?['I','II','III','IV'][ubmCls-1]:clsRom;
      const totalQiDay=ubmSources.reduce((s,x)=>s+pNum(x.qDay),0);
      aoa.push([nCell(ubmSources.length,S.datC),nCell(fmtV(totalQiDay,2),S.datR),nCell(fmtV(ubmTotalQi,6),S.datR),nCell(ubmParams.length,S.datC),mkCell('Kelas '+ubmClsRom,S.datC),mkCell(dateStr,S.datC),blank(S.dat),blank(S.dat)]);
      rh.push(RH.data);
    }

    const merges=[
      {s:{r:0,c:0},e:{r:0,c:NC-1}},{s:{r:1,c:0},e:{r:1,c:NC-1}},
      {s:{r:2,c:0},e:{r:2,c:NC-1}},
      {s:{r:3,c:0},e:{r:3,c:3}},{s:{r:3,c:4},e:{r:3,c:NC-1}},
      {s:{r:4,c:0},e:{r:4,c:0}},{s:{r:4,c:1},e:{r:4,c:3}},{s:{r:4,c:4},e:{r:4,c:4}},{s:{r:4,c:5},e:{r:4,c:NC-1}},
      {s:{r:5,c:1},e:{r:5,c:3}},{s:{r:5,c:5},e:{r:5,c:NC-1}},
      {s:{r:6,c:1},e:{r:6,c:3}},{s:{r:6,c:5},e:{r:6,c:NC-1}},
      {s:{r:7,c:1},e:{r:7,c:3}},{s:{r:7,c:5},e:{r:7,c:NC-1}},
      {s:{r:8,c:1},e:{r:8,c:3}},{s:{r:8,c:5},e:{r:8,c:NC-1}},
      {s:{r:9,c:0},e:{r:9,c:NC-1}},
      {s:{r:10,c:0},e:{r:10,c:NC-1}},
      {s:{r:11,c:2},e:{r:11,c:NC-1}},
      {s:{r:12,c:2},e:{r:12,c:NC-1}},
      {s:{r:13,c:0},e:{r:13,c:NC-1}},
    ];
    addSheet(WB,'📋 Ringkasan',aoa,[32,16,16,16,32,14,14,14],merges,rh);
  }

  // ═══════════════════════════════════════════════════════
  // SHEET 2 & 3 — BPM & BPA per Musim
  // ═══════════════════════════════════════════════════════
  function bpmSheet(seasonKey, seasonLabel, Q, sheetName){
    if(!Q||!params.length) return;
    const isDry=seasonKey==='dry';
    const bpmK=isDry?'bpmDry':'bpmWet';
    const bpaK=isDry?'bpaDry':'bpaWet';
    const stK =isDry?'statusDry':'statusWet';
    const cK  =isDry?'cDry':'cWet';
    const HDR  =isDry?S.hdrA:S.hdrB;
    const BNR  =isDry?S.bannerA:S.bannerB;
    const META =isDry?S.metaA:S.metaB;
    const TOT  =isDry?S.totA:S.totB;

    const okP=params.filter(p=>p[stK]==='ok').length;
    const ngP=params.filter(p=>p[stK]==='ng').length;
    const totalBPM=params.reduce((s,p)=>s+(p[bpmK]||0),0);
    const totalBPA=params.reduce((s,p)=>s+(p[bpaK]||0),0);
    const NC=9;

    const aoa=[
      [mkCell(`BEBAN PENCEMARAN MAKSIMUM & AKTUAL  ·  ${seasonLabel.toUpperCase()}`,BNR),...Array(NC-1).fill(null)],
      [mkCell(`${rn}   ·   Kelas ${clsRom}   ·   Q = ${fmtS(Q,4)} m³/det   ·   ${okP} Memenuhi  /  ${ngP} Melebihi   ·   ${dateStr}`,META),...Array(NC-1).fill(null)],
      Array(NC).fill(blank({...S.dat,fill:fill(C.slateL)})),
      ['No','Parameter','Satuan','Baku Mutu (BM)','BPM (kg/jam)','C Aktual (mg/L)','BPA (kg/jam)','Status','Rasio BPA/BPM'].map(c=>mkCell(c,HDR)),
    ];
    const rh=[RH.banner,RH.meta,RH.gap,RH.hdr];

    params.forEach((p,i)=>{
      const bpm=p[bpmK],bpa=p[bpaK],st=p[stK],c=p[cK];
      const alt=i%2;
      const base=alt?S.datAlt:S.dat, baseR=alt?S.datAltR:S.datR, baseC=alt?S.datAltC:S.datC;
      const stCell=st==='ok'?S.ok:st==='ng'?S.ng:S.na;
      const stLabel=st==='ok'?'✓ Memenuhi':st==='ng'?'✗ Melebihi':'—';
      const bpmSt={...baseR,font:font(true,10,isDry?C.amb2:C.blu2),fill:fill(isDry?C.ambBg2:C.bluBg2)};
      const bpaSt=st==='ng'?S.bpaNg:{...S.bpaOk,fill:fill(alt?C.grnBg2:C.grnBg2)};
      const ratio=bpm&&bpm>0&&bpa!=null?fmtV(bpa/bpm,3):null;
      const ratioSt=ratio==null?baseR:ratio>1?S.ratioNg:ratio>0.8?S.ratioWrn:S.ratioOk;
      aoa.push([
        mkCell(i+1,baseC),
        mkCell(p.name||'—',base),
        mkCell(p.unit||'—',baseC),
        mkCell(valStr(p.bm),{...baseC,font:font(true,10,C.teal2)}),
        nCell(fmtV(bpm,4),bpmSt),
        nCell(fmtV(pNum(c),4),baseR),
        nCell(fmtV(bpa,4),bpaSt),
        mkCell(stLabel,stCell),
        nCell(ratio,ratioSt),
      ]);
      rh.push(RH.data);
    });

    // Footer
    aoa.push([
      blank(TOT),mkCell('TOTAL / RERATA',{...TOT,alignment:align('center')}),blank(TOT),blank(TOT),
      nCell(fmtV(totalBPM,4),{...TOT,font:font(true,12,isDry?C.amb1:C.blu1)}),
      blank(TOT),
      nCell(fmtV(totalBPA,4),{...TOT,font:font(true,12,totalBPA>totalBPM?C.redDk:C.grnDk)}),
      mkCell(okP+' Memenuhi  /  '+ngP+' Melebihi',{...TOT,alignment:align('center')}),
      blank(TOT),
    ]);
    rh.push(RH.tot);

    const merges=[
      {s:{r:0,c:0},e:{r:0,c:NC-1}},{s:{r:1,c:0},e:{r:1,c:NC-1}},
      {s:{r:2,c:0},e:{r:2,c:NC-1}},
    ];
    addSheet(WB,sheetName,aoa,[5,30,9,13,14,14,14,14,13],merges,rh);
  }

  if(params.length){
    bpmSheet('dry','Musim Kemarau ☀',qDry,'☀ BPM-BPA Kemarau');
    bpmSheet('wet','Musim Hujan 🌧', qWet,'🌧 BPM-BPA Hujan');
  }

  // ═══════════════════════════════════════════════════════
  // SHEET 4 & 5 — CR HILIR & USULAN BM  (per musim)
  // ═══════════════════════════════════════════════════════
  {
    const ubmTotalQi=ubmSources.reduce((s,x)=>s+pNum(x.qDay)/86400,0);
    const ubmCls=document.getElementById('ubm-class')?.value||rc;
    const ubmClsRom=ubmCls?['I','II','III','IV'][ubmCls-1]:clsRom;
    const ubmRiverName=document.getElementById('ubm-river')?.value?.trim()||rn;

    if(ubmParams.length&&ubmTotalQi>0){
      const QsDry=getQsDry(), QsWet=getQsWet();

      function calcUBMSeason(Qs, seasonKey){
        const denom=Qs+ubmTotalQi;
        return ubmParams.map(p=>{
          const cHuluRaw=seasonKey==='dry'?(p.cHuluDry??p.cHulu??''):(p.cHuluWet??p.cHulu??'');
          const cHulu=pNum(cHuluRaw);
          let sumQiCi=0;
          ubmSources.forEach(s=>{ sumQiCi+=(pNum(s.qDay)/86400)*pNum(p.cSrc[s.id]); });
          const cr=denom>0?(Qs*cHulu+sumQiCi)/denom:null;
          const bm=p.bmVal;
          const status=cr!=null&&bm!=null?(cr<=bm?'ok':'ng'):null;
          const cmRaw=bm!=null&&ubmTotalQi>0?(bm*denom-Qs*cHulu)/ubmTotalQi:null;
          const cMax=cmRaw!=null?Math.max(0,cmRaw):null;
          // Usulan BM dari input pengguna
          const usulanBMRaw=p.usulanBM??'';
          const usulanBMVal=usulanBMRaw!==''?pNum(usulanBMRaw):null;
          const alokasi=usulanBMVal!=null&&ubmTotalQi>0?usulanBMVal*ubmTotalQi*86400/1000:null;
          return {p,cr,bm,status,cmRaw,cMax,usulanBMVal,alokasi,cHulu};
        });
      }

      const resDry=calcUBMSeason(QsDry,'dry');
      const resWet=calcUBMSeason(QsWet,'wet');

      function buildUBMSeasonSheet(seasonRes, seasonKey, seasonLabel){
        const isWet=seasonKey==='wet';
        const Qs=isWet?QsWet:QsDry;
        if(!Qs) return;
        const BNR  =isWet?S.bannerB:S.bannerA;
        const META =isWet?S.metaB:S.metaA;
        const HDR  =isWet?S.hdrB:S.hdrA;
        const TOT  =isWet?S.totB:S.totA;
        const srcNames=ubmSources.map(s=>s.name||'Sumber');

        // ── uniqueJenis dari ubmSources ─────────────────────────
        const _ubmJC=ubmSources.filter(s=>s.typeId).map(s=>({typeId:s.typeId,name:s.typeLabel||s.name}));
        const _uJ=[]; const _st=new Set();
        _ubmJC.forEach(j=>{if(!_st.has(j.typeId)){_st.add(j.typeId);_uJ.push(j);}});
        const nJenis=_uJ.length;

        // ── Alias mapping ────────────────────────────────────────
        const _JA={
          'padatan tersuspensi total (tss)':['residu tersuspensi (tss)','residu tersuspensi','tss'],
          'besi (fe) terlarut':['besi (fe) total','fe'],'mangan (mn) terlarut':['mangan (mn) total','mn'],
          'derajat keasaman (ph)':['ph (tingkat keasaman)','ph'],'bod₅':['bod'],
          'amoniak (sebagai n)':['amoniak (nh₃-n)','amoniak'],'deterjen total':['deterjen total (mbas)'],
          'minyak dan lemak':['minyak & lemak','minyak dan lemak'],
          'klorin bebas':['sisa klorin (cl₂)','residual klorin','klorin bebas'],
          'fecal coliform':['fecal coliform'],'tembaga (cu) terlarut':['cu'],'kadmium (cd) terlarut':['cd'],
          'seng (zn) terlarut':['zn'],'timbal (pb) terlarut':['pb'],'arsen (as) terlarut':['as'],
          'nikel (ni) terlarut':['ni'],'kromium heksavalen (cr-vi)':['cr'],'sianida (cn⁻)':['cn'],
          'merkuri (hg) terlarut':['hg'],'nitrat (sebagai n)':['nitrat (sebagai n)'],
        };
        const _no=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');
        function _getXLBMJenis(paramName, typeId){
          const t=BMALLDB.find(x=>x.id===typeId); if(!t)return null;
          const tN=_no(paramName||''); const acc=new Set([tN]);
          Object.entries(_JA).forEach(([k,al])=>{
            if(_no(k)===tN||al.some(a=>_no(a)===tN)){acc.add(_no(k));al.forEach(a=>acc.add(_no(a)));}
          });
          const m=t.params.filter(px=>{const pn=_no(px.param);return acc.has(pn)||(pn.length>=4&&tN.length>=4&&(pn.includes(tN)||tN.includes(pn)));});
          if(!m.length)return null;
          const nums=m.map(x=>x.num).filter(n=>n!=null&&!isNaN(n));
          return nums.length>0?Math.min(...nums):m[0].kadarMaks;
        }

        const NC=4+ubmSources.length+2+nJenis+5; // No,Param,Sat,Hulu,Src×n,CR,BM,Jenis×n,Status,Cmaks,UsulanBM,Alok

        const aoa=[
          [mkCell(`CR HILIR & USULAN BAKU MUTU AIR LIMBAH  ·  ${seasonLabel.toUpperCase()}`,BNR),...Array(NC-1).fill(null)],
          [mkCell(`${ubmRiverName}   ·   Kelas ${ubmClsRom}   ·   Q ${seasonLabel}: ${fmtS(Qs,4)} m³/det   ·   ΣQ Limbah: ${fmtS(ubmTotalQi,6)} m³/det   ·   ${dateStr}`,META),...Array(NC-1).fill(null)],
          [mkCell('Formula: CR = (Qs × C_hulu + ΣQi × Ci) / (Qs + ΣQi)   ·   C_maks = [BM × (Qs+ΣQi) − Qs×C_hulu] / ΣQi   ·   Alokasi = Usulan BM × ΣQ_limbah × 86400 / 1000',{...S.meta,font:font(false,8,C.muted)}),...Array(NC-1).fill(null)],
          Array(NC).fill(blank({...S.dat,fill:fill(C.slateL)})),
          [
            mkCell('No',HDR),mkCell('Parameter',HDR),mkCell('Satuan',HDR),
            mkCell(`C Hulu ${isWet?'🌧 Hujan':'☀ Kemarau'} (mg/L)`,HDR),
            ...srcNames.map(n=>mkCell(n+' (mg/L)',HDR)),
            mkCell('CR Hilir (mg/L)',HDR),mkCell('BM Kelas Sungai (mg/L)',HDR),
            ..._uJ.map(j=>{
              const t=BMALLDB.find(x=>x.id===j.typeId);
              const lbl=t?t.label.replace(/–.*/,'').trim().slice(0,30):j.name;
              return mkCell('BM '+lbl+' (mg/L)',{...S.hdrGold});
            }),
            mkCell('Status Mutu',HDR),mkCell('C_maks Hitung (mg/L)',HDR),mkCell('Usulan BM (mg/L)',S.hdrGold),mkCell('Alokasi Beban (kg/hari)',S.hdrGold),
          ],
        ];
        const rh=[RH.banner,RH.meta,RH.formula,RH.gap,RH.hdr];

        seasonRes.forEach((r,i)=>{
          const {p,cr,bm,status,cMax,usulanBMVal,alokasi}=r;
          const alt=i%2;
          const base=alt?S.datAlt:S.dat, baseR=alt?S.datAltR:S.datR, baseC=alt?S.datAltC:S.datC;
          const stCell=status==='ok'?S.ok:status==='ng'?S.ng:S.na;
          const stLabel=status==='ok'?'✓ Memenuhi':status==='ng'?'✗ Melebihi':'—';
          const cHuluVal=isWet?(p.cHuluWet??p.cHulu??''):(p.cHuluDry??p.cHulu??'');
          const crSt=status==='ng'?S.crNg:{...S.cr,fill:fill(isWet?C.bluBg2:C.ambBg2),font:font(true,10,isWet?C.blu2:C.amb2)};
          const cmSt=cMax!=null&&cMax<=0?S.cmaxNeg:S.cmax;
          const goldSt={...baseR,fill:fill('fffbe6'),font:font(false,10,C.gldDk)};
          const ubmSt=usulanBMVal!=null?{...baseR,fill:fill('fef3c7'),font:font(true,10,C.amb2)}:{...baseR,font:font(false,10,C.muted)};
          aoa.push([
            mkCell(i+1,baseC),mkCell(p.name||'—',base),mkCell(p.unit||'—',baseC),
            nCell(fmtV(pNum(cHuluVal),4),baseR),
            ...ubmSources.map(s=>nCell(fmtV(pNum(p.cSrc[s.id]),4),baseR)),
            nCell(fmtV(cr,4),crSt),
            nCell(fmtV(bm,4),{...baseC,font:font(true,10,C.teal2)}),
            ..._uJ.map(j=>{
              const v=_getXLBMJenis(p.name,j.typeId);
              return typeof v==='number'?nCell(fmtV(v,4),goldSt):mkCell(v==null?'—':String(v),goldSt);
            }),
            mkCell(stLabel,stCell),
            nCell(fmtV(cMax,4),cmSt),
            usulanBMVal!=null?nCell(fmtV(usulanBMVal,4),ubmSt):mkCell('— (belum diisi)',{...baseC,font:font(false,9,C.muted)}),
            nCell(fmtV(alokasi,4),S.alok),
          ]);
          rh.push(RH.data);
        });

        // Footer totals
        const totalAlok=seasonRes.reduce((s,r)=>s+(r.alokasi||0),0);
        aoa.push([
          blank(TOT),mkCell('TOTAL',{...TOT,alignment:align('center')}),blank(TOT),blank(TOT),
          ...ubmSources.map(()=>blank(TOT)),
          blank(TOT),blank(TOT),
          ..._uJ.map(()=>blank(TOT)),
          mkCell(seasonRes.filter(r=>r.status==='ok').length+' Memenuhi / '+seasonRes.filter(r=>r.status==='ng').length+' Melebihi',{...TOT,alignment:align('center')}),
          blank(TOT),blank(TOT),
          nCell(fmtV(totalAlok,4),{...S.alok,...TOT,font:font(true,12,C.gldDk)}),
        ]);
        rh.push(RH.tot);

        const mergesS=[
          {s:{r:0,c:0},e:{r:0,c:NC-1}},{s:{r:1,c:0},e:{r:1,c:NC-1}},
          {s:{r:2,c:0},e:{r:2,c:NC-1}},{s:{r:3,c:0},e:{r:3,c:NC-1}},
        ];
        const colW=[5,28,9,13,...ubmSources.map(()=>14),14,14,..._uJ.map(()=>18),14,14,14,16];
        addSheet(WB,isWet?'🌧 CR Hilir & UBM - Hujan':'☀ CR Hilir & UBM - Kemarau',aoa,colW,mergesS,rh);
      }

      buildUBMSeasonSheet(resDry,'dry','Kemarau ☀');
      buildUBMSeasonSheet(resWet,'wet','Hujan 🌧');
    }
  }

  // ═══════════════════════════════════════════════════════
  // SHEET 6 — SUMBER AIR LIMBAH
  // ═══════════════════════════════════════════════════════
  if(ubmSources.length){
    const NC=5;
    const aoa=[
      [mkCell('DATA SUMBER AIR LIMBAH',S.bannerG),...Array(NC-1).fill(null)],
      [mkCell(`${rn}   ·   ${dateStr}`,S.meta),...Array(NC-1).fill(null)],
      Array(NC).fill(blank({...S.dat,fill:fill(C.slateL)})),
      ['No','Nama Sumber / Titik Penaatan','Jenis Air Limbah','Debit (m³/hari)','Debit (m³/det)'].map(c=>mkCell(c,S.hdrG)),
    ];
    const rh=[RH.banner,RH.meta,RH.gap,RH.hdr];
    ubmSources.forEach((s,i)=>{
      const alt=i%2, qd=pNum(s.qDay);
      aoa.push([
        mkCell(i+1, alt?S.datAltC:S.datC),
        mkCell(s.name||'—', alt?S.datAlt:S.dat),
        mkCell(s.typeLabel||'(Manual)', alt?S.datAlt:S.dat),
        nCell(fmtV(qd,2), alt?S.datAltR:S.datR),
        nCell(fmtV(qd/86400,6), alt?S.datAltR:S.datR),
      ]);
      rh.push(RH.data);
    });
    const totalQd=ubmSources.reduce((s,x)=>s+pNum(x.qDay),0);
    aoa.push([blank(S.totT),mkCell('TOTAL',{...S.totT,alignment:align('center')}),blank(S.totT),nCell(fmtV(totalQd,2),{...S.totT,font:font(true,11,C.teal2)}),nCell(fmtV(totalQd/86400,6),{...S.totT,font:font(true,11,C.teal2)})]);
    rh.push(RH.tot);
    const merges=[{s:{r:0,c:0},e:{r:0,c:NC-1}},{s:{r:1,c:0},e:{r:1,c:NC-1}},{s:{r:2,c:0},e:{r:2,c:NC-1}}];
    addSheet(WB,'💧 Sumber Air Limbah',aoa,[5,36,32,16,16],merges,rh);
  }

  // ═══════════════════════════════════════════════════════
  // SHEET 7 — DATABASE PARAMETER (PP 22/2021)
  // ═══════════════════════════════════════════════════════
  if(params.length){
    const NC=8;
    const kColors=[C.blu2,C.teal2,C.amb2,C.redMd];
    const kBgs   =[C.bluBg,C.tealBg,C.ambBg,C.redBg];
    const kHdr=(i)=>({font:font(true,10,kColors[i]),fill:fill(kBgs[i]),alignment:align('center','center',true),border:bdrT(kColors[i])});

    const aoa=[
      [mkCell('DATABASE PARAMETER  ·  PP NO. 22 TAHUN 2021 LAMPIRAN VI',S.banner),...Array(NC-1).fill(null)],
      [mkCell('Parameter digunakan dalam analisis   ·   Kelas Sungai: '+clsRom,S.meta),...Array(NC-1).fill(null)],
      Array(NC).fill(blank({...S.dat,fill:fill(C.slateL)})),
      [mkCell('No',S.hdr),mkCell('Parameter',S.hdr),mkCell('Satuan',S.hdr),mkCell('BM Kelas '+clsRom,S.hdr),mkCell('Kelas I',kHdr(0)),mkCell('Kelas II',kHdr(1)),mkCell('Kelas III',kHdr(2)),mkCell('Kelas IV',kHdr(3))],
    ];
    const rh=[RH.banner,RH.meta,RH.gap,RH.hdr];
    params.forEach((p,i)=>{
      const dbRow=WQDB.find(r=>r.no===p.no);
      const alt=i%2, base=alt?S.datAlt:S.dat, baseC=alt?S.datAltC:S.datC;
      const k1=dbRow?valStr(dbRow.k1):'—', k2=dbRow?valStr(dbRow.k2):'—';
      const k3=dbRow?valStr(dbRow.k3):'—', k4=dbRow?valStr(dbRow.k4):'—';
      aoa.push([
        mkCell(i+1,baseC), mkCell(p.name||'—',base), mkCell(p.unit||'—',baseC),
        mkCell(valStr(p.bm),{...baseC,font:font(true,10,C.teal2),fill:fill(C.tealBg2),border:bdr(C.teal3)}),
        mkCell(k1,{...baseC,font:font(false,10,C.blu2),fill:fill(alt?C.bluBg2:C.bluBg2),border:bdr(C.blu3)}),
        mkCell(k2,{...baseC,font:font(false,10,C.teal2),fill:fill(alt?C.tealBg2:C.tealBg2),border:bdr(C.teal3)}),
        mkCell(k3,{...baseC,font:font(false,10,C.amb2),fill:fill(alt?C.ambBg2:C.ambBg2),border:bdr(C.amb3)}),
        mkCell(k4,{...baseC,font:font(false,10,C.redMd),fill:fill(alt?C.redBg:C.redBg),border:bdr(C.redMd)}),
      ]);
      rh.push(RH.data);
    });
    const merges=[{s:{r:0,c:0},e:{r:0,c:NC-1}},{s:{r:1,c:0},e:{r:1,c:NC-1}},{s:{r:2,c:0},e:{r:2,c:NC-1}}];
    addSheet(WB,'🗂 Database Parameter',aoa,[5,32,9,14,12,12,12,12],merges,rh);
  }

  // ── Generate & download ──────────────────────────────────────
  const wbout=XLSX.write(WB,{bookType:'xlsx',type:'array'});
  const blob =new Blob([wbout],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  const url  =URL.createObjectURL(blob);
  const a    =document.createElement('a');
  const d    =new Date();
  const stamp=d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0');
  a.href=url;
  a.download=`RiverLoad_${(rn||'Sungai').replace(/\s+/g,'_')}_${stamp}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
  toast('✓ Excel berhasil diunduh! ('+WB.SheetNames.length+' sheet — Rich Color Edition)','ok');
}

// ═══════════════════════════════════════════════════════════════
// MODELING — State & Functions
// ═══════════════════════════════════════════════════════════════
let mdlItems = [];   // [{srcId, order, distKm}]  — persisted
let _mdlChart = null;

// helpers re-use pNum / fmtN / esc already defined above in UBM section

function mdlSync() {
  // 1. Remove items for deleted sources
  const liveIds = new Set(ubmSources.map(s => s.id));
  mdlItems = mdlItems.filter(m => liveIds.has(m.srcId));
  // 2. Add new sources not yet in mdlItems
  ubmSources.forEach(s => {
    if (!mdlItems.find(m => m.srcId === s.id)) {
      mdlItems.push({ srcId: s.id, order: mdlItems.length + 1, distKm: '' });
    }
  });
  // 3. Re-assign order sequentially (keep current relative order)
  mdlItems.forEach((m, i) => { m.order = i + 1; });
  mdlRenderSrcList();
  mdlRefreshParamSel();
  mdlRender();
  saveAuto();
}

function mdlRenderSrcList() {
  const list = document.getElementById('mdl-src-list');
  const hdr  = document.getElementById('mdl-src-hdr');
  const noSrc= document.getElementById('mdl-no-src');
  if (!list) return;
  if (!mdlItems.length) {
    list.innerHTML = '';
    if (hdr)   hdr.style.display   = 'none';
    if (noSrc) noSrc.style.display = 'block';
    return;
  }
  if (noSrc) noSrc.style.display  = 'none';
  if (hdr)   hdr.style.display    = 'grid';
  const N = mdlItems.length;
  list.innerHTML = mdlItems.map((m, i) => {
    const src = ubmSources.find(s => s.id === m.srcId);
    if (!src) return '';
    const qd = pNum(src.qDay);
    const btnUp   = `<button onclick="mdlMoveUp(${m.srcId})"   ${i===0   ?'disabled':''} title="Naik"  style="width:100%;height:19px;background:none;border:1px solid var(--brd);border-radius:2px;color:${i===0   ?'var(--mute)':'var(--txt2)'};cursor:${i===0   ?'default':'pointer'};font-size:11px;padding:0;line-height:1">▲</button>`;
    const btnDown = `<button onclick="mdlMoveDown(${m.srcId})" ${i===N-1 ?'disabled':''} title="Turun" style="width:100%;height:19px;background:none;border:1px solid var(--brd);border-radius:2px;color:${i===N-1?'var(--mute)':'var(--txt2)'};cursor:${i===N-1?'default':'pointer'};font-size:11px;padding:0;line-height:1">▼</button>`;
    return `<div style="display:grid;grid-template-columns:52px 32px 1fr 150px 30px;gap:8px;padding:8px 10px;align-items:center;background:var(--bg2);border:1px solid var(--brd2);border-radius:var(--rs);margin-bottom:5px">
      <div style="display:flex;flex-direction:column;gap:3px">${btnUp}${btnDown}</div>
      <div style="text-align:center;font-family:var(--mono);font-size:15px;font-weight:700;color:var(--accent)">${m.order}</div>
      <div>
        <div style="font-size:12.5px;font-weight:600;color:var(--txt)">${esc(src.name||'Sumber '+m.order)}</div>
        <div style="font-family:var(--mono);font-size:9.5px;color:var(--mute);margin-top:1px">Q = ${qd>0?fmtN(qd,2)+' m³/hari':'—'}</div>
      </div>
      <input class="inp-sm" inputmode="decimal" value="${m.distKm}" placeholder="0.000"
        data-sid="${m.srcId}" oninput="mdlOnDist(+this.dataset.sid,this.value)"
        style="text-align:right;font-family:var(--mono)">
      <div style="font-family:var(--mono);font-size:9px;color:var(--mute)">km</div>
    </div>`;
  }).join('');
}

function mdlMoveUp(sid) {
  const i = mdlItems.findIndex(m => m.srcId === sid);
  if (i <= 0) return;
  [mdlItems[i-1], mdlItems[i]] = [mdlItems[i], mdlItems[i-1]];
  mdlItems.forEach((m,j) => m.order = j+1);
  mdlRenderSrcList(); mdlRender(); saveAuto();
}
function mdlMoveDown(sid) {
  const i = mdlItems.findIndex(m => m.srcId === sid);
  if (i < 0 || i >= mdlItems.length-1) return;
  [mdlItems[i], mdlItems[i+1]] = [mdlItems[i+1], mdlItems[i]];
  mdlItems.forEach((m,j) => m.order = j+1);
  mdlRenderSrcList(); mdlRender(); saveAuto();
}
function mdlOnDist(sid, val) {
  const m = mdlItems.find(x => x.srcId === sid);
  if (m) { m.distKm = val; mdlRender(); saveAuto(); }
}

function mdlRefreshParamSel() {
  const sel = document.getElementById('mdl-param-sel');
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = '<option value="">— Pilih Parameter —</option>' +
    ubmParams.map(p => `<option value="${p.id}"${String(p.id)===String(prev)?' selected':''}>${esc(p.name||'—')}</option>`).join('');
}

// Build cumulative CR curve points given a param, Qs, and ordered sources
function mdlBuildCurve(param, Qs, getCiFn) {
  // mdlItems is already ordered
  const orderedSrcs = mdlItems
    .map(m => ({ m, src: ubmSources.find(s => s.id === m.srcId) }))
    .filter(x => x.src);

  let qCur = Qs, cCur = pNum(param.cHulu);
  const pts = [{ dist: 0, c: cCur, label: 'Hulu' }];

  orderedSrcs.forEach(({ m, src }) => {
    const qi   = pNum(src.qDay) / 86400;
    const ci   = getCiFn(src);
    const dist = pNum(m.distKm) || 0;
    const newQ = qCur + qi;
    const newC = newQ > 0 ? (qCur * cCur + qi * ci) / newQ : cCur;
    qCur = newQ; cCur = newC;
    pts.push({ dist, c: newC, label: src.name || ('Sumber '+m.order) });
  });
  return pts;
}

// Staircase XY for Chart.js (jump at source point, then flat until next)
function mdlToStair(pts, maxDist) {
  const xy = [];
  for (let i = 0; i < pts.length; i++) {
    if (i > 0) xy.push({ x: pts[i].dist, y: pts[i-1].c }); // horizontal run
    xy.push({ x: pts[i].dist, y: pts[i].c });               // vertical jump
  }
  // extend to end of chart
  if (pts.length) xy.push({ x: maxDist, y: pts[pts.length-1].c });
  return xy;
}

function mdlRender() {
  const selP  = document.getElementById('mdl-param-sel');
  const selS  = document.getElementById('mdl-season-sel');
  const wrap  = document.getElementById('mdl-chart-wrap');
  const empty = document.getElementById('mdl-chart-empty');
  const tWrap = document.getElementById('mdl-tbl-wrap');
  const tEmpty= document.getElementById('mdl-tbl-empty');
  if (!selP || !selS || !wrap || !empty) return;

  const pid    = selP.value ? parseInt(selP.value) : null;
  const season = selS.value || 'dry';

  const hide = () => {
    wrap.style.display  = 'none';
    empty.style.display = 'block';
    if (tWrap)  tWrap.style.display  = 'none';
    if (tEmpty) tEmpty.style.display = 'block';
    if (_mdlChart) { try{_mdlChart.destroy();}catch(e){} _mdlChart=null; }
  };

  if (!pid || !ubmParams.length || !ubmSources.length) { hide(); return; }
  const param = ubmParams.find(p => p.id === pid);
  if (!param) { hide(); return; }

  const Qs = season === 'dry'
    ? pNum(document.getElementById('q-dry')?.value)
    : pNum(document.getElementById('q-wet')?.value);

  if (!Qs || Qs <= 0) {
    empty.style.display = 'block'; empty.textContent = '⚠ Debit sungai (Q) belum diisi di menu Beban Pencemar';
    wrap.style.display = 'none';
    if (_mdlChart) { try{_mdlChart.destroy();}catch(e){} _mdlChart=null; }
    return;
  }

  // Ordered source list from mdlItems
  const orderedSrcs = mdlItems
    .map(m => ({ m, src: ubmSources.find(s => s.id === m.srcId) }))
    .filter(x => x.src);

  if (!orderedSrcs.length) { hide(); return; }

  const totalQi = ubmSources.reduce((a, s) => a + pNum(s.qDay)/86400, 0);
  const bm      = param.bmVal;

  // Build the three curves
  const curveAktual  = mdlBuildCurve(param, Qs, src => pNum(param.cSrc[src.id])||0);
  const curveNone    = mdlBuildCurve(param, Qs, () => 0);
  const cmRaw = (bm != null && totalQi > 0) ? (bm*(Qs+totalQi) - Qs*pNum(param.cHulu))/totalQi : null;
  const cmVal  = cmRaw != null ? Math.max(0, cmRaw) : null;
  const curveCmaks = cmVal != null
    ? mdlBuildCurve(param, Qs, () => cmVal)
    : null;

  // Max X for chart
  const allDists = orderedSrcs.map(x => pNum(x.m.distKm)||0);
  const maxDist  = allDists.length ? Math.max(...allDists) * 1.12 + 0.2 : 1;

  // Title
  const riverName = document.getElementById('ubm-river')?.value?.trim()
    || document.getElementById('r-name')?.value?.trim() || 'Sungai';
  const seasonLabel = season === 'dry' ? 'Kondisi Kemarau' : 'Kondisi Hujan';
  const chartTitle  = `${riverName}  (${seasonLabel})`;
  const elTitle = document.getElementById('mdl-chart-title');
  if (elTitle) elTitle.textContent = `DIAGRAM CR — ${riverName.toUpperCase()} (${seasonLabel.toUpperCase()})`;

  const isDark   = document.documentElement.getAttribute('data-theme') !== 'light';
  const gridClr  = isDark ? 'rgba(62,207,178,0.07)' : 'rgba(0,100,80,0.09)';
  const lblClr   = isDark ? '#8bb8b0' : '#2a6055';
  const titleClr = isDark ? '#d4f0e8' : '#0d2e28';
  const bgClr    = isDark ? '#0a1e2e' : '#ffffff';
  const tickClr  = isDark ? '#3a6660' : '#7aada5';

  const datasets = [
    {
      label: `C Aktual Limbah`,
      data:  mdlToStair(curveAktual, maxDist),
      borderColor: '#4488ff', borderWidth: 2.5, pointRadius: 3,
      tension: 0, fill: false
    },
    {
      label: 'Tanpa Limbah (C=0)',
      data:  mdlToStair(curveNone, maxDist),
      borderColor: '#00e87a', borderWidth: 2, pointRadius: 3,
      tension: 0, fill: false, borderDash: [4,4]
    }
  ];
  if (curveCmaks) {
    datasets.push({
      label: `C_maks Usulan (${fmtN(cmVal,3)} ${param.unit||'mg/L'})`,
      data:  mdlToStair(curveCmaks, maxDist),
      borderColor: '#f5a623', borderWidth: 2.5, pointRadius: 3,
      tension: 0, fill: false, borderDash: [6,3]
    });
  }
  if (bm != null) {
    datasets.push({
      label: `BM Kelas = ${fmtN(bm,3)} ${param.unit||'mg/L'}`,
      data:  [{ x:0, y:bm }, { x:maxDist, y:bm }],
      borderColor: '#ff4444', borderWidth: 1.5, pointRadius: 0,
      tension: 0, fill: false, borderDash: [5,3]
    });
  }

  // Annotations — vertical dashed lines at each source
  const annotations = {};
  orderedSrcs.forEach(({m, src}, i) => {
    const dist = pNum(m.distKm)||0;
    annotations['vline'+i] = {
      type: 'line', xMin: dist, xMax: dist,
      borderColor: 'rgba(255,80,80,0.6)', borderWidth: 1.5, borderDash: [4,4],
      label: {
        display: true,
        content: src.name || ('S'+(i+1)),
        position: 'start',
        rotation: -90,
        backgroundColor: 'transparent',
        color: isDark ? '#ff9999' : '#cc2222',
        font: { size: 10, family: 'Inter, sans-serif', weight:'600' },
        padding: 4
      }
    };
  });

  // Destroy old chart
  if (_mdlChart) { try{_mdlChart.destroy();}catch(e){} _mdlChart=null; }

  wrap.style.display  = 'block';
  empty.style.display = 'none';

  const ctx = document.getElementById('mdl-canvas').getContext('2d');
  const monoFont = 'Inter, sans-serif';

  _mdlChart = new Chart(ctx, {
    type: 'line',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.6,
      animation: { duration: 280 },
      plugins: {
        legend: {
          display: true, position: 'right',
          labels: {
            color: lblClr,
            font: { family: monoFont, size: 11 },
            boxWidth: 28, padding: 12,
            usePointStyle: false
          }
        },
        title: {
          display: true, text: chartTitle, color: titleClr,
          font: { size: 14, weight: 'bold', family: 'Sora, Inter, sans-serif' },
          padding: { top: 6, bottom: 10 }
        },
        tooltip: {
          callbacks: {
            label: ctx2 => `${ctx2.dataset.label}: ${fmtN(ctx2.parsed.y,4)} ${param.unit||'mg/L'}`
          }
        },
        annotation: { annotations }
      },
      scales: {
        x: {
          type: 'linear', min: 0,
          title: { display:true, text:'Jarak dari Hulu (km)', color:lblClr, font:{size:11,family:monoFont} },
          grid: { color: gridClr },
          ticks: { color: tickClr, font:{family:monoFont,size:10} }
        },
        y: {
          min: 0,
          title: { display:true, text:`${param.name||'Konsentrasi'} (${param.unit||'mg/L'})`, color:lblClr, font:{size:11,family:monoFont} },
          grid: { color: gridClr },
          ticks: { color: tickClr, font:{family:monoFont,size:10} }
        }
      }
    },
    plugins: [{
      id:'mdlBg',
      beforeDraw: chart => {
        const c2 = chart.canvas.getContext('2d');
        c2.save(); c2.fillStyle = bgClr;
        c2.fillRect(0,0,chart.width,chart.height); c2.restore();
      }
    }]
  });

  // ── Table ────────────────────────────────────────────────────
  if (tWrap)  tWrap.style.display  = 'block';
  if (tEmpty) tEmpty.style.display = 'none';

  const thead = document.getElementById('mdl-tbl-head');
  const tbody = document.getElementById('mdl-tbl-body');
  if (!thead || !tbody) return;

  thead.innerHTML = `<tr style="background:rgba(62,207,178,0.05)">
    ${['No','Titik / Sumber','Jarak (km)','Q_i (m³/det)','C_i Aktual','CR Hilir (mg/L)','C_maks (mg/L)','Status']
      .map((h,i)=>`<th style="padding:8px 10px;font-family:var(--mono);font-size:9px;font-weight:700;border-bottom:1px solid var(--brd);color:${i===5?'var(--accent)':i===6?'var(--amber)':'var(--mute)'};text-align:${i<2?'left':'right'}">${h}</th>`).join('')}
    </tr>`;

  let qCum = Qs, cCum = pNum(param.cHulu);
  const rows = [];
  // Hulu row
  rows.push({ label:'Hulu (C₀)', dist:null, qi:null, ci:null, cr:cCum });
  orderedSrcs.forEach(({m, src}, i) => {
    const qi   = pNum(src.qDay)/86400;
    const ci   = pNum(param.cSrc[src.id])||0;
    const dist = pNum(m.distKm)||0;
    const newQ = qCum + qi;
    const newC = newQ > 0 ? (qCum*cCum + qi*ci)/newQ : cCum;
    qCum = newQ; cCum = newC;
    rows.push({ label: src.name||('Sumber '+(i+1)), dist, qi, ci, cr: newC });
  });

  tbody.innerHTML = rows.map((r, i) => {
    const status = bm != null ? (r.cr <= bm ? 'ok' : 'ng') : null;
    const badge  = status==='ok'?'<span class="badge b-ok">✓ Memenuhi</span>'
                 : status==='ng'?'<span class="badge b-ng">✗ Melebihi</span>'
                 : '<span class="badge b-na">—</span>';
    const crClr  = status==='ng'?'var(--red)':status==='ok'?'var(--green)':'var(--accent)';
    const alt    = i%2?'background:rgba(62,207,178,0.02)':'';
    const TD = (v, right=true, clr='var(--txt2)') =>
      `<td style="padding:8px 10px;font-family:var(--mono);font-size:11px;text-align:${right?'right':'left'};color:${clr};border-bottom:1px solid var(--brd2)">${v}</td>`;
    return `<tr style="${alt}">
      ${TD(i===0?'—':String(i),true,'var(--mute)')}
      <td style="padding:8px 10px;font-weight:600;font-size:12.5px;border-bottom:1px solid var(--brd2)">${esc(r.label)}</td>
      ${TD(r.dist!=null?fmtN(r.dist,3):'—')}
      ${TD(r.qi!=null?fmtN(r.qi,6):'—')}
      ${TD(r.ci!=null?fmtN(r.ci,4):`= ${fmtN(r.cr,4)}`)}
      ${TD(`<strong style="color:${crClr}">${fmtN(r.cr,4)}</strong>`,true,crClr)}
      ${TD(cmVal!=null?fmtN(cmVal,4):'—',true,'var(--amber)')}
      <td style="padding:8px 10px;text-align:right;border-bottom:1px solid var(--brd2)">${badge}</td>
    </tr>`;
  }).join('');

  if (bm!=null) {
    tbody.innerHTML += `<tr style="background:rgba(255,68,68,0.04)">
      <td colspan="5" style="padding:8px 10px;font-family:var(--mono);font-size:9.5px;color:var(--mute);border-top:2px solid var(--brd)">— Baku Mutu Kelas Sungai —</td>
      <td style="padding:8px 10px;text-align:right;font-family:var(--mono);font-size:12px;font-weight:700;color:var(--red);border-top:2px solid var(--brd)">${fmtN(bm,4)}</td>
      <td colspan="2" style="border-top:2px solid var(--brd)"></td>
    </tr>`;
  }
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
(function init(){
  try{const s=localStorage.getItem(KEY);if(s)restoreState(JSON.parse(s));}catch(e){}
  applyTheme();
  renderDB();
  dbFilter('');
})();



// ═══════════════════════════════════════════════════════════════
// FITUR 1 — RIWAYAT PROYEK (localStorage multi-project)
// FITUR 2 — LINK BERBAGI (URL share dengan data terkompresi)
// ═══════════════════════════════════════════════════════════════

const HISTORY_KEY  = 'riverload_history';   // array of {id, name, ts, data}
const HISTORY_MAX  = 20;                    // max proyek tersimpan

// ─── Helper: baca/tulis history ──────────────────────────────
function historyLoad() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
  catch(e) { return []; }
}
function historySave(list) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(list)); }
  catch(e) { toast('⚠ localStorage penuh — hapus beberapa proyek lama','err'); }
}

// ─── Simpan proyek ke riwayat ─────────────────────────────────
function historySaveProject(nameOverride) {
  const state = getState();
  const name  = nameOverride
    || (document.getElementById('r-name')?.value.trim())
    || 'Proyek Tanpa Nama';

  const list = historyLoad();
  const id   = 'rl_' + Date.now();
  const ts   = Date.now();

  list.unshift({ id, name, ts, data: state });
  // Trim ke max
  while (list.length > HISTORY_MAX) list.pop();
  historySave(list);
  return id;
}

// ─── Hapus satu entri ────────────────────────────────────────
function historyDelete(id) {
  const list = historyLoad().filter(p => p.id !== id);
  historySave(list);
}

// ─── Render panel riwayat ────────────────────────────────────
function historyRender() {
  const panel = document.getElementById('history-list');
  if (!panel) return;

  const list = historyLoad();
  if (!list.length) {
    panel.innerHTML = '<div style="padding:20px;text-align:center;font-family:var(--mono);font-size:10px;color:var(--mute)">Belum ada proyek tersimpan</div>';
    return;
  }

  panel.innerHTML = list.map(p => {
    const d  = new Date(p.ts);
    const ts = d.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})
             + ' ' + d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
    const riverName = p.data?.bpm?.name || p.name;
    const cls       = p.data?.bpm?.cls  || '—';
    const nParam    = (p.data?.bpm?.params || []).length;
    return `
      <div class="history-item" id="hi-${p.id}">
        <div class="hi-meta">
          <div class="hi-name">${_esc(riverName)}</div>
          <div class="hi-detail">Kelas ${cls} · ${nParam} parameter · ${ts}</div>
        </div>
        <div class="hi-actions">
          <button class="btn btn-sm" onclick="historyOpen('${p.id}')" title="Buka proyek">📂 Buka</button>
          <button class="btn btn-outline btn-sm" onclick="historyShareFromHistory('${p.id}')" title="Buat link berbagi">🔗 Bagikan</button>
          <button class="btn btn-outline btn-sm" onclick="historyDeleteAndRefresh('${p.id}')" style="color:var(--red);border-color:rgba(255,68,68,.3)" title="Hapus">🗑</button>
        </div>
      </div>`;
  }).join('');
}

function historyOpen(id) {
  const list = historyLoad();
  const entry = list.find(p => p.id === id);
  if (!entry) { toast('⚠ Proyek tidak ditemukan','err'); return; }
  restoreState(entry.data);
  historyClosePanel();
  nav('bpm');
  toast(`✅ Proyek "${entry.name}" dibuka`);
}

function historyDeleteAndRefresh(id) {
  if (!confirm('Hapus proyek ini dari riwayat?')) return;
  historyDelete(id);
  historyRender();
  toast('🗑 Proyek dihapus dari riwayat');
}

function historyShareFromHistory(id) {
  const list = historyLoad();
  const entry = list.find(p => p.id === id);
  if (!entry) return;
  shareGenerateLink(entry.data, entry.name);
}

// ─── Open / close panel ──────────────────────────────────────
function historyOpenPanel() {
  historyRender();
  const panel = document.getElementById('history-panel');
  const overlay = document.getElementById('history-overlay');
  if (panel) panel.classList.add('open');
  if (overlay) overlay.style.display = 'block';
}
function historyClosePanel() {
  const panel = document.getElementById('history-panel');
  const overlay = document.getElementById('history-overlay');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.style.display = 'none';
}

// ─── Save ke riwayat + file (override saveProject) ──────────
const _origSaveProject = window.saveProject;
window.saveProject = function() {
  const name = document.getElementById('r-name')?.value.trim() || 'Proyek Tanpa Nama';
  historySaveProject(name);
  _origSaveProject();
  toast('✅ Disimpan ke file dan riwayat browser');
};

// Tombol "Simpan ke Riwayat" (tanpa download file)
window.historySaveOnly = function() {
  const name = document.getElementById('r-name')?.value.trim() || 'Proyek Tanpa Nama';
  historySaveProject(name);
  toast(`✅ "${name}" disimpan ke riwayat browser`);
  historyRender();
};

// ─── Helper escape ───────────────────────────────────────────
function _esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}


// ═══════════════════════════════════════════════════════════════
// FITUR 2 — SHARE LINK (URL dengan data Base64+LZ compressed)
// ═══════════════════════════════════════════════════════════════

// Mini LZ-string-like encoder menggunakan built-in btoa / URI encoding
// Untuk data besar: compress dengan JSON → btoa (base64) lalu embed ke URL hash

function shareEncode(stateObj) {
  const json = JSON.stringify(stateObj);
  // Use TextEncoder + btoa via Uint8Array
  const bytes = new TextEncoder().encode(json);
  let binary  = '';
  bytes.forEach(b => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function shareDecode(b64) {
  const binary = atob(b64);
  const bytes  = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return JSON.parse(new TextDecoder().decode(bytes));
}

function shareGenerateLink(stateData, projectName) {
  // Encode state ke base64
  const encoded = shareEncode(stateData || getState());
  const url     = location.href.split('#')[0].split('?')[0] + '#share=' + encoded;

  // Check URL length (browsers support ~2000 chars safely in most cases,
  // but with complex projects it can be larger — we warn if >50KB)
  const kb = Math.round(url.length / 1024 * 10) / 10;

  const modal = document.getElementById('share-modal');
  const urlEl = document.getElementById('share-url-input');
  const infoEl = document.getElementById('share-size-info');
  const nameEl = document.getElementById('share-project-name');

  if (nameEl) nameEl.textContent = projectName || document.getElementById('r-name')?.value || 'Proyek';
  if (urlEl)  urlEl.value = url;
  if (infoEl) {
    infoEl.textContent = `Ukuran link: ${kb} KB`;
    infoEl.style.color = kb > 100 ? 'var(--red)' : kb > 30 ? '#ffc800' : 'var(--green)';
    if (kb > 100) {
      infoEl.textContent += ' ⚠ Link sangat panjang — simpan ke file lebih disarankan untuk proyek besar';
    }
  }
  if (modal) modal.style.display = 'flex';
}

window.shareCurrentProject = function() {
  shareGenerateLink(getState());
};

window.shareModalClose = function() {
  const modal = document.getElementById('share-modal');
  if (modal) modal.style.display = 'none';
};

window.shareCopyLink = function() {
  const urlEl = document.getElementById('share-url-input');
  if (!urlEl) return;
  navigator.clipboard.writeText(urlEl.value).then(() => {
    toast('✅ Link berhasil disalin ke clipboard');
    const btn = document.getElementById('share-copy-btn');
    if (btn) { btn.textContent = '✔ Tersalin!'; setTimeout(()=>{ btn.textContent='📋 Salin Link'; },2500); }
  }).catch(() => {
    urlEl.select(); document.execCommand('copy');
    toast('✅ Link disalin');
  });
};

// ─── Auto-load dari URL hash saat halaman dibuka ─────────────
function shareCheckURL() {
  const hash = location.hash;
  if (!hash.startsWith('#share=')) return;
  const encoded = hash.slice(7);
  if (!encoded) return;
  try {
    const state = shareDecode(encoded);
    // Clear hash dari URL tanpa reload
    history.replaceState(null, '', location.pathname + location.search);
    // Delay agar app sudah selesai init
    setTimeout(() => {
      restoreState(state);
      const name = state?.bpm?.name || 'Proyek Bersama';
      toast(`🔗 Proyek "${name}" dimuat dari link berbagi`);
      // Otomatis simpan ke riwayat
      historySaveProject(name + ' (dari link)');
    }, 500);
  } catch(e) {
    console.error('Share URL parse error:', e);
    toast('⚠ Link berbagi tidak valid atau rusak','err');
    history.replaceState(null, '', location.pathname + location.search);
  }
}

// Jalankan saat DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', shareCheckURL);
} else {
  setTimeout(shareCheckURL, 200);
}

// ═══════════════════════════════════════════════════════════════
// FITUR: IMPORT EXCEL HASIL UJI + AI PARSER
// ═══════════════════════════════════════════════════════════════

(function() {

// ─── State ───────────────────────────────────────────────────
let _xlsxParsed   = null;   // raw sheet data dari SheetJS
let _aiResult     = null;   // hasil parsing AI
let _importSeason = 'dry';  // musim yang sedang di-import

// ─── Buka panel ──────────────────────────────────────────────
window.xlsImportOpen = function() {
  const panel = document.getElementById('xls-import-panel');
  const overlay = document.getElementById('xls-import-overlay');
  if (panel) panel.classList.add('open');
  if (overlay) overlay.style.display = 'block';
  _xlsxParsed = null;
  _aiResult   = null;
  _resetImportUI();
};

window.xlsImportClose = function() {
  const panel = document.getElementById('xls-import-panel');
  const overlay = document.getElementById('xls-import-overlay');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.style.display = 'none';
};

function _resetImportUI() {
  const ids = ['xls-step2','xls-step3','xls-ai-log','xls-preview-section'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const step1 = document.getElementById('xls-step1');
  if (step1) step1.style.display = 'block';
  const fileInput = document.getElementById('xls-file-input');
  if (fileInput) fileInput.value = '';
  _setProgress(0, '');
}

// ─── Step 1: Baca file Excel ─────────────────────────────────
window.xlsHandleFile = function(input) {
  const file = input.files[0];
  if (!file) return;

  const ext = file.name.split('.').pop().toLowerCase();
  if (!['xlsx','xls','csv'].includes(ext)) {
    toast('⚠ Format tidak didukung. Gunakan .xlsx, .xls, atau .csv', 'err');
    return;
  }

  _showLog(`📂 Membaca file: ${file.name}…`);

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      let sheetText = '';

      if (ext === 'csv') {
        sheetText = e.target.result;
        _xlsxParsed = sheetText;
      } else {
        // Use SheetJS (already bundled)
        const data = new Uint8Array(e.target.result);
        const wb   = XLSX.read(data, { type: 'array' });
        const ws   = wb.Sheets[wb.SheetNames[0]];
        // Convert to CSV-like text for AI
        sheetText = XLSX.utils.sheet_to_csv(ws, { defval: '' });
        _xlsxParsed = sheetText;
      }

      _showLog(`✅ File berhasil dibaca (${Math.round(file.size/1024)} KB, ${sheetText.split('\n').length} baris)`);

      // Show preview
      _showRawPreview(sheetText);

      // Show step 2
      document.getElementById('xls-step1').style.display = 'none';
      document.getElementById('xls-step2').style.display = 'block';

    } catch(err) {
      _showLog('❌ Gagal membaca file: ' + err.message, 'err');
      console.error(err);
    }
  };

  if (ext === 'csv') {
    reader.readAsText(file);
  } else {
    reader.readAsArrayBuffer(file);
  }
};

// ─── Preview raw data ─────────────────────────────────────────
function _showRawPreview(csv) {
  const el = document.getElementById('xls-raw-preview');
  if (!el) return;
  const lines = csv.split('\n').slice(0, 12);
  el.textContent = lines.join('\n') + (csv.split('\n').length > 12 ? '\n…' : '');
}

// ─── Step 2: Kirim ke AI ──────────────────────────────────────
window.xlsRunAI = function() {
  if (!_xlsxParsed) { toast('⚠ Belum ada file', 'err'); return; }

  _importSeason = document.getElementById('xls-season-select').value || 'both';

  document.getElementById('xls-step2').style.display = 'none';
  document.getElementById('xls-ai-log').style.display = 'block';

  _setProgress(10, 'Mengirim data ke AI…');
  _showLog('🤖 Menghubungi Claude AI untuk menganalisis data…');

  // Build the parameter list for AI context
  const paramNames = WQDB.map(r => r.name).join(', ');

  const prompt = `Kamu adalah asisten analisis kualitas air sungai yang ahli dalam peraturan PP 22/2021 Indonesia.

Berikut adalah data hasil uji laboratorium kualitas air sungai dalam format CSV/Excel:

\`\`\`
${_xlsxParsed.slice(0, 8000)}
\`\`\`

Tugas kamu: parse data ini dan ekstrak informasi berikut dalam format JSON.

Parameter yang dikenal di sistem (gunakan nama PERSIS dari daftar ini jika cocok):
${paramNames}

Format JSON yang WAJIB dikembalikan (hanya JSON, tidak ada teks lain):
{
  "sungai": "nama sungai/badan air jika ada di data, atau null",
  "kelas": "kelas sungai romawi I/II/III/IV jika disebutkan, atau null",
  "debit_kemarau": angka_debit_m3_per_detik_atau_null,
  "debit_hujan": angka_debit_m3_per_detik_atau_null,
  "musim_data": "dry" atau "wet" atau "both" (deteksi dari konteks data),
  "parameter": [
    {
      "nama_asli": "nama parameter persis di file Excel",
      "nama_sistem": "nama parameter dari daftar sistem yang paling cocok, atau null jika tidak ada",
      "no_wqdb": nomor_parameter_di_WQDB_1_sampai_49_atau_null,
      "satuan": "satuan di file",
      "nilai_kemarau": angka_atau_null,
      "nilai_hujan": angka_atau_null,
      "nilai_tunggal": angka_atau_null (jika hanya satu nilai tanpa info musim)
    }
  ],
  "catatan": "informasi penting lain dari file ini, atau null"
}

Aturan penting:
- Jika data hanya satu musim dan tidak jelas musimnya, isi nilai_tunggal dan set musim_data sesuai pilihan user (${_importSeason})
- Konversi satuan jika perlu (mg/L adalah standar, kecuali parameter khusus)
- Jika ada beberapa titik sampling, ambil nilai rata-rata atau nilai yang paling representatif
- Abaikan parameter yang tidak relevan dengan kualitas air (tanggal, nomor sampel, dll)
- no_wqdb: 1=Temperatur, 2=TDS, 3=TSS, 4=pH, 5=BOD, 6=COD, 7=DO, 8=Total Fosfat, 9=NO3-N, 10=NH3-N, 11=Arsen, 12=Kobalt, 13=Barium, 14=Boron, 15=Selenium, 16=Kadmium, 17=Khrom(VI), 18=Tembaga, 19=Besi, 20=Timbal, 21=Mangan, 22=Air Raksa, 23=Seng, 24=Klorida, 25=Sianida, 26=Fluorida, 27=Nitrit, 28=Sulfat, 29=Klorin Bebas, 30=Belerang sebagai H2S, 31=Minyak dan Lemak, 32=Deterjen MBAS, 33=Senyawa Fenol, 34=BHC, 35=Aldrin/Dieldrin, 36=Chlordane, 37=DDT, 38=Heptachlor, 39=Lindane, 40=Methoxychlor, 41=Endrin, 42=Toxaphen, 43=Endosulfan, 44=Total Coliform, 45=Fecal Coliform, 46=Radioaktivitas Alpha, 47=Radioaktivitas Beta, 48=Kekeruhan, 49=Warna`;

  _callClaudeAPI(prompt)
    .then(aiText => {
      _setProgress(80, 'Memproses hasil AI…');
      _showLog('✅ Respons AI diterima. Memproses…');
      _parseAIResponse(aiText);
    })
    .catch(err => {
      _setProgress(0, '');
      _showLog('❌ Error: ' + err.message, 'err');
      _showLog('💡 Pastikan koneksi internet aktif dan coba lagi.', 'info');
      document.getElementById('xls-step2').style.display = 'block';
      document.getElementById('xls-ai-log').style.display = 'none';
    });
};

// ─── Call Claude API ──────────────────────────────────────────
async function _callClaudeAPI(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.content.map(c => c.text || '').join('');
}

// ─── Parse AI response ────────────────────────────────────────
function _parseAIResponse(text) {
  // Extract JSON from response
  let json = null;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      json = JSON.parse(jsonMatch[0]);
    } catch(e) {
      _showLog('⚠ Format JSON tidak valid dari AI. Mencoba perbaikan…', 'warn');
      // Try to fix common issues
      try {
        const fixed = jsonMatch[0]
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']')
          .replace(/:\s*undefined/g, ': null');
        json = JSON.parse(fixed);
      } catch(e2) {
        _showLog('❌ Gagal parse JSON: ' + e2.message, 'err');
        document.getElementById('xls-step2').style.display = 'block';
        document.getElementById('xls-ai-log').style.display = 'none';
        return;
      }
    }
  } else {
    _showLog('❌ AI tidak mengembalikan data JSON yang valid.', 'err');
    _showLog('Respons AI: ' + text.slice(0, 300), 'info');
    document.getElementById('xls-step2').style.display = 'block';
    document.getElementById('xls-ai-log').style.display = 'none';
    return;
  }

  _aiResult = json;
  _setProgress(100, 'Selesai');
  _showLog(`✅ AI berhasil mengidentifikasi ${(json.parameter||[]).length} parameter`);
  if (json.sungai)  _showLog(`🏞 Nama sungai: ${json.sungai}`);
  if (json.kelas)   _showLog(`📊 Kelas: ${json.kelas}`);
  if (json.catatan) _showLog(`📝 Catatan: ${json.catatan}`);

  _buildPreview(json);
  document.getElementById('xls-ai-log').style.display = 'none';
  document.getElementById('xls-preview-section').style.display = 'block';
}

// ─── Build preview table ──────────────────────────────────────
function _buildPreview(data) {
  const tbody = document.getElementById('xls-preview-tbody');
  if (!tbody) return;

  const musim = _importSeason;

  const rows = (data.parameter || []).map(p => {
    // Determine value to use
    let valDry = p.nilai_kemarau;
    let valWet  = p.nilai_hujan;
    if (p.nilai_tunggal !== null && p.nilai_tunggal !== undefined) {
      if (musim === 'dry' || musim === 'both') valDry = p.nilai_tunggal;
      if (musim === 'wet' || musim === 'both') valWet  = p.nilai_tunggal;
    }

    const inSystem = p.no_wqdb !== null && p.no_wqdb !== undefined;
    const alreadyAdded = inSystem && params.find(x => x.no === p.no_wqdb);

    const rowColor = inSystem
      ? (alreadyAdded ? 'rgba(255,200,0,0.06)' : 'rgba(62,207,178,0.04)')
      : 'rgba(255,68,68,0.04)';

    const statusBadge = !inSystem
      ? '<span style="font-size:9px;color:var(--red)">Tidak dikenal</span>'
      : alreadyAdded
      ? '<span style="font-size:9px;color:#ffc800">Sudah ada</span>'
      : '<span style="font-size:9px;color:var(--green)">Siap import</span>';

    return `<tr style="border-bottom:1px solid var(--brd2);background:${rowColor}">
      <td style="padding:7px 8px">
        <input type="checkbox" class="xls-param-check"
          data-no="${p.no_wqdb || ''}"
          data-dry="${valDry !== null && valDry !== undefined ? valDry : ''}"
          data-wet="${valWet !== null && valWet !== undefined ? valWet : ''}"
          ${!inSystem ? 'disabled' : ''}
          ${inSystem && !alreadyAdded ? 'checked' : ''}
          style="width:14px;height:14px;cursor:pointer">
      </td>
      <td style="padding:7px 8px;font-family:var(--mono);font-size:11px;color:var(--txt)">${p.nama_asli}</td>
      <td style="padding:7px 8px;font-family:var(--mono);font-size:10px;color:var(--accent)">${p.nama_sistem || '—'}</td>
      <td style="padding:7px 8px;font-family:var(--mono);font-size:11px;color:var(--txt);text-align:right">
        ${valDry !== null && valDry !== undefined ? `<strong>${valDry}</strong>` : '<span style="color:var(--mute)">—</span>'}
      </td>
      <td style="padding:7px 8px;font-family:var(--mono);font-size:11px;color:var(--txt);text-align:right">
        ${valWet !== null && valWet !== undefined ? `<strong>${valWet}</strong>` : '<span style="color:var(--mute)">—</span>'}
      </td>
      <td style="padding:7px 8px;font-family:var(--mono);font-size:10px;color:var(--mute)">${p.satuan || '—'}</td>
      <td style="padding:7px 8px">${statusBadge}</td>
    </tr>`;
  }).join('');

  tbody.innerHTML = rows || '<tr><td colspan="7" style="padding:16px;text-align:center;color:var(--mute);font-family:var(--mono);font-size:10px">Tidak ada parameter terdeteksi</td></tr>';

  // Fill meta preview
  const metaEl = document.getElementById('xls-meta-preview');
  if (metaEl) {
    const items = [];
    if (data.sungai) items.push(`<span>🏞 <strong>Sungai:</strong> ${data.sungai}</span>`);
    if (data.kelas)  items.push(`<span>📊 <strong>Kelas:</strong> ${data.kelas}</span>`);
    if (data.debit_kemarau) items.push(`<span>💧 <strong>Debit Kemarau:</strong> ${data.debit_kemarau} m³/s</span>`);
    if (data.debit_hujan)   items.push(`<span>💧 <strong>Debit Hujan:</strong> ${data.debit_hujan} m³/s</span>`);
    if (data.catatan) items.push(`<span style="color:var(--mute)">📝 ${data.catatan}</span>`);
    metaEl.innerHTML = items.length
      ? items.join(' &nbsp;·&nbsp; ')
      : '<span style="color:var(--mute)">Tidak ada info tambahan</span>';
  }

  // Update counter
  _updateCheckCount();
}

function _updateCheckCount() {
  const total   = document.querySelectorAll('.xls-param-check:not(:disabled)').length;
  const checked = document.querySelectorAll('.xls-param-check:checked').length;
  const el = document.getElementById('xls-check-count');
  if (el) el.textContent = `${checked} dari ${total} parameter dipilih`;
}

window.xlsToggleAll = function(checked) {
  document.querySelectorAll('.xls-param-check:not(:disabled)').forEach(cb => { cb.checked = checked; });
  _updateCheckCount();
};

// ─── Step 3: Apply ke app ─────────────────────────────────────
window.xlsApplyImport = function() {
  if (!_aiResult) return;

  const data = _aiResult;
  let applied = 0;
  let skipped = 0;

  // 1. Isi info sungai
  if (data.sungai) {
    const el = document.getElementById('r-name');
    if (el && !el.value.trim()) el.value = data.sungai;
  }

  // 2. Isi kelas sungai
  if (data.kelas) {
    const el = document.getElementById('r-class');
    if (el && !el.value) {
      // Normalize: I/II/III/IV
      const cls = String(data.kelas).replace(/kelas\s*/i,'').trim().toUpperCase();
      if (['I','II','III','IV'].includes(cls)) {
        el.value = cls;
        onClassChange(); // trigger BM reload
      }
    }
  }

  // 3. Isi debit
  if (data.debit_kemarau) {
    const el = document.getElementById('q-dry');
    if (el && !el.value.trim()) el.value = data.debit_kemarau;
  }
  if (data.debit_hujan) {
    const el = document.getElementById('q-wet');
    if (el && !el.value.trim()) el.value = data.debit_hujan;
  }

  // 4. Isi parameter
  const checks = document.querySelectorAll('.xls-param-check:checked');
  checks.forEach(cb => {
    const no  = parseInt(cb.dataset.no);
    const dry = cb.dataset.dry;
    const wet = cb.dataset.wet;
    if (!no) return;

    // Add parameter jika belum ada
    let existingParam = params.find(p => p.no === no);
    if (!existingParam) {
      addFromDB(no);
      existingParam = params.find(p => p.no === no);
    }

    if (!existingParam) { skipped++; return; }

    // Set nilai
    if (dry !== '' && dry !== undefined) {
      existingParam.cDry = dry;
    }
    if (wet !== '' && wet !== undefined) {
      existingParam.cWet = wet;
    }
    applied++;
  });

  // 5. Recalc
  if (data.debit_kemarau || data.debit_hujan) {
    recalcAll();
  } else {
    recalcAll();
  }
  renderParams();
  saveAuto();

  xlsImportClose();
  nav('bpm');
  toast(`✅ Import selesai: ${applied} parameter berhasil diisi${skipped > 0 ? `, ${skipped} dilewati` : ''}`);
};

// ─── UI Helpers ───────────────────────────────────────────────
function _showLog(msg, type) {
  const el = document.getElementById('xls-log-text');
  if (!el) return;
  const color = type === 'err' ? 'var(--red)' : type === 'warn' ? '#ffc800' : type === 'info' ? 'var(--mute)' : 'var(--txt2)';
  el.innerHTML += `<div style="color:${color};margin-bottom:3px">${msg}</div>`;
  el.scrollTop = el.scrollHeight;
}

function _setProgress(pct, label) {
  const bar = document.getElementById('xls-progress-bar');
  const lbl = document.getElementById('xls-progress-label');
  if (bar) bar.style.width = pct + '%';
  if (lbl) lbl.textContent = label;
}

})(); // end IIFE
