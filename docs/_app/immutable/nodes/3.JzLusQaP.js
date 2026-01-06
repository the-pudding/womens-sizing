import"../chunks/Bzak7iHL.js";import{h as F,a as ve,f as se,aE as Fe,b as Ue,E as We,d as je,aF as Pe,af as Le,ad as Ne,c as He,a3 as ye,a2 as we,D as Je,p as qe,a5 as Oe,ag as Xe,V as _,X as c,ax as z,Z as b,_ as y,ay as I,aw as T,aA as $e,W as A,A as i,az as U,C as D,av as W,aG as Ve,U as Z,Y as Q,u as ce,aH as Ge,R as ke,B as Ye}from"../chunks/Dzm_WEGj.js";import{i as Ze,b as be,a as C,d as Qe}from"../chunks/ZgVi19R2.js";import{b as ze,c as xe,e as J,i as q,d as Ke,s as en,f as nn,g as tn}from"../chunks/CbB6GLjC.js";import{c as le}from"../chunks/DH1QYJyw.js";import{s as he,p as Y}from"../chunks/ihUrmXYw.js";import{S as an,h as _e,c as sn}from"../chunks/ButTBccu.js";import{i as H}from"../chunks/C0w0nz2X.js";import{s as rn}from"../chunks/BIhypZ3Q.js";import{b as on}from"../chunks/2H-b5Bg_.js";function de(e,n,a,s,o,h){let u=F;F&&ve();var m,v,r=null;F&&se.nodeType===Fe&&(r=se,ve());var p=F?se:e,t,l=xe;Ue(()=>{const f=n()||null;var g=f==="svg"?Pe:null;if(f!==m){var d=xe;ze(l),t&&(f===null?qe(t,()=>{t=null,v=null}):f===v?Oe(t):(Xe(t),be(!1))),f&&f!==v&&(t=je(()=>{if(r=F?r:g?document.createElementNS(g,f):document.createElement(f),Le(r,r),s){F&&Ze(f)&&r.append(document.createComment(""));var w=F?Ne(r):r.appendChild(He());F&&(w===null?ye(!1):we(w)),s(r,w)}Je.nodes_end=r,p.before(r)})),m=f,m&&(v=m),be(!0),ze(d)}},We),u&&(ye(!0),we(p))}var Te={},re={},oe=34,G=10,ie=13;function Re(e){return new Function("d","return {"+e.map(function(n,a){return JSON.stringify(n)+": d["+a+'] || ""'}).join(",")+"}")}function ln(e,n){var a=Re(e);return function(s,o){return n(a(s),o,e)}}function Se(e){var n=Object.create(null),a=[];return e.forEach(function(s){for(var o in s)o in n||a.push(n[o]=o)}),a}function R(e,n){var a=e+"",s=a.length;return s<n?new Array(n-s+1).join(0)+a:a}function hn(e){return e<0?"-"+R(-e,6):e>9999?"+"+R(e,6):R(e,4)}function dn(e){var n=e.getUTCHours(),a=e.getUTCMinutes(),s=e.getUTCSeconds(),o=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":hn(e.getUTCFullYear())+"-"+R(e.getUTCMonth()+1,2)+"-"+R(e.getUTCDate(),2)+(o?"T"+R(n,2)+":"+R(a,2)+":"+R(s,2)+"."+R(o,3)+"Z":s?"T"+R(n,2)+":"+R(a,2)+":"+R(s,2)+"Z":a||n?"T"+R(n,2)+":"+R(a,2)+"Z":"")}function cn(e){var n=new RegExp('["'+e+`
\r]`),a=e.charCodeAt(0);function s(t,l){var f,g,d=o(t,function(w,x){if(f)return f(w,x-1);g=w,f=l?ln(w,l):Re(w)});return d.columns=g||[],d}function o(t,l){var f=[],g=t.length,d=0,w=0,x,S=g<=0,k=!1;t.charCodeAt(g-1)===G&&--g,t.charCodeAt(g-1)===ie&&--g;function M(){if(S)return re;if(k)return k=!1,Te;var X,B=d,E;if(t.charCodeAt(B)===oe){for(;d++<g&&t.charCodeAt(d)!==oe||t.charCodeAt(++d)===oe;);return(X=d)>=g?S=!0:(E=t.charCodeAt(d++))===G?k=!0:E===ie&&(k=!0,t.charCodeAt(d)===G&&++d),t.slice(B+1,X-1).replace(/""/g,'"')}for(;d<g;){if((E=t.charCodeAt(X=d++))===G)k=!0;else if(E===ie)k=!0,t.charCodeAt(d)===G&&++d;else if(E!==a)continue;return t.slice(B,X)}return S=!0,t.slice(B,g)}for(;(x=M())!==re;){for(var O=[];x!==Te&&x!==re;)O.push(x),x=M();l&&(O=l(O,w++))==null||f.push(O)}return f}function h(t,l){return t.map(function(f){return l.map(function(g){return p(f[g])}).join(e)})}function u(t,l){return l==null&&(l=Se(t)),[l.map(p).join(e)].concat(h(t,l)).join(`
`)}function m(t,l){return l==null&&(l=Se(t)),h(t,l).join(`
`)}function v(t){return t.map(r).join(`
`)}function r(t){return t.map(p).join(e)}function p(t){return t==null?"":t instanceof Date?dn(t):n.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:s,parseRows:o,format:u,formatBody:m,formatRows:v,formatRow:r,formatValue:p}}var pn=cn(","),un=pn.parse,mn=_('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function gn(e){var n=mn();c(e,n)}var fn=_('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"/> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function vn(e){var n=fn();c(e,n)}var yn=_('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function wn(e){const n=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var a=yn(),s=z(b(a),2);J(s,17,()=>n,q,(o,h)=>{let u=()=>i(h).tag,m=()=>i(h).text;var v=I(),r=T(v);de(r,u,!1,(p,t)=>{var l=$e();A(()=>C(l,m())),c(t,l)}),c(o,v)}),y(a),c(e,a)}var bn=_("<p> </p>");function zn(e,n){var a=bn(),s=b(a);y(a),A(()=>C(s,`I am component A and my favorite number is ${n.number??""}.`)),c(e,a)}var xn=_("<p> </p>");function _n(e,n){var a=xn(),s=b(a);y(a),A(()=>C(s,`I am component B and my name is ${n.name??""}.`)),c(e,a)}var Tn=_('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function Sn(e){const n={A:zn,B:_n},a=[{component:"A",number:42},{component:"B",name:"Russell"}];var s=Tn(),o=z(b(s),2);J(o,17,()=>a,q,(h,u)=>{const m=U(()=>n[i(u).component]);var v=I(),r=T(v);le(r,()=>i(m),(p,t)=>{t(p,he(()=>i(u)))}),c(h,v)}),y(s),c(e,s)}var kn=_('<div><p class="svelte-12sq0x6"> </p></div>'),Rn=_('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function In(e){let n=W(void 0);var a=Rn(),s=b(a),o=z(b(s)),h=b(o,!0);y(o),y(s);var u=z(s,4);an(u,{get value(){return i(n)},set value(m){D(n,m,!0)},children:(m,v)=>{var r=I(),p=T(r);J(p,16,()=>[0,1,2,3,4],q,(t,l,f)=>{const g=U(()=>i(n)===f);var d=kn();let w;var x=b(d),S=b(x,!0);y(x),y(d),A(k=>{w=Ke(d,1,"step svelte-12sq0x6",null,w,k),C(S,l)},[()=>({active:i(g)})]),c(t,d)}),c(m,r)},$$slots:{default:!0}}),Ve(2),y(a),A(()=>C(h,i(n)||"-")),c(e,a)}const Cn=`{
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
      "text": "At age 15 a size <span class=orange-outline>Medium</span> still equals the median waistline, but from here on medium and median will diverge."
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
      "value": "I remember once being that teen girl. I took stacks upon stacks of jeans to the dressing room while shopping in the women’s section for the first time, searching in vain for that one pair that fit perfectly. Some 20 years later, my hunt continues. But now as an adult, I must contend with the countless ways that women’s apparel is not made for the average American, like me."
    },
    {
      "type": "text",
      "value": "Children’s clothing is often tied to a kid’s age or stage of development. The idea is that as a young person grows older, her clothes will evolve with her. Youth styles tend to be boxy and oversized to allow room for kids to move and grow. By early adolescence, girls’ clothing becomes more fitted. Junior’s styles have higher waistlines and less-pronounced curves through the bust and hips compared to adult clothing lines. In short: clothes for tweens are made for tween bodies."
    },
    {
      "type": "text",
      "value": "By the time that most teenage girls can wear women’s clothes — around age 15 — their options are seemingly endless. But the evolution in clothing sizes that followed girls throughout childhood abruptly stops there."
    },
    {
      "type": "text",
      "value": "Instead, women’s clothing — designed for adults — fits modern teen girls better."
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
      "text": "<p>While there are no universal sizing standards, an organization called <span class=green-span>ASTM International</span> regularly releases informal guidelines. Here, each current ASTM size (00–20) is represented by a <span class=green-dot>dot.</span></p>"
    },
    {
      "id": "1",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "null",
      "text": "Clothing manufacturers may loosely follow those standards, but more often than not, brands prefer to tailor their own practices to their target customer-base. These <span class=blue-dot>dots</span> represent the size charts of 17 popular brands. Dots connected by a <span class=shade-bg>shaded background,</span> represent ranges instead of discreet sizes."
    },
    {
      "id": "2",
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
      "text": "<p>Here is our <span class=orange-outline-dash>median 15-year-old girl</span> in the U.S. With a waistline measuring 30.4 inches, she fits around a size 10 according to ASTM standards, which is usually considered a <span class=bold>Medium.</span></p> <p>While it’s unlikely that clothing designed for adults will fit a teen’s body perfectly, she has quite a few sizing options.</p>"
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
      "text": "<p>Sizing issues are amplified even further within <span class=purple-span>Plus</span> size ranges. Some Plus size ranges start at size 12, others at 18. Others still consider any size from 00 to 30 is considered part of its <span class=blue-span>Regular</span> line.</p>"
    },
    {
      "id": "8",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "<p>The median adult woman may also find herself in what’s informally called the “mid-size gap,” seen here in Anthropologie’s size chart.</p> <p>Sizes within the <span class=blue-span>Regular</span> size range are too small, yet the next size up in the <span class=purple-span>Plus</span> range might be too big.</p>"
    },
    {
      "id": "9",
      "displayRegular": "true",
      "displayPlus": "true",
      "brandFilter": "null",
      "text": "<p>Even the symbols used to describe certain sizes hold a wide range of meanings.</p>  <p>For the average adult woman, there are as many as 10 different ways to describe the garments that she could conceivably wear from these brands alone.</p>"
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
      "value": "Cultural narratives around vanity sizing often square the blame on the female shoppers, not the brands. Time magazine once called it “self-delusion on a mass scale” because women were more likely to buy items that were labeled as sizes smaller than reality. But there’s more to the story."
    },
    {
      "type": "text",
      "value": "Vanity sizing first emerged as a marketing strategy. Companies found that whenever women needed a size larger than expected, they were less likely to follow through on their purchases. They may even develop negative associations with the brand. But when manufacturers manipulated the sizing labels, leading to a more positive customer experience, brands could have a slight competitive edge."
    },
    {
      "type": "text",
      "value": "The dynamic perpetuates an arms race toward artificially deflating size labels. Most shoppers aren’t even aware when size charts change, or by how much. Vanity sizing, therefore, is closer to gaslighting women on a mass scale than anything else. But considering the difficulties that most women face in finding any size that will fit, where would we be today without vanity sizing?"
    }
  ],
  "vanityScroll": [
    {
      "step": "0",
      "visual": "display 1995 astm sizes",
      "animation": "",
      "text": "It’s true: Sizes today are much larger than they were in the past. Roughly 30 years ago, ASTM guidelines covered <span class=bold>12.5 inches</span> from 24–36.5 (sizes 2–20). However, extended sizes were not widely available in stores."
    },
    {
      "step": "1",
      "visual": "display 1995 + 2021 astm sizes",
      "animation": "add 2021 sizes; highlight size 2 from 2021 + size 8 from 1995",
      "text": "Today because of vanity sizing, we can see an upward shift in all sizes. ASTM guidelines span <span class=bold>15.12 inches</span> from 25.38–40.5 (sizes 00–20). In the early 2000s ASTM added size 00 and 0 to pad out the bottom of the range."
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
  "sewingLessons": [
    {
      "type": "text",
      "value": "I once believed that change was inevitable, that these problems would become a relic of the past. If it wasn’t some scrappy upstart that promised to revolutionize the sizing system, then at least the major fashion conglomerates would be well-placed to modernize. The plus-size market seemingly had so much untapped potential. But that progress never fully materialized. And I got tired of waiting."
    },
    {
      "type": "text",
      "value": "A few years ago, I started learning how to sew. Somehow it felt more practical to make my own clothes than count on meaningful change to happen on its own. Getting started was easier than I thought. The first sewing pattern I ever completed — a boxy, drop-shoulder top that came in three variations as either a shirt or dress — was free to download. It included a 29-page instruction manual with photos and illustrations documenting every step."
    },
    {
      "type": "text",
      "value": "Everything clicked once I learned how to draft my own sewing patterns from scratch. I had printed out more than 800 pages of step-by-step tutorials found in an outdated edition of a pattern-making textbook often taught in fashion design school. I kept everything in a canary yellow three-ring binder to serve as the curriculum for my self-guided course. With a tape measure in hand, I followed the book’s prompts to take a total of 58 individual body measurements. From there, I could make my own custom base pattern, known as a bodice block or sloper."
    },
    {
      "type": "text",
      "value": "In comparing my bespoke bodice block to commercial patterns and clothes available in stores, I had a revelation: my base measurements didn’t fit any one size found with ready-to-wear garments. It didn’t matter how much weight I gained or lost, how much I contorted my body or tried to buy my way into styles that “flatter” my silhouette, there was no chance that clothes would ever be able to fit perfectly on their own. I’d always known this deep down. Many women likely feel some version of the same thing. But finally I understood why."
    },
    {
      "type": "text",
      "value": "Clothing sizes are optimized for mass production and appeal — not women’s bodies."
    },
    {
      "type": "text",
      "value": "Fashion designers often use a size 8 as a starting point when making new design samples. Instead of repeating this process for each individual size, they use a process called grading, which takes a mathematical formula to determine each next size up or down the range."
    },
    {
      "type": "text",
      "value": "The effect is like a Russian doll. Each size up is incrementally larger than the last."
    },
    {
      "type": "text",
      "value": "The uniform shapes make it easier for factories to construct garments en masse, however it comes with several tradeoffs. For one, it’s hard to scale to a variety of larger sizes. The further and further away you get from a size 8, the more and more the proportions become distorted."
    },
    {
      "type": "text",
      "value": "It can also be expensive and impractical for manufacturers to produce multiple variations of clothes for diverse body shapes."
    },
    {
      "type": "text",
      "value": "So only one body type stands above the rest: The hourglass silhouette."
    }
  ],
  "massProductionScroll": [
    {
      "step": "0",
      "text": "As women, it’s drilled into our heads that the ideal body type is the hourglass: wide shoulders and hips and a snatched waist. But for most women, that’s an unattainable standard."
    },
    {
      "step": "1",
      "text": "\\r\\nResearchers have identified as many as nine different categories of body proportions commonly found among adult women alone, many of which are likely familiar to those told over the years to “dress for their body type.”"
    },
    {
      "step": "2",
      "text": "The <span class=blue-span>median woman</span> in the U.S. today has a waist-to-hip ratio that is half that of the traditional hourglass shape. Instead she’s much more likely to be shaped like a rectangle."
    },
    {
      "step": "3",
      "text": "Indeed, one 2007 study found that half of women (49%) in the U.S. were considered rectangle-shaped, while only 12% of women had a true hourglass figure."
    },
    {
      "step": "4",
      "text": "But, clothing sizes are optimized for mass production and appeal — not women’s bodies — so size charts continue to champion the wide-narrow-wide hourglass."
    },
    {
      "step": "5",
      "text": "For example, here’s J.Crew’s Regular size chart. They use a rigid set of dimensions, with a waist-to-hip ratio that’s exactly 10 inches for all sizes. That means the smallest and largest sizes in a range will have the exact same body shape."
    },
    {
      "step": "6",
      "text": "Actual bodies, however, are far less uniform or symmetrical. A <span class=green-span>size 18</span> pair of pants from J.Crew might fit the median woman’s waist, but they’d likely be too large in the hips by a minimum of 6 inches."
    },
    {
      "step": "7",
      "text": "Conversely a <span class=green-span>size 12</span> would fit her hips best, but it’s unlikely that she’d be able to squeeze into a waistband that’s 6 inches smaller than her own."
    },
    {
      "step": "8",
      "text": "Of course, J. Crew isn’t the only brand whose size chart is this distorted. It’s the industry standard."
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
}`;var An=_("<p><!></p>"),En=_("<section><!></section>");function Mn(e,n){Z(n,!0);let a=Y(n,"components",19,()=>({})),s=Y(n,"body",19,()=>[]);var o=I(),h=T(o);J(h,17,s,q,(u,m)=>{let v=()=>i(m).section,r=()=>i(m).content;const p=U(()=>v().toLowerCase().replace(/[^a-z0-9]/g,"")),t=U(()=>a()[v()]);var l=En(),f=b(l);{var g=w=>{var x=I(),S=T(x);le(S,()=>i(t),(k,M)=>{M(k,he(r))}),c(w,x)},d=w=>{var x=I(),S=T(x);J(S,17,r,q,(k,M,O,X)=>{let B=()=>i(M).type,E=()=>i(M).value;const pe=U(()=>a()[B()]),Ie=U(()=>typeof E()=="string");var ue=I(),Ce=T(ue);{var Ae=j=>{var $=I(),K=T($);le(K,()=>i(pe),(ee,ne)=>{ne(ee,he(E))}),c(j,$)},Ee=j=>{var $=I(),K=T($);{var ee=P=>{var L=An(),te=b(L);_e(te,E),y(L),c(P,L)},ne=P=>{var L=I(),te=T(L);{var Me=N=>{var V=I(),ae=T(V);de(ae,B,!1,(me,ge)=>{var fe=I(),De=T(fe);_e(De,E),c(ge,fe)}),c(N,V)},Be=N=>{var V=I(),ae=T(V);de(ae,B,!1,(me,ge)=>{nn(me,()=>({...E()}))}),c(N,V)};H(te,N=>{i(Ie)?N(Me):N(Be,!1)},!0)}c(P,L)};H(K,P=>{B()==="text"?P(ee):P(ne,!1)},!0)}c(j,$)};H(Ce,j=>{i(pe)?j(Ae):j(Ee,!1)})}c(k,ue)}),c(w,x)};H(f,w=>{i(t)?w(g):w(d,!1)})}y(l),A(()=>en(l,"id",i(p))),c(u,l)}),c(e,o),Q()}var Bn=_('<p> </p> <progress max="100"></progress>',1);function Dn(e,n){let a=Y(n,"label",3,"A"),s=Y(n,"value",3,0);var o=Bn(),h=T(o),u=b(h,!0);y(h);var m=z(h,2);A(()=>{C(u,a()),tn(m,s())}),c(e,o)}var Fn=_('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function Un(e,n){Z(n,!0);const{body:a}=sn,s={Test:Dn};var o=Fn(),h=z(b(o),2),u=b(h),m=b(u,!0);y(u),y(h);var v=z(h,2);Mn(v,{get components(){return s},get body(){return a}}),y(o),A(r=>C(m,r),[()=>Cn.replace(/\t/g," ")]),c(e,o),Q()}const Wn=(e,n=ke)=>{var a=jn(),s=b(a),o=b(s,!0);y(s);var h=z(s,2),u=b(h,!0);y(h),y(a),A(()=>{C(o,n().name),C(u,n().age)}),c(e,a)};var jn=_('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),Pn=(e,n)=>Ge(n),Ln=(e,n)=>n.random(Math.floor(Math.random()*10)),Nn=_('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function Hn(e,n){Z(n,!0),Y(n,"age",3,30);const a=[{name:"John",age:30},{name:"Jill",age:45}];let s=W(0),o=U(()=>i(s)*2),h=U(()=>i(s)*2),u=W(0);ce(()=>{D(u,i(s)*2)});var m=Nn(),v=z(T(m),4);v.__click=[Pn,s];var r=z(v,2),p=b(r);y(r);var t=z(r,2),l=b(t);y(t);var f=z(t,2),g=b(f);y(f);var d=z(f,4),w=b(d);rn(w,()=>n.children??ke),y(d);var x=z(d,4);x.__click=[Ln,n];var S=z(x,4);J(S,21,()=>a,q,(k,M)=>{Wn(k,()=>i(M))}),y(S),A(()=>{C(p,`${i(s)??""} doubled is ${i(o)??""} (derived)`),C(l,`${i(s)??""} doubled is ${i(h)??""} (derived by)`),C(g,`${i(s)??""} doubled is ${i(u)??""} ($effect)`)}),c(e,m),Q()}Qe(["click"]);const Jn=(e,n)=>{let a=W(Ye(e)),s=W(null),o=W(!0),h=W(void 0);const u=(r=!0)=>{D(o,r,!0),r===!0&&(D(h,null),D(s,null))},m=async()=>{try{const r=await fetch(i(a),n);if(!r.ok)throw new Error(`Unexpected error occurred (status ${r.status})`);let p;if(i(a).includes(".csv")){const t=await r.text();p=un(t)}else p=await r.json();return[null,p]}catch(r){const{errorMessage:p="Unexpected error eccurred"}=r;return[p,null]}},v=async r=>{u(!0);const[p,t]=await m();if(r===i(a)){if(p){u(!1),D(h,p,!0);return}u(!1),D(s,t,!0)}};return ce(()=>{v(i(a))}),{get data(){return i(s)},get loading(){return i(o)},get error(){return i(h)},get url(){return i(a)},set url(r){i(a)!==r&&D(a,r,!0)}}};var qn=_("<p>loading data...</p>"),On=_("<p> </p>"),Xn=_("<p>data loaded</p> <pre> </pre>",1),$n=_('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function Vn(e,n){Z(n,!0);const a=`${on}/assets/demo/test.csv`,s=Jn(a);ce(()=>{});var o=$n(),h=z(b(o),2),u=b(h);{var m=r=>{var p=qn();c(r,p)},v=r=>{var p=I(),t=T(p);{var l=g=>{var d=On(),w=b(d);y(d),A(()=>C(w,`error: ${s.error??""}`)),c(g,d)},f=g=>{var d=Xn(),w=z(T(d),2),x=b(w,!0);y(w),A(S=>C(x,S),[()=>JSON.stringify(s.data,null,2)]),c(g,d)};H(t,g=>{s.error?g(l):g(f,!1)},!0)}c(r,p)};H(u,r=>{s.loading?r(m):r(v,!1)})}y(h),y(o),c(e,o),Q()}var Gn=_('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function Yn(e){let n=W(0);function a(l){console.log(l)}var s=Gn(),o=z(b(s),2);Hn(o,{random:a,get value(){return i(n)},set value(l){D(n,l,!0)}});var h=z(o,2);gn(h);var u=z(h,2);vn(u);var m=z(u,2);wn(m);var v=z(m,2);Sn(v);var r=z(v,2);Un(r,{});var p=z(r,2);Vn(p,{});var t=z(p,2);In(t),y(s),c(e,s)}function it(e){Yn(e)}export{it as component};
