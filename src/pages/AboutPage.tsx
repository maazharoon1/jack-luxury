import brand from '../../brand.json';
import { ArrowDown, ArrowUpRight, Gem, Fingerprint, Watch } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import workshop from '../assets/images/craftsmanship_watchmaking_1791406593306.jpg';
import dressWatch from '../assets/images/watch_dress_minimalist_1791406534752.jpg';

export function AboutPage({ onExplore, onContact }: { onExplore: () => void; onContact: () => void }) {
  return (
    <div className="about-page">
      <section className="about-intro page-shell">
        <p className="eyebrow">The world of {brand.name}</p>
        <p className="eyebrow"><a href={brand.locationUrl} target="_blank" rel="noopener noreferrer">{brand.location}</a></p>
        <div className="about-intro-grid">
          <h1 tabIndex={-1} className="display-heading">More than time.<br /><em>A lasting feeling.</em></h1>
          <div className="about-intro-copy">
            <p>Some things are made to keep up with the world. Others remind us to slow down and appreciate it.</p>
            <a href="#about-philosophy" onClick={(event) => { event.preventDefault(); document.getElementById('about-philosophy')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }} className="text-link">Discover our philosophy <ArrowDown size={15} /></a>
          </div>
        </div>
      </section>

      <div className="about-image-banner">
        <img src={workshop} alt="The intricate components and careful assembly of a mechanical watch" fetchPriority="high" />
        <div className="about-image-caption"><span>A closer look at the extraordinary.</span><span>CRAFT / DETAIL / CHARACTER</span></div>
      </div>

      <Reveal><section id="about-philosophy" className="page-shell about-story">
        <div><p className="eyebrow">01 / Our philosophy</p><h2 className="section-heading">A considered collection.<br /><em>A personal connection.</em></h2></div>
        <div className="story-prose"><p>At {brand.name}, our appreciation begins with the details: the curve of a case, the balance of a dial, the quiet rhythm of a mechanical movement.</p><p>We bring together timepieces for people who see a watch as more than an instrument. An everyday companion. A reminder of a milestone. An expression of individual taste.</p><p>Our approach is simple: thoughtful selection, enduring design, and a conversation that starts with you.</p></div>
      </section></Reveal>

      <section className="about-values"><div className="page-shell">
        <Reveal><p className="eyebrow">What we value</p><h2 className="section-heading">Distinction is in the details.</h2></Reveal>
        <div className="values-grid">
          {[
            { icon: Watch, number: '01', title: 'Mechanical fascination', copy: 'The interplay of gears, springs, and human ingenuity. We celebrate the artistry that brings a mechanical watch to life.' },
            { icon: Gem, number: '02', title: 'Considered design', copy: 'Beautiful proportions, tactile materials, and a presence that feels right. Pieces chosen to outlast a passing trend.' },
            { icon: Fingerprint, number: '03', title: 'Individual character', copy: 'A collection should tell your story. We make room for different perspectives, from understated classics to expressive complications.' },
          ].map(({ icon: Icon, number, title, copy }) => <Reveal key={number}><article className="value-card"><div className="value-card-top"><Icon size={27} strokeWidth={1} /><span>{number}</span></div><h3>{title}</h3><p>{copy}</p></article></Reveal>)}
        </div>
      </div></section>

      <Reveal><section className="page-shell about-detail">
        <div className="about-detail-image"><img src={dressWatch} alt="An ivory dial dress watch with a finely finished case and leather strap" loading="lazy" /><span>The beauty of restraint.</span></div>
        <div><p className="eyebrow">02 / A different perspective</p><h2 className="section-heading">Quiet confidence.<br /><em>Lasting presence.</em></h2><p className="muted-copy">The most compelling watch is the one you reach for, day after day. One that feels as natural at a celebration as it does in the small, ordinary moments that make a life.</p><p className="muted-copy">From your first mechanical timepiece to the next addition to a treasured collection, discover something that feels distinctly yours.</p><button className="text-link" onClick={onExplore}>Find your timepiece <ArrowUpRight size={17} /></button></div>
      </section></Reveal>

      <Reveal><section className="about-closing"><div className="page-shell"><p className="eyebrow">Your next chapter</p><h2 className="display-heading">Good taste is personal.<br /><em>Let’s find yours.</em></h2><p>Explore at your own pace, or start a conversation with us.</p><div className="page-actions"><button className="luxury-button" onClick={onExplore}>Explore the collection <ArrowUpRight size={16} /></button><button className="text-link" onClick={onContact}>Get in touch <ArrowUpRight size={16} /></button></div></div></section></Reveal>
    </div>
  );
}
