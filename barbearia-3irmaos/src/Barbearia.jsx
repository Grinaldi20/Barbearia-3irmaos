import { useState, useEffect, useRef } from 'react';
import './Barbearia.css';

// ── ASSETS ──────────────────────────────────────────────────────────────────
import barber1 from './assets/barber1.png';
import barber2 from './assets/barber2.png';
import barber3 from './assets/barber3.png';
import corte from './assets/corte.png';
import corte2 from './assets/corte2.png';
import corte3 from './assets/corte3.png';
import corte4 from './assets/corte4.png';
import faixada from './assets/faixada.png';
// ── DATA ─────────────────────────────────────────────────────────────────────
const TEAM = [
  {
    img: barber1,
    name: 'Rafael Silva',
    role: 'Master Barber',
    desc: 'Especialista em cortes clássicos e modernos, com foco em degradê e acabamento perfeito.',
    instagram: '@rafaelbarber',
    whatsapp: '5500000000000',
  },
  {
    img: barber2,
    name: 'Lucas Mendes',
    role: 'Barber Stylist',
    desc: 'Expert em desenhos e pigmentação, transformando o visual com criatividade e precisão.',
    instagram: '@lucasbarber',
    whatsapp: '5500000000000',
  },
  {
    img: barber3,
    name: 'Mateus Costa',
    role: 'Senior Barber',
    desc: 'Referência em barba e tratamentos capilares, proporcionando uma experiência completa.',
    instagram: '@mateusbarber',
    whatsapp: '5500000000000',
  },
];

const SERVICES = [
  {
    icon: '💈',
    name: 'Corte Masculino',
    desc: 'Cortes modernos e clássicos executados com precisão e atenção aos detalhes.',
    price: 'R$ 30',
    cents: ',00',
  },
  {
    icon: '🪒',
    name: 'Barba',
    desc: 'Modelagem e acabamento de barba com navalha e produtos de qualidade premium.',
    price: 'R$ 20',
    cents: ',00',
  },
  {
    icon: '✂️',
    name: 'Corte + Barba',
    desc: 'O combo perfeito para um visual completo e renovado do início ao fim.',
    price: 'R$ 45',
    cents: ',00',
  },
  {
    icon: '🎨',
    name: 'Pigmentação',
    desc: 'Pigmentação capilar para dar cor e profundidade ao corte com resultado natural.',
    price: 'R$ 15',
    cents: ',00',
  },
  {
    icon: '👁️',
    name: 'Sobrancelha',
    desc: 'Design de sobrancelha masculino para um look mais alinhado e sofisticado.',
    price: 'R$ 10',
    cents: ',00',
  },
  {
    icon: '👦',
    name: 'Corte Infantil',
    desc: 'Atendimento especial para os pequenos com paciência, cuidado e muito carinho.',
    price: 'R$ 25',
    cents: ',00',
  },
];

const GALLERY = [
  { img: corte, label: 'Degradê Clássico' },
  { img: corte2, label: 'Low Fade' },
  { img: corte3, label: 'Risco + Fade' },
  { img: corte4, label: 'Pompadour + Linhas' },
  { img: corte, label: 'Degradê Moderno' },
  { img: corte2, label: 'Mid Fade' },
];

const NAV_LINKS = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
];

