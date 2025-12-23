import"../chunks/Bzak7iHL.js";import{h as F,a as ye,f as se,aE as Fe,b as Be,E as We,d as Pe,aF as Ne,af as Ue,ad as Le,c as He,a3 as ve,a2 as we,D as Je,p as Oe,a5 as qe,ag as Xe,V as _,X as u,ax as z,Z as b,_ as v,ay as R,aw as T,aA as $e,W as A,A as i,az as B,C as j,av as W,aG as Ve,U as Z,Y as K,u as ue,aH as Ge,R as Ie,B as Ye}from"../chunks/Dzm_WEGj.js";import{i as Ze,b as be,a as C,d as Ke}from"../chunks/ZgVi19R2.js";import{b as ze,c as xe,e as J,i as O,d as Qe,s as et,f as tt,g as nt}from"../chunks/tSoxctGi.js";import{c as le}from"../chunks/DH1QYJyw.js";import{s as he,p as Y}from"../chunks/ihUrmXYw.js";import{S as at,h as _e,c as st}from"../chunks/yBFjEq1A.js";import{i as H}from"../chunks/C0w0nz2X.js";import{s as rt}from"../chunks/BIhypZ3Q.js";import{b as ot}from"../chunks/BYCpTkTp.js";function de(e,t,a,s,o,h){let p=F;F&&ye();var m,y,r=null;F&&se.nodeType===Fe&&(r=se,ye());var c=F?se:e,n,l=xe;Be(()=>{const f=t()||null;var g=f==="svg"?Ne:null;if(f!==m){var d=xe;ze(l),n&&(f===null?Oe(n,()=>{n=null,y=null}):f===y?qe(n):(Xe(n),be(!1))),f&&f!==y&&(n=Pe(()=>{if(r=F?r:g?document.createElementNS(g,f):document.createElement(f),Ue(r,r),s){F&&Ze(f)&&r.append(document.createComment(""));var w=F?Le(r):r.appendChild(He());F&&(w===null?ve(!1):we(w)),s(r,w)}Je.nodes_end=r,c.before(r)})),m=f,m&&(y=m),be(!0),ze(d)}},We),p&&(ve(!0),we(c))}var Te={},re={},oe=34,G=10,ie=13;function Se(e){return new Function("d","return {"+e.map(function(t,a){return JSON.stringify(t)+": d["+a+'] || ""'}).join(",")+"}")}function it(e,t){var a=Se(e);return function(s,o){return t(a(s),o,e)}}function ke(e){var t=Object.create(null),a=[];return e.forEach(function(s){for(var o in s)o in t||a.push(t[o]=o)}),a}function S(e,t){var a=e+"",s=a.length;return s<t?new Array(t-s+1).join(0)+a:a}function lt(e){return e<0?"-"+S(-e,6):e>9999?"+"+S(e,6):S(e,4)}function ht(e){var t=e.getUTCHours(),a=e.getUTCMinutes(),s=e.getUTCSeconds(),o=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":lt(e.getUTCFullYear())+"-"+S(e.getUTCMonth()+1,2)+"-"+S(e.getUTCDate(),2)+(o?"T"+S(t,2)+":"+S(a,2)+":"+S(s,2)+"."+S(o,3)+"Z":s?"T"+S(t,2)+":"+S(a,2)+":"+S(s,2)+"Z":a||t?"T"+S(t,2)+":"+S(a,2)+"Z":"")}function dt(e){var t=new RegExp('["'+e+`
\r]`),a=e.charCodeAt(0);function s(n,l){var f,g,d=o(n,function(w,x){if(f)return f(w,x-1);g=w,f=l?it(w,l):Se(w)});return d.columns=g||[],d}function o(n,l){var f=[],g=n.length,d=0,w=0,x,k=g<=0,I=!1;n.charCodeAt(g-1)===G&&--g,n.charCodeAt(g-1)===ie&&--g;function E(){if(k)return re;if(I)return I=!1,Te;var X,D=d,M;if(n.charCodeAt(D)===oe){for(;d++<g&&n.charCodeAt(d)!==oe||n.charCodeAt(++d)===oe;);return(X=d)>=g?k=!0:(M=n.charCodeAt(d++))===G?I=!0:M===ie&&(I=!0,n.charCodeAt(d)===G&&++d),n.slice(D+1,X-1).replace(/""/g,'"')}for(;d<g;){if((M=n.charCodeAt(X=d++))===G)I=!0;else if(M===ie)I=!0,n.charCodeAt(d)===G&&++d;else if(M!==a)continue;return n.slice(D,X)}return k=!0,n.slice(D,g)}for(;(x=E())!==re;){for(var q=[];x!==Te&&x!==re;)q.push(x),x=E();l&&(q=l(q,w++))==null||f.push(q)}return f}function h(n,l){return n.map(function(f){return l.map(function(g){return c(f[g])}).join(e)})}function p(n,l){return l==null&&(l=ke(n)),[l.map(c).join(e)].concat(h(n,l)).join(`
`)}function m(n,l){return l==null&&(l=ke(n)),h(n,l).join(`
`)}function y(n){return n.map(r).join(`
`)}function r(n){return n.map(c).join(e)}function c(n){return n==null?"":n instanceof Date?ht(n):t.test(n+="")?'"'+n.replace(/"/g,'""')+'"':n}return{parse:s,parseRows:o,format:p,formatBody:m,formatRows:y,formatRow:r,formatValue:c}}var ut=dt(","),ct=ut.parse,pt=_('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function mt(e){var t=pt();u(e,t)}var gt=_('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"/> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function ft(e){var t=gt();u(e,t)}var yt=_('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function vt(e){const t=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var a=yt(),s=z(b(a),2);J(s,17,()=>t,O,(o,h)=>{let p=()=>i(h).tag,m=()=>i(h).text;var y=R(),r=T(y);de(r,p,!1,(c,n)=>{var l=$e();A(()=>C(l,m())),u(n,l)}),u(o,y)}),v(a),u(e,a)}var wt=_("<p> </p>");function bt(e,t){var a=wt(),s=b(a);v(a),A(()=>C(s,`I am component A and my favorite number is ${t.number??""}.`)),u(e,a)}var zt=_("<p> </p>");function xt(e,t){var a=zt(),s=b(a);v(a),A(()=>C(s,`I am component B and my name is ${t.name??""}.`)),u(e,a)}var _t=_('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function Tt(e){const t={A:bt,B:xt},a=[{component:"A",number:42},{component:"B",name:"Russell"}];var s=_t(),o=z(b(s),2);J(o,17,()=>a,O,(h,p)=>{const m=B(()=>t[i(p).component]);var y=R(),r=T(y);le(r,()=>i(m),(c,n)=>{n(c,he(()=>i(p)))}),u(h,y)}),v(s),u(e,s)}var kt=_('<div><p class="svelte-12sq0x6"> </p></div>'),It=_('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function St(e){let t=W(void 0);var a=It(),s=b(a),o=z(b(s)),h=b(o,!0);v(o),v(s);var p=z(s,4);at(p,{get value(){return i(t)},set value(m){j(t,m,!0)},children:(m,y)=>{var r=R(),c=T(r);J(c,16,()=>[0,1,2,3,4],O,(n,l,f)=>{const g=B(()=>i(t)===f);var d=kt();let w;var x=b(d),k=b(x,!0);v(x),v(d),A(I=>{w=Qe(d,1,"step svelte-12sq0x6",null,w,I),C(k,l)},[()=>({active:i(g)})]),u(n,d)}),u(m,r)},$$slots:{default:!0}}),Ve(2),v(a),A(()=>C(h,i(t)||"-")),u(e,a)}const Rt=`{
  "heroText": "Like many girls her age, she loves to keep up with the latest fashion trends and explore new ways to express herself. Shopping is fun, but it won’t always be this way.",
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
      "id": "2",
      "start": "3",
      "end": "5",
      "yearRange": "2021-2023",
      "age": "10_11",
      "year": "2015",
      "sizeRange": "Junior's",
      "sizeType": "alphaSize",
      "text": "But not all tweens wear the same size.\\r\\n\\r\\n\\r\\nIf we were to look at a sample of all <span class=bold>10- and 11-year-old girls</span> in the U.S. from the National Center for Health Statistics, here are the junior’s sizes that match up with their body measurements."
    },
    {
      "id": "3",
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
      "id": "4",
      "yearRange": "2021-2023",
      "age": "14_15",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "alphaSize",
      "text": "This marks an important turning point as they shift into women’s sizes."
    },
    {
      "id": "5",
      "yearRange": "2021-2023",
      "age": "14_15",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "alphaSize",
      "text": "Girls who fall along the bottom 10th percentile can now wear an Extra Small in women’s clothing, while girls near the 90th percentile will find that an Extra Large generally fits. \\r\\n\\r\\n\\r\\nThe median 15-year-old wears a Medium, as she has throughout most of her childhood."
    },
    {
      "id": "6",
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
      "id": "7",
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
      "id": "8",
      "yearRange": "2021-2023",
      "age": "20_29",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "At age 15 a size <span class=orange-outline>Medium</span> still equals the median waistline, but from here on medium and median will separate."
    },
    {
      "id": "9",
      "yearRange": "2021-2023",
      "age": "20_29",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "<span class=bold>The median 20-something</span> fits a <span class=orange-outline>Large</span>, which translates to a <span class=orange-outline>size 14</span> in women’s clothing. (Women’s sizing uses both alpha and numeric sizing, but they don’t always overlap, making finding your size an even more frustrating process.)"
    },
    {
      "id": "10",
      "yearRange": "2021-2023",
      "age": "20over",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "Her wardrobe will shift again in her 30s. \\r\\n\\r\\n\\r\\nAt this point the median woman is closer to a <span class=orange-outline>size 16</span> or <span class=orange-outline>Extra Large.</span>"
    },
    {
      "id": "11",
      "yearRange": "2021-2023",
      "age": "20over",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "This trend will continue again, and again. \\r\\n\\r\\n\\r\\nAltogether, the median adult woman over the age of 20 fits a <span class=orange-outline>size 18.</span>"
    },
    {
      "id": "12",
      "yearRange": "2021-2023",
      "age": "20over",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "The problem is that most “Standard” or “Regular” size ranges only go up to a size 16."
    },
    {
      "id": "13",
      "yearRange": "2021-2023",
      "age": "20over",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "That leaves millions of people — over half of all adult women — without sizing options at all."
    },
    {
      "id": "14",
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
    },
    {
      "id": "10",
      "text": "<p><span class=interact>Explore more</span></p> \\r\\n\\r\\n\\r\\n<p>Interact with the dots for more information about each brand and size.</p>"
    },
    {
      "id": "11",
      "text": ""
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
    },
    {
      "step": "5",
      "text": "<p><span class=interact>Explore more</span></p> \\r\\n\\r\\n\\r\\n<p>Interact with the dress forms to see how sizes changed from 1995 to 2021.</p>"
    },
    {
      "step": "6",
      "visual": "display 1995 + 2021 astm sizes + median waistline markers",
      "animation": "highlight sizes 18 for both ranges",
      "text": ""
    }
  ],
  "sewingSection": [
    {
      "type": "text",
      "value": "I started learning how to sew my own clothes after finally reaching a point where I could no longer rationalize buying anything new, let alone full-priced. Why spend a bunch of money on low-quality materials that don’t even fit?"
    },
    {
      "type": "text",
      "value": "Like many girls, I learned from a young age to internalize shame around all aspects of my appearance, trapping me in a skewed worldview that saw my body as a problem in need of fixing. So many markers of my identity were shaped by the ways clothes failed to fit. I thought I was short, not because other girls around me were that much taller, but because my pants were always too long. Turns out at 5’3”, I’m exactly average height. While the body types of my peers were named after supple fruits — apples, even peaches, or pears — I was considered a brick. Clothes with the built-in curves of a woman would sag on my uneven frame."
    },
    {
      "type": "text",
      "value": "I had developed a hierarchy in my head that ranked each clothing size by its level of desirability. There were the sizes I wore, and the sizes that were “best.” As a chronic overachiever, I was in constant competition with myself to fight my way to the top. Studies show that women often construct entire identities around the clothes they fit into. I don’t just wear a size 6, I am a size 6. Or at least that’s what I used to tell myself. Who am I when I wear a size 16?"
    },
    {
      "type": "text",
      "value": "That’s exactly where I found myself, nearing my mid-30s and suddenly reckoning with the basic fact that I no longer looked like a teenager. I had come to terms with knowing I now occupied the body of an adult, along with all of the pains, joys, wisdom, and slights of social rejection that come with it. But the more my body changed, the harder it was to find replacements in my wardrobe. Nothing fit right, the quality of products took a nosedive, and I couldn’t justify spending more money than ever before on items that would have no chance of holding up or looking good on me."
    },
    {
      "type": "text",
      "value": "Somehow it felt more practical to learn how to make my own clothes than wait for the fashion industry at large to adopt some magical market solution to solve the many problems that have plagued women for generations. I started out with simple projects made from free sewing patterns that I found online. Many of the patterns were structured around an 8 — the size many fashion designers use as their starting point — with the other sizes being incrementally smaller or larger in a Russian doll-like effect."
    },
    {
      "type": "text",
      "value": "First, I tried a boxy, drop-shoulder top. Then a loose-fitting, tiered summer dress. The first pair of pants I made were an absolute disaster. The fabric I used was so thick I could barely sit down without busting through the leg seams, but then it sagged so much around my backside that I looked like I was wearing an adult diaper."
    },
    {
      "type": "text",
      "value": "My first major ‘aha’ moment came once I tried to draft my own sewing pattern from scratch. I took a PDF version of the textbook that most fashion design students study in school, printed out all 800+ pages, and placed them in a canary yellow 3-ring binder that would serve as the curriculum to my self-guided course. With a tape measure in hand, I followed the book’s prompts to take a total of 58 individual body measurements, and from there, I could make my own custom base pattern, known as a bodice block."
    },
    {
      "type": "text",
      "value": "In comparing my bespoke bodice block to commercial patterns and clothes available on the rack in stores, I had a revelation: my base measurements looked nothing like those of ready-to-wear garments."
    },
    {
      "type": "text",
      "value": "It didn’t matter how much weight I gained or lost, how much I contorted my body or tried to buy my way into styles that “flatter” my silhouette, there was no chance that clothes would ever be able to fit perfectly on their own."
    }
  ],
  "massProductionScroll": [
    {
      "step": "0",
      "text": "<p>Clothing sizes are optimized for mass production — not women’s bodies.</p> \\r\\n\\r\\n\\r\\n<p>The median woman in the U.S. today has a far less defined waistline. Her waist-to-hip ratio is half that of the traditional hourglass shape, yet this “ideal” still persists in many brands’ sizing charts.</p>"
    },
    {
      "step": "1",
      "text": "For example, here’s J.Crew’s Regular size chart. They use a rigid set of dimensions, with a waist-to-hip ratio that’s exactly 10 inches for all sizes. That means the smallest and largest sizes in a range will have the exact same body shape."
    },
    {
      "step": "2",
      "text": "Actual bodies, however, are far less uniform or symmetrical. A <span class=green-span>size 18</span> pair of pants from J.Crew might fit the median woman’s waist, but they’d likely be too large in the hips by a minimum of 6 inches."
    },
    {
      "step": "3",
      "text": "Conversely a <span class=green-span>size 12</span> would fit her hips best, but it’s unlikely that she’d be able to squeeze into a waistband that’s 6 inches smaller than her own."
    },
    {
      "step": "4",
      "text": "Of course, J. Crew isn’t the only brand whose size chart is this distorted. It’s the industry standard."
    },
    {
      "step": "5",
      "text": "The only brand that comes close to the median woman’s shape, especially as sizes get bigger, is H&M."
    },
    {
      "step": "6",
      "text": "<p><span class=interact>Explore more</span></p> \\r\\n\\r\\n\\r\\n<p>Use the selector in the top left corner, to highlight a size.</p>"
    },
    {
      "step": "7",
      "text": "Age and race factor heavily into how our bodies are shaped. Genetics can influence everything from a person’s proportions to their bone structure, how they build muscle mass, or where their bodies tend to store fat. Only one body type, however, serves as the underlying blueprint for nearly every piece of women’s clothing: The hourglass silhouette."
    },
    {
      "step": "8",
      "text": "Researchers have identified as many as nine different categories of body proportions commonly found among adult women alone, many of which are likely familiar to those told over the years to “dress for their body type.”"
    },
    {
      "step": "9",
      "text": "In 2007, one study found that only 12% of women in the U.S. actually have a true hourglass figure. Instead half of women (49%) were considered rectangle-shaped."
    },
    {
      "step": "10",
      "text": ""
    }
  ],
  "bodyTypes": [
    "Inverted Triangle",
    "Top Hourglass",
    "Oval",
    "Rectangle",
    "Hourglass",
    "Diamond",
    "Triangle",
    "Bottom Hourglass",
    "Spoon"
  ],
  "outro": [
    {
      "type": "text",
      "value": "In many ways, the fashion industry at large doesn’t even try to serve most women. The modern sizing system is based on the body measurements of a single group: Mostly young, WWII-era white women. No women of color were originally included. And ASTM has said itself that it is not looking to create sizes for every woman in the U.S. Instead size ranges are tailored to conventional, Western beauty standards, as well as what clothing brands consider to be their ideal customer."
    },
    {
      "type": "text",
      "value": "“It is important to note that the body measurements herein have been derived from designer experience and market observations and cross checked with available databases in the attempt to identify current customer characteristics and changing proportions and not from new nationwide anthropometric research. —ASTM’s 1995 standardized sizing chart"
    },
    {
      "type": "text",
      "value": "But who gets to be considered a brand’s target demographic?"
    }
  ]
}`;var Ct=_("<p><!></p>"),At=_("<section><!></section>");function Mt(e,t){Z(t,!0);let a=Y(t,"components",19,()=>({})),s=Y(t,"body",19,()=>[]);var o=R(),h=T(o);J(h,17,s,O,(p,m)=>{let y=()=>i(m).section,r=()=>i(m).content;const c=B(()=>y().toLowerCase().replace(/[^a-z0-9]/g,"")),n=B(()=>a()[y()]);var l=At(),f=b(l);{var g=w=>{var x=R(),k=T(x);le(k,()=>i(n),(I,E)=>{E(I,he(r))}),u(w,x)},d=w=>{var x=R(),k=T(x);J(k,17,r,O,(I,E,q,X)=>{let D=()=>i(E).type,M=()=>i(E).value;const ce=B(()=>a()[D()]),Re=B(()=>typeof M()=="string");var pe=R(),Ce=T(pe);{var Ae=P=>{var $=R(),Q=T($);le(Q,()=>i(ce),(ee,te)=>{te(ee,he(M))}),u(P,$)},Me=P=>{var $=R(),Q=T($);{var ee=N=>{var U=Ct(),ne=b(U);_e(ne,M),v(U),u(N,U)},te=N=>{var U=R(),ne=T(U);{var Ee=L=>{var V=R(),ae=T(V);de(ae,D,!1,(me,ge)=>{var fe=R(),je=T(fe);_e(je,M),u(ge,fe)}),u(L,V)},De=L=>{var V=R(),ae=T(V);de(ae,D,!1,(me,ge)=>{tt(me,()=>({...M()}))}),u(L,V)};H(ne,L=>{i(Re)?L(Ee):L(De,!1)},!0)}u(N,U)};H(Q,N=>{D()==="text"?N(ee):N(te,!1)},!0)}u(P,$)};H(Ce,P=>{i(ce)?P(Ae):P(Me,!1)})}u(I,pe)}),u(w,x)};H(f,w=>{i(n)?w(g):w(d,!1)})}v(l),A(()=>et(l,"id",i(c))),u(p,l)}),u(e,o),K()}var Et=_('<p> </p> <progress max="100"></progress>',1);function Dt(e,t){let a=Y(t,"label",3,"A"),s=Y(t,"value",3,0);var o=Et(),h=T(o),p=b(h,!0);v(h);var m=z(h,2);A(()=>{C(p,a()),nt(m,s())}),u(e,o)}var jt=_('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function Ft(e,t){Z(t,!0);const{body:a}=st,s={Test:Dt};var o=jt(),h=z(b(o),2),p=b(h),m=b(p,!0);v(p),v(h);var y=z(h,2);Mt(y,{get components(){return s},get body(){return a}}),v(o),A(r=>C(m,r),[()=>Rt.replace(/\t/g," ")]),u(e,o),K()}const Bt=(e,t=Ie)=>{var a=Wt(),s=b(a),o=b(s,!0);v(s);var h=z(s,2),p=b(h,!0);v(h),v(a),A(()=>{C(o,t().name),C(p,t().age)}),u(e,a)};var Wt=_('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),Pt=(e,t)=>Ge(t),Nt=(e,t)=>t.random(Math.floor(Math.random()*10)),Ut=_('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function Lt(e,t){Z(t,!0),Y(t,"age",3,30);const a=[{name:"John",age:30},{name:"Jill",age:45}];let s=W(0),o=B(()=>i(s)*2),h=B(()=>i(s)*2),p=W(0);ue(()=>{j(p,i(s)*2)});var m=Ut(),y=z(T(m),4);y.__click=[Pt,s];var r=z(y,2),c=b(r);v(r);var n=z(r,2),l=b(n);v(n);var f=z(n,2),g=b(f);v(f);var d=z(f,4),w=b(d);rt(w,()=>t.children??Ie),v(d);var x=z(d,4);x.__click=[Nt,t];var k=z(x,4);J(k,21,()=>a,O,(I,E)=>{Bt(I,()=>i(E))}),v(k),A(()=>{C(c,`${i(s)??""} doubled is ${i(o)??""} (derived)`),C(l,`${i(s)??""} doubled is ${i(h)??""} (derived by)`),C(g,`${i(s)??""} doubled is ${i(p)??""} ($effect)`)}),u(e,m),K()}Ke(["click"]);const Ht=(e,t)=>{let a=W(Ye(e)),s=W(null),o=W(!0),h=W(void 0);const p=(r=!0)=>{j(o,r,!0),r===!0&&(j(h,null),j(s,null))},m=async()=>{try{const r=await fetch(i(a),t);if(!r.ok)throw new Error(`Unexpected error occurred (status ${r.status})`);let c;if(i(a).includes(".csv")){const n=await r.text();c=ct(n)}else c=await r.json();return[null,c]}catch(r){const{errorMessage:c="Unexpected error eccurred"}=r;return[c,null]}},y=async r=>{p(!0);const[c,n]=await m();if(r===i(a)){if(c){p(!1),j(h,c,!0);return}p(!1),j(s,n,!0)}};return ue(()=>{y(i(a))}),{get data(){return i(s)},get loading(){return i(o)},get error(){return i(h)},get url(){return i(a)},set url(r){i(a)!==r&&j(a,r,!0)}}};var Jt=_("<p>loading data...</p>"),Ot=_("<p> </p>"),qt=_("<p>data loaded</p> <pre> </pre>",1),Xt=_('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function $t(e,t){Z(t,!0);const a=`${ot}/assets/demo/test.csv`,s=Ht(a);ue(()=>{});var o=Xt(),h=z(b(o),2),p=b(h);{var m=r=>{var c=Jt();u(r,c)},y=r=>{var c=R(),n=T(c);{var l=g=>{var d=Ot(),w=b(d);v(d),A(()=>C(w,`error: ${s.error??""}`)),u(g,d)},f=g=>{var d=qt(),w=z(T(d),2),x=b(w,!0);v(w),A(k=>C(x,k),[()=>JSON.stringify(s.data,null,2)]),u(g,d)};H(n,g=>{s.error?g(l):g(f,!1)},!0)}u(r,c)};H(p,r=>{s.loading?r(m):r(y,!1)})}v(h),v(o),u(e,o),K()}var Vt=_('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function Gt(e){let t=W(0);function a(l){console.log(l)}var s=Vt(),o=z(b(s),2);Lt(o,{random:a,get value(){return i(t)},set value(l){j(t,l,!0)}});var h=z(o,2);mt(h);var p=z(h,2);ft(p);var m=z(p,2);vt(m);var y=z(m,2);Tt(y);var r=z(y,2);Ft(r,{});var c=z(r,2);$t(c,{});var n=z(c,2);St(n),v(s),u(e,s)}function on(e){Gt(e)}export{on as component};
