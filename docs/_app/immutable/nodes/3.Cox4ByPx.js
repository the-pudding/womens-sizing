import"../chunks/Bg9kRutz.js";import{h as L,a as ye,d as oe,b as Be,E as Le,c as Pe,aC as xe,A as Fe,Z as je,m as we,s as be,J as Ee,p as Ne,o as Ue,B as Je,aq as w,j as y,r as m,ap as x,t as k,G as l,Q as P,aD as qe,g as ee,i as ne,u as ge,n as Ce}from"../chunks/CHpXfHxC.js";import{a as B,b as F,u as He}from"../chunks/DePmqZqp.js";import{b as Oe,t as S,a as c,d as T,e as We}from"../chunks/2RHIJwYn.js";import{s as he,a as j,p as Q}from"../chunks/C0OSuYLt.js";import{i as $e,a as R,e as Ze}from"../chunks/BICklgLg.js";import{e as H,i as O,a as Ve,s as Ge,b as Ke,c as Qe}from"../chunks/C34DALMk.js";import{c as ce}from"../chunks/BzjdYSR-.js";import{S as Ye,c as en}from"../chunks/ecrSCQeR.js";import{i as q}from"../chunks/BjTP7FKN.js";import{h as _e,s as nn}from"../chunks/3DW0JWpV.js";import{b as an}from"../chunks/BtVE_5_u.js";function ue(e,n,a,r,i,p){let g=L;L&&ye();var u,f,s=null;L&&oe.nodeType===1&&(s=oe,ye());var d=L?oe:e,t;Be(()=>{const o=n()||null;var _=o==="svg"?xe:null;o!==u&&(t&&(o===null?Ne(t,()=>{t=null,f=null}):o===f?Ue(t):Je(t)),o&&o!==f&&(t=Pe(()=>{if(s=L?s:_?document.createElementNS(_,o):document.createElement(o),Oe(s,s),r){L&&$e(o)&&s.append(document.createComment(""));var h=L?Fe(s):s.appendChild(je());L&&(h===null?we(!1):be(h)),r(s,h)}Ee.nodes_end=s,d.before(s)})),u=o,u&&(f=u))},Le),g&&(we(!0),be(d))}var ze={},le={},de=34,K=10,pe=13;function De(e){return new Function("d","return {"+e.map(function(n,a){return JSON.stringify(n)+": d["+a+'] || ""'}).join(",")+"}")}function tn(e,n){var a=De(e);return function(r,i){return n(a(r),i,e)}}function Se(e){var n=Object.create(null),a=[];return e.forEach(function(r){for(var i in r)i in n||a.push(n[i]=i)}),a}function D(e,n){var a=e+"",r=a.length;return r<n?new Array(n-r+1).join(0)+a:a}function rn(e){return e<0?"-"+D(-e,6):e>9999?"+"+D(e,6):D(e,4)}function sn(e){var n=e.getUTCHours(),a=e.getUTCMinutes(),r=e.getUTCSeconds(),i=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":rn(e.getUTCFullYear())+"-"+D(e.getUTCMonth()+1,2)+"-"+D(e.getUTCDate(),2)+(i?"T"+D(n,2)+":"+D(a,2)+":"+D(r,2)+"."+D(i,3)+"Z":r?"T"+D(n,2)+":"+D(a,2)+":"+D(r,2)+"Z":a||n?"T"+D(n,2)+":"+D(a,2)+"Z":"")}function on(e){var n=new RegExp('["'+e+`
\r]`),a=e.charCodeAt(0);function r(t,o){var _,h,v=i(t,function(b,z){if(_)return _(b,z-1);h=b,_=o?tn(b,o):De(b)});return v.columns=h||[],v}function i(t,o){var _=[],h=t.length,v=0,b=0,z,C=h<=0,M=!1;t.charCodeAt(h-1)===K&&--h,t.charCodeAt(h-1)===pe&&--h;function I(){if(C)return le;if(M)return M=!1,ze;var $,A=v,X;if(t.charCodeAt(A)===de){for(;v++<h&&t.charCodeAt(v)!==de||t.charCodeAt(++v)===de;);return($=v)>=h?C=!0:(X=t.charCodeAt(v++))===K?M=!0:X===pe&&(M=!0,t.charCodeAt(v)===K&&++v),t.slice(A+1,$-1).replace(/""/g,'"')}for(;v<h;){if((X=t.charCodeAt($=v++))===K)M=!0;else if(X===pe)M=!0,t.charCodeAt(v)===K&&++v;else if(X!==a)continue;return t.slice(A,$)}return C=!0,t.slice(A,h)}for(;(z=I())!==le;){for(var W=[];z!==ze&&z!==le;)W.push(z),z=I();o&&(W=o(W,b++))==null||_.push(W)}return _}function p(t,o){return t.map(function(_){return o.map(function(h){return d(_[h])}).join(e)})}function g(t,o){return o==null&&(o=Se(t)),[o.map(d).join(e)].concat(p(t,o)).join(`
`)}function u(t,o){return o==null&&(o=Se(t)),p(t,o).join(`
`)}function f(t){return t.map(s).join(`
`)}function s(t){return t.map(d).join(e)}function d(t){return t==null?"":t instanceof Date?sn(t):n.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:r,parseRows:i,format:g,formatBody:u,formatRows:f,formatRow:s,formatValue:d}}var ln=on(","),dn=ln.parse,pn=S('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function hn(e){var n=pn();c(e,n)}var cn=S('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function un(e){var n=cn();c(e,n)}var gn=S('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function vn(e){const n=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var a=gn(),r=w(y(a),2);H(r,17,()=>n,O,(i,p)=>{let g=()=>l(p).tag,u=()=>l(p).text;var f=T(),s=x(f);ue(s,g,!1,(d,t)=>{var o=We();k(()=>R(o,u())),c(t,o)}),c(i,f)}),m(a),c(e,a)}var mn=S("<p> </p>");function fn(e,n){var a=mn(),r=y(a);m(a),k(()=>R(r,`I am component A and my favorite number is ${n.number??""}.`)),c(e,a)}var yn=S("<p> </p>");function wn(e,n){var a=yn(),r=y(a);m(a),k(()=>R(r,`I am component B and my name is ${n.name??""}.`)),c(e,a)}var bn=S('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function _n(e){const n={A:fn,B:wn},a=[{component:"A",number:42},{component:"B",name:"Russell"}];var r=bn(),i=w(y(r),2);H(i,17,()=>a,O,(p,g)=>{var u=T();const f=P(()=>n[l(g).component]);var s=x(u);ce(s,()=>l(f),(d,t)=>{t(d,he(()=>l(g)))}),c(p,u)}),m(r),c(e,r)}var zn=S('<div><p class="svelte-12sq0x6"> </p></div>'),Sn=S('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function xn(e){let n=F(void 0);var a=Sn(),r=y(a),i=w(y(r)),p=y(i,!0);m(i),m(r);var g=w(r,4);Ye(g,{get value(){return l(n)},set value(u){B(n,j(u))},children:(u,f)=>{var s=T(),d=x(s);H(d,16,()=>[0,1,2,3,4],O,(t,o,_)=>{var h=zn();const v=P(()=>l(n)===_);let b;var z=y(h),C=y(z,!0);m(z),m(h),k(()=>{b=Ve(h,1,"step svelte-12sq0x6",null,b,{active:l(v)}),R(C,o)}),c(t,h)}),c(u,s)},$$slots:{default:!0}}),qe(2),m(a),k(()=>R(p,l(n)||"-")),c(e,a)}const Cn=`{
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
      "stepPosition": "center",
      "text": "<p>Meet your typical tween.</p>\\r\\n\\r\\n\\r\\n<p>Like many girls her age, she loves to keep up with the latest fashion trends and explore new ways to express herself.</p>"
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
      "text": "<p>“Junior” clothing lines often channel this interest with youthful styles that fit tweens and teens as they grow.</p>\\r\\n\\r\\n\\r\\n<p>The median 11-year-old can typically wear a <span data-underline=\\"#D96F32\\">size Medium</span> in the Juniors section.</p>"
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
      "text": "<p>But not all tweens wear the same size.</p>\\r\\n\\r\\n\\r\\n<p>If we were to look at a sample of all 10- and 11-year-old girls in the U.S., here are the Juniors sizes that match up with their body measurements.</p>\\r\\n\\r\\n\\r\\n<p>Notice that there are sizes available for most girls in this age group.</p>"
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
      "text": "<p>By <span data-underline=\\"#D96F32\\">age 15</span>, most girls have gone through growth spurts and puberty, and they’ve reached their adult height. Many have started to outgrow the Junior size section.</p>"
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
      "text": "<p>If they tried wearing clothes made for adult women, here are the sizes that would generally fit most 14- and 15-year-olds.</p> \\r\\n\\r\\n\\r\\n<p>It’s unlikely that each size will fit every teen perfectly (more on that later), however this marks an important turning point.</p>"
    },
    {
      "id": "5",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "14-15",
      "year": "2021",
      "sizeRange": "straight",
      "avatarStyle": "color",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "XXS, XS, S, M, L, XL, XXL",
      "sizeType": "alpha",
      "bandColor": "green",
      "stepPosition": "center-vertical",
      "bandHeight": "full",
      "bandStyle": "greyscale",
      "text": "<p>This will be the first time that nearly every girl their age will have women’s sizes available that are within an inch of their waistline measurements…</p>"
    },
    {
      "id": "6",
      "yearRange": "2021-2023",
      "race": "all",
      "age": "14-15",
      "year": "2021",
      "sizeRange": "straight",
      "avatarStyle": "color",
      "avatarDisplay": "all",
      "percentileStyle": "color",
      "highlightedPercentile": "50",
      "sizeBands": "XXS, XS, S, M, L, XL, XXL",
      "sizeType": "alpha",
      "bandColor": "green",
      "stepPosition": "center-vertical",
      "bandHeight": "full",
      "bandStyle": "greyscale",
      "text": "<p>...this will also likely be <strong><span data-underline=\\"#D96F32\\"> the last time this ever happens in their lifetimes.</span></strong></p>"
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
      "text": "By their 20s, a size Medium will no longer reflect the median or average woman’s waistline."
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
      "text": "<p>Instead, <span data-underline=\\"#D96F32\\"> the median 20-something fits a size 14</span>.</p>\\r\\n\\r\\n\\r\\n<p>This places them in the middle of what’s sometimes called the “mid-size gap” — a murky space that varies from brand to brand in determining where “regular-” or “straight-size” clothing lines end, and separate “plus-size” ranges begin.</p>"
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
      "text": "<p>Sizing options are even worse when you look at all adult women over the age of 20.</p>\\r\\n\\r\\n\\r\\n<p>The median woman in the U.S. fits around a <span data-underline=\\"#D96F32\\">size 18</span> based on their waistline measurement.</p>"
    },
    {
      "id": "10",
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
      "text": "<p>Only a small portion of brands carry sizes larger than a size 16.</p>\\r\\n<p>That leaves nearly three-quarters of all women without sizing options at all</p>"
    }
  ],
  "titlePage": [
    {
      "id": "0",
      "title": "Shrinking Options",
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
      "text": "<p>Here is what standard sizes looked like in 1995 compared to the latest update in 2021.</p><p>There are more “straight” sizes today than there were 30 years ago, with the introduction of sizes 00 and 0 in the early 2000s, but that’s not the only thing that has changed. </p>"
    },
    {
      "id": "1",
      "text": "<p>Sizes today are notably larger.</p><p>Notice how in 1995, a 27-inch waist was considered a <span data-underline=\\"#D96F32\\">size 8</span>; in 2021 it was between <span data-underline=\\"#D96F32\\">sizes 2 and 4</span></p>"
    },
    {
      "id": "2",
      "text": "<p>Waistlines in the U.S. have also increased since the mid-90s.</p>\\r\\n<p>Between 1988 and 1994, the average woman’s waistline was <span data-underline=\\"#D96F32\\">34.88 inches</span>. By 2018, it was <span data-underline=\\"#D96F32\\">38.74 inches</span></p>"
    },
    {
      "id": "3",
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
      "baseImage": "assets/proportions-base.png",
      "overlayImage": "null",
      "text": "<p>If we were to take the waist and hip measurements of the median woman in the U.S., here’s a broad look at what those proportions would look like.<p>\\r\\n\\r\\n\\r\\n<p>Notice there’s just over a 4” difference between her waist and hip measurements.</p>"
    },
    {
      "id": "1",
      "baseImage": "assets/proportions-base.png",
      "overlayImage": "assets/jcrew-size18.png",
      "text": "<p>Let’s say that our typical adult woman goes shopping at J.Crew.</p>\\r\\n\\r\\n\\r\\n<p>If she were to try on a pair of pants that fit her waist, she could try and squeeze into a <span data-underline=\\"#D96F32\\">size 18</span>, which is within ¾” of her measurements.</p>\\r\\n\\r\\n\\r\\n<p>Doing so, however, would mean the pants were made for someone with hips that are roughly <span data-underline=\\"#D96F32\\"> 6 inches larger </span> than hers.</p>"
    },
    {
      "id": "2",
      "baseImage": "assets/proportions-base.png",
      "overlayImage": "assets/jcrew-size12.png",
      "text": "<p>If the median American woman were to prioritize finding pants that are fitted around her backside, she would have the opposite problem as before.</p>\\r\\n\\r\\n\\r\\n<p>Here, a <span data-underline=\\"#D96F32\\">size 12</span> would fit her hips best, but then the waist would be too small by more than <span data-underline=\\"#D96F32\\">6 inches</span>."
    },
    {
      "id": "3",
      "baseImage": "assets/polo-ralph-lauren.png",
      "overlayImage": "assets/proportions-000-22.png",
      "text": "<p>J.Crew is hardly an outlier.</p>\\r\\n\\r\\n\\r\\n<p>The foundation for most — if not all — mainstream fashion brands is based on an hourglass silhouette.</p>\\r\\n\\r\\n\\r\\n<p>For brands like J.Crew, Anthropologie, Ralph Lauren, Aritizia, and more, that means a <span data-underline=\\"#D96F32\\">10-inch</span> difference between the waist and hip.</p>"
    },
    {
      "id": "4",
      "baseImage": "assets/polo-ralph-lauren.png",
      "overlayImage": "assets/proportions-000-22.png",
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
      "text": "Many prominent (particularly high-end) brands do not carry sizes higher than a size 14 or 16"
    },
    {
      "id": "1",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "null",
      "text": "Some brands carry extended options within their “Regular” or “Straight” size ranges"
    },
    {
      "id": "2",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "While others have a “Plus” size range that is kept separate, often with simpler styles that differ from other straight size collections"
    },
    {
      "id": "3",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "TK"
    }
  ]
}`;var Dn=S("<p><!></p>"),Tn=S("<section><!></section>");function Rn(e,n){ee(n,!0);let a=Q(n,"components",19,()=>({})),r=Q(n,"body",19,()=>[]);var i=T(),p=x(i);H(p,17,r,O,(g,u)=>{let f=()=>l(u).section,s=()=>l(u).content;var d=Tn();const t=P(()=>f().toLowerCase().replace(/[^a-z0-9]/g,"")),o=P(()=>a()[f()]);var _=y(d);{var h=b=>{var z=T(),C=x(z);ce(C,()=>l(o),(M,I)=>{I(M,he(s))}),c(b,z)},v=b=>{var z=T(),C=x(z);H(C,17,s,O,(M,I,W,$)=>{let A=()=>l(I).type,X=()=>l(I).value;var ve=T();const me=P(()=>a()[A()]),Te=P(()=>typeof X()=="string");var Re=x(ve);{var ke=E=>{var Z=T(),ae=x(Z);ce(ae,()=>l(me),(te,re)=>{re(te,he(X))}),c(E,Z)},Me=E=>{var Z=T(),ae=x(Z);{var te=N=>{var U=Dn(),se=y(U);_e(se,X),m(U),c(N,U)},re=N=>{var U=T(),se=x(U);{var Xe=J=>{var V=T(),ie=x(V);ue(ie,A,!1,(Y,fe)=>{var G=T(),Ae=x(G);_e(Ae,X),c(fe,G)}),c(J,V)},Ie=J=>{var V=T(),ie=x(V);ue(ie,A,!1,(Y,fe)=>{let G;k(()=>G=Ke(Y,G,{...X()},void 0,Y.namespaceURI===xe,Y.nodeName.includes("-")))}),c(J,V)};q(se,J=>{l(Te)?J(Xe):J(Ie,!1)},!0)}c(N,U)};q(ae,N=>{A()==="text"?N(te):N(re,!1)},!0)}c(E,Z)};q(Re,E=>{l(me)?E(ke):E(Me,!1)})}c(M,ve)}),c(b,z)};q(_,b=>{l(o)?b(h):b(v,!1)})}m(d),k(()=>Ge(d,"id",l(t))),c(g,d)}),c(e,i),ne()}var kn=S('<p> </p> <progress max="100"></progress>',1);function Mn(e,n){let a=Q(n,"label",3,"A"),r=Q(n,"value",3,0);var i=kn(),p=x(i),g=y(p,!0);m(p);var u=w(p,2);k(()=>{R(g,a()),Qe(u,r())}),c(e,i)}var Xn=S('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function In(e,n){ee(n,!0);const{body:a}=en,r={Test:Mn};var i=Xn(),p=w(y(i),2),g=y(p),u=y(g,!0);m(g),m(p);var f=w(p,2);Rn(f,{components:r,body:a}),m(i),k(s=>R(u,s),[()=>Cn.replace(/\t/g," ")]),c(e,i),ne()}const An=(e,n=Ce)=>{var a=Bn(),r=y(a),i=y(r,!0);m(r);var p=w(r,2),g=y(p,!0);m(p),m(a),k(()=>{R(i,n().name),R(g,n().age)}),c(e,a)};var Bn=S('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),Ln=(e,n)=>He(n),Pn=(e,n)=>n.random(Math.floor(Math.random()*10)),Fn=S('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function jn(e,n){ee(n,!0),Q(n,"age",3,30);const a=[{name:"John",age:30},{name:"Jill",age:45}];let r=F(0),i=P(()=>l(r)*2),p=P(()=>l(r)*2),g=F(0);ge(()=>{B(g,l(r)*2)});var u=Fn(),f=w(x(u),4);f.__click=[Ln,r];var s=w(f,2),d=y(s);m(s);var t=w(s,2),o=y(t);m(t);var _=w(t,2),h=y(_);m(_);var v=w(_,4),b=y(v);nn(b,()=>n.children??Ce),m(v);var z=w(v,4);z.__click=[Pn,n];var C=w(z,4);H(C,21,()=>a,O,(M,I)=>{An(M,()=>l(I))}),m(C),k(()=>{R(d,`${l(r)??""} doubled is ${l(i)??""} (derived)`),R(o,`${l(r)??""} doubled is ${l(p)??""} (derived by)`),R(h,`${l(r)??""} doubled is ${l(g)??""} ($effect)`)}),c(e,u),ne()}Ze(["click"]);const En=(e,n)=>{let a=F(j(e)),r=F(null),i=F(!0),p=F(void 0);const g=(s=!0)=>{B(i,j(s)),s===!0&&(B(p,null),B(r,null))},u=async()=>{try{const s=await fetch(l(a),n);if(!s.ok)throw new Error(`Unexpected error occurred (status ${s.status})`);let d;if(l(a).includes(".csv")){const t=await s.text();d=dn(t)}else d=await s.json();return[null,d]}catch(s){const{errorMessage:d="Unexpected error eccurred"}=s;return[d,null]}},f=async s=>{g(!0);const[d,t]=await u();if(s===l(a)){if(d){g(!1),B(p,j(d));return}g(!1),B(r,j(t))}};return ge(()=>{f(l(a))}),{get data(){return l(r)},get loading(){return l(i)},get error(){return l(p)},get url(){return l(a)},set url(s){l(a)!==s&&B(a,j(s))}}};var Nn=S("<p>loading data...</p>"),Un=S("<p> </p>"),Jn=S("<p>data loaded</p> <pre> </pre>",1),qn=S('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function Hn(e,n){ee(n,!0);const a=`${an}/assets/demo/test.csv`,r=En(a);ge(()=>{});var i=qn(),p=w(y(i),2),g=y(p);{var u=s=>{var d=Nn();c(s,d)},f=s=>{var d=T(),t=x(d);{var o=h=>{var v=Un(),b=y(v);m(v),k(()=>R(b,`error: ${r.error??""}`)),c(h,v)},_=h=>{var v=Jn(),b=w(x(v),2),z=y(b,!0);m(b),k(C=>R(z,C),[()=>JSON.stringify(r.data,null,2)]),c(h,v)};q(t,h=>{r.error?h(o):h(_,!1)},!0)}c(s,d)};q(g,s=>{r.loading?s(u):s(f,!1)})}m(p),m(i),c(e,i),ne()}var On=S('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function Wn(e){let n=F(0);function a(o){console.log(o)}var r=On(),i=w(y(r),2);jn(i,{random:a,get value(){return l(n)},set value(o){B(n,j(o))}});var p=w(i,2);hn(p);var g=w(p,2);un(g);var u=w(g,2);vn(u);var f=w(u,2);_n(f);var s=w(f,2);In(s,{});var d=w(s,2);Hn(d,{});var t=w(d,2);xn(t),m(r),c(e,r)}function sa(e){Wn(e)}export{sa as component};