// ── HOOK: Scroll Reveal ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────────────────────
function scrollTo(href) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Scroll reveal
  useReveal();

  function closeDrawer() {
    setDrawerOpen(false);
  }

  function handleNavClick(href) {
    closeDrawer();
    scrollTo(href);
  }

  return (
    <>
      {/* ── HEADER ── */}
      <header className={scrolled ? 'scrolled' : ''}>
        <button
          className="logo"
          onClick={() => scrollTo('#hero')}
          aria-label="Ir para o início"
        >
          3 <span>Irmãos</span>
        </button>

        <nav className="desktop">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={`hamburger${drawerOpen ? ' open' : ''}`}
          onClick={() => setDrawerOpen((prev) => !prev)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ── OVERLAY ── */}
      <div
        className={`overlay${drawerOpen ? ' show' : ''}`}
        onClick={closeDrawer}
      />

      {/* ── MOBILE DRAWER ── */}
      <nav className={`drawer${drawerOpen ? ' open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-lines" />
        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span> Barbearia Premium
          </div>
          <h1 className="hero-title">
            Seu estilo
            <em>começa aqui.</em>
          </h1>
          <p className="hero-sub">
            Cortes modernos, atendimento de qualidade e profissionais especializados
            para valorizar sua aparência.
          </p>
          <div className="hero-btns">
            <a
              href="#contato"
              className="btn-gold"
              onClick={(e) => { e.preventDefault(); scrollTo('#contato'); }}
            >
              Agendar Horário
            </a>
            <a
              href="#servicos"
              className="btn-outline"
              onClick={(e) => { e.preventDefault(); scrollTo('#servicos'); }}
            >
              Ver Serviços
            </a>
          </div>
        </div>
        <div className="scroll-hint">Role para baixo</div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre">
        <div className="section-inner">
          <div className="sobre-grid">
            <div className="sobre-text reveal">
              <p className="eyebrow">Nossa História</p>
              <h2 className="section-title">
                Sobre a Barbearia<br />3 Irmãos
              </h2>
              <div className="section-divider" />
              <p>
                A Barbearia 3 Irmãos nasceu da paixão pela profissão e do compromisso
                em oferecer um atendimento de qualidade para todos os clientes. Nosso
                objetivo é proporcionar uma experiência diferenciada, unindo técnica,
                estilo e atenção aos detalhes.
              </p>
              <div className="stats">
                {[
                  { num: '+500', label: 'Clientes Atendidos' },
                  { num: '+3', label: 'Anos de Experiência' },
                  { num: '100%', label: 'Dedicação' },
                ].map((s) => (
                  <div className="stat-card" key={s.label}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sobre-visual reveal">
          
                <img className="sobre-img" src={faixada} alt="faixada" />
             
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUIPE ── */}
      <section id="equipe">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
            <p className="eyebrow">Profissionais</p>
            <h2 className="section-title">Conheça Nossa Equipe</h2>
            <div className="section-divider" style={{ margin: '0 auto' }} />
          </div>

          <div className="team-grid">
            {TEAM.map((member) => (
              <div className="team-card reveal" key={member.name}>
                <img
                  className="team-img"
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                />
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <p className="team-desc">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section id="servicos">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
            <p className="eyebrow">O que oferecemos</p>
            <h2 className="section-title">Nossos Serviços</h2>
            <div className="section-divider" style={{ margin: '0 auto' }} />
          </div>

          <div className="services-grid">
            {SERVICES.map((svc) => (
              <div className="service-card reveal" key={svc.name}>
                <div className="service-icon">{svc.icon}</div>
                <div className="service-name">{svc.name}</div>
                <p className="service-desc">{svc.desc}</p>
                <div className="service-price">
                  {svc.price}<span>{svc.cents}</span>
                </div>
                <button
                  className="btn-agendar"
                  onClick={() => window.open('https://wa.me/5500000000000', '_blank')}
                >
                  Agendar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIA ── */}
      <section id="galeria">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <p className="eyebrow">Portfólio</p>
            <h2 className="section-title">Alguns dos nossos trabalhos</h2>
            <div className="section-divider" style={{ margin: '0 auto' }} />
          </div>

          <div className="gallery-grid reveal">
            {GALLERY.map((item, i) => (
              <div className="gallery-item" key={i}>
                <img src={item.img} alt={item.label} loading="lazy" />
                <div className="gallery-overlay">
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section id="contato">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
            <p className="eyebrow">Agendamento</p>
            <h2 className="section-title">Escolha seu barbeiro</h2>
            <div className="section-divider" style={{ margin: '0 auto' }} />
          </div>

          <div className="contact-grid">
            {TEAM.map((member) => (
              <div className="contact-card reveal" key={member.name}>
                <img
                  className="contact-img"
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                />
                <div className="contact-info">
                  <div className="contact-name">{member.name}</div>
                  <div className="contact-role">{member.role}</div>
                  <div className="contact-socials">
                    <a href="#instagram">📸 {member.instagram}</a>
                    <a href="#whatsapp">💬 WhatsApp</a>
                  </div>
                  <a
                    href={`https://wa.me/${member.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp"
                  >
                    Agendar com {member.name.split(' ')[0]}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCALIZAÇÃO ── */}
      <section id="localizacao">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
            <p className="eyebrow">Venha nos visitar</p>
            <h2 className="section-title">Onde Estamos</h2>
            <div className="section-divider" style={{ margin: '0 auto' }} />
          </div>

          <div className="location-grid">
            <div className="location-card reveal">
              <div className="location-item">
                <div className="location-icon">📍</div>
                <div>
                  <div className="location-label">Endereço</div>
                  <div className="location-value">
                    Rua das Palmeiras, 123<br />
                    Centro — Osvaldo Cruz, SP
                  </div>
                </div>
              </div>
              <div className="location-item">
                <div className="location-icon">🕐</div>
                <div>
                  <div className="location-label">Horário de Funcionamento</div>
                  <div className="location-value">
                    Segunda a Sábado<br />09h00 às 20h00
                  </div>
                </div>
              </div>
              <div className="location-item">
                <div className="location-icon">📱</div>
                <div>
                  <div className="location-label">Telefone / WhatsApp</div>
                  <div className="location-value">(18) 99999-0000</div>
                </div>
              </div>
            </div>

            <div className="map-placeholder reveal">
              <span>🗺️</span>
              <p>Google Maps em breve</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta">
        <div className="section-inner reveal">
          <p className="eyebrow">Não espere mais</p>
          <h2 className="section-title">
            Pronto para renovar<br />seu visual?
          </h2>
          <div className="section-divider" style={{ margin: '0 auto' }} />
          <p>
            Agende seu horário e venha conhecer a Barbearia 3 Irmãos. Qualidade e
            estilo que você merece.
          </p>
          <a
            href="#contato"
            className="btn-gold"
            onClick={(e) => { e.preventDefault(); scrollTo('#contato'); }}
          >
            Agendar Agora
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <button
                className="logo"
                onClick={() => scrollTo('#hero')}
                style={{ marginBottom: '16px' }}
              >
                3 <span>Irmãos</span>
              </button>
              <p>
                Barbearia premium com profissionais especializados. Seu estilo é nossa
                missão.
              </p>
            </div>

            <div className="footer-col">
              <h4>Links Rápidos</h4>
              {[
                { label: 'Início', href: '#hero' },
                { label: 'Sobre', href: '#sobre' },
                { label: 'Serviços', href: '#servicos' },
                { label: 'Contato', href: '#contato' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="footer-col">
              <h4>Redes Sociais</h4>
              <div className="social-links">
                <a href="#instagram">📸 Instagram</a>
                <a href="#whatsapp">💬 WhatsApp</a>
                <a href="#facebook">📘 Facebook</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Barbearia 3 Irmãos. Todos os direitos reservados.</p>
            <p className="footer-craft">Feito com ✦ para os 3 Irmãos</p>
          </div>
        </div>
      </footer>
    </>
  );
}