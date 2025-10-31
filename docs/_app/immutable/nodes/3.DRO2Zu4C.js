import"../chunks/Bzak7iHL.js";import{h as j,a as ve,f as se,aE as je,b as Fe,E as Le,d as We,aF as Pe,af as Ue,ad as Ne,c as Oe,a3 as ye,a2 as we,D as Xe,p as He,a5 as Je,ag as qe,V as _,X as u,ax as z,Z as b,_ as y,ay as A,aw as T,aA as $e,W as M,A as o,az as F,C as D,av as L,aG as Ve,U as Y,Y as Z,u as ue,aH as Ke,R as ke,B as Ge}from"../chunks/Dzm_WEGj.js";import{i as Ye,b as be,a as C,d as Ze}from"../chunks/ZgVi19R2.js";import{b as ze,c as xe,e as X,i as H,d as Qe,s as en,f as nn,g as an}from"../chunks/CDdiiSxv.js";import{c as le}from"../chunks/DH1QYJyw.js";import{s as he,p as G}from"../chunks/ihUrmXYw.js";import{S as tn,h as _e,c as sn}from"../chunks/C_MR5dKM.js";import{i as O}from"../chunks/C0w0nz2X.js";import{s as rn}from"../chunks/BIhypZ3Q.js";import{b as on}from"../chunks/V7nbZzOF.js";function de(e,n,t,s,r,h){let c=j;j&&ve();var m,v,i=null;j&&se.nodeType===je&&(i=se,ve());var p=j?se:e,a,l=xe;Fe(()=>{const f=n()||null;var g=f==="svg"?Pe:null;if(f!==m){var d=xe;ze(l),a&&(f===null?He(a,()=>{a=null,v=null}):f===v?Je(a):(qe(a),be(!1))),f&&f!==v&&(a=We(()=>{if(i=j?i:g?document.createElementNS(g,f):document.createElement(f),Ue(i,i),s){j&&Ye(f)&&i.append(document.createComment(""));var w=j?Ne(i):i.appendChild(Oe());j&&(w===null?ye(!1):we(w)),s(i,w)}Xe.nodes_end=i,p.before(i)})),m=f,m&&(v=m),be(!0),ze(d)}},Le),c&&(ye(!0),we(p))}var Te={},ie={},re=34,K=10,oe=13;function Re(e){return new Function("d","return {"+e.map(function(n,t){return JSON.stringify(n)+": d["+t+'] || ""'}).join(",")+"}")}function ln(e,n){var t=Re(e);return function(s,r){return n(t(s),r,e)}}function Se(e){var n=Object.create(null),t=[];return e.forEach(function(s){for(var r in s)r in n||t.push(n[r]=r)}),t}function R(e,n){var t=e+"",s=t.length;return s<n?new Array(n-s+1).join(0)+t:t}function hn(e){return e<0?"-"+R(-e,6):e>9999?"+"+R(e,6):R(e,4)}function dn(e){var n=e.getUTCHours(),t=e.getUTCMinutes(),s=e.getUTCSeconds(),r=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":hn(e.getUTCFullYear())+"-"+R(e.getUTCMonth()+1,2)+"-"+R(e.getUTCDate(),2)+(r?"T"+R(n,2)+":"+R(t,2)+":"+R(s,2)+"."+R(r,3)+"Z":s?"T"+R(n,2)+":"+R(t,2)+":"+R(s,2)+"Z":t||n?"T"+R(n,2)+":"+R(t,2)+"Z":"")}function un(e){var n=new RegExp('["'+e+`
\r]`),t=e.charCodeAt(0);function s(a,l){var f,g,d=r(a,function(w,x){if(f)return f(w,x-1);g=w,f=l?ln(w,l):Re(w)});return d.columns=g||[],d}function r(a,l){var f=[],g=a.length,d=0,w=0,x,S=g<=0,k=!1;a.charCodeAt(g-1)===K&&--g,a.charCodeAt(g-1)===oe&&--g;function E(){if(S)return ie;if(k)return k=!1,Te;var q,B=d,I;if(a.charCodeAt(B)===re){for(;d++<g&&a.charCodeAt(d)!==re||a.charCodeAt(++d)===re;);return(q=d)>=g?S=!0:(I=a.charCodeAt(d++))===K?k=!0:I===oe&&(k=!0,a.charCodeAt(d)===K&&++d),a.slice(B+1,q-1).replace(/""/g,'"')}for(;d<g;){if((I=a.charCodeAt(q=d++))===K)k=!0;else if(I===oe)k=!0,a.charCodeAt(d)===K&&++d;else if(I!==t)continue;return a.slice(B,q)}return S=!0,a.slice(B,g)}for(;(x=E())!==ie;){for(var J=[];x!==Te&&x!==ie;)J.push(x),x=E();l&&(J=l(J,w++))==null||f.push(J)}return f}function h(a,l){return a.map(function(f){return l.map(function(g){return p(f[g])}).join(e)})}function c(a,l){return l==null&&(l=Se(a)),[l.map(p).join(e)].concat(h(a,l)).join(`
`)}function m(a,l){return l==null&&(l=Se(a)),h(a,l).join(`
`)}function v(a){return a.map(i).join(`
`)}function i(a){return a.map(p).join(e)}function p(a){return a==null?"":a instanceof Date?dn(a):n.test(a+="")?'"'+a.replace(/"/g,'""')+'"':a}return{parse:s,parseRows:r,format:c,formatBody:m,formatRows:v,formatRow:i,formatValue:p}}var pn=un(","),cn=pn.parse,mn=_('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function gn(e){var n=mn();u(e,n)}var fn=_('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"/> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function vn(e){var n=fn();u(e,n)}var yn=_('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function wn(e){const n=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var t=yn(),s=z(b(t),2);X(s,17,()=>n,H,(r,h)=>{let c=()=>o(h).tag,m=()=>o(h).text;var v=A(),i=T(v);de(i,c,!1,(p,a)=>{var l=$e();M(()=>C(l,m())),u(a,l)}),u(r,v)}),y(t),u(e,t)}var bn=_("<p> </p>");function zn(e,n){var t=bn(),s=b(t);y(t),M(()=>C(s,`I am component A and my favorite number is ${n.number??""}.`)),u(e,t)}var xn=_("<p> </p>");function _n(e,n){var t=xn(),s=b(t);y(t),M(()=>C(s,`I am component B and my name is ${n.name??""}.`)),u(e,t)}var Tn=_('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function Sn(e){const n={A:zn,B:_n},t=[{component:"A",number:42},{component:"B",name:"Russell"}];var s=Tn(),r=z(b(s),2);X(r,17,()=>t,H,(h,c)=>{const m=F(()=>n[o(c).component]);var v=A(),i=T(v);le(i,()=>o(m),(p,a)=>{a(p,he(()=>o(c)))}),u(h,v)}),y(s),u(e,s)}var kn=_('<div><p class="svelte-12sq0x6"> </p></div>'),Rn=_('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function An(e){let n=L(void 0);var t=Rn(),s=b(t),r=z(b(s)),h=b(r,!0);y(r),y(s);var c=z(s,4);tn(c,{get value(){return o(n)},set value(m){D(n,m,!0)},children:(m,v)=>{var i=A(),p=T(i);X(p,16,()=>[0,1,2,3,4],H,(a,l,f)=>{const g=F(()=>o(n)===f);var d=kn();let w;var x=b(d),S=b(x,!0);y(x),y(d),M(k=>{w=Qe(d,1,"step svelte-12sq0x6",null,w,k),C(S,l)},[()=>({active:o(g)})]),u(a,d)}),u(m,i)},$$slots:{default:!0}}),Ve(2),y(t),M(()=>C(h,o(n)||"-")),u(e,t)}const Cn=`{
  "intro": [
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
  "titlePage": [
    {
      "visual": "title + text block + static graphic",
      "animation": "title animation",
      "title": "Fit for a Teen",
      "text": [
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
      ]
    }
  ],
  "history": [
    {
      "id": "0",
      "eyebrow": "this has been a problem for a",
      "title": "very, very",
      "subtitle": "long time",
      "textA": [
        {
          "type": "text",
          "value": "In 1941, the U.S. government set out to standardize clothing sizes based on the body measurements of thousands of women. The garment industry had exploded following the industrial revolution, but the approach to sizing was less a science and more trial-and-error, researchers noted at the time. They found huge variations in garment sizes across different manufacturers. Alterations were also prohibitively expensive. When garments couldn’t be tailored or simply didn’t fit, a large number of women had to return items to the store, ratcheting up costs for all parties involved."
        },
        {
          "type": "text",
          "value": "<span class=blue-span>“This means a loss of money and good will to the retailer and annoyance and waste of time to the woman purchaser,” wrote the report’s chief researcher, Ruth O’Brien.</span>"
        },
        {
          "type": "text",
          "value": "Sound familiar?"
        },
        {
          "type": "text",
          "value": "Over 85 years later, and many of those same problems and annoyances are just as true — if not worse today. Inconsistent sizing, costly alterations, and high rates of item returns are considered norms by modern shopping standards. More often than not, ill-fitting clothes pile up in our closets and in landfills, fueling a vicious cycle that treats garments as disposable."
        },
        {
          "type": "text",
          "value": "If generation after generation of women have faced the same, persistent struggles, one must ask: Is it even possible to mass-produce clothes that fit all types of bodies?"
        }
      ],
      "textB": [
        {
          "type": "text",
          "value": "One of the chief problems is that our modern sizing system is based on the body proportions of a single group: White women."
        },
        {
          "type": "text",
          "value": "O’Brien, a trained scientist and head of the Clothing and Textiles Division within the U.S. Bureau of Home Economics, broke new ground with her 1941 study by using a scientific approach to sizing. For likely the first time ever, the garment industry had hard data to use as a foundation for all garments through the body measurements of the roughly 14,700 women who participated in the study."
        },
        {
          "type": "text",
          "value": "The study’s sample size, however, was in no way representative of the broader population. Participants were mostly young, middle class white women from urban areas within just a handful of states. No women of color were included."
        },
        {
          "type": "text",
          "value": "This matters because today we know that age and race factor heavily into how our bodies are shaped. Genetics can play a huge role in determining each person’s proportions, their bone structure, how they build muscle mass, and where they tend to store fat on their bodies. Scholars have identified as many as nine different categories of body proportions commonly found among adult women alone, many of which are likely familiar to the countless women told over the years to “dress for their body type.”"
        },
        {
          "type": "text",
          "value": "*small graphic of nine body types*"
        },
        {
          "type": "text",
          "value": "Only one body type, however, serves as the underlying blueprint for nearly every piece of women’s clothing: The hourglass silhouette."
        }
      ]
    }
  ],
  "proportionsIntro": [
    {
      "eyebrow": "Mass-produced clothes",
      "title": "do not fit",
      "subhed": "every body",
      "text": "<p>The hourglass silhouette is often characterized as an idealized version of western beauty standards. It emphasizes fullness in both the bust and hips, with a waistline that is exactly 10 inches smaller than those two measurements.</p><p>The problem is that women are rarely born with those precise proportions. One study found that only 30% of American women actually have a true hourglass figure.</p><p>Here’s how that impacts the type of clothes that most adults are able to wear. </p>"
    }
  ],
  "proportions": [
    {
      "id": "0",
      "text": "If we were to take the waist and hip measurements of the <span class=blue-span>median woman</span> in the U.S., here’s how those proportions around the torso would look like."
    },
    {
      "id": "1",
      "text": "<p>Let’s say that our typical adult woman goes shopping at J.Crew.</p>\\r\\n\\r\\n\\r\\n<p>If she were to try on a pair of pants that fit her waist, she would likely fit a <span class=green-span>size 18.</span></p>\\r\\n\\r\\n\\r\\n<p>Doing so, however, would mean that the pants are too big in the hips by <span class=bold> six inches</span>.</p>"
    },
    {
      "id": "2",
      "text": "<p>If she instead picked out pants that fit around her backside, she would have the opposite problem as before.</p>\\r\\n\\r\\n\\r\\n<p>Here, a <span class=green-span>size 12</span> would fit her hips best, but then the waist would be too small by more than <span class=bold>six inches</span>."
    },
    {
      "id": "3",
      "text": "<p>J.Crew is hardly an outlier.</p>\\r\\n\\r\\n\\r\\n<p>Many mainstream fashion brands there to be a<span class=bold>10-inch</span> difference between a woman’s waist and hip measurements.</p>\\r\\n\\r\\n\\r\\n<p>Compare that to the median woman in the U.S., who has just over a <span class=bold>four-inch</span> difference between her waist and hip.</p>"
    },
    {
      "id": "4",
      "text": "<p>Surprisingly, these exaggerated proportions are fixed across entire size ranges.</p><p>If you compared the smallest size to the largest size in a range, both would have the <span class=blue-span>same 10-inch difference</span> between the waistline and their corresponding hip measurements. </p>"
    },
    {
      "id": "5",
      "text": "<p>Put another way: Clothing sizes expect all women, large or small, to share the exact same body shape.</p><p>But that’s not how women’s bodies work</p>"
    }
  ],
  "vanityIntro": [
    {
      "eyebrow": "There’s more to",
      "title": "vanity sizing",
      "subhed": "than you may think",
      "text": "Many things have changed since the WWII-era efforts to create standardized sizing, chief among them: Americans are larger today than they were in the past.Over the past three decades alone, the median American woman’s waistline has increased by nearly four inches. And as waistlines have gotten larger, so too have clothing sizes.</p><p>Though the U.S. government has long-abandoned its attempts to make universal clothing sizes for women, an organization called ASTM International has filled this role by releasing technical standards for size ranges every few years </p><p>To see that change, take a look at ASTM’s standard sizes from 1995.</p>"
    }
  ],
  "vanitySizing": [
    {
      "id": "0",
      "text": "<p>About 30 years ago, there was a 12.5-inch spread of waistline measurements separating the smallest size 2 (24 inches) and the largest size 20 (36.5 inches).</p>"
    },
    {
      "id": "1",
      "text": "<p>Today, that gap is 15.2 inches between the smallest size 00 (25.38 inches) and the largest size (40 inches)</p><p>While additional sizes for 00 and 0 were added in the early 2000s, all waistline measurements today are larger regardless of size. </p>"
    },
    {
      "id": "2",
      "text": "<p>Notice how in 1995, a 27-inch waist was considered a <span data-underline=\\"#C2D932\\">size 8</span>.</p><p>But in 2021 it was between <span data-underline=\\"#C2D932\\">sizes 2 and 4</span>.</p><p>By comparison, today’s size 8 is <span class=”bold”>2.5 inches bigger</span> in the waist than it was 30 years ago.</p>"
    },
    {
      "id": "3",
      "text": "<p>This is vanity sizing in action.</p>\\r\\n\\r\\n\\r\\n<p>Vanity sizing is a frequent villain within the consumer mindset for its role in driving sizing inconsistencies across the fashion industry.</p><p> Over the decades, a behavioral trend started to emerge where women seemed more likely to buy clothes if the labels were marked as sizes smaller than they actually were. Researchers have found that many women often ascribe an identity around clothing sizes (“I am a size 4” versus “I wear a size 4”). Any deviation from that specific size may then pose a threat to not just their ego, but who they are as a person. Rather than size up, consumers would prefer to either go home empty-handed or purchase other items that enhance aesthetics, but aren’t tied to sizes, like beauty products.</p> \\r\\n\\r\\n\\r\\n<p>Brands, and the apparel industry at large, responded by slowly inflating sizes. What was once a size 6 is now labeled a size 4, and so on and so on.</p><p>That’s left us with a sizing system that’s all over the place. But then without vanity sizing, average Americans would have even fewer sizing options than they do now. .</p>"
    },
    {
      "id": "4",
      "text": "<p>Between 1988 and 1994, the average woman’s waistline was <span data-underline=\\"#C2D932\\">34.88 inches</span>. By 2023, it was <span data-underline=\\"#C2D932\\">37.68 inches</span></p>"
    },
    {
      "id": "5",
      "text": "<p>In both cases — 30 years ago on to today —the median waistline roughly lined up with the size 18 that was available at that time (if at all).</p>"
    }
  ],
  "ASTMtransition": [
    {
      "id": "0",
      "subhed": "Mass-produced clothes don’t fit every body",
      "text": "<p>While vanity sizing and broader industry trends have translated into sizes that are now larger than before, the changes still continue to skew toward serving the smallest women. Today, just as we saw 30 years ago, nearly half of the population is shut out of buying clothes from some of the most popular or well known brands.</p><p>In many ways, this has been intentional.</p><p>ASTM has said itself that it’s not trying to develop sizing standards that accurately reflect the full scope of modern demographics in America. Instead, the system is just as much tailored to conventional beauty standards and what clothing brands consider to be their ideal customer.</p><p>“It is important to note that the body measurements herein have been derived from designer experience and market observations and cross checked with available databases in the attempt to identify current customer characteristics and changing proportions and not from new nationwide anthropometric research. —ASTM’s 1995 standardized sizing chart</p><p>Fashion and clothing brands aren’t required to align with universal sizing standards.</p><p>If they so choose, a brand can tailor its size charts to include more historically underrepresented populations — and some do, to a degree. Many do not.</p><p>The result — as many women have likely experienced — has meant that sizes are all over the map.</p>"
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
  "sizeCharts": [
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
  "introTween": [
    {
      "step": "0",
      "visual": "tween avatar illustration",
      "animation": "",
      "text": "Meet your typical tween"
    },
    {
      "step": "1",
      "visual": "tween avatar illustration",
      "animation": "gif swapping out/changing outfits;",
      "text": "Like many girls her age, she loves to keep up with the latest fashion trends and explore new ways to express herself."
    },
    {
      "step": "2",
      "visual": "tween avatar + S/M/L size labels",
      "animation": "fade transition w/ background size band",
      "text": "“Junior’s” clothing lines often channel this interest with youthful styles that fit young girls as they grow.\\r\\n\\r\\n\\r\\nFor now, our typical tween wears a size 9 in the junior’s section, which is also considered a size Medium."
    },
    {
      "step": "3",
      "visual": "beeswarm ages 10-11 + junior’s size bands",
      "animation": "bring in beeswarm + animate & expand size bands to include full range",
      "text": ""
    },
    {
      "step": "4",
      "visual": "beeswarm ages 14-15 + junior’s size bands",
      "animation": "slide 10-11 yr-old avatars over to 14-15 yr-old positioning",
      "text": ""
    },
    {
      "step": "5",
      "visual": "beeswarm ages 14-15 + women’s size bands",
      "animation": "slide size bands from junior’s to women’s sizing",
      "text": "This marks an important turning point as they shift into women’s sizes."
    },
    {
      "step": "6",
      "visual": "beeswarm ages 14-15 + women’s size bands",
      "animation": "change avatar styling for 10th & 90th percentiles to full color; add orange border around each individual size highlighted in the text (XS, M, XL)",
      "text": "Girls who fall along the bottom 10th percentile can now wear an Extra Small in women’s clothing, while girls near the 90th percentile will find that an Extra Large generally fits. \\r\\n\\r\\n\\r\\nThe median 15-year-old wears a Medium, as she has throughout most of her childhood."
    },
    {
      "step": "7",
      "visual": "beeswarm ages 14-15 + women’s size bands",
      "animation": "greyscale percentiles; add orange border around full size band range",
      "text": "That means for the first time ever, most girls in their cohort will be able to find a size in the women’s clothing section."
    },
    {
      "step": "8",
      "visual": "fade out chart",
      "animation": "center text",
      "text": "This will also likely be the last time this ever happens in their lives."
    }
  ],
  "introBreak": [
    {
      "visual": "title + text block + static graphic",
      "animation": "title animation",
      "title": "Fit for a Teen",
      "text": ""
    }
  ],
  "introAdults": [
    {
      "step": "0",
      "visual": "beeswarm ages 20-29 + women’s size bands now displayed as numeric sizes",
      "animation": "orange highlight around size 14",
      "text": "By their 20s, a size Medium will no longer reflect the median or average woman’s waistline.\\r\\n\\r\\n\\r\\nInstead, the median 20-something fits a Large, which translates to a size 14 in women’s clothing."
    },
    {
      "step": "1",
      "visual": "beeswarm ages 30-39 + women’s size bands",
      "animation": "slide avatars from 20s to 30s positioning; orange highlight around size 16",
      "text": "Her wardrobe will shift again in her 30s. \\r\\n\\r\\n\\r\\nAt this point the median woman is closer to a size 16 or Extra Large."
    },
    {
      "step": "2",
      "visual": "beeswarm ages 20 and over + women’s size bands",
      "animation": "slide avatars to 20andOver positioning; orange highlight around size 18",
      "text": "This trend will continue again, and again. \\r\\n\\r\\n\\r\\nAltogether, the median adult woman over the age of 20 fits a size 18."
    },
    {
      "step": "3",
      "visual": "beeswarm ages 20 and over + women’s size bands",
      "animation": "orange highlight around sizes 00-16",
      "text": "The problem is that most “Standard” or “Regular” size ranges only go up to a size 16."
    },
    {
      "step": "4",
      "visual": "beeswarm ages 20 and over + women’s size bands",
      "animation": "orange highlight around size 18 and up",
      "text": "That leaves millions of people — over half of all adult women — without sizing options at all."
    }
  ],
  "sizeChartIntro": [
    {
      "visual": "title + text block",
      "animation": "title animation",
      "title": "TK",
      "text": ""
    }
  ],
  "sizeChart": [
    {
      "step": "0",
      "visual": "display only ASTM sizes",
      "animation": "",
      "text": "While there are no universal sizing standards, an organization called ASTM International regularly releases informal guidelines."
    },
    {
      "step": "1",
      "visual": "add all ‘regular’ fast-fashion, mass-market and premium size charts",
      "animation": "",
      "text": "Clothing manufacturers may loosely follow those standards, but more often than not, brands prefer to tailor their own practices to their target customer-base."
    },
    {
      "step": "2",
      "visual": "display all ‘regular’ size charts",
      "animation": "Something to highlight the chaos",
      "text": "The result: Nothing is consistent. Consumers are expected to navigate a landscape where size labels are largely stripped of meaning."
    },
    {
      "step": "3",
      "visual": "display all ‘regular’ size charts",
      "animation": "add orange horizontal line marking median 15-year-old",
      "text": "Here is our median 15-year-old girl in the U.S. With a waistline measuring 30.4 inches, she fits around a size 10 according to ASTM standards, which is usually considered a Medium.\\r\\n\\r\\n\\r\\nWhile it’s unlikely that clothing designed for adults will fit a teen’s body perfectly, she has quite a few sizing options."
    },
    {
      "step": "4",
      "visual": "display all ‘regular’ size charts",
      "animation": "highlight disparities between sizes",
      "text": "However as she’ll quickly learn, sizes are not universal across all brands. At Banana Republic, the median teen’s waistline is closer to a size 8. At Uniqlo, she’s considered a size 12."
    },
    {
      "step": "5",
      "visual": "display all ‘regular’ size charts",
      "animation": "add orange horizontal line marking median adult",
      "text": "The median adult woman has a much harder time finding clothes that fit. Her waistline is 37.68 inches, placing her at a size 18."
    },
    {
      "step": "6",
      "visual": "add “luxury” brands to all ‘regular’ size charts",
      "animation": "",
      "text": "Many brands don’t carry her size. This is especially true for high-end, luxury fashion labels."
    },
    {
      "step": "7",
      "visual": "add ‘plus’ size charts to display all charts together",
      "animation": "highlight disparities b/t what constitutes ‘plus’ sized",
      "text": "Sizing issues are amplified even further within “Plus” size ranges. \\r\\n\\r\\n\\r\\nThere are no official boundaries determining where “Regular” sizes ranges end and “Plus” size ranges begin.\\r\\n\\r\\n\\r\\nSome Plus size ranges start at size 12, others at 18. Others still consider any size from 00 to 30 is considered part of its Regular line."
    },
    {
      "step": "8",
      "visual": "all plus & regular size charts",
      "animation": "highlight Anthropologie’s mid-size gap",
      "text": "The median adult woman may also find herself in what’s informally called the “mid-size gap.”\\r\\n\\r\\n\\r\\nHere sizes within the “Regular” size range are too small, yet the next size up in the “plus” range might be too big."
    },
    {
      "step": "9",
      "visual": "all plus & regular size charts",
      "animation": "highlight & display every size within ¾ inch of median adult (XL, XXL, 1X, 2XL, 3XL, 14, 16, 16-18, 18, 18W)",
      "text": "Even the symbols used to describe certain sizes hold a wide range of meanings. \\r\\n\\r\\n\\r\\nFor the average adult woman, there are as many as TK10 different ways to describe the garments that she could conceivably wear from these brands alone."
    }
  ],
  "VanitySizingIntro": [
    {
      "visual": "title + text block",
      "animation": "title animation",
      "title": "TK",
      "text": ""
    }
  ],
  "VanitySizing": [
    {
      "step": "0",
      "visual": "display 1995 astm sizes",
      "animation": "",
      "text": "It’s true: Sizes today are much larger than they were in the past. \\r\\n\\r\\n\\r\\nRoughly 30 years ago, the smallest size available was a size 2, which was based on a 24-inch waistline. \\r\\n\\r\\n\\r\\nASTM had guidelines up to a size 20, however extended sizes at the time were not widely available in stores."
    },
    {
      "step": "1",
      "visual": "display 1995 + 2021 astm sizes",
      "animation": "add 2021 sizes; highlight size 2 from 2021 + size 8 from 1995",
      "text": "Today because of vanity sizing, a size 2 is based on a 26.88-inch waistline, which is close to what was once considered a size 8 in the 1990s.\\r\\n\\r\\n\\r\\nTwo new sizes were added to the bottom of the range in the early 2000s — sizes 00 and 0 — to account for the upward shift in all sizes."
    },
    {
      "step": "2",
      "visual": "display 1995 + 2021 astm sizes",
      "animation": "highlight size 8 from 2021",
      "text": "By comparison, today’s size 8 is 2.5 inches larger in the waist than it was 30 years ago."
    },
    {
      "step": "3",
      "visual": "display 1995 + 2021 astm sizes + median waistline markers",
      "animation": "add markers for median waistlines in 1994 & 2023",
      "text": "But vanity sizing wasn’t just accounting for women’s unconscious shopping behaviors. Clothes needed to be larger because our waistlines had grown.\\r\\n\\r\\n\\r\\nBetween 1988 and 1994, the median woman’s waistline was 34.88 inches. \\r\\n\\r\\n\\r\\nBy 2023, it was 37.68 inches."
    },
    {
      "step": "4",
      "visual": "display 1995 + 2021 astm sizes + median waistline markers",
      "animation": "highlight sizes 18 for both ranges",
      "text": "What’s noteworthy is that over this 30-year period, the median adult woman has almost always fit the size 18 that was available to her at the time. \\r\\n\\r\\n\\r\\nVanity sizing has effectively helped manufacturers keep up to pace with demographic shifts in the U.S. But only for the smallest half of all adult women."
    }
  ],
  "sewingLessons": [
    {
      "visual": "title + text block + static graphics",
      "animation": "",
      "title": "TK",
      "text": "\\r\\n\\r\\nTK personal section on how/why i got into sewing"
    }
  ],
  "massProduction": [
    {
      "visual": "*change the base dressform to my measurements",
      "animation": "",
      "text": ""
    }
  ],
  "Kicker": []
}`;var Mn=_("<p><!></p>"),In=_("<section><!></section>");function En(e,n){Y(n,!0);let t=G(n,"components",19,()=>({})),s=G(n,"body",19,()=>[]);var r=A(),h=T(r);X(h,17,s,H,(c,m)=>{let v=()=>o(m).section,i=()=>o(m).content;const p=F(()=>v().toLowerCase().replace(/[^a-z0-9]/g,"")),a=F(()=>t()[v()]);var l=In(),f=b(l);{var g=w=>{var x=A(),S=T(x);le(S,()=>o(a),(k,E)=>{E(k,he(i))}),u(w,x)},d=w=>{var x=A(),S=T(x);X(S,17,i,H,(k,E,J,q)=>{let B=()=>o(E).type,I=()=>o(E).value;const pe=F(()=>t()[B()]),Ae=F(()=>typeof I()=="string");var ce=A(),Ce=T(ce);{var Me=W=>{var $=A(),Q=T($);le(Q,()=>o(pe),(ee,ne)=>{ne(ee,he(I))}),u(W,$)},Ie=W=>{var $=A(),Q=T($);{var ee=P=>{var U=Mn(),ae=b(U);_e(ae,I),y(U),u(P,U)},ne=P=>{var U=A(),ae=T(U);{var Ee=N=>{var V=A(),te=T(V);de(te,B,!1,(me,ge)=>{var fe=A(),De=T(fe);_e(De,I),u(ge,fe)}),u(N,V)},Be=N=>{var V=A(),te=T(V);de(te,B,!1,(me,ge)=>{nn(me,()=>({...I()}))}),u(N,V)};O(ae,N=>{o(Ae)?N(Ee):N(Be,!1)},!0)}u(P,U)};O(Q,P=>{B()==="text"?P(ee):P(ne,!1)},!0)}u(W,$)};O(Ce,W=>{o(pe)?W(Me):W(Ie,!1)})}u(k,ce)}),u(w,x)};O(f,w=>{o(a)?w(g):w(d,!1)})}y(l),M(()=>en(l,"id",o(p))),u(c,l)}),u(e,r),Z()}var Bn=_('<p> </p> <progress max="100"></progress>',1);function Dn(e,n){let t=G(n,"label",3,"A"),s=G(n,"value",3,0);var r=Bn(),h=T(r),c=b(h,!0);y(h);var m=z(h,2);M(()=>{C(c,t()),an(m,s())}),u(e,r)}var jn=_('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function Fn(e,n){Y(n,!0);const{body:t}=sn,s={Test:Dn};var r=jn(),h=z(b(r),2),c=b(h),m=b(c,!0);y(c),y(h);var v=z(h,2);En(v,{get components(){return s},get body(){return t}}),y(r),M(i=>C(m,i),[()=>Cn.replace(/\t/g," ")]),u(e,r),Z()}const Ln=(e,n=ke)=>{var t=Wn(),s=b(t),r=b(s,!0);y(s);var h=z(s,2),c=b(h,!0);y(h),y(t),M(()=>{C(r,n().name),C(c,n().age)}),u(e,t)};var Wn=_('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),Pn=(e,n)=>Ke(n),Un=(e,n)=>n.random(Math.floor(Math.random()*10)),Nn=_('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function On(e,n){Y(n,!0),G(n,"age",3,30);const t=[{name:"John",age:30},{name:"Jill",age:45}];let s=L(0),r=F(()=>o(s)*2),h=F(()=>o(s)*2),c=L(0);ue(()=>{D(c,o(s)*2)});var m=Nn(),v=z(T(m),4);v.__click=[Pn,s];var i=z(v,2),p=b(i);y(i);var a=z(i,2),l=b(a);y(a);var f=z(a,2),g=b(f);y(f);var d=z(f,4),w=b(d);rn(w,()=>n.children??ke),y(d);var x=z(d,4);x.__click=[Un,n];var S=z(x,4);X(S,21,()=>t,H,(k,E)=>{Ln(k,()=>o(E))}),y(S),M(()=>{C(p,`${o(s)??""} doubled is ${o(r)??""} (derived)`),C(l,`${o(s)??""} doubled is ${o(h)??""} (derived by)`),C(g,`${o(s)??""} doubled is ${o(c)??""} ($effect)`)}),u(e,m),Z()}Ze(["click"]);const Xn=(e,n)=>{let t=L(Ge(e)),s=L(null),r=L(!0),h=L(void 0);const c=(i=!0)=>{D(r,i,!0),i===!0&&(D(h,null),D(s,null))},m=async()=>{try{const i=await fetch(o(t),n);if(!i.ok)throw new Error(`Unexpected error occurred (status ${i.status})`);let p;if(o(t).includes(".csv")){const a=await i.text();p=cn(a)}else p=await i.json();return[null,p]}catch(i){const{errorMessage:p="Unexpected error eccurred"}=i;return[p,null]}},v=async i=>{c(!0);const[p,a]=await m();if(i===o(t)){if(p){c(!1),D(h,p,!0);return}c(!1),D(s,a,!0)}};return ue(()=>{v(o(t))}),{get data(){return o(s)},get loading(){return o(r)},get error(){return o(h)},get url(){return o(t)},set url(i){o(t)!==i&&D(t,i,!0)}}};var Hn=_("<p>loading data...</p>"),Jn=_("<p> </p>"),qn=_("<p>data loaded</p> <pre> </pre>",1),$n=_('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function Vn(e,n){Y(n,!0);const t=`${on}/assets/demo/test.csv`,s=Xn(t);ue(()=>{});var r=$n(),h=z(b(r),2),c=b(h);{var m=i=>{var p=Hn();u(i,p)},v=i=>{var p=A(),a=T(p);{var l=g=>{var d=Jn(),w=b(d);y(d),M(()=>C(w,`error: ${s.error??""}`)),u(g,d)},f=g=>{var d=qn(),w=z(T(d),2),x=b(w,!0);y(w),M(S=>C(x,S),[()=>JSON.stringify(s.data,null,2)]),u(g,d)};O(a,g=>{s.error?g(l):g(f,!1)},!0)}u(i,p)};O(c,i=>{s.loading?i(m):i(v,!1)})}y(h),y(r),u(e,r),Z()}var Kn=_('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function Gn(e){let n=L(0);function t(l){console.log(l)}var s=Kn(),r=z(b(s),2);On(r,{random:t,get value(){return o(n)},set value(l){D(n,l,!0)}});var h=z(r,2);gn(h);var c=z(h,2);vn(c);var m=z(c,2);wn(m);var v=z(m,2);Sn(v);var i=z(v,2);Fn(i,{});var p=z(i,2);Vn(p,{});var a=z(p,2);An(a),y(s),u(e,s)}function oa(e){Gn(e)}export{oa as component};
