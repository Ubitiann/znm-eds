// Generates AEM (Edge Delivery) documents from tools/pages.mjs into /content.
// Each file is the "plain" markup an author would have in DA / Word / Sheets:
// top-level <div> = section, <div class="block"> = block, section-metadata for styles.
import fs from 'fs';
import path from 'path';
import { pages, crumbLabels, MEDIA } from './pages.mjs';
import { homeHtml, footerHtml as siteFooterHtml } from './site-content.mjs';

const OUT = 'content';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const titleOf = (p) => (pages.find((x) => x.path === p)?.h1) || p;

const sectionMeta = (style) => `  <div class="section-metadata">
    <div><div>style</div><div>${style}</div></div>
  </div>`;

function breadcrumb(page) {
  const parts = page.path.replace('/en/', '').split('/');
  const cells = ['<div><a href="/en/">Home</a></div>'];
  if (parts.length > 1 || page.parent) {
    const parentPath = page.parent || `/en/${parts[0]}`;
    cells.push(`<div><a href="${parentPath}">${esc(crumbLabels[parentPath] || titleOf(parentPath))}</a></div>`);
  }
  if (page.path === '/en/volunteer' || page.path === '/en/join-our-team') {
    cells.splice(1, 0, `<div><a href="/en/get-involved">${crumbLabels['/en/get-involved']}</a></div>`);
  }
  cells.push(`<div>${esc(crumbLabel(page))}</div>`);
  return `  <div class="breadcrumb">
    <div>${cells.join('')}</div>
  </div>`;
}

function crumbLabel(page) {
  const shortLabels = {
    '/en/visit': 'Plan your visit',
    '/en/learn': 'Our programmes',
    '/en/volunteer': 'Volunteer',
    '/en/join-our-team': 'Join our team',
  };
  return shortLabels[page.path] || page.h1;
}

function formBlock(form) {
  const rows = form.fields
    .map(([label, type]) => `    <div><div>${esc(label)}</div><div>${type}</div></div>`)
    .join('\n');
  return `<div>
  <h2>${esc(form.title)}</h2>
  <div class="contact-form">
${rows}
  </div>
${sectionMeta('dark')}
</div>`;
}

function pageHtml(page) {
  const out = [];
  if (page.home) {
    out.push(`<div>
  <div class="hero">
    <div><div><p><a href="${MEDIA}${page.img}">${esc(page.h1)}</a></p><h1>${esc(page.h1)}</h1></div></div>
  </div>
${sectionMeta('hero-section')}
</div>`);
  } else {
    out.push(`<div>
${breadcrumb(page)}
  <h1>${esc(page.h1)}</h1>
</div>`);
    if (page.img) {
      out.push(`<div>
  <p><a href="${MEDIA}${page.img}" title="${esc(page.h1)}">${esc(page.h1)}</a></p>
${sectionMeta('banner')}
</div>`);
    }
  }
  out.push(`<div>
${page.intro.map((t) => `  <p>${esc(t)}</p>`).join('\n')}${page.home ? '\n  <p><a href="/en/experiences">Plan your visit</a></p>' : ''}
</div>`);
  if (page.form) out.push(formBlock(page.form));
  if (page.cards) {
    out.push(`<div>
  <h2>${esc(page.cardsTitle || 'Explore more')}</h2>
  <div class="page-cards">
${page.cards.map((p) => `    <div><div><a href="${p}">${p}</a></div></div>`).join('\n')}
  </div>
${sectionMeta('alt')}
</div>`);
  }
  return `${out.join('\n')}\n`;
}

