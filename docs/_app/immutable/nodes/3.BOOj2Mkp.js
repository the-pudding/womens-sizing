import"../chunks/Bzak7iHL.js";import{h as j,a as ve,f as se,aE as Be,b as De,E as je,d as Le,aF as We,af as Ue,ad as Fe,c as Xe,a3 as ye,a2 as we,D as Ne,p as Oe,a5 as Pe,ag as Je,V as _,X as d,ax as w,Z as y,_ as v,ay as C,aw as T,aA as He,W as M,A as l,az as L,C as D,av as W,aG as $e,U as Y,Y as Z,u as ue,aH as qe,R as Te,B as Ve}from"../chunks/Dzm_WEGj.js";import{i as Ke,b as be,a as A,d as Ge}from"../chunks/ZgVi19R2.js";import{e as P,i as J,b as Ye,s as Ze,c as Qe,d as en}from"../chunks/BT_AMUzb.js";import{c as le}from"../chunks/DH1QYJyw.js";import{s as he,p as G}from"../chunks/ihUrmXYw.js";import{S as nn,h as ze,c as tn}from"../chunks/CBSSpFAQ.js";import{i as O}from"../chunks/C0w0nz2X.js";import{s as an}from"../chunks/BIhypZ3Q.js";import{b as sn}from"../chunks/CpGuhaVP.js";function de(e,n,a,s,o,h){let c=j;j&&ve();var m,f,i=null;j&&se.nodeType===Be&&(i=se,ve());var u=j?se:e,t;De(()=>{const r=n()||null;var z=r==="svg"?We:null;r!==m&&(t&&(r===null?Oe(t,()=>{t=null,f=null}):r===f?Pe(t):(Je(t),be(!1))),r&&r!==f&&(t=Le(()=>{if(i=j?i:z?document.createElementNS(z,r):document.createElement(r),Ue(i,i),s){j&&Ke(r)&&i.append(document.createComment(""));var g=j?Fe(i):i.appendChild(Xe());j&&(g===null?ye(!1):we(g)),s(i,g)}Ne.nodes_end=i,u.before(i)})),m=r,m&&(f=m),be(!0))},je),c&&(ye(!0),we(u))}var xe={},ie={},re=34,K=10,oe=13;function Se(e){return new Function("d","return {"+e.map(function(n,a){return JSON.stringify(n)+": d["+a+'] || ""'}).join(",")+"}")}function rn(e,n){var a=Se(e);return function(s,o){return n(a(s),o,e)}}function _e(e){var n=Object.create(null),a=[];return e.forEach(function(s){for(var o in s)o in n||a.push(n[o]=o)}),a}function R(e,n){var a=e+"",s=a.length;return s<n?new Array(n-s+1).join(0)+a:a}function on(e){return e<0?"-"+R(-e,6):e>9999?"+"+R(e,6):R(e,4)}function ln(e){var n=e.getUTCHours(),a=e.getUTCMinutes(),s=e.getUTCSeconds(),o=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":on(e.getUTCFullYear())+"-"+R(e.getUTCMonth()+1,2)+"-"+R(e.getUTCDate(),2)+(o?"T"+R(n,2)+":"+R(a,2)+":"+R(s,2)+"."+R(o,3)+"Z":s?"T"+R(n,2)+":"+R(a,2)+":"+R(s,2)+"Z":a||n?"T"+R(n,2)+":"+R(a,2)+"Z":"")}function hn(e){var n=new RegExp('["'+e+`
\r]`),a=e.charCodeAt(0);function s(t,r){var z,g,p=o(t,function(b,x){if(z)return z(b,x-1);g=b,z=r?rn(b,r):Se(b)});return p.columns=g||[],p}function o(t,r){var z=[],g=t.length,p=0,b=0,x,S=g<=0,k=!1;t.charCodeAt(g-1)===K&&--g,t.charCodeAt(g-1)===oe&&--g;function E(){if(S)return ie;if(k)return k=!1,xe;var $,B=p,I;if(t.charCodeAt(B)===re){for(;p++<g&&t.charCodeAt(p)!==re||t.charCodeAt(++p)===re;);return($=p)>=g?S=!0:(I=t.charCodeAt(p++))===K?k=!0:I===oe&&(k=!0,t.charCodeAt(p)===K&&++p),t.slice(B+1,$-1).replace(/""/g,'"')}for(;p<g;){if((I=t.charCodeAt($=p++))===K)k=!0;else if(I===oe)k=!0,t.charCodeAt(p)===K&&++p;else if(I!==a)continue;return t.slice(B,$)}return S=!0,t.slice(B,g)}for(;(x=E())!==ie;){for(var H=[];x!==xe&&x!==ie;)H.push(x),x=E();r&&(H=r(H,b++))==null||z.push(H)}return z}function h(t,r){return t.map(function(z){return r.map(function(g){return u(z[g])}).join(e)})}function c(t,r){return r==null&&(r=_e(t)),[r.map(u).join(e)].concat(h(t,r)).join(`
`)}function m(t,r){return r==null&&(r=_e(t)),h(t,r).join(`
`)}function f(t){return t.map(i).join(`
`)}function i(t){return t.map(u).join(e)}function u(t){return t==null?"":t instanceof Date?ln(t):n.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:s,parseRows:o,format:c,formatBody:m,formatRows:f,formatRow:i,formatValue:u}}var dn=hn(","),un=dn.parse,pn=_('<section id="demo-link"><h2>Link</h2> <p><a href="elements">Default element styles demo</a></p> <p><a href="fonts">Pudding-hosted font previews</a></p></section>');function cn(e){var n=pn();d(e,n)}var mn=_('<section id="demo-image"><h2>Image</h2> <p>img tag</p> <img src="../assets/demo/test.jpg" alt="cat" class="svelte-o47y6s"/> <p>background image</p> <div class="svelte-o47y6s"></div></section>');function gn(e){var n=mn();d(e,n)}var fn=_('<section id="demo-element"><h2>Dynamic Svelte Element</h2> <!></section>');function vn(e){const n=[{tag:"h3",text:"I am a h3 tag."},{tag:"p",text:"I am p tag."}];var a=fn(),s=w(y(a),2);P(s,17,()=>n,J,(o,h)=>{let c=()=>l(h).tag,m=()=>l(h).text;var f=C(),i=T(f);de(i,c,!1,(u,t)=>{var r=He();M(()=>A(r,m())),d(t,r)}),d(o,f)}),v(a),d(e,a)}var yn=_("<p> </p>");function wn(e,n){var a=yn(),s=y(a);v(a),M(()=>A(s,`I am component A and my favorite number is ${n.number??""}.`)),d(e,a)}var bn=_("<p> </p>");function zn(e,n){var a=bn(),s=y(a);v(a),M(()=>A(s,`I am component B and my name is ${n.name??""}.`)),d(e,a)}var xn=_('<section id="demo-component"><h2>Dynamic Svelte Component</h2> <!></section>');function _n(e){const n={A:wn,B:zn},a=[{component:"A",number:42},{component:"B",name:"Russell"}];var s=xn(),o=w(y(s),2);P(o,17,()=>a,J,(h,c)=>{const m=L(()=>n[l(c).component]);var f=C(),i=T(f);le(i,()=>l(m),(u,t)=>{t(u,he(()=>l(c)))}),d(h,f)}),v(s),d(e,s)}var Tn=_('<div><p class="svelte-12sq0x6"> </p></div>'),Sn=_('<section id="scrolly"><h2 class="svelte-12sq0x6">Scrolly <span> </span></h2> <div class="spacer svelte-12sq0x6"></div> <!> <div class="spacer svelte-12sq0x6"></div></section>');function kn(e){let n=W(void 0);var a=Sn(),s=y(a),o=w(y(s)),h=y(o,!0);v(o),v(s);var c=w(s,4);nn(c,{get value(){return l(n)},set value(m){D(n,m,!0)},children:(m,f)=>{var i=C(),u=T(i);P(u,16,()=>[0,1,2,3,4],J,(t,r,z)=>{const g=L(()=>l(n)===z);var p=Tn();let b;var x=y(p),S=y(x,!0);v(x),v(p),M(k=>{b=Ye(p,1,"step svelte-12sq0x6",null,b,k),A(S,r)},[()=>({active:l(g)})]),d(t,p)}),d(m,i)},$$slots:{default:!0}}),$e(2),v(a),M(()=>A(h,l(n)||"-")),d(e,a)}const Rn=`{
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
  "sizeCharts": [
    {
      "id": "0",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "excludeNearMedian",
      "text": "<p>Many prominent (particularly high-end) brands do not carry sizes higher than a size 14 or 16.</p><p> These size ranges are often smaller than both the <span class=orange-span> average woman’s waistline of 37.68 inches</span> and <span class=green-span>ASTM guides.</span></p>"
    },
    {
      "id": "1",
      "displayRegular": "true",
      "displayPlus": "false",
      "brandFilter": "null",
      "text": "Some brands carry extended options within their <span class=blue-span>“Regular” or “Straight”</span> size ranges."
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
}`;var Cn=_("<p><!></p>"),An=_("<section><!></section>");function Mn(e,n){Y(n,!0);let a=G(n,"components",19,()=>({})),s=G(n,"body",19,()=>[]);var o=C(),h=T(o);P(h,17,s,J,(c,m)=>{let f=()=>l(m).section,i=()=>l(m).content;const u=L(()=>f().toLowerCase().replace(/[^a-z0-9]/g,"")),t=L(()=>a()[f()]);var r=An(),z=y(r);{var g=b=>{var x=C(),S=T(x);le(S,()=>l(t),(k,E)=>{E(k,he(i))}),d(b,x)},p=b=>{var x=C(),S=T(x);P(S,17,i,J,(k,E,H,$)=>{let B=()=>l(E).type,I=()=>l(E).value;const pe=L(()=>a()[B()]),ke=L(()=>typeof I()=="string");var ce=C(),Re=T(ce);{var Ce=U=>{var q=C(),Q=T(q);le(Q,()=>l(pe),(ee,ne)=>{ne(ee,he(I))}),d(U,q)},Ae=U=>{var q=C(),Q=T(q);{var ee=F=>{var X=Cn(),te=y(X);ze(te,I),v(X),d(F,X)},ne=F=>{var X=C(),te=T(X);{var Me=N=>{var V=C(),ae=T(V);de(ae,B,!1,(me,ge)=>{var fe=C(),Ee=T(fe);ze(Ee,I),d(ge,fe)}),d(N,V)},Ie=N=>{var V=C(),ae=T(V);de(ae,B,!1,(me,ge)=>{Qe(me,()=>({...I()}))}),d(N,V)};O(te,N=>{l(ke)?N(Me):N(Ie,!1)},!0)}d(F,X)};O(Q,F=>{B()==="text"?F(ee):F(ne,!1)},!0)}d(U,q)};O(Re,U=>{l(pe)?U(Ce):U(Ae,!1)})}d(k,ce)}),d(b,x)};O(z,b=>{l(t)?b(g):b(p,!1)})}v(r),M(()=>Ze(r,"id",l(u))),d(c,r)}),d(e,o),Z()}var In=_('<p> </p> <progress max="100"></progress>',1);function En(e,n){let a=G(n,"label",3,"A"),s=G(n,"value",3,0);var o=In(),h=T(o),c=y(h,!0);v(h);var m=w(h,2);M(()=>{A(c,a()),en(m,s())}),d(e,o)}var Bn=_('<section id="cms"><h2>MicroCMS</h2> <code><pre> </pre></code> <!></section>');function Dn(e,n){Y(n,!0);const{body:a}=tn,s={Test:En};var o=Bn(),h=w(y(o),2),c=y(h),m=y(c,!0);v(c),v(h);var f=w(h,2);Mn(f,{get components(){return s},get body(){return a}}),v(o),M(i=>A(m,i),[()=>Rn.replace(/\t/g," ")]),d(e,o),Z()}const jn=(e,n=Te)=>{var a=Ln(),s=y(a),o=y(s,!0);v(s);var h=w(s,2),c=y(h,!0);v(h),v(a),M(()=>{A(o,n().name),A(c,n().age)}),d(e,a)};var Ln=_('<div class="person svelte-1ltx6da"><p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p></div>'),Wn=(e,n)=>qe(n),Un=(e,n)=>n.random(Math.floor(Math.random()*10)),Fn=_('<h2>Svelte5</h2> <h3>Reactive variables 3 ways:</h3> <button class="svelte-1ltx6da">count++</button> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <p class="svelte-1ltx6da"> </p> <h3>Children (previously slots):</h3> <div class="children"><!></div> <h3>Dispatch Event</h3> <button class="svelte-1ltx6da">Random</button>  <h3>Snippets</h3> <div class="people svelte-1ltx6da"></div>',1);function Xn(e,n){Y(n,!0),G(n,"age",3,30);const a=[{name:"John",age:30},{name:"Jill",age:45}];let s=W(0),o=L(()=>l(s)*2),h=L(()=>l(s)*2),c=W(0);ue(()=>{D(c,l(s)*2)});var m=Fn(),f=w(T(m),4);f.__click=[Wn,s];var i=w(f,2),u=y(i);v(i);var t=w(i,2),r=y(t);v(t);var z=w(t,2),g=y(z);v(z);var p=w(z,4),b=y(p);an(b,()=>n.children??Te),v(p);var x=w(p,4);x.__click=[Un,n];var S=w(x,4);P(S,21,()=>a,J,(k,E)=>{jn(k,()=>l(E))}),v(S),M(()=>{A(u,`${l(s)??""} doubled is ${l(o)??""} (derived)`),A(r,`${l(s)??""} doubled is ${l(h)??""} (derived by)`),A(g,`${l(s)??""} doubled is ${l(c)??""} ($effect)`)}),d(e,m),Z()}Ge(["click"]);const Nn=(e,n)=>{let a=W(Ve(e)),s=W(null),o=W(!0),h=W(void 0);const c=(i=!0)=>{D(o,i,!0),i===!0&&(D(h,null),D(s,null))},m=async()=>{try{const i=await fetch(l(a),n);if(!i.ok)throw new Error(`Unexpected error occurred (status ${i.status})`);let u;if(l(a).includes(".csv")){const t=await i.text();u=un(t)}else u=await i.json();return[null,u]}catch(i){const{errorMessage:u="Unexpected error eccurred"}=i;return[u,null]}},f=async i=>{c(!0);const[u,t]=await m();if(i===l(a)){if(u){c(!1),D(h,u,!0);return}c(!1),D(s,t,!0)}};return ue(()=>{f(l(a))}),{get data(){return l(s)},get loading(){return l(o)},get error(){return l(h)},get url(){return l(a)},set url(i){l(a)!==i&&D(a,i,!0)}}};var On=_("<p>loading data...</p>"),Pn=_("<p> </p>"),Jn=_("<p>data loaded</p> <pre> </pre>",1),Hn=_('<div class="c"><h2>Load Data</h2> <div class="response"><!></div></div>');function $n(e,n){Y(n,!0);const a=`${sn}/assets/demo/test.csv`,s=Nn(a);ue(()=>{});var o=Hn(),h=w(y(o),2),c=y(h);{var m=i=>{var u=On();d(i,u)},f=i=>{var u=C(),t=T(u);{var r=g=>{var p=Pn(),b=y(p);v(p),M(()=>A(b,`error: ${s.error??""}`)),d(g,p)},z=g=>{var p=Jn(),b=w(T(p),2),x=y(b,!0);v(b),M(S=>A(x,S),[()=>JSON.stringify(s.data,null,2)]),d(g,p)};O(t,g=>{s.error?g(r):g(z,!1)},!0)}d(i,u)};O(c,i=>{s.loading?i(m):i(f,!1)})}v(h),v(o),d(e,o),Z()}var qn=_('<div id="demo" class="svelte-m1ilu3"><h1>Demo</h1> <!> <!> <!> <!> <!> <!> <!> <!></div>');function Vn(e){let n=W(0);function a(r){console.log(r)}var s=qn(),o=w(y(s),2);Xn(o,{random:a,get value(){return l(n)},set value(r){D(n,r,!0)}});var h=w(o,2);cn(h);var c=w(h,2);gn(c);var m=w(c,2);vn(m);var f=w(m,2);_n(f);var i=w(f,2);Dn(i,{});var u=w(i,2);$n(u,{});var t=w(u,2);kn(t),v(s),d(e,s)}function it(e){Vn(e)}export{it as component};
