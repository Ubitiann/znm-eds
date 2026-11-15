// Hand-authored documents that mirror the museum's home page and footer.
import { MEDIA } from './pages.mjs';

const meta = (style) => `  <div class="section-metadata">
    <div><div>style</div><div>${style}</div></div>
  </div>`;

export function homeHtml() {
  return `<div>
  <div class="hero">
    <div><div>
      <p><a href="${MEDIA}znm-r3/visit/exterior-image.jpg">Zayed National Museum</a></p>
      <h1>The National Museum of the UAE</h1>
      <p>Celebrating the rich history, culture and stories of the United Arab Emirates</p>
      <p>Open daily 10:00 AM-08:00 PM</p>
    </div></div>
  </div>
${meta('hero-section')}
</div>
<div>
  <div class="split">
    <div>
      <div>
        <p>Zayed National Museum is located at the heart of Saadiyat Cultural District Abu Dhabi. The national museum of the United Arab Emirates celebrates the <strong>rich history, culture and stories</strong> of its people from ancient times to modern day.</p>
        <p>It tells the story of the UAE’s Founding Father, the late Sheikh Zayed bin Sultan Al Nahyan, whose enduring example still guides the nation and its people today. Through its exhibitions, research and public programmes, Zayed National Museum explores the origins of the values that Sheikh Zayed embodied and their lasting influence on the country he founded.</p>
        <p><a href="/en/visit">Plan your visit</a></p>
      </div>
      <div>
        <p><a href="${MEDIA}znm/about/section-carousel/banner-16x9.jpg">Sheikh Zayed bin Sultan Al Nahyan</a></p>
      </div>
    </div>
  </div>
</div>
<div>
  <div class="faq">
    <div><div>300,000 years of human history</div><div>Zayed National Museum takes you through the history of the United Arab Emirates, back to a 300,000-year-old stone tool found at Jebel Hafit in Al Ain. With an authentic form of storytelling, the objects in our galleries link the ancient past with people’s living traditions.</div></div>
    <div><div>The lessons of Sheikh Zayed</div><div></div></div>
    <div><div>The UAE’s living history</div><div></div></div>
  </div>
</div>
<div>
  <div class="link-tiles">
    <div><div><a href="/en/explore/collection">Our collection</a></div></div>
    <div><div><a href="/en/explore/galleries">Our galleries</a></div></div>
  </div>
</div>
<div>
  <h2>Prepare for your visit</h2>
  <div class="page-cards">
    <div><div><a href="/en/visit">Plan your visit</a></div></div>
    <div><div><a href="/en/experiences">Book your tickets</a></div></div>
    <div><div><a href="/en/visit/dine-and-shops">Dining and Al Nagwa Boutique</a></div></div>
  </div>
</div>
`;
}

export function footerHtml() {
  return `<div>
  <h2>Stay connected</h2>
  <p>Enter your email address to receive our newsletter</p>
  <div class="contact-form newsletter">
    <div><div>First name</div><div>text</div></div>
    <div><div>Last name</div><div>text</div></div>
    <div><div>Email address</div><div>email</div></div>
    <div><div>I agree to the terms and conditions</div><div>checkbox</div></div>
  </div>
</div>
<div>
  <h4>Plan your visit</h4>
  <ul>
    <li><a href="/en/visit/dine-and-shops">Dining and Al Nagwa Boutique</a></li>
    <li><a href="/en/visit/school-visit">School visit</a></li>
    <li><a href="/en/visit/accessibility">Accessibility</a></li>
  </ul>
  <h4>Explore</h4>
  <ul>
    <li><a href="/en/explore/galleries">Galleries</a></li>
    <li><a href="/en/explore/collection">Collection</a></li>
    <li><a href="/en/explore/donate">Donate an object</a></li>
  </ul>
  <h4>Experiences</h4>
  <ul>
    <li><a href="/en/event-calender">Events, Exhibitions and Tours</a></li>
  </ul>
  <h4>Our programmes</h4>
  <ul>
    <li><a href="/en/learn/public-programmes">Public programmes</a></li>
    <li><a href="/en/learn/school-programmes">Learning programmes</a></li>
    <li><a href="/en/learn/access-programmes">Access programmes</a></li>
  </ul>
  <h4>Research</h4>
  <ul>
    <li><a href="/en/research/research-fund">Research Fund</a></li>
  </ul>
  <h4>Get involved</h4>
  <ul>
    <li><a href="/en/get-involved/membership">Membership</a></li>
    <li><a href="/en/get-involved/partnership">Partnership</a></li>
    <li><a href="/en/get-involved/patrons-programme">Patrons programme</a></li>
    <li><a href="/en/volunteer">Volunteer</a></li>
    <li><a href="/en/join-our-team">Join our team</a></li>
  </ul>
  <h4>About us</h4>
  <ul>
    <li><a href="/en/about">About us</a></li>
  </ul>
</div>
<div>
  <h3>Operating hours:</h3>
  <p>10:00 am - 08:00 pm</p>
  <p>Last entry: One hour before closing</p>
  <p>Saadiyat Cultural District, Abu Dhabi</p>
  <p>600 56 55 66</p>
</div>
<div>
  <p>Cookie settings</p>
  <p>Privacy policy</p>
  <p>Cookie policy</p>
  <p>© 2025 Zayed National Museum. All Rights Reserved</p>
</div>
<div>
  <ul>
    <li><a href="https://www.instagram.com/">Instagram</a></li>
    <li><a href="https://www.youtube.com/">YouTube</a></li>
    <li><a href="https://x.com/">X</a></li>
    <li><a href="https://www.facebook.com/">Facebook</a></li>
    <li><a href="https://www.linkedin.com/">LinkedIn</a></li>
  </ul>
</div>
`;
}
