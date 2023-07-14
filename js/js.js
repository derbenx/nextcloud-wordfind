// for config
wl=document.getElementById('words').value;
var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");

var wdr, wxy, puz, wordlist, words, pzz, sz, z;
var bx=15, by=20;
var bw=bx*sz; var bh=by*sz;
var sx=bw/bx; var sy=bh/by;
var clck=[0,0,0,0]; 
var lmt=50; //tries to put word

document.body.onload = function(){ newg() }

document.getElementById("wfstart").onclick = function(){ newg(); }
document.getElementById("wfstart2").onclick = function(){ newg(); }
//document.getElementById("wfsize").onchange = function(){ newg() }

document.getElementById("word").onchange = function(){
 console.log('chg lst');
 var z=document.getElementById('word').selectedIndex;
 document.getElementById('words').value=wz[z];
}
document.getElementById("wftogsetup").onclick = function(){ 
 var cirtog=document.getElementById("wfconf");
 if (cirtog.style.display !== "none") { cirtog.style.display = "none"; }
 else { cirtog.style.display = "block"; }
}

wn=[];wz=[];
wn.push('Food');
wz.push('APPLESAUCE,BURGER,CHEESE,DOUGHNUTS,EGGROLL,FRITTER,GRAPEFRUIT,HOTDOG,ICECREAM,JALAPENO,KETCHUP,LEMONADE,MUSTARD,NACHO,ONIONS,PICKLES,QUESADILLA,ROOTBEER,SHORTBREAD,TORTILLA');
wn.push('Vehicles');
wz.push('lamborghini,ferrari,kawasaki,suzuki,buick,cadillac,dodge,corvette,ford,chrysler,hummer,polaris,shelby,tesla,viper,maserati,piaggio,honda,acura,hyundai,subaru,nissan,toyota,yamaha,daewoo,bentley,jaguar,lotus,austin');
wn.push("trees");
wz.push('cider,maple,birch,cherry,cucumber,cottonwood,hickory,hemlock,chestnut,beech,aspen,pine,willow,cedar,cypress,juniper,larch,redwood,spruce,alder,catalpa,hackberry,hazel,dogwood,holly,walnut,sweetgum,apple,orange,mulberry,poplar,elder');
wn.push('dogs');
wz.push('shepard,hound,bulldog,retriever,husky,poodle,collie,terrier,maltese,pomeranian,newfoundland,spaniel,corgi,dachshund,chowchow,dane,shihtzu,maltipoo,dalmation,chihuahua,boxer,sheep,pointer,dingo,setter,mastiff,beagle');
wn.push('cats');
wz.push('siamese,coon,sphynx,shorthair,burmese,ragdoll,persian,bobtail,korat,longhiar,cornish,himalayan,ragamuffin,ocicat,tabby,bambino,bengal,cyprus,foldex,dwelf,manx,lambkin,snowshow,somali,toyger,sokoke');
wn.push('clouds');
wz.push('Altocumulus,Altostratus,Cumulonimbus,Cirrocumulus,Cirrus,Cirrostratus,Cumulus,Nimbostratus,Stratocumulus,Stratus');

wn.push('Canada');
wz.push('Northwestterritories,Alberta,BritishColumbia,Manitoba,NewBrunswick,Newfoundland,Labrador,NovaScotia, Ontario,PrinceEdwardIsland,Quebec,Saskatchewan,Yukon,Nunavut');

wn.push('human bones 1');
wz.push('cervical,thoracic,lumbar,sacrum,coccygeal,sternum,ribs,cervical,cranial,occippial,parietal,frontal,temporal,sphenoid,ethmoid,nasal,maxillae,lacrimal,zygomatic,palatine,concha,vomer,hyoid,mandible,malleus,incus,stapes');

wn.push('human bones 2');
wz.push('humerus,pectoral,scapula,clavicle,ulna,radius,carpals,schaphoid,lunate,triquetral,pisiform,trapzoid,capitate,hamate,metacarpals,phlanges,pelvis,sacrum,coccyx,femur,patella,tibia,fibula,tarsus,calcaneus,talus,navicular,cuneiform,cuboid,metatarsals');

//colours,plants,berries,??

//wn.push('');
//wz.push('');

wn.push('user defined');
wz.push('type,your,words,here');