const aboutHtml = `<div>
  <div class="breadcrumb">
    <div><div><a href="/en/">Home</a></div><div>About us</div></div>
  </div>
  <h1>About us</h1>
</div>
<div>
  <p><a href="${MEDIA}znm/about/section-carousel/banner-16x9.jpg" title="Zayed National Museum">About Zayed National Museum</a></p>
${sectionMeta('banner')}
</div>
<div>
  <h2>Our story</h2>
  <p>Zayed National Museum derives its founding purpose from the late Sheikh Zayed bin Sultan Al Nahyan, the Founding Father of the United Arab Emirates and a lifelong advocate for the preservation of the people’s traditional culture and heritage.</p>
  <p>Located in Saadiyat Cultural District in Abu Dhabi, the museum celebrates the life and values of Sheikh Zayed bin Sultan Al Nahyan and explores the rich history and culture of the UAE through the museum’s galleries, research and public programmes.</p>
  <div class="pillars">
    <div><div>01</div><div><a href="#an-archaeological-heritage">An archaeological heritage</a></div></div>
    <div><div>02</div><div><a href="#everyone-is-welcome">Everyone is welcome</a></div></div>
    <div><div>03</div><div><a href="#collaborative-research">Collaborative research</a></div></div>
    <div><div>04</div><div><a href="#generational-learning">Generational learning</a></div></div>
  </div>
</div>
<div>
  <h2 id="an-archaeological-heritage">An archaeological heritage</h2>
  <p>In the late 1950s, the late Sheikh Shakhbut bin Sultan Al Nahyan, then the Ruler of Abu Dhabi, invited a team of Danish archaeologists to excavate Umm an-Nar Island, where they discovered a Bronze Age site. Sheikh Shakhbut’s brother, Sheikh Zayed, visited and invited them to investigate sites he knew of at Jebel Hafit in Al Ain. They made many discoveries in the area, including a significant Iron Age site. A new generation of archaeologists in the UAE continues to build on these discoveries.</p>
</div>
<div>
  <h2 id="everyone-is-welcome">Everyone is welcome</h2>
  <p>Zayed National Museum is committed to inclusivity and accessibility. We offer a diverse range of programmes and services tailored for People of Determination, senior citizens, other community audiences, as well as their care partners and caregivers.</p>
${sectionMeta('alt')}
</div>
<div>
  <h2 id="collaborative-research">Collaborative research</h2>
  <p>Part of Zayed National Museum’s mandate is to be a world-class research institution, beginning with its Magan Boat project in partnership with Zayed University and New York University Abu Dhabi. The goal is to uncover the traditional boatbuilding techniques that enabled this ancient region to trade with the wider world.</p>
  <p>Zayed National Museum’s Research Fund, launched in 2023, supports research into the culture and history of the UAE and the legacy of Founding Father Sheikh Zayed. Grants from the AED 1 million fund are awarded by a panel of experts based on criteria including research methodology, experience, outcomes and relevance to the museum's mandate.</p>
</div>
<div>
  <h2 id="generational-learning">Generational learning</h2>
  <p>Zayed National Museum aims to inspire the UAE's next generation of researchers, historians, archaeologists and cultural professionals. This includes working with teachers and local educational institutions to encourage young people to consider a career in these rewarding fields.</p>
${sectionMeta('alt')}
</div>
<div>
  <h2>Contact us</h2>
  <p>Do you have questions or enquiries about Zayed National Museum? Reach out to our team using the form.</p>
  <div class="contact-form">
    <div><div>First name</div><div>text</div></div>
    <div><div>Last name</div><div>text</div></div>
    <div><div>Mobile number</div><div>tel</div></div>
    <div><div>Email address</div><div>email</div></div>
    <div><div>Area of interest</div><div>select</div><div>General enquiry;Tickets and membership;Research;Education and learning;Press and media</div></div>
  </div>
${sectionMeta('dark')}
</div>
<div>
  <h2>Frequently asked questions</h2>
  <div class="faq">
    <div><div>What is Zayed National Museum?</div><div>Located at the centre of Abu Dhabi's Saadiyat Cultural District, Zayed National Museum celebrates the UAE's rich history, culture and stories and the timeless values of the country's Founding Father, the late Sheikh Zayed bin Sultan Al Nahyan.</div></div>
    <div><div>Is Zayed National Museum about Sheikh Zayed?</div><div>The museum celebrates the life and values of Sheikh Zayed bin Sultan Al Nahyan and explores the rich history and culture of the UAE.</div></div>
    <div><div>What will I find inside Zayed National Museum?</div><div>Galleries, research and public programmes exploring the history and culture of the UAE.</div></div>
  </div>
</div>
<div>
  <h2>More about the museum</h2>
  <div class="page-cards">
    <div><div><a href="/en/explore/galleries">/en/explore/galleries</a></div></div>
    <div><div><a href="/en/research">/en/research</a></div></div>
    <div><div><a href="/en/learn">/en/learn</a></div></div>
  </div>
${sectionMeta('alt')}
</div>
`;

const navHtml = `<div>
  <p><a href="https://api.zayednationalmuseum.ae/-/media/feature/platform/header/logo/znmheaderlogo/logo.svg" title="Zayed National Museum">Zayed National Museum</a></p>
</div>
<div>
  <ul>
    <li><a href="/en/visit">Plan your visit</a></li>
    <li><a href="/en/explore">Explore</a></li>
    <li><a href="/en/experiences">Experiences</a></li>
    <li><a href="/en/learn">Our programmes</a></li>
    <li><a href="/en/research">Research</a></li>
    <li><a href="/en/get-involved">Get involved</a></li>
    <li><a href="/en/about">About us</a></li>
  </ul>
</div>
<div>
  <p><a href="/en/experiences" class="nav-search">Search</a></p>
  <p><a href="/en/experiences" class="nav-tickets">Tickets</a></p>
</div>
<div>
  <ul>
    <li><a href="/en/get-involved/membership">Membership</a></li>
    <li><a href="#">Light Mode</a></li>
    <li><a href="/en/visit/accessibility">Accessibility</a></li>
    <li><a href="/en/about">English</a></li>
  </ul>
</div>
`;

const footerHtml = `<div>
  <h4>Zayed National Museum</h4>
  <p>Saadiyat Cultural District, Abu Dhabi, United Arab Emirates</p>
</div>
<div>
  <h4>Visit</h4>
  <ul>
    <li><a href="/en/visit">Plan your visit</a></li>
    <li><a href="/en/visit/dine-and-shops">Dining and Al Nagwa Boutique</a></li>
    <li><a href="/en/visit/accessibility">Accessibility</a></li>
    <li><a href="/en/get-involved/membership">Membership</a></li>
  </ul>
</div>
<div>
  <h4>Discover</h4>
  <ul>
    <li><a href="/en/explore">Explore</a></li>
    <li><a href="/en/experiences">Experiences</a></li>
    <li><a href="/en/learn">Our programmes</a></li>
    <li><a href="/en/research">Research</a></li>
  </ul>
</div>
<div>
  <h4>About</h4>
  <ul>
    <li><a href="/en/about">About us</a></li>
    <li><a href="/en/get-involved">Get involved</a></li>
    <li><a href="/en/volunteer">Volunteer</a></li>
    <li><a href="/en/join-our-team">Join our team</a></li>
  </ul>
</div>
<div>
  <p>© Zayed National Museum. Replica built for demonstration with Adobe Edge Delivery Services.</p>
</div>
`;

function write(rel, html) {
  const file = path.join(OUT, `${rel}.plain.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

fs.rmSync(OUT, { recursive: true, force: true });
pages.forEach((p) => write(p.path, p.home ? homeHtml() : pageHtml(p)));
write('/en/about', aboutHtml);
write('/nav', navHtml);
write('/footer', siteFooterHtml());
console.log(`Generated ${pages.length + 3} documents in ${OUT}/`);
