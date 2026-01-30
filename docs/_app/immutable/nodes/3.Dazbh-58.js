import"../chunks/Bzak7iHL.js";import{h as B,a as ve,f as se,aE as Be,b as qe,E as je,d as Pe,aF as Ue,af as Le,ad as We,c as Ne,a3 as ye,a2 as we,D as Oe,p as He,a5 as Je,ag as Xe,V as _,X as p,ax as z,Z as b,_ as y,ay as R,aw as T,aA as $e,W as A,A as o,az as q,C as F,av as j,aG as Ve,U as Z,Y as K,u as pe,aH as Ge,R as ke,B as Ye}from"../chunks/Dzm_WEGj.js";import{i as Ze,b as be,a as C,d as Ke}from"../chunks/ZgVi19R2.js";import{b as ze,c as xe,e as O,i as H,d as Qe,s as en,f as nn,g as tn}from"../chunks/CGpJrmw_.js";import{c as le}from"../chunks/DH1QYJyw.js";import{s as he,p as Y}from"../chunks/ihUrmXYw.js";import{S as an,h as _e,c as sn}from"../chunks/EGpspJyj.js";import{i as N}from"../chunks/C0w0nz2X.js";import{s as rn}from"../chunks/BIhypZ3Q.js";import{b as on}from"../chunks/Ddqu7hE1.js";function de(e,n,a,s,i,h){let c=B;B&&ve();var m,v,r=null;B&&se.nodeType===Be&&(r=se,ve());var u=B?se:e,t,l=xe;qe(()=>{const f=n()||null;var g=f==="svg"?Ue:null;if(f!==m){var d=xe;ze(l),t&&(f===null?He(t,()=>{t=null,v=null}):f===v?Je(t):(Xe(t),be(!1))),f&&f!==v&&(t=Pe(()=>{if(r=B?r:g?document.createElementNS(g,f):document.createElement(f),Le(r,r),s){B&&Ze(f)&&r.append(document.createComment(""));var w=B?We(r):r.appendChild(Ne());B&&(w===null?ye(!1):we(w)),s(r,w)}Oe.nodes_end=r,u.before(r)})),m=f,m&&(v=m),be(!0),ze(d)}},je),c&&(ye(!0),we(u))}var Te={},re={},ie=34,G=10,oe=13;function Ie(e){return new Function("d","return {"+e.map(function(n,a){return JSON.stringify(n)+": d["+a+'] || ""'}).join(",")+"}")}function ln(e,n){var a=Ie(e);return function(s,i){return n(a(s),i,e)}}function Se(e){var n=Object.create(null),a=[];return e.forEach(function(s){for(var i in s)i in n||a.push(n[i]=i)}),a}function I(e,n){var a=e+"",s=a.length;return s<n?new Array(n-s+1).join(0)+a:a}function hn(e){return e<0?"-"+I(-e,6):e>9999?"+"+I(e,6):I(e,4)}function dn(e){var n=e.getUTCHours(),a=e.getUTCMinutes(),s=e.getUTCSeconds(),i=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":hn(e.getUTCFullYear())+"-"+I(e.getUTCMonth()+1,2)+"-"+I(e.getUTCDate(),2)+(i?"T"+I(n,2)+":"+I(a,2)+":"+I(s,2)+"."+I(i,3)+"Z":s?"T"+I(n,2)+":"+I(a,2)+":"+I(s,2)+"Z":a||n?"T"+I(n,2)+":"+I(a,2)+"Z":"")}function pn(e){var n=new RegExp('["'+e+`
\r]`),a=e.charCodeAt(0);function s(t,l){var f,g,d=i(t,function(w,x){if(f)return f(w,x-1);g=w,f=l?ln(w,l):Ie(w)});return d.columns=g||[],d}function i(t,l){var f=[],g=t.length,d=0,w=0,x,S=g<=0,k=!1;t.charCodeAt(g-1)===G&&--g,t.charCodeAt(g-1)===oe&&--g;function E(){if(S)return re;if(k)return k=!1,Te;var X,D=d,M;if(t.charCodeAt(D)===ie){for(;d++<g&&t.charCodeAt(d)!==ie||t.charCodeAt(++d)===ie;);return(X=d)>=g?S=!0:(M=t.charCodeAt(d++))===G?k=!0:M===oe&&(k=!0,t.charCodeAt(d)===G&&++d),t.slice(D+1,X-1).replace(/""/g,'"')}for(;d<g;){if((M=t.charCodeAt(X=d++))===G)k=!0;else if(M===oe)k=!0,t.charCodeAt(d)===G&&++d;else if(M!==a)continue;return t.slice(D,X)}return S=!0,t.slice(D,g)}for(;(x=E())!==re;){for(var J=[];x!==Te&&x!==re;)J.push(x),x=E();l&&(J=l(J,w++))==null||f.push(J)}return f}function h(t,l){return t.map(function(f){return l.map(function(g){return u(f[g])}).join(e)})}function c(t,l){return l==null&&(l=Se(t)),[l.map(u).join(e)].concat(h(t,l)).join(`
`)}function m(t,l){return l==null&&(l=Se(t)),h(t,l).join(`
`)}function v(t){return t.map(r).join(`
`)}function r(t){return t.map(u).join(e)}function u(t){return t==null?"":t instanceof Date?dn(t):n.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:s,parseRows:i,format:c,formatBody:m,formatRows:v,formatRow:r,formatValue:u}}var un=pn(","),cn=un.parse,mn=_('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function gn(e){var n=mn();p(e,n)}var fn=_('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"/> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function vn(e){var n=fn();p(e,n)}var yn=_('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function wn(e){const n=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var a=yn(),s=z(b(a),2);O(s,17,()=>n,H,(i,h)=>{let c=()=>o(h).tag,m=()=>o(h).text;var v=R(),r=T(v);de(r,c,!1,(u,t)=>{var l=$e();A(()=>C(l,m())),p(t,l)}),p(i,v)}),y(a),p(e,a)}var bn=_("<p> </p>");function zn(e,n){var a=bn(),s=b(a);y(a),A(()=>C(s,`I am component A and my favorite number is ${n.number??""}.`)),p(e,a)}var xn=_("<p> </p>");function _n(e,n){var a=xn(),s=b(a);y(a),A(()=>C(s,`I am component B and my name is ${n.name??""}.`)),p(e,a)}var Tn=_('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function Sn(e){const n={A:zn,B:_n},a=[{component:"A",number:42},{component:"B",name:"Russell"}];var s=Tn(),i=z(b(s),2);O(i,17,()=>a,H,(h,c)=>{const m=q(()=>n[o(c).component]);var v=R(),r=T(v);le(r,()=>o(m),(u,t)=>{t(u,he(()=>o(c)))}),p(h,v)}),y(s),p(e,s)}var kn=_('<div><p class="svelte-12sq0x6"> </p></div>'),In=_('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function Rn(e){let n=j(void 0);var a=In(),s=b(a),i=z(b(s)),h=b(i,!0);y(i),y(s);var c=z(s,4);an(c,{get value(){return o(n)},set value(m){F(n,m,!0)},children:(m,v)=>{var r=R(),u=T(r);O(u,16,()=>[0,1,2,3,4],H,(t,l,f)=>{const g=q(()=>o(n)===f);var d=kn();let w;var x=b(d),S=b(x,!0);y(x),y(d),A(k=>{w=Qe(d,1,"step svelte-12sq0x6",null,w,k),C(S,l)},[()=>({active:o(g)})]),p(t,d)}),p(m,r)},$$slots:{default:!0}}),Ve(2),y(a),A(()=>C(h,o(n)||"-")),p(e,a)}const Cn=`{
  "metaTitle": "Sizing chaos",
  "metaDescription": "The inter-generational struggle to find clothes that fit more than a tiny portion of women",
  "metaKeywords": "",
  "heroText": "Like many girls her age, she loves to keep up with the latest fashion trends and explore new ways to express herself. Shopping is fun, but it won’t always be this way.",
  "byline": "By <a href=https://pudding.cool/author/amanda-sakuma/>Amanda Sakuma</a>",
  "withline": "with <a href=https://pudding.cool/author/jan-diehm/>Jan Diehm</a>",
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
      "text": "“Junior’s” clothing lines often channel tweens’ interests with youthful styles that fit young girls as they grow.\\r\\n\\r\\n\\r\\nFor now, our typical <span class=bold>11-year-old</span> wears a size 9 in the junior’s section, which is also considered a size <span class=orange-outline>Medium</span>."
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
      "text": "But not all tweens wear the same size.\\r\\n\\r\\n\\r\\nIf we were to look at a sample of all <span class=bold>10- and 11-year-old girls</span> in the U.S. from the <a href=https://stacks.cdc.gov/view/cdc/174595> National Center for Health Statistics,</a> here are the junior’s sizes that match up with their waistline measurements."
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
      "text": "This marks an important turning point as they shift into <span class=bold>women’s sizes.</span>"
    },
    {
      "id": "5",
      "yearRange": "2021-2023",
      "age": "14_15",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "alphaSize",
      "text": "Girls who fall along the bottom <span class=bold>10th percentile</span> can now wear an <span class=bold>Extra Small</span> in women’s clothing, while girls near the <span class=bold>90th percentile</span> will find that an <span class=bold>Extra Large</span> generally fits. \\r\\n\\r\\n\\r\\nThe median 15-year-old wears a Medium, as she has throughout most of her childhood."
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
      "text": "This means for the first time ever, most girls in their cohort will be able to find a size in the women’s clothing section."
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
      "text": "At age 15 a size <span class=orange-outline>Medium</span> still equals the median waistline but, from here on, the two will diverge.\\r\\n\\r\\n\\r\\nIn addition to generic letter sizes (Small, Medium, Large etc.), women have a numeric sizing system that is designed to be more tailored and precise. Here, the median 15-year-old’s waistline fits a <span class=bold>size 10</span>."
    },
    {
      "id": "9",
      "yearRange": "2021-2023",
      "age": "20_29",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "The <span class=bold>median 20-something</span> will eventually move up a letter size to a <span class=bold>Large</span>. \\r\\n\\r\\n\\r\\nIn U.S. women’s sizing, this translates to a <span class=orange-outline>size 14</span>."
    },
    {
      "id": "10",
      "yearRange": "2021-2023",
      "age": "20over",
      "year": "2021",
      "sizeRange": "Women's",
      "sizeType": "size",
      "text": "Her wardrobe will shift again in her 30s. \\r\\n\\r\\n\\r\\nAt this point the median woman is closer to a <span class=orange-outline>size 16</span> or <span class=bold>Extra Large.</span>"
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
      "text": "That leaves millions of people — over half of all adult women — who are excluded from standard size ranges."
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
      "value": "I remember once being that teen girl shopping in the women’s section for the first time. I took stacks upon stacks of jeans with me to the dressing room, searching in vain for that one pair that fit perfectly. Over 20 years later, my hunt for the ideal pair of jeans continues. But now as an adult, I’m stuck with the countless ways that women’s apparel is not made for the average person, like me."
    },
    {
      "type": "text",
      "value": "Children’s clothing sizes are often tied to a kid’s age or stage of development. The idea is that as a young person grows older, her clothes will evolve with her. Youth styles tend to be boxy and oversized to allow room for kids to move and grow. By early adolescence, apparel for girls becomes more fitted. Junior’s styles have higher waistlines and less-pronounced curves compared to adult clothing lines. In short: clothes for tweens are made for tween bodies."
    },
    {
      "type": "text",
      "value": "By the time most teenage girls can wear women’s clothes — around age 15 — their options are seemingly endless. But the evolution in clothing sizes that followed girls throughout childhood abruptly stops there."
    },
    {
      "type": "text",
      "value": "This is reality I find myself reckoning with today: Women’s clothing — designed for adults — fits modern teen girls better."
    }
  ],
  "sizeIntro": [
    {
      "type": "text",
      "value": "Few life experiences feel as universal, across generations, as the pains and frustrations of trying to find clothes that fit."
    },
    {
      "type": "text",
      "value": "Sizes vary wildly from store to store. Even within a single apparel company, no one size is consistent. There are no regulations or universal sizing standards. Instead each brand is incentivized to make up their own. When size guides change — and they’re always changing — brands are not obligated to disclose updates."
    },
    {
      "type": "text",
      "value": "There are also often different sizing structures for every type of garment. “Plus” size means one thing, “curve” means another, and “extended” sizes can be defined as all of the above or something else entirely. Don’t count on any of those sizes to be available to try on in-store, but do brace for return fees if your online order doesn’t fit. Free in-store alterations are largely a thing of the past, while a trip to the tailor’s can cost just as much as the item itself."
    },
    {
      "type": "text",
      "value": "The only consistent feature is that the industry at large continues to cling onto the same underlying sizing system that’s been broken for decades. And it’s only gotten worse."
    }
  ],
  "sizeScroll": [
    {
      "id": "0",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "excludeNearMedian",
      "text": "<p>While there are no universal sizing standards, an organization called <span class=blue-span>ASTM International</span> regularly releases informal guidelines. </p><p>Here, each current ASTM size (00–20) is represented by a <span class=blue-dot>dot.</span></p>"
    },
    {
      "id": "1",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "null",
      "text": "<p>Clothing manufacturers may loosely follow those standards, but more often than not, brands prefer to tailor their own practices to their target customer base.</p> <p>These <span class=purple-dot>dots</span> represent the size charts of 17 popular brands. Dots connected by a <span class=shade-bg>shaded background</span> show when measurements or sizes are presented as a range.</p>"
    },
    {
      "id": "2",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "null",
      "text": "<p>Sizes are frequently inconsistent and undefined. </p><p>Generic letter sizes often group multiple numeric sizes together, with no universal standard for what “Small” or “Medium” actually means. For example, here’s every size that is labeled as <span class=bold>Large</span>, spanning waistlines from 29 to 34 inches.</p>"
    },
    {
      "id": "3",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "<p>Here is our <span class=orange-outline-dash>median 15-year-old girl</span> in the U.S. With a waistline measuring 30.4 inches, she fits around a <span class=bold>size 10 </span>according to ASTM standards.</p><p>While it’s unlikely that clothing designed for adults will fit a teen’s body perfectly, she has quite a few sizing options.</p>"
    },
    {
      "id": "4",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "<p>However as she’ll quickly learn, sizes are not universal across all brands. Here are all the sizes within 1 inch of the median teen’s waistline. </p><p>At Banana Republic, she’s closer to a size 8. At Uniqlo, she’s considered a size 12.</p>"
    },
    {
      "id": "5",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "The <span class=orange-outline-dash>median adult woman</span> has a much harder time finding clothes that fit. Her waistline is 37.68 inches, placing her at a <span class=bold>size 18</span> by ASTM standards."
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
      "text": "<p>Sizing issues are amplified even further within <span class=green-span>Plus</span> size ranges. Some Plus sizes start at size 12, others at 18. Others still consider any size from 00 to 30 as part of their <span class=purple-span>Regular</span> line.</p>"
    },
    {
      "id": "8",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "<p>The median adult woman may also find herself in what’s informally called the “mid-size gap,” seen here in Anthropologie’s size chart.</p> <p>Sizes within the <span class=purple-span>Regular</span> size range are too small, yet the next size up in the <span class=green-span>Plus</span> range might be too big.</p>"
    },
    {
      "id": "9",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "<p>Even the symbols used to describe certain sizes hold a wide range of meanings.</p>  <p>For the average adult woman, there are as many as 10 different ways to describe the garments that she could conceivably wear from these brands alone. At Reformation she’s closer to a size 14. At Shein, she’s a 2XL in their plus size range.</p>"
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
      "value": "On top of all these problems, consumers often know the labels for any given size cannot be trusted."
    },
    {
      "type": "text",
      "value": "Vanity sizing, the practice where size labels stay the same even as the underlying measurements frequently become larger, is so ubiquitous across the fashion and apparel industry that younger generations have never experienced a world without it."
    },
    {
      "type": "text",
      "value": "Cultural narratives around vanity sizing often square the blame on female shoppers, not brands. <a href=\\"https://www.newsweek.com/fashion-designers-introduce-less-zero-sizes-112005\\"><i>Newsweek</i></a> once called it “self-delusion on a mass scale” because women were more likely to buy items that were labeled as sizes smaller than reality. But there’s more to the story."
    },
    {
      "type": "text",
      "value": "Vanity sizing provides a powerful <a href=”https://www.sciencedirect.com/science/article/abs/pii/S1057740813000612”>marketing strategy</a> for brands. Companies found that whenever women needed a size larger than expected, they were less likely to follow through on their purchases. Some could even develop negative associations with the brand and never shop there again. But when manufacturers manipulated sizing labels, leading to a more positive customer experience, brands could maintain a slight competitive edge."
    },
    {
      "type": "text",
      "value": "The dynamic perpetuates an arms race toward artificially deflating size labels. Most shoppers aren’t even aware when size charts change, or by how much. If anything, vanity sizing consistently gaslights women to the point where few are able to know their “true” size. But where would we be today without it?"
    }
  ],
  "vanityScroll": [
    {
      "step": "0",
      "visual": "display 1995 astm sizes",
      "animation": "",
      "text": "<p>It’s true: Sizes today are much larger than they were in the past. </p>\\r\\n\\r\\n\\r\\n<p>Roughly 30 years ago, ASTM guidelines covered waistlines between 24 and 36.5 inches, representing a <span class=bold>12.5-inch</span> spread from size 2–20. (While extended sizes technically existed at the time, they were not widely available in stores).</p>"
    },
    {
      "step": "1",
      "visual": "display 1995 + 2021 astm sizes",
      "animation": "add 2021 sizes; highlight size 2 from 2021 + size 8 from 1995",
      "text": "<p>In the early 2000s ASTM added size 00 and 0 to pad out the bottom of the range.</p>\\r\\n<p>Now today, because of vanity sizing, we can see an upward shift in all sizes. ASTM guidelines span <span class=bold>15.12 inches</span> from 25.38–40.5 inches for sizes 00–20. </p>"
    },
    {
      "step": "2",
      "visual": "display 1995 + 2021 astm sizes",
      "animation": "highlight size 8 from 2021",
      "text": "By comparison, today’s <span class=blue-span>size 8</span> is <span class=bold>2.5 inches</span> larger in the waist than it was 30 years ago."
    },
    {
      "step": "3",
      "visual": "display 1995 + 2021 astm sizes + median waistline markers",
      "animation": "add markers for median waistlines in 1994 & 2023",
      "text": "<p>But vanity sizing didn’t just account for women’s unconscious shopping behaviors. Clothes needed to be larger because our waistlines had grown. </p>\\r\\n\\r\\n\\r\\n<p>The <span class=orange-span>average woman’s waistline</span> today is nearly <span class=bold>4 inches</span> wider than it was in the mid-1990s.</p>"
    },
    {
      "step": "4",
      "visual": "display 1995 + 2021 astm sizes + median waistline markers",
      "animation": "highlight sizes 18 for both ranges",
      "text": "<p>Here’s the surprising silver lining to vanity sizing: Over this 30-year period, the median adult woman has almost always fit the <span class=bold>size 18</span> that was available to her at the time. </p>\\r\\n\\r\\n\\r\\n<p>Vanity sizing has effectively helped manufacturers keep up to pace with demographic shifts in the U.S. But only for the smallest half of all adult women.</p>"
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
  "sewingLessons": [
    {
      "type": "text",
      "value": "I once believed that change was inevitable and sizing problems would become a relic of the past. If it wasn’t some scrappy upstart that promised to revolutionize the sizing system, then at least the major fashion conglomerates would be well-placed to modernize and tap the full potential of the plus-size market. But that progress never fully materialized. And I got tired of waiting."
    },
    {
      "type": "text",
      "value": "A few years ago, I started learning how to sew. Somehow it felt more practical to make my own clothes than count on meaningful change to happen on its own. Getting started was easier than I thought. The first sewing pattern I ever completed — a boxy, drop-shoulder style that could turn into either a shirt or dress — was free to download. It included a 29-page instruction manual with photos and illustrations documenting every step."
    },
    {
      "type": "text",
      "value": "From there, I started learning how to draft my own sewing patterns from scratch. That’s when I realized the truth behind my sizing struggles: Clothing sizes are optimized for mass production and appeal — not women’s bodies. Nothing represents this more than a size 8."
    },
    {
      "type": "text",
      "value": "Fashion designers often use body measurements for a <span class=orange-outline>size 8</span> as a starting point when creating new design samples. Manufacturers then use a mathematical formula to determine each next size up or down the range in a process called grading. The effect is like a Russian doll. Each size up is incrementally larger than the last."
    },
    {
      "type": "text",
      "value": "The uniform shape makes it easier for factories to mass-produce garments, however it comes with several tradeoffs. It’s hard to scale up to larger-sized clothing before the proportions become distorted. It also becomes impractical to make multiple versions of a single item to accommodate varying body shapes or heights. That means most women’s clothing is derived from a single set of proportions — a size 8. According to U.S. health data, fewer than 10% of adult women have waistlines that fit the standard sample size or smaller."
    },
    {
      "type": "text",
      "value": "I, like the vast majority of women, do not fit the standard mold. Instead I took an old pattern-making textbook often taught in fashion design schools to start making clothes to fit my own unique proportions. I gathered and recorded over 58 different body measurements in order to get started and from there, I could make my own <span class=orange-outline>custom base pattern,</span> known as a bodice block or sloper."
    },
    {
      "type": "text",
      "value": "Once I compared my personalized sloper to commercial patterns and retail garments, I had a revelation: clothes were never made to fit bodies like mine. It didn’t matter how much weight I gained or lost, whether I contorted my body or tried to buy my way into styles that “flatter” my silhouette, there was no chance that clothes would ever fit perfectly on their own. Finally I understood why."
    }
  ],
  "massProductionScroll": [
    {
      "step": "0",
      "text": "<p>As women, it’s drilled into our heads that the ideal body type is the hourglass: wide shoulders and hips and a snatched waist. \\r\\n\\r\\n\\r\\n<p>But that’s an unrealistic standard for most people."
    },
    {
      "step": "1",
      "text": "<a href=https://www.researchgate.net/publication/286985579_Female_Figure_Identification_Technique_FFIT_for_apparel_part_I_Describing_female_shapes>Researchers</a> have identified as many as nine different categories of body proportions commonly found among adult women alone. Many are likely familiar to those told over the years to “dress for their body type.”"
    },
    {
      "step": "2",
      "text": "<p>Most women do not have an exaggerated hourglass silhouette, instead the <span class=blue-span>median woman</span> is shaped more like a rectangle.</p> \\r\\n\\r\\n\\r\\n<p>That’s because age and race factor heavily into how our bodies are shaped. Genetics can influence everything from a person's proportions to how they build muscle mass to where their bodies tend to store fat. </p>"
    },
    {
      "step": "3",
      "text": "One 2007 <a href=https://www.semanticscholar.org/paper/Comparison-of-body-shape-between-USA-and-Korean-Lee-Istook/fcc0679bf0d87817520064197d6f634eed604316>study</a> found that half of women (49%) in the U.S. were considered rectangle-shaped. Only 12% of women had a true hourglass figure."
    },
    {
      "step": "4",
      "text": "<p>While the U.S. does not track bust measurements,* we know that the <span class=blue-span>median woman's</span> waist-to-hip difference is roughly half that of <span class=orange-outline>'ideal' hourglass proportions.</span></p> \\r\\n\\r\\n\\r\\n<p>Still, size charts continue to champion a defined waistline as the sole foundation to most women’s apparel.</p>"
    },
    {
      "step": "5",
      "text": "<p>For example, here’s J.Crew’s size chart. They use a rigid set of dimensions, where the waist measurement is exactly <span class=bold>10 inches smaller</span> than the hip for all sizes.</p>  \\r\\n\\r\\n\\r\\n<p>That means the smallest and largest sizes in a range will have the exact same body shape.</p>"
    },
    {
      "step": "6",
      "text": "<p>Actual bodies, however, are far less uniform or symmetrical.</p>  \\r\\n\\r\\n\\r\\n<p>A <span class=orange-outline>size 18</span> pair of pants from J.Crew might fit the median woman’s waist, but they’d likely be too large in the hips by at least 6 inches.</p>"
    },
    {
      "step": "7",
      "text": "Conversely a <span class=orange-outline>size 12</span> would fit her hips best, but it’s unlikely that she’d be able to squeeze into a waistband that’s 6 inches smaller than her own."
    },
    {
      "step": "8",
      "text": "Of course, J. Crew isn’t the only brand whose size chart is distorted. It’s the industry standard."
    },
    {
      "step": "9",
      "text": "Out of these 15 brands, only H&M comes close to the median woman’s shape, especially as sizes get bigger."
    },
    {
      "step": "10",
      "text": "<p><span class=interact>Explore more</span></p> \\r\\n\\r\\n\\r\\n<p>Use the selector in the top left corner, to highlight a size.</p>"
    },
    {
      "step": "11",
      "text": ""
    }
  ],
  "massProductionScrollALT": [
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
      "value": "The fashion industry thrives on exclusivity. Luxury brands maintain their status by limiting who is able to buy or even wear their clothes. If few women fit the “ideal” standards, then products serving only them are inherently exclusionary. Size charts become the de facto dividing line determining who belongs and who doesn’t."
    },
    {
      "type": "text",
      "value": "This line of gatekeeping is baked into the foundation of virtually all clothing. The modern sizing system in the U.S. was <a href=\\"https://archive.org/details/womensmeasuremen454obri/mode/2up\\">developed in the 1940s</a> based on mostly young, white women. No women of color were originally included. The system was never built to include a diverse cross-section of people, ages, or body types. It has largely stayed that way by design."
    },
    {
      "type": "text",
      "value": "In its 1995 standards update, ASTM International admitted that its sizing guidelines were never meant to represent the population at large. Instead body measurements were based on “designer experience” and “market observations.” The goal was to tailor sizes to the existing customer base. But what happens when more than half of all women are pushed to the margins or left behind?"
    },
    {
      "type": "text",
      "value": "It doesn’t have to be this way. Teenage girls shouldn’t be aging out of sizing options from the moment they start wearing women’s clothes. A woman does not need hourglass proportions to look good, just as garment-makers do not need standardized sizes to produce well-fitting clothes."
    },
    {
      "type": "text",
      "value": "There are no rules forcing brands to adopt any particular sizing system. There is no such thing as a “true” size 8, or any size for that matter. If brands are constantly developing and customizing their size charts, then it makes little sense to perpetuate a broken system. Sizes are all made up anyway — why can’t we make them better?"
    }
  ],
  "methods": [
    {
      "type": "text",
      "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at sagittis quam. Pellentesque bibendum lorem eu purus pulvinar porttitor. Cras elit elit, viverra at nisi at, congue tristique mi. Phasellus elementum, lacus at fermentum laoreet, mauris velit pharetra nunc, in laoreet est leo vel nisi."
    },
    {
      "type": "text",
      "value": "Curabitur neque ex, ultrices ut finibus id, laoreet sit amet magna. In hac habitasse platea dictumst. Donec nec feugiat lacus. Proin mattis nisi libero, sed blandit neque tempus vel. Donec faucibus, enim in rutrum pharetra, tellus magna semper justo, eget pellentesque ante massa vitae quam. Nullam quam felis, congue vitae pharetra a, gravida vel turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      "type": "text",
      "value": "Mauris non malesuada libero. Curabitur ac viverra lacus. Nulla non porttitor augue, in rhoncus elit. Proin lobortis vestibulum velit, vel congue metus volutpat sit amet. Duis ultricies urna vel velit dignissim facilisis sed nec diam. Integer vitae scelerisque est. Nulla facilisi."
    },
    {
      "type": "text",
      "value": "Ransom note letters are from <a href=https://indieground.net/product/ransom-note-letters/>Indieground.</a>"
    }
  ],
  "furtherReading": [
    {
      "name": "Inside the confusing world of women's clothing sizes",
      "org": "The Straits Times",
      "url": "https://www.straitstimes.com/multimedia/graphics/2025/09/womens-clothing-size-guide-singapore/index.html"
    },
    {
      "name": "Women’s clothing retailers are still ignoring the reality of size in the US",
      "org": "Quartz",
      "url": "https://qz.com/quartzy/1309509/we-analyzed-750-pairs-of-jeans-and-found-definitive-skinny-bias-by-us-retailers"
    },
    {
      "name": "Women’s pockets are inferior",
      "org": "The Pudding",
      "url": "https://pudding.cool/2018/08/pockets/"
    },
    {
      "name": "The Inferior Clothing Choices Offered to Larger Women",
      "org": "Kriti Singh",
      "url": "https://kritisgh.github.io/Clothing-Disparity-Plus-Size-Women/"
    },
    {
      "name": "Why women’s clothing sizes don’t make sense",
      "org": "Vox",
      "url": "https://www.vox.com/2016/8/3/12353906/womens-clothing-sizes-vanity-sizing"
    }
  ]
}`;var An=_("<p><!></p>"),Mn=_("<section><!></section>");function En(e,n){Z(n,!0);let a=Y(n,"components",19,()=>({})),s=Y(n,"body",19,()=>[]);var i=R(),h=T(i);O(h,17,s,H,(c,m)=>{let v=()=>o(m).section,r=()=>o(m).content;const u=q(()=>v().toLowerCase().replace(/[^a-z0-9]/g,"")),t=q(()=>a()[v()]);var l=Mn(),f=b(l);{var g=w=>{var x=R(),S=T(x);le(S,()=>o(t),(k,E)=>{E(k,he(r))}),p(w,x)},d=w=>{var x=R(),S=T(x);O(S,17,r,H,(k,E,J,X)=>{let D=()=>o(E).type,M=()=>o(E).value;const ue=q(()=>a()[D()]),Re=q(()=>typeof M()=="string");var ce=R(),Ce=T(ce);{var Ae=P=>{var $=R(),Q=T($);le(Q,()=>o(ue),(ee,ne)=>{ne(ee,he(M))}),p(P,$)},Me=P=>{var $=R(),Q=T($);{var ee=U=>{var L=An(),te=b(L);_e(te,M),y(L),p(U,L)},ne=U=>{var L=R(),te=T(L);{var Ee=W=>{var V=R(),ae=T(V);de(ae,D,!1,(me,ge)=>{var fe=R(),Fe=T(fe);_e(Fe,M),p(ge,fe)}),p(W,V)},De=W=>{var V=R(),ae=T(V);de(ae,D,!1,(me,ge)=>{nn(me,()=>({...M()}))}),p(W,V)};N(te,W=>{o(Re)?W(Ee):W(De,!1)},!0)}p(U,L)};N(Q,U=>{D()==="text"?U(ee):U(ne,!1)},!0)}p(P,$)};N(Ce,P=>{o(ue)?P(Ae):P(Me,!1)})}p(k,ce)}),p(w,x)};N(f,w=>{o(t)?w(g):w(d,!1)})}y(l),A(()=>en(l,"id",o(u))),p(c,l)}),p(e,i),K()}var Dn=_('<p> </p> <progress max="100"></progress>',1);function Fn(e,n){let a=Y(n,"label",3,"A"),s=Y(n,"value",3,0);var i=Dn(),h=T(i),c=b(h,!0);y(h);var m=z(h,2);A(()=>{C(c,a()),tn(m,s())}),p(e,i)}var Bn=_('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function qn(e,n){Z(n,!0);const{body:a}=sn,s={Test:Fn};var i=Bn(),h=z(b(i),2),c=b(h),m=b(c,!0);y(c),y(h);var v=z(h,2);En(v,{get components(){return s},get body(){return a}}),y(i),A(r=>C(m,r),[()=>Cn.replace(/\t/g," ")]),p(e,i),K()}const jn=(e,n=ke)=>{var a=Pn(),s=b(a),i=b(s,!0);y(s);var h=z(s,2),c=b(h,!0);y(h),y(a),A(()=>{C(i,n().name),C(c,n().age)}),p(e,a)};var Pn=_('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),Un=(e,n)=>Ge(n),Ln=(e,n)=>n.random(Math.floor(Math.random()*10)),Wn=_('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function Nn(e,n){Z(n,!0),Y(n,"age",3,30);const a=[{name:"John",age:30},{name:"Jill",age:45}];let s=j(0),i=q(()=>o(s)*2),h=q(()=>o(s)*2),c=j(0);pe(()=>{F(c,o(s)*2)});var m=Wn(),v=z(T(m),4);v.__click=[Un,s];var r=z(v,2),u=b(r);y(r);var t=z(r,2),l=b(t);y(t);var f=z(t,2),g=b(f);y(f);var d=z(f,4),w=b(d);rn(w,()=>n.children??ke),y(d);var x=z(d,4);x.__click=[Ln,n];var S=z(x,4);O(S,21,()=>a,H,(k,E)=>{jn(k,()=>o(E))}),y(S),A(()=>{C(u,`${o(s)??""} doubled is ${o(i)??""} (derived)`),C(l,`${o(s)??""} doubled is ${o(h)??""} (derived by)`),C(g,`${o(s)??""} doubled is ${o(c)??""} ($effect)`)}),p(e,m),K()}Ke(["click"]);const On=(e,n)=>{let a=j(Ye(e)),s=j(null),i=j(!0),h=j(void 0);const c=(r=!0)=>{F(i,r,!0),r===!0&&(F(h,null),F(s,null))},m=async()=>{try{const r=await fetch(o(a),n);if(!r.ok)throw new Error(`Unexpected error occurred (status ${r.status})`);let u;if(o(a).includes(".csv")){const t=await r.text();u=cn(t)}else u=await r.json();return[null,u]}catch(r){const{errorMessage:u="Unexpected error eccurred"}=r;return[u,null]}},v=async r=>{c(!0);const[u,t]=await m();if(r===o(a)){if(u){c(!1),F(h,u,!0);return}c(!1),F(s,t,!0)}};return pe(()=>{v(o(a))}),{get data(){return o(s)},get loading(){return o(i)},get error(){return o(h)},get url(){return o(a)},set url(r){o(a)!==r&&F(a,r,!0)}}};var Hn=_("<p>loading data...</p>"),Jn=_("<p> </p>"),Xn=_("<p>data loaded</p> <pre> </pre>",1),$n=_('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function Vn(e,n){Z(n,!0);const a=`${on}/assets/demo/test.csv`,s=On(a);pe(()=>{});var i=$n(),h=z(b(i),2),c=b(h);{var m=r=>{var u=Hn();p(r,u)},v=r=>{var u=R(),t=T(u);{var l=g=>{var d=Jn(),w=b(d);y(d),A(()=>C(w,`error: ${s.error??""}`)),p(g,d)},f=g=>{var d=Xn(),w=z(T(d),2),x=b(w,!0);y(w),A(S=>C(x,S),[()=>JSON.stringify(s.data,null,2)]),p(g,d)};N(t,g=>{s.error?g(l):g(f,!1)},!0)}p(r,u)};N(c,r=>{s.loading?r(m):r(v,!1)})}y(h),y(i),p(e,i),K()}var Gn=_('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function Yn(e){let n=j(0);function a(l){console.log(l)}var s=Gn(),i=z(b(s),2);Nn(i,{random:a,get value(){return o(n)},set value(l){F(n,l,!0)}});var h=z(i,2);gn(h);var c=z(h,2);vn(c);var m=z(c,2);wn(m);var v=z(m,2);Sn(v);var r=z(v,2);qn(r,{});var u=z(r,2);Vn(u,{});var t=z(u,2);Rn(t),y(s),p(e,s)}function ot(e){Yn(e)}export{ot as component};