//wn.push('random');
//wl.push('Not implemented yet!');//if blank pull from word list.

document.getElementById('words').value=wz[0]; 
for(var i = 0; i < wz.length; i++) {
 var el = document.createElement("option");
 el.textContent = wn[i];
 el.value = wn[i];
 document.getElementById('word').appendChild(el);
}

// for wfgen!!!!

function newg(){
 document.getElementById("wfconf").style.display = "none";
 document.getElementById('wordz').innerHTML='';
 sz=document.getElementById("ftsize").value*1;
 z=0; clck=[0,0,0,0];
 lmt=50; //tries to put word

 //get values and resize board
 tmp=document.getElementById('wfsize').value;
 tmp=tmp.replace( /[^0-9x,]/g , '');
 tmp=tmp.split("x");
 tmp[0]=tmp[0]>200 ? 200 : tmp[0];
 tmp[0]=tmp[0]<10 ? 10 : tmp[0];
 tmp[1]=tmp[1]>200 ? 200 : tmp[1];
 tmp[1]=tmp[1]<10 ? 10 : tmp[1];
 bx=tmp[0]; by=tmp[1];
 bw=bx*sz; bh=by*sz;
 cnv.width=bw+sz+sz;
 cnv.height=bh+sz+sz;
   
 wl=document.getElementById('words').value;
 wl=wl.replace( /[^A-Za-z,]/g , '');
 wordlist=wl.toUpperCase().split(",");
 words=wordlist;
 words=sorty(words);
 //store word dir/coords
 wdr=[];
 wxy=[];
 puz=[];
 pzz="-".repeat((bx*by));
 ctx.strokeStyle = "grey";
 sx=bw/bx;sy=bh/by;
 //program
     cnt=0;
    for (var iw = 0; iw < words.length; iw++) {
     var stat=false;var li=0;
     while (stat==false&&li<lmt) {
      li++;
      var tx=Math.floor(Math.random() * bx)+1;
      var ty=Math.floor(Math.random() * by)+1;
      tstout=tstwrd(bx,by,words[iw],tx,ty);
      if (tstout) {
       stat=pword(tx,ty,bx,by,words[iw],tstout);
       //if (iw==0) { console.log(stat,words[iw],tx,ty) }
      }
     }
     if (li>=lmt) {
      wordlist = wordlist.filter(function(value, index, arr){
       return value!=words[iw];
      });
      //console.log('splice',words[iw],wordlist.length);
      }
     //console.log(wordlist);
     cnt=stat?cnt+1:cnt;
    }
    //console.log(cnt,words.length,wordlist.length);

 //answer (before fill puzzle)
  var tmp=new RegExp("(.{"+bx+"})","g");
  //console.log(pzz.replace(tmp,"$1\n"));
//fill puzzle 
textfill(sz,bx,by,bw,bh);
drpuzz();
  
 var div=document.getElementById('wordz');
 div.style.background='#ffffff';
 div.style.width=((sz*bx))+"px";
 div.style.padding=10+"px";
 var out = document.createTextNode(wordlist.join(", ").toLowerCase()); 
 div.appendChild(out);
}

 //functs
 function getwrd() {
  //console.log('xxx '+wordlist);
 }
 function sorty(arr) {
  return arr.concat().sort(function(a, b){ return b.length - a.length; });
}
 function drawBoard(z,x,y,w,h){
  ctx.lineWidth = 2;
  yy=p;
  for (var xx = 0; xx <= x; xx++) {
     ctx.moveTo(sz+(xx*sx), yy);
     ctx.lineTo(sz+(xx*sx), sz+(sy*y));
     ctx.stroke();
  }
  xx=p;
  for (var yy = 0; yy <= y; yy++) {
     ctx.moveTo(xx, p+(yy*sy));
     ctx.lineTo(sz+(sx*x), sz+(sy*yy));
     ctx.stroke();
  }
 }
 function textfill(z,x,y,w,h) {
    var tmp=new RegExp("(.{"+bx+"})","g"); ;
  //console.log(pzz.replace(tmp,"$1\n"));
  len=pzz.length;
  for (var xx=0; xx<len; xx++) {
 //console.log(xx, pzz[xx]);
    tmp= pzz[xx]=='-' ? String.fromCharCode(65+Math.floor(Math.random() * 26)): ''; 
    //console.log(pzz[xx],tmp);
    if (tmp) {
     pzz= pzz.substr(0, xx) +tmp+ pzz.substr(xx+1);
    }
  }
 }
 function text1(z,x,y,w,h,l) {
    ctx.font = z+"px Courier";ctx.fillStyle = l=='-' ? "#000000" : "#000000";
    tmp= l;
    ctx.fillText(tmp, (sx*.15)+sz+(sx*(x-1)), (-sy*.20)+sx+sz+(sy*(y-1))); 
    ctx.stroke();
 }
 function tstwrd(w,h,word,x,y) {
  var a=b=0; var out="";
  var tmp=word.length;
  //console.log(word,tmp,x,'x',y," ",w,'x',h);
  for (var i = 0; i <= 7; i++) {
   a=b=0;
  if (i==0 || i==4 || i==5) {
   a=w-(tmp+x);
  }
  if (i==1 || i==6 || i==5) {
   b=h-(tmp+y);
  }
  if (i==2 || i==7 || i==6) {
   a=x-tmp;
  }
  if (i==3 || i==7 || i==4) {
   b=y-tmp;
  }
   out= (a>=0 && b>=0) ? out+i:out;
  }
  return out;
 }
 
 /*
 734
 2x0
 615
 */

