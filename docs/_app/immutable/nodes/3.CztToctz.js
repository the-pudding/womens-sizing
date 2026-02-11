import"../chunks/Bzak7iHL.js";import{h as P,a as ve,f as se,aE as Pe,b as Ue,E as Be,d as je,aF as He,af as Le,ad as Ne,c as Oe,a3 as ye,a2 as we,D as qe,p as We,a5 as Je,ag as $e,V as _,X as p,ax as x,Z as b,_ as y,ay as C,aw as S,aA as Ve,W as M,A as i,az as U,C as D,av as B,aG as Ge,U as K,Y as Q,u as pe,aH as Ye,R as ke,B as Ze}from"../chunks/Dzm_WEGj.js";import{i as Ke,b as be,a as A,d as Qe}from"../chunks/ZgVi19R2.js";import{b as xe,c as ze,e as q,i as W,d as Xe,s as et,f as tt,g as nt}from"../chunks/CGpJrmw_.js";import{c as le}from"../chunks/DH1QYJyw.js";import{s as de,p as Z}from"../chunks/ihUrmXYw.js";import{S as at,h as _e,c as st}from"../chunks/gC2dA1dS.js";import{i as O}from"../chunks/C0w0nz2X.js";import{s as rt}from"../chunks/BIhypZ3Q.js";import{b as ot}from"../chunks/CFX3ESpf.js";function he(e,t,a,s,o,d){let u=P;P&&ve();var m,v,r=null;P&&se.nodeType===Pe&&(r=se,ve());var c=P?se:e,n,l=ze;Ue(()=>{const f=t()||null;var g=f==="svg"?He:null;if(f!==m){var h=ze;xe(l),n&&(f===null?We(n,()=>{n=null,v=null}):f===v?Je(n):($e(n),be(!1))),f&&f!==v&&(n=je(()=>{if(r=P?r:g?document.createElementNS(g,f):document.createElement(f),Le(r,r),s){P&&Ke(f)&&r.append(document.createComment(""));var w=P?Ne(r):r.appendChild(Oe());P&&(w===null?ye(!1):we(w)),s(r,w)}qe.nodes_end=r,c.before(r)})),m=f,m&&(v=m),be(!0),xe(h)}},Be),u&&(ye(!0),we(c))}var Se={},re={},oe=34,Y=10,ie=13;function Ie(e){return new Function("d","return {"+e.map(function(t,a){return JSON.stringify(t)+": d["+a+'] || ""'}).join(",")+"}")}function it(e,t){var a=Ie(e);return function(s,o){return t(a(s),o,e)}}function Te(e){var t=Object.create(null),a=[];return e.forEach(function(s){for(var o in s)o in t||a.push(t[o]=o)}),a}function I(e,t){var a=e+"",s=a.length;return s<t?new Array(t-s+1).join(0)+a:a}function lt(e){return e<0?"-"+I(-e,6):e>9999?"+"+I(e,6):I(e,4)}function dt(e){var t=e.getUTCHours(),a=e.getUTCMinutes(),s=e.getUTCSeconds(),o=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":lt(e.getUTCFullYear())+"-"+I(e.getUTCMonth()+1,2)+"-"+I(e.getUTCDate(),2)+(o?"T"+I(t,2)+":"+I(a,2)+":"+I(s,2)+"."+I(o,3)+"Z":s?"T"+I(t,2)+":"+I(a,2)+":"+I(s,2)+"Z":a||t?"T"+I(t,2)+":"+I(a,2)+"Z":"")}function ht(e){var t=new RegExp('["'+e+`
\r]`),a=e.charCodeAt(0);function s(n,l){var f,g,h=o(n,function(w,z){if(f)return f(w,z-1);g=w,f=l?it(w,l):Ie(w)});return h.columns=g||[],h}function o(n,l){var f=[],g=n.length,h=0,w=0,z,T=g<=0,k=!1;n.charCodeAt(g-1)===Y&&--g,n.charCodeAt(g-1)===ie&&--g;function F(){if(T)return re;if(k)return k=!1,Se;var $,E=h,R;if(n.charCodeAt(E)===oe){for(;h++<g&&n.charCodeAt(h)!==oe||n.charCodeAt(++h)===oe;);return($=h)>=g?T=!0:(R=n.charCodeAt(h++))===Y?k=!0:R===ie&&(k=!0,n.charCodeAt(h)===Y&&++h),n.slice(E+1,$-1).replace(/""/g,'"')}for(;h<g;){if((R=n.charCodeAt($=h++))===Y)k=!0;else if(R===ie)k=!0,n.charCodeAt(h)===Y&&++h;else if(R!==a)continue;return n.slice(E,$)}return T=!0,n.slice(E,g)}for(;(z=F())!==re;){for(var J=[];z!==Se&&z!==re;)J.push(z),z=F();l&&(J=l(J,w++))==null||f.push(J)}return f}function d(n,l){return n.map(function(f){return l.map(function(g){return c(f[g])}).join(e)})}function u(n,l){return l==null&&(l=Te(n)),[l.map(c).join(e)].concat(d(n,l)).join(`
`)}function m(n,l){return l==null&&(l=Te(n)),d(n,l).join(`
`)}function v(n){return n.map(r).join(`
`)}function r(n){return n.map(c).join(e)}function c(n){return n==null?"":n instanceof Date?dt(n):t.test(n+="")?'"'+n.replace(/"/g,'""')+'"':n}return{parse:s,parseRows:o,format:u,formatBody:m,formatRows:v,formatRow:r,formatValue:c}}var pt=ht(","),ct=pt.parse,ut=_('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function mt(e){var t=ut();p(e,t)}var gt=_('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"/> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function ft(e){var t=gt();p(e,t)}var vt=_('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function yt(e){const t=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var a=vt(),s=x(b(a),2);q(s,17,()=>t,W,(o,d)=>{let u=()=>i(d).tag,m=()=>i(d).text;var v=C(),r=S(v);he(r,u,!1,(c,n)=>{var l=Ve();M(()=>A(l,m())),p(n,l)}),p(o,v)}),y(a),p(e,a)}var wt=_("<p> </p>");function bt(e,t){var a=wt(),s=b(a);y(a),M(()=>A(s,`I am component A and my favorite number is ${t.number??""}.`)),p(e,a)}var xt=_("<p> </p>");function zt(e,t){var a=xt(),s=b(a);y(a),M(()=>A(s,`I am component B and my name is ${t.name??""}.`)),p(e,a)}var _t=_('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function St(e){const t={A:bt,B:zt},a=[{component:"A",number:42},{component:"B",name:"Russell"}];var s=_t(),o=x(b(s),2);q(o,17,()=>a,W,(d,u)=>{const m=U(()=>t[i(u).component]);var v=C(),r=S(v);le(r,()=>i(m),(c,n)=>{n(c,de(()=>i(u)))}),p(d,v)}),y(s),p(e,s)}var Tt=_('<div><p class="svelte-12sq0x6"> </p></div>'),kt=_('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function It(e){let t=B(void 0);var a=kt(),s=b(a),o=x(b(s)),d=b(o,!0);y(o),y(s);var u=x(s,4);at(u,{get value(){return i(t)},set value(m){D(t,m,!0)},children:(m,v)=>{var r=C(),c=S(r);q(c,16,()=>[0,1,2,3,4],W,(n,l,f)=>{const g=U(()=>i(t)===f);var h=Tt();let w;var z=b(h),T=b(z,!0);y(z),y(h),M(k=>{w=Xe(h,1,"step svelte-12sq0x6",null,w,k),A(T,l)},[()=>({active:i(g)})]),p(n,h)}),p(m,r)},$$slots:{default:!0}}),Ge(2),y(a),M(()=>A(d,i(t)||"-")),p(e,a)}const Ct=`{
  "metaTitle": "Sizing chaos",
  "metaDescription": "The inter-generational struggle to find clothes that fit more than a tiny portion of women",
  "metaKeywords": "",
  "heroText": "Like many girls her age, she loves to keep up with the latest fashion trends and explore new ways to express herself. Shopping is fun, but it won’t always be this way.",
  "byline": "By <a href=https://pudding.cool/author/amanda-sakuma/>Amanda Sakuma</a>",
  "withline": "with <a href=https://pudding.cool/author/jan-diehm/>Jan Diehm</a>",
  "introScroll": [
    {
      "id": "0"
    },
    {
      "id": "1",
      "textPos": "right",
      "text": "“Junior’s” clothing lines often channel tweens’ interests with youthful styles that fit young girls as they grow.\\r\\n\\r\\n\\r\\nFor now, our typical <span class=bold>11-year-old</span> wears a size 9 in the junior’s section, which is also considered a size <span class=orange-outline>Medium</span>."
    },
    {
      "id": "2",
      "textPos": "right",
      "text": "But not all tweens wear the same size.\\r\\n\\r\\n\\r\\nIf we were to look at a sample of all <span class=bold>10- and 11-year-old girls</span> in the U.S. from the <a href=https://stacks.cdc.gov/view/cdc/174595> National Center for Health Statistics,</a> here are the junior’s sizes that match up with their waistline measurements."
    },
    {
      "id": "3",
      "textPos": "right",
      "text": "By <span class=bold>age 15</span>, most girls have gone through growth spurts and puberty, and they’ve reached their adult height. \\r\\n\\r\\n\\r\\nMany have started to outgrow the junior’s size section."
    },
    {
      "id": "4",
      "textPos": "right",
      "text": "This marks an important turning point as they shift into <span class=bold>women’s sizes.</span>"
    },
    {
      "id": "5",
      "textPos": "right",
      "text": "Girls who fall along the bottom <span class=bold>10th percentile</span> can now wear an <span class=bold>Extra Small</span> in women’s clothing, while girls near the <span class=bold>90th percentile</span> will find that an <span class=bold>Extra Large</span> generally fits. \\r\\n\\r\\n\\r\\nThe median 15-year-old wears a Medium, as she has throughout most of her childhood."
    },
    {
      "id": "6",
      "textPos": "right",
      "text": "This means for the first time ever, most girls in their cohort will be able to find a size in the women’s clothing section."
    },
    {
      "id": "7",
      "textPos": "center",
      "text": "This will also likely be the  <span class=bold>last time this ever happens in their lives.</span>"
    },
    {
      "id": "8",
      "textPos": "right",
      "text": "At age 15 a size <span class=orange-outline>Medium</span> still equals the median waistline but, from here on, the two will diverge.\\r\\n\\r\\n\\r\\nIn addition to generic letter sizes (Small, Medium, Large etc.), women have a numeric sizing system that is designed to be more tailored and precise. Here, the median 15-year-old’s waistline fits a <span class=bold>size 10</span>."
    },
    {
      "id": "9",
      "textPos": "right",
      "text": "The <span class=bold>median 20-something</span> will eventually move up a letter size to a <span class=bold>Large</span>. \\r\\n\\r\\n\\r\\nIn U.S. women’s sizing, this translates to a <span class=orange-outline>size 14</span>."
    },
    {
      "id": "10",
      "textPos": "right",
      "text": "Her wardrobe will shift again in her 30s. \\r\\n\\r\\n\\r\\nAt this point the median woman is closer to a <span class=orange-outline>size 16</span> or <span class=bold>Extra Large.</span>"
    },
    {
      "id": "11",
      "textPos": "right",
      "text": "This trend will continue again, and again. \\r\\n\\r\\n\\r\\nAltogether, the median adult woman over the age of 20 fits a <span class=orange-outline>size 18.</span>"
    },
    {
      "id": "12",
      "textPos": "right",
      "text": "The problem is that most “Standard” or “Regular” size ranges only go up to a size 16."
    },
    {
      "id": "13",
      "textPos": "left",
      "text": "That leaves millions of people — over half of all adult women — who are excluded from standard size ranges."
    },
    {
      "id": "14"
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
      "value": "To highlight the median body proportions of the adult women in the U.S., we relied on anthropometric reference data for children and adults that is regularly released by the National Center for Health Statistics within the U.S. Department of Health and Human Services."
    },
    {
      "type": "text",
      "value": "For this story, we pulled data on the median waistline circumference of women and girls that was <a href=https://stacks.cdc.gov/view/cdc/174595>gathered between 2021-2023</a>. For girls and women under 20 years old, measurements were recorded in two-year age ranges (ex: 10–11 years, 14–15 years), with a median of 141 participants per age range. For women over 20, measurements were recorded in nine-year age ranges (ex: 20–29 years, 30–39 years) and collectively for all women 20 and older. Each nine-year age range had a median of 465 participants. Overall, measurements were recorded for 3,121 women ages 20 and older.  Those who were pregnant were excluded from the data."
    },
    {
      "type": "text",
      "value": "HHS also provides a breakdown of measurements within set percentiles for each age range, which includes figures for the 5th, 10th, 15th, 25th, 50th, 75th, 85th, 90th, and 95th percentiles. We then used that percentile data to extrapolate the waistline measurements of all women and girls within each respective age group."
    },
    {
      "type": "text",
      "value": "We also compared figures to those recorded by HHS from <a href=https://www.cdc.gov/nchs/data/series/sr_11/sr11_249.pdf>1988-1994</a>. There, 7,410 women ages 20 and older participated in the study. Measurements were originally recorded in centimeters, so we converted to inches."
    },
    {
      "type": "text",
      "value": "Brands included in the size chart comparisons represent a diverse cross-section of popular apparel brands and retailers in the U.S., including a mix of mass market, fast fashion, premium and luxury labels."
    },
    {
      "type": "text",
      "value": "For each brand, we focused on collecting body measurements for “regular” or “standard” size ranges, as well as “plus” sizes when available. Sizing information for “petite,” “tall,” or “curve” clothing lines were not included. Size charts reflect the body measurements for garments categorized as general “apparel.” In a select few cases where that category was unavailable, “dresses” were used as the default garment type."
    },
    {
      "type": "text",
      "value": "Within each size range, we focused on collecting three main body measurements: Bust, waist, and hip. Some were presented as a range from minimum to maximum values, while others were single measurements. All numeric U.S. women’s sizing labels and descriptions were recorded, as well as their corresponding alpha sizes, when available."
    },
    {
      "type": "text",
      "value": "Size chart data was last manually captured in July 2025 and may not reflect a brand’s current size chart. Brands frequently change their size charts, and more often than not, shoppers aren’t even aware when measurements or sizes are updated."
    },
    {
      "type": "text",
      "value": "The standardized size charts refer to ASTM International’s regular release of its Standard Table of Measurements for Adult Female Misses Figure Type. The 1995 release (designated as D 5585-95) reflects sizes 2-20. ASTM updated its standards in 2021 (designated as <a href=https://store.astm.org/d5585-21.html>D5585-21</a>) to include sizes 00-20."
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
}`;var At=_("<p><!></p>"),Mt=_("<section><!></section>");function Rt(e,t){K(t,!0);let a=Z(t,"components",19,()=>({})),s=Z(t,"body",19,()=>[]);var o=C(),d=S(o);q(d,17,s,W,(u,m)=>{let v=()=>i(m).section,r=()=>i(m).content;const c=U(()=>v().toLowerCase().replace(/[^a-z0-9]/g,"")),n=U(()=>a()[v()]);var l=Mt(),f=b(l);{var g=w=>{var z=C(),T=S(z);le(T,()=>i(n),(k,F)=>{F(k,de(r))}),p(w,z)},h=w=>{var z=C(),T=S(z);q(T,17,r,W,(k,F,J,$)=>{let E=()=>i(F).type,R=()=>i(F).value;const ce=U(()=>a()[E()]),Ce=U(()=>typeof R()=="string");var ue=C(),Ae=S(ue);{var Me=j=>{var V=C(),X=S(V);le(X,()=>i(ce),(ee,te)=>{te(ee,de(R))}),p(j,V)},Re=j=>{var V=C(),X=S(V);{var ee=H=>{var L=At(),ne=b(L);_e(ne,R),y(L),p(H,L)},te=H=>{var L=C(),ne=S(L);{var Fe=N=>{var G=C(),ae=S(G);he(ae,E,!1,(me,ge)=>{var fe=C(),De=S(fe);_e(De,R),p(ge,fe)}),p(N,G)},Ee=N=>{var G=C(),ae=S(G);he(ae,E,!1,(me,ge)=>{tt(me,()=>({...R()}))}),p(N,G)};O(ne,N=>{i(Ce)?N(Fe):N(Ee,!1)},!0)}p(H,L)};O(X,H=>{E()==="text"?H(ee):H(te,!1)},!0)}p(j,V)};O(Ae,j=>{i(ce)?j(Me):j(Re,!1)})}p(k,ue)}),p(w,z)};O(f,w=>{i(n)?w(g):w(h,!1)})}y(l),M(()=>et(l,"id",i(c))),p(u,l)}),p(e,o),Q()}var Ft=_('<p> </p> <progress max="100"></progress>',1);function Et(e,t){let a=Z(t,"label",3,"A"),s=Z(t,"value",3,0);var o=Ft(),d=S(o),u=b(d,!0);y(d);var m=x(d,2);M(()=>{A(u,a()),nt(m,s())}),p(e,o)}var Dt=_('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function Pt(e,t){K(t,!0);const{body:a}=st,s={Test:Et};var o=Dt(),d=x(b(o),2),u=b(d),m=b(u,!0);y(u),y(d);var v=x(d,2);Rt(v,{get components(){return s},get body(){return a}}),y(o),M(r=>A(m,r),[()=>Ct.replace(/\t/g," ")]),p(e,o),Q()}const Ut=(e,t=ke)=>{var a=Bt(),s=b(a),o=b(s,!0);y(s);var d=x(s,2),u=b(d,!0);y(d),y(a),M(()=>{A(o,t().name),A(u,t().age)}),p(e,a)};var Bt=_('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),jt=(e,t)=>Ye(t),Ht=(e,t)=>t.random(Math.floor(Math.random()*10)),Lt=_('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function Nt(e,t){K(t,!0),Z(t,"age",3,30);const a=[{name:"John",age:30},{name:"Jill",age:45}];let s=B(0),o=U(()=>i(s)*2),d=U(()=>i(s)*2),u=B(0);pe(()=>{D(u,i(s)*2)});var m=Lt(),v=x(S(m),4);v.__click=[jt,s];var r=x(v,2),c=b(r);y(r);var n=x(r,2),l=b(n);y(n);var f=x(n,2),g=b(f);y(f);var h=x(f,4),w=b(h);rt(w,()=>t.children??ke),y(h);var z=x(h,4);z.__click=[Ht,t];var T=x(z,4);q(T,21,()=>a,W,(k,F)=>{Ut(k,()=>i(F))}),y(T),M(()=>{A(c,`${i(s)??""} doubled is ${i(o)??""} (derived)`),A(l,`${i(s)??""} doubled is ${i(d)??""} (derived by)`),A(g,`${i(s)??""} doubled is ${i(u)??""} ($effect)`)}),p(e,m),Q()}Qe(["click"]);const Ot=(e,t)=>{let a=B(Ze(e)),s=B(null),o=B(!0),d=B(void 0);const u=(r=!0)=>{D(o,r,!0),r===!0&&(D(d,null),D(s,null))},m=async()=>{try{const r=await fetch(i(a),t);if(!r.ok)throw new Error(`Unexpected error occurred (status ${r.status})`);let c;if(i(a).includes(".csv")){const n=await r.text();c=ct(n)}else c=await r.json();return[null,c]}catch(r){const{errorMessage:c="Unexpected error eccurred"}=r;return[c,null]}},v=async r=>{u(!0);const[c,n]=await m();if(r===i(a)){if(c){u(!1),D(d,c,!0);return}u(!1),D(s,n,!0)}};return pe(()=>{v(i(a))}),{get data(){return i(s)},get loading(){return i(o)},get error(){return i(d)},get url(){return i(a)},set url(r){i(a)!==r&&D(a,r,!0)}}};var qt=_("<p>loading data...</p>"),Wt=_("<p> </p>"),Jt=_("<p>data loaded</p> <pre> </pre>",1),$t=_('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function Vt(e,t){K(t,!0);const a=`${ot}/assets/demo/test.csv`,s=Ot(a);pe(()=>{});var o=$t(),d=x(b(o),2),u=b(d);{var m=r=>{var c=qt();p(r,c)},v=r=>{var c=C(),n=S(c);{var l=g=>{var h=Wt(),w=b(h);y(h),M(()=>A(w,`error: ${s.error??""}`)),p(g,h)},f=g=>{var h=Jt(),w=x(S(h),2),z=b(w,!0);y(w),M(T=>A(z,T),[()=>JSON.stringify(s.data,null,2)]),p(g,h)};O(n,g=>{s.error?g(l):g(f,!1)},!0)}p(r,c)};O(u,r=>{s.loading?r(m):r(v,!1)})}y(d),y(o),p(e,o),Q()}var Gt=_('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function Yt(e){let t=B(0);function a(l){console.log(l)}var s=Gt(),o=x(b(s),2);Nt(o,{random:a,get value(){return i(t)},set value(l){D(t,l,!0)}});var d=x(o,2);mt(d);var u=x(d,2);ft(u);var m=x(u,2);yt(m);var v=x(m,2);St(v);var r=x(v,2);Pt(r,{});var c=x(r,2);Vt(c,{});var n=x(c,2);It(n),y(s),p(e,s)}function on(e){Yt(e)}export{on as component};
