import"../chunks/Bzak7iHL.js";import{h as F,a as fe,f as se,aE as Fe,b as je,E as Pe,d as We,aF as Le,af as Ne,ad as Ue,c as Je,a3 as ye,a2 as we,D as Xe,p as $e,a5 as He,ag as Oe,V as x,X as u,ax as b,Z as z,_ as y,ay as A,aw as R,aA as qe,W as E,A as o,az as j,C as I,av as P,aG as Ve,U as Z,Y as K,u as ue,aH as Ge,R as Se,B as Ye}from"../chunks/Dzm_WEGj.js";import{i as Ze,b as ze,a as k,d as Ke}from"../chunks/ZgVi19R2.js";import{b as be,c as _e,e as X,i as $,d as Qe,s as en,f as nn,g as an}from"../chunks/CDdiiSxv.js";import{c as le}from"../chunks/DH1QYJyw.js";import{s as de,p as Y}from"../chunks/ihUrmXYw.js";import{S as tn,h as xe,c as sn}from"../chunks/ClAJm-jN.js";import{i as J}from"../chunks/C0w0nz2X.js";import{s as rn}from"../chunks/BIhypZ3Q.js";import{b as on}from"../chunks/Duer-EEh.js";function he(e,n,t,s,i,d){let p=F;F&&fe();var m,f,r=null;F&&se.nodeType===Fe&&(r=se,fe());var c=F?se:e,a,l=_e;je(()=>{const v=n()||null;var g=v==="svg"?Le:null;if(v!==m){var h=_e;be(l),a&&(v===null?$e(a,()=>{a=null,f=null}):v===f?He(a):(Oe(a),ze(!1))),v&&v!==f&&(a=We(()=>{if(r=F?r:g?document.createElementNS(g,v):document.createElement(v),Ne(r,r),s){F&&Ze(v)&&r.append(document.createComment(""));var w=F?Ue(r):r.appendChild(Je());F&&(w===null?ye(!1):we(w)),s(r,w)}Xe.nodes_end=r,c.before(r)})),m=v,m&&(f=m),ze(!0),be(h)}},Pe),p&&(ye(!0),we(c))}var Re={},re={},ie=34,G=10,oe=13;function Ce(e){return new Function("d","return {"+e.map(function(n,t){return JSON.stringify(n)+": d["+t+'] || ""'}).join(",")+"}")}function ln(e,n){var t=Ce(e);return function(s,i){return n(t(s),i,e)}}function Te(e){var n=Object.create(null),t=[];return e.forEach(function(s){for(var i in s)i in n||t.push(n[i]=i)}),t}function C(e,n){var t=e+"",s=t.length;return s<n?new Array(n-s+1).join(0)+t:t}function dn(e){return e<0?"-"+C(-e,6):e>9999?"+"+C(e,6):C(e,4)}function hn(e){var n=e.getUTCHours(),t=e.getUTCMinutes(),s=e.getUTCSeconds(),i=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":dn(e.getUTCFullYear())+"-"+C(e.getUTCMonth()+1,2)+"-"+C(e.getUTCDate(),2)+(i?"T"+C(n,2)+":"+C(t,2)+":"+C(s,2)+"."+C(i,3)+"Z":s?"T"+C(n,2)+":"+C(t,2)+":"+C(s,2)+"Z":t||n?"T"+C(n,2)+":"+C(t,2)+"Z":"")}function un(e){var n=new RegExp('["'+e+`
\r]`),t=e.charCodeAt(0);function s(a,l){var v,g,h=i(a,function(w,_){if(v)return v(w,_-1);g=w,v=l?ln(w,l):Ce(w)});return h.columns=g||[],h}function i(a,l){var v=[],g=a.length,h=0,w=0,_,T=g<=0,S=!1;a.charCodeAt(g-1)===G&&--g,a.charCodeAt(g-1)===oe&&--g;function D(){if(T)return re;if(S)return S=!1,Re;var O,B=h,M;if(a.charCodeAt(B)===ie){for(;h++<g&&a.charCodeAt(h)!==ie||a.charCodeAt(++h)===ie;);return(O=h)>=g?T=!0:(M=a.charCodeAt(h++))===G?S=!0:M===oe&&(S=!0,a.charCodeAt(h)===G&&++h),a.slice(B+1,O-1).replace(/""/g,'"')}for(;h<g;){if((M=a.charCodeAt(O=h++))===G)S=!0;else if(M===oe)S=!0,a.charCodeAt(h)===G&&++h;else if(M!==t)continue;return a.slice(B,O)}return T=!0,a.slice(B,g)}for(;(_=D())!==re;){for(var H=[];_!==Re&&_!==re;)H.push(_),_=D();l&&(H=l(H,w++))==null||v.push(H)}return v}function d(a,l){return a.map(function(v){return l.map(function(g){return c(v[g])}).join(e)})}function p(a,l){return l==null&&(l=Te(a)),[l.map(c).join(e)].concat(d(a,l)).join(`
`)}function m(a,l){return l==null&&(l=Te(a)),d(a,l).join(`
`)}function f(a){return a.map(r).join(`
`)}function r(a){return a.map(c).join(e)}function c(a){return a==null?"":a instanceof Date?hn(a):n.test(a+="")?'"'+a.replace(/"/g,'""')+'"':a}return{parse:s,parseRows:i,format:p,formatBody:m,formatRows:f,formatRow:r,formatValue:c}}var cn=un(","),pn=cn.parse,mn=x('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function gn(e){var n=mn();u(e,n)}var vn=x('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"/> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function fn(e){var n=vn();u(e,n)}var yn=x('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function wn(e){const n=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var t=yn(),s=b(z(t),2);X(s,17,()=>n,$,(i,d)=>{let p=()=>o(d).tag,m=()=>o(d).text;var f=A(),r=R(f);he(r,p,!1,(c,a)=>{var l=qe();E(()=>k(l,m())),u(a,l)}),u(i,f)}),y(t),u(e,t)}var zn=x("<p> </p>");function bn(e,n){var t=zn(),s=z(t);y(t),E(()=>k(s,`I am component A and my favorite number is ${n.number??""}.`)),u(e,t)}var _n=x("<p> </p>");function xn(e,n){var t=_n(),s=z(t);y(t),E(()=>k(s,`I am component B and my name is ${n.name??""}.`)),u(e,t)}var Rn=x('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function Tn(e){const n={A:bn,B:xn},t=[{component:"A",number:42},{component:"B",name:"Russell"}];var s=Rn(),i=b(z(s),2);X(i,17,()=>t,$,(d,p)=>{const m=j(()=>n[o(p).component]);var f=A(),r=R(f);le(r,()=>o(m),(c,a)=>{a(c,de(()=>o(p)))}),u(d,f)}),y(s),u(e,s)}var Sn=x('<div><p class="svelte-12sq0x6"> </p></div>'),Cn=x('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function An(e){let n=P(void 0);var t=Cn(),s=z(t),i=b(z(s)),d=z(i,!0);y(i),y(s);var p=b(s,4);tn(p,{get value(){return o(n)},set value(m){I(n,m,!0)},children:(m,f)=>{var r=A(),c=R(r);X(c,16,()=>[0,1,2,3,4],$,(a,l,v)=>{const g=j(()=>o(n)===v);var h=Sn();let w;var _=z(h),T=z(_,!0);y(_),y(h),E(S=>{w=Qe(h,1,"step svelte-12sq0x6",null,w,S),k(T,l)},[()=>({active:o(g)})]),u(a,h)}),u(m,r)},$$slots:{default:!0}}),Ve(2),y(t),E(()=>k(d,o(n)||"-")),u(e,t)}const kn=`{
  "introScroll": [
    {
      "id": "0",
      "yearRange": "2021-2023",
      "age": "10_11",
      "year": "2015",
      "sizeRange": "Junior's",
      "sizeType": "alphaSize",
      "zoom": "1",
      "hideBands": "1"
    },
    {
      "id": "1",
      "start": "0",
      "end": "2",
      "yearRange": "2021-2023",
      "age": "10_11",
      "year": "2015",
      "sizeRange": "Junior's",
      "sizeType": "alphaSize",
      "zoom": "1",
      "hideBands": "1",
      "text": "Like many girls her age, she loves to keep up with the latest fashion trends and explore new ways to express herself."
    },
    {
      "id": "2",
      "start": "1",
      "end": "2",
      "yearRange": "2021-2023",
      "age": "10_11",
      "year": "2015",
      "sizeRange": "Junior's",
      "sizeType": "alphaSize",
      "highlightStart": "M",
      "highlightEnd": "M",
      "omit": "XXL,XL,XS,XXS",
      "zoom": "1",
      "text": "“Junior’s” clothing lines often channel this interest with youthful styles that fit young girls as they grow.\\r\\n\\r\\n\\r\\nFor now, our typical <span class=bold>11-year-old</span> wears a size 9 in the junior’s section, which is also considered a size <span class=orange-outline>Medium</span>."
    },
    {
      "id": "3",
      "start": "3",
      "end": "5",
      "yearRange": "2021-2023",
      "age": "10_11",
      "year": "2015",
      "sizeRange": "Junior's",
      "sizeType": "alphaSize",
      "text": "But not all tweens wear the same size.\\r\\n\\r\\n\\r\\nIf we were to look at a sample of all <span class=bold>10- and 11-year-old girls</span> in the U.S., here are the junior’s sizes that match up with their body measurements."
    },
    {
      "id": "4",
      "start": "4",
      "end": "5",
      "yearRange": "2021-2023",
      "age": "14_15",
      "year": "2015",
      "sizeRange": "Junior's",
      "sizeType": "alphaSize",
      "text": "By <span class=bold>age 15</span>, most girls have gone through growth spurts and puberty, and they’ve reached their adult height. \\r\\n\\r\\n\\r\\nMany have started to outgrow the junior’s size section."
    },
    {
      "id": "5",
      "yearRange": "2021-2023",
      "age": "14_15",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "alphaSize",
      "text": "This marks an important turning point as they shift into women’s sizes."
    },
    {
      "id": "6",
      "yearRange": "2021-2023",
      "age": "14_15",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "alphaSize",
      "text": "Girls who fall along the bottom 10th percentile can now wear an Extra Small in women’s clothing, while girls near the 90th percentile will find that an Extra Large generally fits. \\r\\n\\r\\n\\r\\nThe median 15-year-old wears a Medium, as she has throughout most of her childhood."
    },
    {
      "id": "7",
      "yearRange": "2021-2023",
      "age": "14_15",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "alphaSize",
      "highlightStart": "XXS",
      "highlightEnd": "XXL",
      "text": "That means for the first time ever, most girls in their cohort will be able to find a size in the women’s clothing section."
    },
    {
      "id": "8",
      "yearRange": "2021-2023",
      "age": "14_15",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "alphaSize",
      "hideBeeswarm": "1",
      "zoom": "1",
      "text": "This will also likely be the  <span class=bold>last time this ever happens in their lives.</span>"
    },
    {
      "id": "9",
      "yearRange": "2021-2023",
      "age": "20_29",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "By their 20s, a <span class=orange-outline>size Medium</span> will no longer reflect the median or average woman’s waistline."
    },
    {
      "id": "10",
      "yearRange": "2021-2023",
      "age": "20_29",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "Instead, <span class=bold> the median 20-something</span> fits a <span class=bold>Large</span>, which translates to a size 14 in women’s clothing."
    },
    {
      "id": "11",
      "yearRange": "2021-2023",
      "age": "20over",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "Her wardrobe will shift again in her 30s. \\r\\n\\r\\n\\r\\nAt this point the median woman is closer to a size 16 or Extra Large."
    },
    {
      "id": "12",
      "yearRange": "2021-2023",
      "age": "20over",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "This trend will continue again, and again. \\r\\n\\r\\n\\r\\nAltogether, the median adult woman over the age of 20 fits a size 18."
    },
    {
      "id": "13",
      "yearRange": "2021-2023",
      "age": "20over",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "The problem is that most “Standard” or “Regular” size ranges only go up to a size 16."
    },
    {
      "id": "14",
      "yearRange": "2021-2023",
      "age": "20over",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "That leaves millions of people — over half of all adult women — without sizing options at all."
    },
    {
      "id": "15",
      "yearRange": "2021-2023",
      "age": "20over",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size"
    }
  ],
  "introBreak": [
    {
      "type": "text",
      "value": "Children’s clothing is often tied to a kid’s age or stage of development. The idea is that as a young person grows older, her clothes will evolve with her. Youth styles tend to be boxy and oversized to allow room for young kids to move and grow, but by early adolescence, a shift starts to take shape. Girl’s clothing starts to become more fitted. Junior’s styles have higher waistlines and less-pronounced curves through the bust and hips compared to adult clothing lines. In short: tweens’ clothes are made for tween bodies."
    },
    {
      "type": "text",
      "value": "By the time that most teen girls can wear women’s clothes — around age 15 — their options are seemingly endless. The women’s apparel market, worth an estimated $963 billion worldwide, places a premium on grooming young girls into becoming dedicated, life-long customers. But the evolution in clothing sizes that followed girls throughout childhood abruptly stops there."
    },
    {
      "type": "text",
      "value": "As a woman ages, she will sift through sizes that fit a greater proportion of teens than the adults they were made for in the first place."
    }
  ],
  "sizeIntro": [
    {
      "type": "text",
      "value": "Few life experiences feel as universal as the pains, frustrations, flashpoints of joy, and profound disillusionment that come with trying to find clothes that actually fit our bodies. We’ve all been through it, one way or another. Over the course of several decades the modern shopping experience has devolved into an undignified ritual of trial and error. At the heart of the problem is a system that is just as flawed as it is inconsistent: the chaos of women’s clothing sizes."
    },
    {
      "type": "text",
      "value": "Sizes vary wildly from store to store. Even within a single brand, no one size will consistently fit. There are no regulations or universal standards."
    },
    {
      "type": "text",
      "value": "Instead each brand is incentivized to make up their own. When size guides change — and they’re always changing — brands are not obligated to disclose updates to consumers. There are often different sizing structures for every type of garment. Athleisure may go by alpha sizes (S, M, L, etc.), while dresses are sized numerically (0, 2, 4, etc.)."
    },
    {
      "type": "text",
      "value": "In theory, pants sizes are based on a person’s waistline circumference, however in practice, the numbers feel arbitrary. A person may wear a size 28 in jeans, but neither her actual waistline nor the waistband of her jeans are likely to measure 28 inches. “Plus” size means one thing, “curve” means another, and “extended” sizes can be defined as all of the above or something else entirely."
    },
    {
      "type": "text",
      "value": "Don’t count on any of those sizes to be available to try on in-store, but do brace for return fees if your online order doesn’t fit. Free in-store alterations are largely a thing of the past, while a trip to the tailors can cost just as much as the item itself."
    },
    {
      "type": "text",
      "value": "The only consistent feature is that the industry at large continues to cling onto the same underlying sizing system, one developed nearly a century ago based exclusively on the idealized body proportions of white women."
    },
    {
      "type": "text",
      "value": "For years I had assumed, perhaps naively, that fashion and apparel companies would replace its sizing system with something better, more efficient, or at the very least, appeal to a broader range of bodies. After all, imagine the growth potential from previously untapped markets, especially as women’s purchasing power expands. But that day has yet to come."
    },
    {
      "type": "text",
      "value": "If anything, things seem to have gotten worse."
    }
  ],
  "sizeScroll": [
    {
      "id": "0",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "excludeNearMedian",
      "text": "<p>While there are no universal sizing standards, an organization called <span class=green-span>ASTM International</span> regularly releases informal guidelines.</p>"
    },
    {
      "id": "1",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "null",
      "text": "Clothing manufacturers may loosely follow those standards, but more often than not, brands prefer to tailor their own practices to their target customer-base. Here are the size charts of 14 popular brands."
    },
    {
      "id": "1",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "null",
      "text": "The result: Nothing is consistent. Consumers are expected to navigate a landscape where size labels are largely stripped of meaning. For example, here’s every size that is labeled as <span class=bold>Large</span>, spanning waistlines from 29.1-34 inches."
    },
    {
      "id": "3",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "<p>Here is our median 15-year-old girl in the U.S. With a waistline measuring 30.4 inches, she fits around a size 10 according to ASTM standards, which is usually considered a Medium.</p> <p>While it’s unlikely that clothing designed for adults will fit a teen’s body perfectly, she has quite a few sizing options.</p>"
    },
    {
      "id": "4",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "However as she’ll quickly learn, sizes are not universal across all brands. Here are all the sizes within 1 inch of the median teen’s waistline. At Banana Republic, she’s closer to a size 8. At Uniqlo, she’s considered a size 12."
    },
    {
      "id": "5",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "The median adult woman has a much harder time finding clothes that fit. Her waistline is 37.68 inches, placing her at a size 18 by ASTM standards."
    },
    {
      "id": "6",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "Many brands don’t carry her size. This is especially true for high-end, luxury fashion labels."
    },
    {
      "id": "7",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "<p>Sizing issues are amplified even further within <span class=purple-span>Plus</span> size ranges.</p><p>There are no official boundaries determining where <span class=blue-span>Regular</span> sizes ranges end and Plus size ranges begin.</p><p>Some Plus size ranges start at size 12, others at 18. Others still consider any size from 00 to 30 is considered part of its Regular line.</p>"
    },
    {
      "id": "8",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "<p>The median adult woman may also find herself in what’s informally called the “mid-size gap.”</p> <p>Here sizes within the <span class=blue-span>Regular</span> size range are too small, yet the next size up in the <span class=purple-span>Plus</span> range might be too big.</p>"
    },
    {
      "id": "9",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "<p>Even the symbols used to describe certain sizes hold a wide range of meanings.</p>  <p>For the average adult woman, there are as many as TK10 different ways to describe the garments that she could conceivably wear from these brands alone.</p>"
    }
  ],
  "vanityIntro": [
    {
      "type": "text",
      "value": "Inconsistent sizing isn’t merely a bug in the system, it’s a feature. And vanity sizing is largely to blame, but for reasons you may not expect."
    },
    {
      "type": "text",
      "value": "Vanity sizing first emerged as a marketing strategy to attract loyal customers and get them to spend more. Studies have shown that women feel more positively toward an item of clothing when it is presented as a smaller size; conversely, if a woman finds they need a size larger than expected, they’re less likely to follow through with their purchase, and may even develop negative associations with the brand."
    },
    {
      "type": "text",
      "value": "Because clothing sizes are unregulated, manufacturers are free to pursue vanity sizing as they please. In theory, labeling clothes as sizes smaller than reality could serve as a competitive edge over brands that opt against the practice. This creates an arms race toward artificially deflating size labels in order to attract customers who are now conditioned to expect that a certain size will fit."
    },
    {
      "type": "text",
      "value": "Narratives around vanity sizing often shift the blame on women as opposed to the companies that are actively behind the practice. In 2006, Time Magazine called it “self-delusion on a mass scale.”"
    },
    {
      "type": "text",
      "value": "But where would we be today without vanity sizing?"
    }
  ],
  "vanityScroll": [
    {
      "step": "0",
      "visual": "display 1995 astm sizes",
      "animation": "",
      "text": "It’s true: Sizes today are much larger than they were in the past. Roughly 30 years ago, ASTM guidelines cover 12.5 inches from 24–36.5 (sizes 2–20). However, extended sizes were not widely available in stores."
    },
    {
      "step": "1",
      "visual": "display 1995 + 2021 astm sizes",
      "animation": "add 2021 sizes; highlight size 2 from 2021 + size 8 from 1995",
      "text": "Today because of vanity sizing, we can see an upward shift in all sizes. ASTM guidelines span 15.12 inches from 25.38–40.5 (sizes 00–20). In the early 2000s ASTM added size 00 and 0 to pad out the bottom of the range."
    },
    {
      "step": "2",
      "visual": "display 1995 + 2021 astm sizes",
      "animation": "highlight size 8 from 2021",
      "text": "By comparison, today’s <span class=bold>size 8</span> is 2.5 inches larger in the waist than it was 30 years ago."
    },
    {
      "step": "3",
      "visual": "display 1995 + 2021 astm sizes + median waistline markers",
      "animation": "add markers for median waistlines in 1994 & 2023",
      "text": "But vanity sizing wasn’t just accounting for women’s unconscious shopping behaviors. Clothes needed to be larger because our waistlines had grown. Between 1988–1994, the <span class=orange-span>median woman’s waistline</span> was 34.88 inches. By 2023, it was 37.68 inches."
    },
    {
      "step": "4",
      "visual": "display 1995 + 2021 astm sizes + median waistline markers",
      "animation": "highlight sizes 18 for both ranges",
      "text": "What’s noteworthy is that over this 30-year period, the median adult woman has almost always fit the <span class=bold>size 18</span> that was available to her at the time. Vanity sizing has effectively helped manufacturers keep up to pace with demographic shifts in the U.S. But only for the smallest half of all adult women."
    }
  ]
}`;var En=x("<p><!></p>"),Mn=x("<section><!></section>");function Dn(e,n){Z(n,!0);let t=Y(n,"components",19,()=>({})),s=Y(n,"body",19,()=>[]);var i=A(),d=R(i);X(d,17,s,$,(p,m)=>{let f=()=>o(m).section,r=()=>o(m).content;const c=j(()=>f().toLowerCase().replace(/[^a-z0-9]/g,"")),a=j(()=>t()[f()]);var l=Mn(),v=z(l);{var g=w=>{var _=A(),T=R(_);le(T,()=>o(a),(S,D)=>{D(S,de(r))}),u(w,_)},h=w=>{var _=A(),T=R(_);X(T,17,r,$,(S,D,H,O)=>{let B=()=>o(D).type,M=()=>o(D).value;const ce=j(()=>t()[B()]),Ae=j(()=>typeof M()=="string");var pe=A(),ke=R(pe);{var Ee=W=>{var q=A(),Q=R(q);le(Q,()=>o(ce),(ee,ne)=>{ne(ee,de(M))}),u(W,q)},Me=W=>{var q=A(),Q=R(q);{var ee=L=>{var N=En(),ae=z(N);xe(ae,M),y(N),u(L,N)},ne=L=>{var N=A(),ae=R(N);{var De=U=>{var V=A(),te=R(V);he(te,B,!1,(me,ge)=>{var ve=A(),Ie=R(ve);xe(Ie,M),u(ge,ve)}),u(U,V)},Be=U=>{var V=A(),te=R(V);he(te,B,!1,(me,ge)=>{nn(me,()=>({...M()}))}),u(U,V)};J(ae,U=>{o(Ae)?U(De):U(Be,!1)},!0)}u(L,N)};J(Q,L=>{B()==="text"?L(ee):L(ne,!1)},!0)}u(W,q)};J(ke,W=>{o(ce)?W(Ee):W(Me,!1)})}u(S,pe)}),u(w,_)};J(v,w=>{o(a)?w(g):w(h,!1)})}y(l),E(()=>en(l,"id",o(c))),u(p,l)}),u(e,i),K()}var Bn=x('<p> </p> <progress max="100"></progress>',1);function In(e,n){let t=Y(n,"label",3,"A"),s=Y(n,"value",3,0);var i=Bn(),d=R(i),p=z(d,!0);y(d);var m=b(d,2);E(()=>{k(p,t()),an(m,s())}),u(e,i)}var Fn=x('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function jn(e,n){Z(n,!0);const{body:t}=sn,s={Test:In};var i=Fn(),d=b(z(i),2),p=z(d),m=z(p,!0);y(p),y(d);var f=b(d,2);Dn(f,{get components(){return s},get body(){return t}}),y(i),E(r=>k(m,r),[()=>kn.replace(/\t/g," ")]),u(e,i),K()}const Pn=(e,n=Se)=>{var t=Wn(),s=z(t),i=z(s,!0);y(s);var d=b(s,2),p=z(d,!0);y(d),y(t),E(()=>{k(i,n().name),k(p,n().age)}),u(e,t)};var Wn=x('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),Ln=(e,n)=>Ge(n),Nn=(e,n)=>n.random(Math.floor(Math.random()*10)),Un=x('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function Jn(e,n){Z(n,!0),Y(n,"age",3,30);const t=[{name:"John",age:30},{name:"Jill",age:45}];let s=P(0),i=j(()=>o(s)*2),d=j(()=>o(s)*2),p=P(0);ue(()=>{I(p,o(s)*2)});var m=Un(),f=b(R(m),4);f.__click=[Ln,s];var r=b(f,2),c=z(r);y(r);var a=b(r,2),l=z(a);y(a);var v=b(a,2),g=z(v);y(v);var h=b(v,4),w=z(h);rn(w,()=>n.children??Se),y(h);var _=b(h,4);_.__click=[Nn,n];var T=b(_,4);X(T,21,()=>t,$,(S,D)=>{Pn(S,()=>o(D))}),y(T),E(()=>{k(c,`${o(s)??""} doubled is ${o(i)??""} (derived)`),k(l,`${o(s)??""} doubled is ${o(d)??""} (derived by)`),k(g,`${o(s)??""} doubled is ${o(p)??""} ($effect)`)}),u(e,m),K()}Ke(["click"]);const Xn=(e,n)=>{let t=P(Ye(e)),s=P(null),i=P(!0),d=P(void 0);const p=(r=!0)=>{I(i,r,!0),r===!0&&(I(d,null),I(s,null))},m=async()=>{try{const r=await fetch(o(t),n);if(!r.ok)throw new Error(`Unexpected error occurred (status ${r.status})`);let c;if(o(t).includes(".csv")){const a=await r.text();c=pn(a)}else c=await r.json();return[null,c]}catch(r){const{errorMessage:c="Unexpected error eccurred"}=r;return[c,null]}},f=async r=>{p(!0);const[c,a]=await m();if(r===o(t)){if(c){p(!1),I(d,c,!0);return}p(!1),I(s,a,!0)}};return ue(()=>{f(o(t))}),{get data(){return o(s)},get loading(){return o(i)},get error(){return o(d)},get url(){return o(t)},set url(r){o(t)!==r&&I(t,r,!0)}}};var $n=x("<p>loading data...</p>"),Hn=x("<p> </p>"),On=x("<p>data loaded</p> <pre> </pre>",1),qn=x('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function Vn(e,n){Z(n,!0);const t=`${on}/assets/demo/test.csv`,s=Xn(t);ue(()=>{});var i=qn(),d=b(z(i),2),p=z(d);{var m=r=>{var c=$n();u(r,c)},f=r=>{var c=A(),a=R(c);{var l=g=>{var h=Hn(),w=z(h);y(h),E(()=>k(w,`error: ${s.error??""}`)),u(g,h)},v=g=>{var h=On(),w=b(R(h),2),_=z(w,!0);y(w),E(T=>k(_,T),[()=>JSON.stringify(s.data,null,2)]),u(g,h)};J(a,g=>{s.error?g(l):g(v,!1)},!0)}u(r,c)};J(p,r=>{s.loading?r(m):r(f,!1)})}y(d),y(i),u(e,i),K()}var Gn=x('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function Yn(e){let n=P(0);function t(l){console.log(l)}var s=Gn(),i=b(z(s),2);Jn(i,{random:t,get value(){return o(n)},set value(l){I(n,l,!0)}});var d=b(i,2);gn(d);var p=b(d,2);fn(p);var m=b(p,2);wn(m);var f=b(m,2);Tn(f);var r=b(f,2);jn(r,{});var c=b(r,2);Vn(c,{});var a=b(c,2);An(a),y(s),u(e,s)}function oa(e){Yn(e)}export{oa as component};