function pword(x,y,w,h,c,d){
  //console.log(d,x+'x'+y,c);
 var dr=d;var ox=x;var oy=y;var oc=c;var pzbu=pzz;
 var dd=Math.floor(Math.random() *dr.length);
 for (var tryd = 0; tryd < dr.length; tryd++) {
  x=ox;y=oy;c=oc;pzz=pzbu;err=0;
  //console.log("dd",dd,dr.length);
  if (dd>dr.length-1) { dd=0; }
  d=dr[dd];
 //console.log(dr,d);
 
 if (d==2 || d==6) { x=x+2; }
 if (d==3) { x=x+1;y=y+1; }
 if (d==5 || d==6 || d==1) { y=y-1; }
 if (d==4) { y=y+1; }
 if (d==1) { x=x+1; }
 if (d==7) { x=x+2;y=y+1; }
 for (var tmp = 0; tmp < c.length; tmp++) {
  if (d==0 || d==4 || d==5) {
   x++;
  }
  if (d==2 || d==7 || d==6) {
   x--;
  }
  if (d==1 || d==6 || d==5) {
   y++;
  }
  if (d==3 || d==7 || d==4) {
   y--;
  }
  ln=((y-1)*w)+x-1;
   
   var err=(pzz[ln-1]==c[tmp]||pzz[ln-1]=='-')?0:1;
   //console.log(d,err,pzz[ln],c,x,y);
   pzz=pzz.substr(0, ln-1) + c[tmp]+ pzz.substr(ln);
   if (err) { tmp=999; }
 }
 if (!err) {
  tryd=9999;
 } else {
 dd++;
 }
 //console.log(tryd);
 }
   //console.log(ln,c[tmp]);  
 if (err) { pzz=pzbu; return false; }
 else { return true; }
 }
