import"../chunks/Bzak7iHL.js";import{h as P,a as fe,f as re,aE as Pe,b as Ee,E as Ie,d as je,aF as Ne,af as Ue,ad as Fe,c as Je,a3 as ye,a2 as be,D as qe,p as $e,a5 as He,ag as Oe,V as S,X as c,ax as _,Z as w,_ as y,ay as D,aw as x,aA as We,W as M,A as o,az as E,C as L,av as I,aG as Ve,U as G,Y as K,u as ce,aH as Ze,R as Te,B as Ye}from"../chunks/Dzm_WEGj.js";import{i as Ge,b as we,a as k,d as Ke}from"../chunks/ZgVi19R2.js";import{b as _e,c as ze,e as q,i as $,d as Qe,s as ea,f as aa,g as na}from"../chunks/tSoxctGi.js";import{c as le}from"../chunks/DH1QYJyw.js";import{s as de,p as Y}from"../chunks/ihUrmXYw.js";import{S as ta,h as Se,c as ra}from"../chunks/Dj1OqQjd.js";import{i as J}from"../chunks/C0w0nz2X.js";import{s as sa}from"../chunks/BIhypZ3Q.js";import{b as ia}from"../chunks/8Hm6JYMG.js";function pe(e,a,t,r,i,d){let u=P;P&&fe();var g,f,s=null;P&&re.nodeType===Pe&&(s=re,fe());var h=P?re:e,n,l=ze;Ee(()=>{const m=a()||null;var v=m==="svg"?Ne:null;if(m!==g){var p=ze;_e(l),n&&(m===null?$e(n,()=>{n=null,f=null}):m===f?He(n):(Oe(n),we(!1))),m&&m!==f&&(n=je(()=>{if(s=P?s:v?document.createElementNS(v,m):document.createElement(m),Ue(s,s),r){P&&Ge(m)&&s.append(document.createComment(""));var b=P?Fe(s):s.appendChild(Je());P&&(b===null?ye(!1):be(b)),r(s,b)}qe.nodes_end=s,h.before(s)})),g=m,g&&(f=g),we(!0),_e(p)}},Ie),u&&(ye(!0),be(h))}var xe={},se={},ie=34,Z=10,oe=13;function Re(e){return new Function("d","return {"+e.map(function(a,t){return JSON.stringify(a)+": d["+t+'] || ""'}).join(",")+"}")}function oa(e,a){var t=Re(e);return function(r,i){return a(t(r),i,e)}}function Ce(e){var a=Object.create(null),t=[];return e.forEach(function(r){for(var i in r)i in a||t.push(a[i]=i)}),t}function R(e,a){var t=e+"",r=t.length;return r<a?new Array(a-r+1).join(0)+t:t}function la(e){return e<0?"-"+R(-e,6):e>9999?"+"+R(e,6):R(e,4)}function da(e){var a=e.getUTCHours(),t=e.getUTCMinutes(),r=e.getUTCSeconds(),i=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":la(e.getUTCFullYear())+"-"+R(e.getUTCMonth()+1,2)+"-"+R(e.getUTCDate(),2)+(i?"T"+R(a,2)+":"+R(t,2)+":"+R(r,2)+"."+R(i,3)+"Z":r?"T"+R(a,2)+":"+R(t,2)+":"+R(r,2)+"Z":t||a?"T"+R(a,2)+":"+R(t,2)+"Z":"")}function pa(e){var a=new RegExp('["'+e+`
\r]`),t=e.charCodeAt(0);function r(n,l){var m,v,p=i(n,function(b,z){if(m)return m(b,z-1);v=b,m=l?oa(b,l):Re(b)});return p.columns=v||[],p}function i(n,l){var m=[],v=n.length,p=0,b=0,z,C=v<=0,T=!1;n.charCodeAt(v-1)===Z&&--v,n.charCodeAt(v-1)===oe&&--v;function A(){if(C)return se;if(T)return T=!1,xe;var O,B=p,X;if(n.charCodeAt(B)===ie){for(;p++<v&&n.charCodeAt(p)!==ie||n.charCodeAt(++p)===ie;);return(O=p)>=v?C=!0:(X=n.charCodeAt(p++))===Z?T=!0:X===oe&&(T=!0,n.charCodeAt(p)===Z&&++p),n.slice(B+1,O-1).replace(/""/g,'"')}for(;p<v;){if((X=n.charCodeAt(O=p++))===Z)T=!0;else if(X===oe)T=!0,n.charCodeAt(p)===Z&&++p;else if(X!==t)continue;return n.slice(B,O)}return C=!0,n.slice(B,v)}for(;(z=A())!==se;){for(var H=[];z!==xe&&z!==se;)H.push(z),z=A();l&&(H=l(H,b++))==null||m.push(H)}return m}function d(n,l){return n.map(function(m){return l.map(function(v){return h(m[v])}).join(e)})}function u(n,l){return l==null&&(l=Ce(n)),[l.map(h).join(e)].concat(d(n,l)).join(`
`)}function g(n,l){return l==null&&(l=Ce(n)),d(n,l).join(`
`)}function f(n){return n.map(s).join(`
`)}function s(n){return n.map(h).join(e)}function h(n){return n==null?"":n instanceof Date?da(n):a.test(n+="")?'"'+n.replace(/"/g,'""')+'"':n}return{parse:r,parseRows:i,format:u,formatBody:g,formatRows:f,formatRow:s,formatValue:h}}var ca=pa(","),ha=ca.parse,ua=S('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function ga(e){var a=ua();c(e,a)}var va=S('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"/> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function ma(e){var a=va();c(e,a)}var fa=S('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function ya(e){const a=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var t=fa(),r=_(w(t),2);q(r,17,()=>a,$,(i,d)=>{let u=()=>o(d).tag,g=()=>o(d).text;var f=D(),s=x(f);pe(s,u,!1,(h,n)=>{var l=We();M(()=>k(l,g())),c(n,l)}),c(i,f)}),y(t),c(e,t)}var ba=S("<p> </p>");function wa(e,a){var t=ba(),r=w(t);y(t),M(()=>k(r,`I am component A and my favorite number is ${a.number??""}.`)),c(e,t)}var _a=S("<p> </p>");function za(e,a){var t=_a(),r=w(t);y(t),M(()=>k(r,`I am component B and my name is ${a.name??""}.`)),c(e,t)}var Sa=S('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function xa(e){const a={A:wa,B:za},t=[{component:"A",number:42},{component:"B",name:"Russell"}];var r=Sa(),i=_(w(r),2);q(i,17,()=>t,$,(d,u)=>{const g=E(()=>a[o(u).component]);var f=D(),s=x(f);le(s,()=>o(g),(h,n)=>{n(h,de(()=>o(u)))}),c(d,f)}),y(r),c(e,r)}var Ca=S('<div><p class="svelte-12sq0x6"> </p></div>'),Ta=S('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function Ra(e){let a=I(void 0);var t=Ta(),r=w(t),i=_(w(r)),d=w(i,!0);y(i),y(r);var u=_(r,4);ta(u,{get value(){return o(a)},set value(g){L(a,g,!0)},children:(g,f)=>{var s=D(),h=x(s);q(h,16,()=>[0,1,2,3,4],$,(n,l,m)=>{const v=E(()=>o(a)===m);var p=Ca();let b;var z=w(p),C=w(z,!0);y(z),y(p),M(T=>{b=Qe(p,1,"step svelte-12sq0x6",null,b,T),k(C,l)},[()=>({active:o(v)})]),c(n,p)}),c(g,s)},$$slots:{default:!0}}),Ve(2),y(t),M(()=>k(d,o(a)||"-")),c(e,t)}const Da=`{
  "intro": [
    {
      "id": "0",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "10-11",
      "year": "2015",
      "sizeRange": "juniors",
      "avatarDisplay": "percentile-only",
      "highlightedPercentile": "50",
      "stepPosition": "center"
    },
    {
      "id": "1",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "10-11",
      "year": "2015",
      "sizeRange": "juniors",
      "avatarDisplay": "percentile-only",
      "highlightedPercentile": "50",
      "sizeBands": "S, M, L",
      "sizeType": "alpha",
      "bandColor": "green",
      "stepPosition": "center",
      "bandHeight": "avatar-centered",
      "text": "<p>“Junior” clothing lines often channel this interest with youthful styles that fit tweens and teens as they grow.</p>\\r\\n\\r\\n\\r\\n<p>The median <span class=bold>11-year-old</span> can typically wear a size <span class=orange-outline>Medium</span> in the Juniors section.</p>"
    },
    {
      "id": "2",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "10-11",
      "year": "2015",
      "sizeRange": "juniors",
      "avatarStyle": "greyscale",
      "avatarDisplay": "all",
      "highlightedPercentile": "50",
      "sizeBands": "XXS, XS, S, M, L, XL, XXL",
      "sizeType": "alpha",
      "bandColor": "green",
      "stepPosition": "right",
      "bandHeight": "full",
      "text": "<p>But not all tweens wear the same size.</p>\\r\\n\\r\\n\\r\\n<p>If we were to look at a sample of all <span class=bold>10- and 11-year-old girls</span> in the U.S., here are the Juniors sizes that match up with their body measurements.</p>\\r\\n\\r\\n\\r\\n<p>Notice that there are sizes available for most girls in this age group.</p>"
    },
    {
      "id": "3",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "14-15",
      "year": "2015",
      "sizeRange": "juniors",
      "avatarStyle": "greyscale",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "XXS, XS, S, M, L, XL, XXL",
      "sizeType": "alpha",
      "bandColor": "green",
      "stepPosition": "right",
      "bandHeight": "full",
      "text": "<p>By <span class=bold>age 15</span>, most girls have gone through growth spurts and puberty, and they’ve reached their adult height. Many have started to outgrow the Junior size section.</p>"
    },
    {
      "id": "4",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "14-15",
      "year": "2021",
      "sizeRange": "straight",
      "avatarStyle": "greyscale",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "XXS, XS, S, M, L, XL, XXL",
      "sizeType": "alpha",
      "bandColor": "green",
      "stepPosition": "right",
      "text": "<p>If they tried wearing clothes made for adult women, here are the sizes that would generally fit most <span class=bold>14- and 15-year-olds.</span></p> \\r\\n\\r\\n\\r\\n<p>It’s unlikely that each size will fit every teen perfectly (more on that later), however this marks an important turning point.</p>"
    },
    {
      "id": "5",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "14-15",
      "year": "2021",
      "sizeRange": "straight",
      "avatarStyle": "greyscale",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "XXS, XS, S, M, L, XL, XXL",
      "sizeType": "alpha",
      "bandColor": "green",
      "stepPosition": "center-vertical",
      "bandHeight": "full",
      "text": "<p>This will be the first time that nearly every girl their age will have women’s sizes available that are <span class=orange-outline>within an inch of their waistline</span> measurements…</p>"
    },
    {
      "id": "6",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "14-15",
      "year": "2021",
      "sizeRange": "straight",
      "avatarStyle": "greyscale",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "XXS, XS, S, M, L, XL, XXL",
      "sizeType": "alpha",
      "bandColor": "green",
      "stepPosition": "center-vertical",
      "bandHeight": "full",
      "text": "<p>...this will also likely be <span class=bold> the last time this ever happens in their lifetimes.</span></p>"
    },
    {
      "id": "7",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "20-29",
      "year": "2021",
      "sizeRange": "straight",
      "avatarStyle": "greyscale",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "XXS, XS, S, M, L, XL, XXL",
      "sizeType": "alpha",
      "bandColor": "green",
      "highlightBand": "M",
      "highlightBandColor": "orange",
      "text": "By their 20s, a <span class=orange-outline>size Medium</span> will no longer reflect the median or average woman’s waistline."
    },
    {
      "id": "8",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "20-29",
      "year": "2021",
      "sizeRange": "straight",
      "avatarStyle": "greyscale",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "12, 14, 16",
      "sizeType": "numeric",
      "bandColor": "green",
      "text": "<p>Instead, <span class=bold> the median 20-something</span> fits a <span class=orange-outline>size 14</span>.</p>\\r\\n\\r\\n\\r\\n<p>This places them in the middle of what’s sometimes called the “mid-size gap” — a murky space that varies from brand to brand in determining where “regular-” or “straight-size” clothing lines end, and separate “plus-size” ranges begin.</p>"
    },
    {
      "id": "9",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "20 and over",
      "year": "2021",
      "sizeRange": "straight",
      "avatarStyle": "greyscale",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "00, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20",
      "sizeType": "numeric",
      "bandColor": "green",
      "highlightBand": "18",
      "highlightBandColor": "orange",
      "text": "<p>Sizing options are even worse when you look at all <span class=bold>adult women over the age of 20.</span></p>\\r\\n\\r\\n\\r\\n<p>The median woman in the U.S. fits around a <span class=orange-outline>size 18</span> based on their waistline measurement.</p>"
    },
    {
      "id": "10",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "20+",
      "year": "2021",
      "sizeRange": "straight",
      "avatarStyle": "greyscale",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "00, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20",
      "sizeType": "numeric",
      "bandColor": "green",
      "text": "<p>Only a small portion of brands carry sizes <span class=orange-outline>larger than a size 16.</span></p>\\r\\n<p>That leaves nearly <span class=bold>three-quarters of all women</span> without sizing options at all</p>"
    },
    {
      "id": "11",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "20+",
      "year": "2021",
      "sizeRange": "straight",
      "avatarStyle": "greyscale",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "00, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20",
      "sizeType": "numeric",
      "bandColor": "green",
      "text": ""
    }
  ],
  "introText": "Like many girls her age, she loves to keep up with the latest fashion trends and explore new ways to express herself.",
  "titlePage": [
    {
      "id": "0",
      "title": "Sized Out",
      "subtitle": "What happens when women’s clothing sizes fit more teens than adults",
      "paragraphs": {
        "0": "Most adult women do not look like teen girls — nor should they.",
        "1": "As they age and reach major life milestones in adulthood — perhaps graduation, marriage, having kids, or advancing in their career — their bodies continue to develop and change.",
        "2": "But for most women as they progress through life, the range of accessible clothing options will become smaller and smaller. Many, if not most, will have no available sizing options at all."
      }
    }
  ],
  "section2": [
    {
      "id": "0",
      "subhed": "This has been a problem for a very, very long time",
      "text": "<p>Many people are likely all-too familiar with the ego-deflating experience of trying on a pair of pants that they expected to fit — but they don’t.</p><p>TKMany factors determine “good” fit</p><ul><li>Waistline is one of several important measurements</li><li>Personal preferences vary on tight-vs loose-fitting clothes</li><li>Boxy styles & stretch fabrics give more wiggle room to squeeze into smaller sizes</li></ul><p>For years, many have blamed sizing inconsistencies on so-called “vanity sizing,” a practice that assumes women are more likely to buy clothes labeled as sizes that are smaller than they actually are.</p><p> Indeed, vanity sizing has undoubtedly shifted how we label each size. But there’s more to the story. </p>"
    }
  ],
  "vanitySizing": [
    {
      "id": "0",
      "text": "<p>Here is what standard sizes looked like in 1995.</p><p>There was 12.5” separating the smallest size 2 (24”) and the largest size 20 (36.5”).</p>"
    },
    {
      "id": "1",
      "text": "<p>Today, that gap is 15.2” between the smallest size 00 (25.38”) and the largest size (40”). While additional sizes for 00 and 0 were added in the early 2000s, all waistline measurements were larger regardless of size."
    },
    {
      "id": "2",
      "text": "<p>Notice how in 1995 a 27-inch waist was considered a <span data-underline=\\"#C2D932\\">size 8</span> — in 2021 it was between <span data-underline=\\"#C2D932\\">sizes 2 and 4</span> — and today’s size 8 is 2.5 inches bigger.</p>"
    },
    {
      "id": "3",
      "text": "<p>Waistlines in the U.S. have also increased since the mid-90s.</p>\\r\\n<p>Between 1988 and 1994, the average woman’s waistline was <span data-underline=\\"#C2D932\\">34.88 inches</span>. By 2018, it was <span data-underline=\\"#C2D932\\">38.74 inches</span></p>"
    },
    {
      "id": "4",
      "text": "<p>In both cases, both 30 years ago and today, the median waistline roughly lined up with the size 18 that was available at that time (if at all).</p>"
    }
  ],
  "ASTMtransition": [
    {
      "id": "0",
      "subhed": "Mass-produced clothes don’t fit every body",
      "text": "<p>Just because one particular size may fit at a person’s waistline, that doesn’t mean the overall garment will fit.</p><p>An organization called ASTM International has tried to standardize apparel with a universal size chart that is updated every decade or so. Brands and manufacturers are meant to use this sizing system as a template to develop their unique size ranges.</p><p>With each update, however, the ASTM sizes have continued to skew toward the smallest women, leaving out nearly half of the population </p><p>In many ways, this has been intentional.</p><p>ASTM has said itself that it’s not trying to develop a system that accurately reflects modern demographics in America.</p><p>Instead, the system is just as much tailored to conventional beauty standards and what clothing brands consider to be their ideal customer.</p>"
    }
  ],
  "proportions": [
    {
      "id": "0",
      "text": "<p>If we were to take the waist and hip measurements of the <span class=blue-span>median woman</span> in the U.S., here’s a broad look at what those proportions would look like.<p>\\r\\n\\r\\n\\r\\n<p>Notice there’s just over a 4” difference between her waist and hip measurements.</p>"
    },
    {
      "id": "1",
      "text": "<p>Let’s say that our typical adult woman goes shopping at J.Crew.</p>\\r\\n\\r\\n\\r\\n<p>If she were to try on a pair of pants that fit her waist, she could try and squeeze into a <span class=green-span>size 18</span>, which is within ¾” of her measurements.</p>\\r\\n\\r\\n\\r\\n<p>Doing so, however, would mean the pants were made for someone with hips that are roughly <span class=bold> 6 inches larger</span> than hers.</p>"
    },
    {
      "id": "2",
      "text": "<p>If the median American woman were to prioritize finding pants that are fitted around her backside, she would have the opposite problem as before.</p>\\r\\n\\r\\n\\r\\n<p>Here, a <span class=green-span>size 12</span> would fit her hips best, but then the waist would be too small by more than <span class=bold>6 inches</span>."
    },
    {
      "id": "3",
      "text": "<p>J.Crew is hardly an outlier.</p>\\r\\n\\r\\n\\r\\n<p>The foundation for most — if not all — mainstream fashion brands is based on an hourglass silhouette.</p>\\r\\n\\r\\n\\r\\n<p>For brands like J.Crew, Anthropologie, Ralph Lauren, Aritizia, and more, that means a <span class=bold>10-inch</span> difference between the waist and hip from the <span class=orange-span>biggest size</span> to the <span class=purple-span>smallest size.</span></p>"
    },
    {
      "id": "4",
      "text": "<p>Surprisingly, it’s not uncommon for all sizes to have the exact same hourglass proportions.</p>"
    }
  ],
  "history": [
    {
      "id": "0",
      "text": "<p>The underlying foundation of the modern sizing system is inherently skewed by age and race as well. </p>\\r\\n\\r\\n\\r\\n<p>It’s based on a 1941 study that only captured the body measurements of white, mostly young, middle class women from urban areas within just a handful of states.</p>\\r\\n\\r\\n\\r\\n<p>Since the sizing chart’s inception, measurements have been tailored to young, white bodies while promoting conventional beauty standards like the hourglass silhouette. \\r\\n\\r\\n\\r\\nThis matters because we know that age and genetics factor quite a bit into our shape and body proportions. \\r\\n\\r\\n\\r\\nThe result has meant that middle aged black and hispanic women have had a particularly difficult time accessing sizes that fit </p>"
    }
  ],
  "sizeCharts": [
    {
      "id": "0",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "excludeNearMedian",
      "text": "Many prominent (particularly high-end) brands do not carry sizes higher than a size 14 or 16. Smaller than both the <span class=orange-span> average woman’s waistline of 37.68”</span> and <span class=green-span>ASTM guides.</span>"
    },
    {
      "id": "1",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "null",
      "text": "Some brands carry extended options within their <span class=blue-span>“Regular” or “Straight”</span> size ranges that extend beyond the median."
    },
    {
      "id": "2",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "While others have a <span class=purple-span>“Plus”</span> size range that is kept separate, often with simpler styles that differ from other straight size collections."
    },
    {
      "id": "3",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "TK"
    }
  ]
}`;var ka=S("<p><!></p>"),Ma=S("<section><!></section>");function Xa(e,a){G(a,!0);let t=Y(a,"components",19,()=>({})),r=Y(a,"body",19,()=>[]);var i=D(),d=x(i);q(d,17,r,$,(u,g)=>{let f=()=>o(g).section,s=()=>o(g).content;const h=E(()=>f().toLowerCase().replace(/[^a-z0-9]/g,"")),n=E(()=>t()[f()]);var l=Ma(),m=w(l);{var v=b=>{var z=D(),C=x(z);le(C,()=>o(n),(T,A)=>{A(T,de(s))}),c(b,z)},p=b=>{var z=D(),C=x(z);q(C,17,s,$,(T,A,H,O)=>{let B=()=>o(A).type,X=()=>o(A).value;const he=E(()=>t()[B()]),De=E(()=>typeof X()=="string");var ue=D(),ke=x(ue);{var Me=j=>{var W=D(),Q=x(W);le(Q,()=>o(he),(ee,ae)=>{ae(ee,de(X))}),c(j,W)},Xe=j=>{var W=D(),Q=x(W);{var ee=N=>{var U=ka(),ne=w(U);Se(ne,X),y(U),c(N,U)},ae=N=>{var U=D(),ne=x(U);{var Ae=F=>{var V=D(),te=x(V);pe(te,B,!1,(ge,ve)=>{var me=D(),Le=x(me);Se(Le,X),c(ve,me)}),c(F,V)},Be=F=>{var V=D(),te=x(V);pe(te,B,!1,(ge,ve)=>{aa(ge,()=>({...X()}))}),c(F,V)};J(ne,F=>{o(De)?F(Ae):F(Be,!1)},!0)}c(N,U)};J(Q,N=>{B()==="text"?N(ee):N(ae,!1)},!0)}c(j,W)};J(ke,j=>{o(he)?j(Me):j(Xe,!1)})}c(T,ue)}),c(b,z)};J(m,b=>{o(n)?b(v):b(p,!1)})}y(l),M(()=>ea(l,"id",o(h))),c(u,l)}),c(e,i),K()}var Aa=S('<p> </p> <progress max="100"></progress>',1);function Ba(e,a){let t=Y(a,"label",3,"A"),r=Y(a,"value",3,0);var i=Aa(),d=x(i),u=w(d,!0);y(d);var g=_(d,2);M(()=>{k(u,t()),na(g,r())}),c(e,i)}var La=S('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function Pa(e,a){G(a,!0);const{body:t}=ra,r={Test:Ba};var i=La(),d=_(w(i),2),u=w(d),g=w(u,!0);y(u),y(d);var f=_(d,2);Xa(f,{get components(){return r},get body(){return t}}),y(i),M(s=>k(g,s),[()=>Da.replace(/\t/g," ")]),c(e,i),K()}const Ea=(e,a=Te)=>{var t=Ia(),r=w(t),i=w(r,!0);y(r);var d=_(r,2),u=w(d,!0);y(d),y(t),M(()=>{k(i,a().name),k(u,a().age)}),c(e,t)};var Ia=S('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),ja=(e,a)=>Ze(a),Na=(e,a)=>a.random(Math.floor(Math.random()*10)),Ua=S('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function Fa(e,a){G(a,!0),Y(a,"age",3,30);const t=[{name:"John",age:30},{name:"Jill",age:45}];let r=I(0),i=E(()=>o(r)*2),d=E(()=>o(r)*2),u=I(0);ce(()=>{L(u,o(r)*2)});var g=Ua(),f=_(x(g),4);f.__click=[ja,r];var s=_(f,2),h=w(s);y(s);var n=_(s,2),l=w(n);y(n);var m=_(n,2),v=w(m);y(m);var p=_(m,4),b=w(p);sa(b,()=>a.children??Te),y(p);var z=_(p,4);z.__click=[Na,a];var C=_(z,4);q(C,21,()=>t,$,(T,A)=>{Ea(T,()=>o(A))}),y(C),M(()=>{k(h,`${o(r)??""} doubled is ${o(i)??""} (derived)`),k(l,`${o(r)??""} doubled is ${o(d)??""} (derived by)`),k(v,`${o(r)??""} doubled is ${o(u)??""} ($effect)`)}),c(e,g),K()}Ke(["click"]);const Ja=(e,a)=>{let t=I(Ye(e)),r=I(null),i=I(!0),d=I(void 0);const u=(s=!0)=>{L(i,s,!0),s===!0&&(L(d,null),L(r,null))},g=async()=>{try{const s=await fetch(o(t),a);if(!s.ok)throw new Error(`Unexpected error occurred (status ${s.status})`);let h;if(o(t).includes(".csv")){const n=await s.text();h=ha(n)}else h=await s.json();return[null,h]}catch(s){const{errorMessage:h="Unexpected error eccurred"}=s;return[h,null]}},f=async s=>{u(!0);const[h,n]=await g();if(s===o(t)){if(h){u(!1),L(d,h,!0);return}u(!1),L(r,n,!0)}};return ce(()=>{f(o(t))}),{get data(){return o(r)},get loading(){return o(i)},get error(){return o(d)},get url(){return o(t)},set url(s){o(t)!==s&&L(t,s,!0)}}};var qa=S("<p>loading data...</p>"),$a=S("<p> </p>"),Ha=S("<p>data loaded</p> <pre> </pre>",1),Oa=S('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function Wa(e,a){G(a,!0);const t=`${ia}/assets/demo/test.csv`,r=Ja(t);ce(()=>{});var i=Oa(),d=_(w(i),2),u=w(d);{var g=s=>{var h=qa();c(s,h)},f=s=>{var h=D(),n=x(h);{var l=v=>{var p=$a(),b=w(p);y(p),M(()=>k(b,`error: ${r.error??""}`)),c(v,p)},m=v=>{var p=Ha(),b=_(x(p),2),z=w(b,!0);y(b),M(C=>k(z,C),[()=>JSON.stringify(r.data,null,2)]),c(v,p)};J(n,v=>{r.error?v(l):v(m,!1)},!0)}c(s,h)};J(u,s=>{r.loading?s(g):s(f,!1)})}y(d),y(i),c(e,i),K()}var Va=S('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function Za(e){let a=I(0);function t(l){console.log(l)}var r=Va(),i=_(w(r),2);Fa(i,{random:t,get value(){return o(a)},set value(l){L(a,l,!0)}});var d=_(i,2);ga(d);var u=_(d,2);ma(u);var g=_(u,2);ya(g);var f=_(g,2);xa(f);var s=_(f,2);Pa(s,{});var h=_(s,2);Wa(h,{});var n=_(h,2);Ra(n),y(r),c(e,r)}function on(e){Za(e)}export{on as component};