function drpuzz(){
 for (var iy = 1; iy <= by; iy++) {
  for (var ix = 1; ix <= bx; ix++) {
   iz=pzz[((iy-1)*bx)+ix-1];
   //console.log(iz);
   text1(sz,ix,iy,bx,by,iz);
  }
 }
}

  //HUD

 canvas.addEventListener('click', function(evt) {
  //console.log(evt);
  var rect = canvas.getBoundingClientRect();
  x=Math.floor((evt.clientX-rect.left)/sz);y=Math.floor((evt.clientY-rect.top)/sz);
  x=x<1?1:x;y=y<1?1:y;
  x=x>bx?bx:x;y=y>by?by:y;
  z=(z==1)?0:1;
  var wf='';
  if (z==0 && clck[3]==0) {
   //console.log('str',clck[1],clck[2],'end',x,y);
   xyz='del';
   for (var ii = 0; ii < wordlist.length; ii++) {
    var tmp=wordlist[ii].split("").reverse().join("");
    if(clck[4]==wordlist[ii] || clck[4]==tmp){
     wf=wordlist[ii];
     //console.log(wf);
     wordlist[ii]="<"+xyz+" style='color:red;'>"+wordlist[ii]+"</"+xyz+">";
    }
   }
   if (wf) {
    tmp=wordlist.join(", ").toLowerCase();
    //tmp=tmp?tmp:'<h2>Congrats!</h2>';
    document.getElementById('wordz').innerHTML=tmp;
   }
  }
  clck=[z,x,y];
 }, false);
  
 canvas.addEventListener('mousemove', function(evt) {
  var lerr=1;
  ctx.clearRect(0, 0, bw+sz+5, bh+sz+5);

  drpuzz();
  x=Math.floor((evt.offsetX)/sz); y=Math.floor((evt.offsetY)/sz);
  x=x<1?1:x;y=y<1?1:y;
  x=x>bx?bx:x;y=y>by?by:y;
  var wordy='';
  //console.log(clck,[x,y],evt.offsetX,evt.offsetY);
  
   if (clck[0]==0){
    ctx.strokeStyle = "grey";
   ctx.beginPath();
   ctx.arc((x*sx)+sz-(sx/2), (y*sy)+sz-(sx/2), sz/2, 0, 2 * Math.PI);
   ctx.stroke();
  }else {
    ctx.strokeStyle = "red";
    ctx.beginPath();
   ctx.arc((clck[1]*sx)+sz-(sx/2), (clck[2]*sy)+sz-(sx/2), sz/2, 0, 2 * Math.PI);
   ctx.stroke();
   
    //ctx.strokeStyle = "red";
    ctx.beginPath();
   ctx.arc((x*sx)+sz-(sx/2), (y*sy)+sz-(sx/2), sz/2, 0, 2 * Math.PI);
   ctx.stroke();
   
   if (clck[1]==x) {
    lerr=0;
    //console.log('line|');
    var hi=clck[2]>y?clck[2]:y;
    var lo=clck[2]<y?clck[2]:y;
     for(var ii=hi-lo;ii>=0;ii--) {
      ctx.beginPath();
      ctx.arc(((x)*sx)+sz-(sx/2), ((hi-ii)*sy)+sz-(sx/2), sz/2, 0, 2 * Math.PI);
     ctx.stroke();
     
     wordy=wordy+pzz[(((hi-ii)-1)*bx)+x-1];
     }
   }
   if (clck[2]==y) {
    lerr=0;
    //console.log('line-');
    var hi=clck[1]>x?clck[1]:x;
    var lo=clck[1]<x?clck[1]:x;
     for(var ii=hi-lo;ii>=0;ii--) {
      ctx.beginPath();
      ctx.arc(((hi-ii)*sx)+sz-(sx/2), ((y)*sy)+sz-(sx/2), sz/2, 0, 2 * Math.PI);
     ctx.stroke();
     
     wordy=wordy+pzz[(((y)-1)*bx)+(hi-ii)-1];
     }
   }
   if (clck[1]+clck[2]==x+y) {
    lerr=0;
    //console.log('diag/');
    var hi=clck[1]>x?clck[1]:x;
    var lo=clck[1]<x?clck[1]:x;
    for(var ii=hi-lo;ii>=0;ii--) {
     tx=lo+ii;
     ty=(clck[2]>y?clck[2]:y);

     ctx.beginPath();
     ctx.arc(((tx)*sx)+sz-(sx/2), ((ty-ii)*sy)+sz-(sx/2), sz/2, 0, 2 * Math.PI);
     ctx.stroke();
     
     wordy=wordy+pzz[(((ty-ii)-1)*bx)+tx-1];
    }
   }
   if (clck[1]-clck[2]==x-y) {
    lerr=0;
    //console.log('diag\\');
    var hi=clck[1]>x?clck[1]:x;
    var lo=clck[1]<x?clck[1]:x;
    //console.log(hi-lo,hi,lo,ii);
    for(var ii=hi-lo;ii>=0;ii--) {
     tx=hi-ii;
     ty=(clck[2]>y?clck[2]:y);
     //console.log("\\",ii,tx,ty);
     
     ctx.beginPath();
     ctx.arc(((hi-ii)*sx)+sz-(sx/2), (((clck[2]>ty?clck[2]:ty)-ii)*sy)+sz-(sx/2), sz/2, 0, 2 * Math.PI);
     ctx.stroke();
     wordy=wordy+pzz[(((ty-ii)-1)*bx)+tx-1];
    }
   }
  }
  clck[3]=lerr;
  clck[4]=wordy;
 }, false);
 