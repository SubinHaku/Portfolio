const { useEffect, useLayoutEffect, useRef, useState } = React;

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const projects = [
  {
    name: 'Financial Platform UI/UX',
    org: 'Digihub',
    role: 'UI/UX Designer',
    type: 'Stock Market • TMS • PMS',
    summary:
      'A multi-layered investment and trading platform designed for complex data workflows, responsive decision-making, and high-trust financial experiences.',
    points: [
      'Translated business and analyst requirements into clear user flows, information architecture, and high-fidelity interfaces.',
      'Designed dashboards and workflows for stock market, trading management, and portfolio management systems used by active users.',
      'Balanced complex data density with usability, visual clarity, and responsive interactions across desktop and mobile experiences.',
    ],
    theme: 'financial',
    labels: ['Trading', 'Portfolio', 'Data visualisation'],
  },
  {
    name: 'E-commerce Website',
    org: 'Render Education Consultancy',
    role: 'Project Manager & UI/UX Designer',
    type: 'Catalogue • Cart • Checkout',
    summary:
      'A client-facing digital storefront designed to simplify browsing, selection, and check-out while keeping the project aligned across design and development.',
    points: [
      'Led the design and project coordination for a complete online commerce experience, including product browsing, cart and checkout flows.',
      'Created reusable UI patterns and wireframes that supported both stakeholder clarity and smooth frontend implementation.',
      'Facilitated communication between the client, design decisions, and development tasks to keep delivery on schedule.',
    ],
    theme: 'commerce',
    labels: ['E-commerce', 'UX flows', 'Coordination'],
  },
  {
    name: 'Chiva Chaitya',
    link: 'https://chivachaitya.org.np/',
    image: 'assets/chiva-chaitya.png',
    org: 'Cultural Heritage Platform',
    role: 'UX/UI Designer',
    type: 'Research • Design • Iteration',
    summary:
      'A heritage-focused platform exploring how cultural storytelling and digital interaction can create a more engaging and informative public experience.',
    points: [
      'Applied user research, persona-informed thinking, and iterative design improvements to shape a meaningful cultural experience.',
      'Focused on content hierarchy, discoverability, and accessibility so heritage stories remain clear, approachable, and engaging.',
      'Created a design direction that balanced editorial storytelling with practical usability and responsive presentation.',
    ],
    theme: 'heritage',
    labels: ['Research', 'Heritage', 'Iterative design'],
  },
];

const experience = [
  {
    role: 'Software Engineer Intern',
    company: 'RightFind Professionals',
    date: 'June 2025 – October 2025',
    bullets: [
      'Worked on Java-based development with focus on core programming, object-oriented design, and practical software engineering fundamentals.',
      'Implemented efficient algorithms, data structures, and maintainable application logic to support real business problem solving.',
      'Collaborated with senior engineers through code reviews and pair programming, strengthening enterprise development practices.',
    ],
  },
  {
    role: 'Programme Officer',
    company: 'Chiva Chaitya Organisation',
    date: 'October 2024 – June 2025',
    bullets: [
      'Managed organisational programmes and coordinated cross-functional initiatives to support strategic objectives and effective delivery.',
      'Used analytical and problem-solving approaches to improve workflows, communication, and overall operational effectiveness.',
      'Supported stakeholder engagement and communication planning to strengthen organisational impact and project alignment.',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'Digihub',
    date: 'September 2023 – July 2024',
    bullets: [
      'Designed user-centric interfaces for live financial platforms including stock market dashboards, TMS, and PMS tools used by active users.',
      'Worked closely with business analysts to convert complex requirements into intuitive solutions with market-facing usability.',
      'Created wireframes, prototypes, and high-fidelity mockups in Figma, using iterative review cycles and responsive design principles.',
    ],
  },
  {
    role: 'Project Manager & UI/UX Designer (Freelance)',
    company: 'Render Education Consultancy',
    date: 'November 2023 – December 2023',
    bullets: [
      'Led the end-to-end design and project management for an e-commerce website, coordinating between client stakeholders and developers.',
      'Designed user flows, UI components, and wireframes to support a functional storefront delivered on time.',
      'Facilitated daily stand-ups and sprint planning to keep design, frontend, and backend work aligned and clear.',
    ],
  },
  {
    role: 'UI/UX Designer Intern',
    company: 'Peace Nepal DOT Com',
    date: 'May 2023 – September 2023',
    bullets: [
      'Applied user-centred design methods including wireframing, prototyping, and usability testing to real-world digital projects.',
      'Conducted user research and developed early personas to inform product decisions and improve engagement.',
      'Collaborated with mentors to refine design process, information structure, and industry-aligned digital communication.',
    ],
  },
];

const skillGroups = [
  {
    title: 'Design',
    icon: 'design',
    skills: ['UI/UX Design', 'Wireframing', 'Prototyping', 'User Research', 'Usability Testing', 'Design Systems', 'Information Architecture', 'Interaction Design', 'Responsive Design'],
  },
  {
    title: 'Tools',
    icon: 'tools',
    skills: ['Figma', 'Adobe Illustrator'],
  },
  {
    title: 'Development',
    icon: 'development',
    skills: ['HTML', 'CSS', 'JavaScript', 'Java', 'MySQL'],
  },
  {
    title: 'Professional',
    icon: 'people',
    skills: ['Project Coordination', 'Stakeholder Communication', 'Cross-functional Collaboration', 'Problem Solving'],
  },
];

function CapabilityIcon({ name }) {
  const paths = {
    design: (
      <>
        <path d="m14.7 6.3 3 3" />
        <path d="m4 20 4.2-1 10.1-10.1a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" />
        <path d="M12 20h8" />
      </>
    ),
    tools: (
      <>
        <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3.8 17.2a2.1 2.1 0 0 0 3 3l4.5-4.5a5 5 0 0 0 6.4-6.4L14.5 12l-2.8-2.8 3-2.9Z" />
        <path d="m16.5 16.5 3 3" />
      </>
    ),
    development: (
      <>
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
        <path d="m14 4-4 16" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20v-1.5a5.5 5.5 0 0 1 11 0V20" />
        <path d="M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 3.5 4.8V20" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function ContactIcon({ name }) {
  const icons = {
    email: <path d="M3 6.5 12 13l9-6.5M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />,
    linkedin: (
      <>
        <path d="M8 10v7M8 7v.01M12 17v-4a3 3 0 0 1 6 0v4" />
        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      </>
    ),
    github: (
      <>
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13.2 13.2 0 0 0-6.9 0C5.5 1.2 4.3 1.6 4.3 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 8 18.1V22" />
      </>
    ),
    behance: <path d="M3 6h7a3 3 0 0 1 0 6H3V6Zm0 6h8a3.5 3.5 0 0 1 0 7H3v-7Zm12-5h6m-7 8h8a4 4 0 1 0-8 0 4 4 0 0 0 8 0h-8Z" />,
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

const education = [
  {
    degree: 'Master of Science in Information Technology',
    school: 'University of the West of Scotland',
    location: 'Glasgow, Scotland, United Kingdom',
    dates: 'January 2026 – Present',
    note: 'Expected graduation: February 2027.',
    image: 'UWS.png',
  },
  {
    degree: 'Bachelor of Information Management',
    school: 'Kathmandu Institute of Science and Technology',
    location: 'Kathmandu, Nepal',
    dates: 'September 2018 – 2023',
    note: 'First Class Honours, GPA: 3.25/4.0',
    image: 'kist college.jpg',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [experienceOpen, setExperienceOpen] = useState(false);
  const experienceDisclosureRef = useRef(null);

  useEffect(() => {
    const name = 'Subin Ratna Tuladhar';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setTypedName(name);
      return undefined;
    }

    let characterIndex = 0;
    let deleting = false;
    let typingTimeout;

    const animateName = () => {
      if (deleting) {
        characterIndex -= 1;
        setTypedName(name.slice(0, characterIndex));

        if (characterIndex === 0) {
          deleting = false;
          typingTimeout = window.setTimeout(animateName, 550);
        } else {
          typingTimeout = window.setTimeout(animateName, 45);
        }
        return;
      }

      characterIndex += 1;
      setTypedName(name.slice(0, characterIndex));

      if (characterIndex === name.length) {
        deleting = true;
        typingTimeout = window.setTimeout(animateName, 1500);
      } else {
        typingTimeout = window.setTimeout(animateName, 85);
      }
    };

    typingTimeout = window.setTimeout(animateName, 250);
    return () => window.clearTimeout(typingTimeout);
  }, []);

  useLayoutEffect(() => {
    const panel = experienceDisclosureRef.current;
    if (!panel) return undefined;

    const targetHeight = experienceOpen ? panel.scrollHeight : 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      panel.style.height = experienceOpen ? 'auto' : '0px';
      return undefined;
    }

    const startHeight = panel.getBoundingClientRect().height;
    const animation = panel.animate(
      [
        {
          height: `${startHeight}px`,
          opacity: experienceOpen ? 0 : 1,
          transform: experienceOpen ? 'translateY(-16px)' : 'translateY(0)',
        },
        {
          height: `${targetHeight}px`,
          opacity: experienceOpen ? 1 : 0,
          transform: experienceOpen ? 'translateY(0)' : 'translateY(-16px)',
        },
      ],
      {
        duration: 720,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards',
      }
    );

    animation.onfinish = () => {
      panel.style.height = experienceOpen ? 'auto' : '0px';
      animation.cancel();
    };

    return () => animation.cancel();
  }, [experienceOpen]);

  useEffect(() => {
    const updateTheme = () => {
      document.body.classList.toggle('scrolled', window.scrollY > 12);
      document.body.classList.toggle('has-hover', window.matchMedia('(hover: hover)').matches);
    };

    updateTheme();
    window.addEventListener('scroll', updateTheme);

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));

    const revealEls = document.querySelectorAll('.reveal, .scroll-reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      window.addEventListener('pointermove', (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
      });

      document.querySelectorAll('a, button, .project-card, .skill-tag').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.style.width = '22px';
          cursor.style.height = '22px';
        });

        el.addEventListener('mouseleave', () => {
          cursor.style.width = '14px';
          cursor.style.height = '14px';
        });
      });
    }

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('scroll', updateTheme);
    };
  }, []);

  const handleNavigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const toggleExperience = () => setExperienceOpen((isOpen) => !isOpen);

  return (
    <>
      <div className="custom-cursor" aria-hidden="true" />

      <header className="topbar">
        <nav className={`nav ${menuOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
          <button
            className="nav-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>

          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a className="nav-button" href="Subin_Ratna_Tuladhar.pdf" download>
            Resume
          </a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section reveal">
          <div>
            <p className="hero-name" aria-label="Subin Ratna Tuladhar">
              <span aria-hidden="true">{typedName}</span>
              <span className="hero-name__caret" aria-hidden="true" />
            </p>
            <span className="eyebrow">Product designer • Developer • Collaborator</span>
            <h1>
              Designing experiences.
              <br />
              Understanding technology.
              <br />
              Building what matters.
            </h1>
            <p>
              I&apos;m Subin — a multidisciplinary digital product designer with a background in UI/UX design, software development and product coordination.
            </p>
            <div className="hero__actions">
              <button className="button button--primary" type="button" onClick={() => handleNavigate('work')}>
                Explore my work
              </button>
              <button className="button button--secondary" type="button" onClick={() => handleNavigate('contact')}>
                Let&apos;s connect
              </button>
              <a className="button button--secondary" href="Subin_Ratna_Tuladhar.pdf" download>
                Resume download
              </a>
            </div>
            <div className="hero__meta">
              <div>Glasgow, Scotland</div>
              <div>Open to meaningful design opportunities</div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero-disciplines" aria-label="Design, development, and management experience">
              <span className="hero-discipline hero-discipline--design">
                <CapabilityIcon name="design" />
                Design
              </span>
              <span className="hero-discipline hero-discipline--development">
                <CapabilityIcon name="development" />
                Development
              </span>
              <span className="hero-discipline hero-discipline--management">
                <CapabilityIcon name="people" />
                Management
              </span>
            </div>
            <div className="profile-card">
              <img src="587817937_17973889187967118_1495142430447390821_n__1_-removebg-preview.png" alt="Portrait of Subin Ratna Tuladhar" />
            </div>
          </div>
        </section>

        <section id="about" className="section about reveal">
          <div className="section-head">
            <div>
              <span className="kicker">About</span>
              <h2 className="section-title">A product-minded designer with technical depth.</h2>
            </div>
          </div>

          <div className="story-grid">
            <div className="story-card scroll-reveal">
              <p>
                My professional journey began with a strong interest in information systems, design, and how technology can support people in their everyday decisions. Through my degree in Information Management, I developed an understanding of both technical systems and business needs. That foundation shaped the way I approach digital product design: combining clarity, structure, and empathy with practical implementation knowledge.
              </p>
              <div className="story-points">
                <div className="story-point">Design-led thinking grounded in user insight.</div>
                <div className="story-point">Technical awareness that supports better product decisions.</div>
                <div className="story-point">Collaborative process with people at the centre.</div>
                <div className="story-point">Continuous learning across product, design, and development.</div>
              </div>
            </div>

            <div className="story-card story-quote scroll-reveal">
              <div>
                <span className="kicker">Philosophy</span>
                <blockquote>“I believe great digital products happen when design, technology and people work together.”</blockquote>
              </div>
              <p>
                I enjoy understanding real problems, shaping intuitive experiences, and helping teams turn ideas into thoughtful, accessible digital solutions.
              </p>
            </div>
          </div>
        </section>

        <section id="work" className="section work reveal">
          <div className="section-head">
            <div>
              <span className="kicker">Selected work</span>
              <h2 className="section-title">Featured projects.</h2>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className="project-card scroll-reveal"
                key={project.name}
                style={{ '--reveal-delay': `${index * 120}ms` }}
              >
                <div className={`project-visual project-visual--${project.theme}`}>
                  <div className="project-visual__top">
                    <span className="project-tag">{project.type}</span>
                    <span className="project-index">0{projects.indexOf(project) + 1}</span>
                  </div>
                  {project.theme === 'financial' && (
                    <div className="artwork artwork--finance" aria-label="Conceptual financial platform visual">
                      <div className="finance-window">
                        <div className="finance-window__bar">
                          <span className="window-dots"><i /><i /><i /></span>
                          <span>MARKET OVERVIEW</span>
                          <span className="finance-live"><i /> LIVE</span>
                        </div>
                        <div className="finance-window__body">
                          <div className="finance-heading">
                            <span>Portfolio performance</span>
                            <b>Visual concept</b>
                          </div>
                          <div className="finance-chart">
                            <div className="finance-chart__lines"><i /><i /><i /></div>
                            <svg viewBox="0 0 520 140" preserveAspectRatio="none" aria-hidden="true">
                              <defs>
                                <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                                  <stop offset="0%" stopColor="#d9ff44" stopOpacity=".3" />
                                  <stop offset="100%" stopColor="#d9ff44" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <path d="M0 112 C42 103 43 77 86 85 S135 100 177 69 S223 83 263 49 S319 69 356 44 S401 54 438 26 S481 33 520 10 V140 H0 Z" fill="url(#chartFill)" />
                              <path d="M0 112 C42 103 43 77 86 85 S135 100 177 69 S223 83 263 49 S319 69 356 44 S401 54 438 26 S481 33 520 10" fill="none" stroke="#d9ff44" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                            </svg>
                          </div>
                          <div className="finance-footer">
                            <span>Stocks <i /></span>
                            <span>Trading <i /></span>
                            <span>Portfolio <i /></span>
                          </div>
                        </div>
                      </div>
                      <span className="artwork-caption">Conceptual visual · not a project screenshot</span>
                    </div>
                  )}
                  {project.theme === 'commerce' && (
                    <div className="artwork artwork--commerce" aria-label="Conceptual e-commerce storefront visual">
                      <div className="shop-window">
                        <div className="shop-window__bar">
                          <b>STUDIO / STORE</b>
                          <span>CATALOGUE　 BAG (0)</span>
                        </div>
                        <div className="shop-window__intro">
                          <span>CURATED FINDS</span>
                          <b>A little more<br />considered.</b>
                          <i>↗</i>
                        </div>
                        <div className="shop-products">
                          <div className="shop-product">
                            <div className="shop-product__image shop-product__image--one"><i /></div>
                            <span>OBJECT 01</span>
                          </div>
                          <div className="shop-product">
                            <div className="shop-product__image shop-product__image--two"><i /></div>
                            <span>OBJECT 02</span>
                          </div>
                          <div className="shop-product">
                            <div className="shop-product__image shop-product__image--three"><i /></div>
                            <span>OBJECT 03</span>
                          </div>
                        </div>
                      </div>
                      <span className="artwork-caption">Conceptual visual · not a project screenshot</span>
                    </div>
                  )}
                  {project.theme === 'heritage' && (
                    <div className="artwork artwork--heritage" aria-label="Chiva Chaitya identity and conceptual cultural heritage visual">
                      <span className="heritage-orbit heritage-orbit--one" />
                      <span className="heritage-orbit heritage-orbit--two" />
                      <div className="heritage-mark">
                        <img className="project-logo" src={project.image} alt="Chiva Chaitya logo" />
                      </div>
                      <div className="heritage-title">
                        <span>PLACE · MEMORY · CULTURE</span>
                        <b>Stories that<br />stay with us.</b>
                      </div>
                      <span className="artwork-caption">Conceptual visual · not a project screenshot</span>
                    </div>
                  )}
                </div>

                <div className="project-copy">
                  <h3>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <div className="project-meta">
                    <span>{project.org}</span>
                    <span>{project.role}</span>
                  </div>
                  <p>{project.summary}</p>
                  <ul>
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <aside className="upcoming-project scroll-reveal">
            <div className="upcoming-project__mark" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M24 42s14-13.2 14-24A14 14 0 1 0 10 18c0 10.8 14 24 14 24Z" />
                <circle cx="24" cy="18" r="5" />
                <path d="M3 42h42" />
              </svg>
            </div>
            <div className="upcoming-project__copy">
              <span className="upcoming-project__eyebrow">On the horizon · Upcoming project</span>
              <h3>FindmyPlace</h3>
              <p>
                An upcoming rental-platform concept focused on helping people find genuine, verified places to live with greater safety and confidence. Interested in the idea or exploring a collaboration? Send me a DM or an email.
              </p>
              <div className="upcoming-project__actions">
                <a href="https://linkedin.com/in/subinrat" target="_blank" rel="noreferrer">
                  DM me on LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a href="mailto:subinmain100@gmail.com?subject=FindmyPlace">
                  Send me an email <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <span className="upcoming-project__index" aria-hidden="true">IN PROGRESS</span>
          </aside>
        </section>

        <section id="experience" className="section experience reveal">
          <div className="section-head">
            <div>
              <span className="kicker">Experience</span>
              <h2 className="section-title">One journey, three perspectives.</h2>
            </div>
          </div>

          <aside
            className={`experience-intro ${experienceOpen ? 'is-open' : ''}`}
            role="button"
            tabIndex={0}
            aria-expanded={experienceOpen}
            aria-controls="experience-details"
            onClick={toggleExperience}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleExperience();
              }
            }}
          >
            <div className="experience-intro__copy">
              <span className="experience-intro__label">A note on my path · click to explore</span>
              <h3>Different roles. One intentional direction.</h3>
              <p>
                My experience in design, software development, and programme management isn’t a series of unrelated career moves. I’ve intentionally built a broader understanding of how digital products come together: understanding people and their needs, knowing how solutions are built, and helping teams deliver meaningful work.
              </p>
            </div>
            <div className="experience-pillars" aria-label="My experience across design, development, and management">
              <span>Design <b>01</b></span>
              <span>Development <b>02</b></span>
              <span>Management <b>03</b></span>
              <span className="experience-toggle" aria-hidden="true">
                {experienceOpen ? 'Hide experience' : 'View experience'}
                <b className="experience-toggle__icon">↓</b>
              </span>
            </div>
          </aside>

          <div
            className={`experience-disclosure ${experienceOpen ? 'is-open' : ''}`}
            id="experience-details"
            aria-hidden={!experienceOpen}
            ref={experienceDisclosureRef}
          >
            <div className="experience-disclosure__inner">
              <div className="experience-list">
                {experience.map((role, index) => (
                  <article
                    className="experience-item scroll-reveal"
                    key={`${role.company}-${role.role}`}
                    style={{ '--reveal-delay': `${index * 100}ms` }}
                  >
                    <div className="experience-top">
                      <h3 className="experience-role">{role.role}</h3>
                      <span className="experience-date">{role.date}</span>
                    </div>
                    <p className="experience-company">{role.company}</p>
                    <ul>
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills reveal">
          <div className="section-head">
            <div>
              <span className="kicker">Capabilities</span>
              <h2 className="section-title">Design, development and delivery.</h2>
            </div>
          </div>

          <div className="skills-wrap">
            {skillGroups.map((group, index) => (
              <article
                className={`skill-card skill-card--${group.icon}`}
                key={group.title}
                style={{ '--skill-delay': `${index * -1.7}s` }}
              >
                <div className="skill-card__heading">
                  <span className="skill-icon">
                    <span className="skill-icon__orbit" />
                    <CapabilityIcon name={group.icon} />
                  </span>
                  <h3>{group.title}</h3>
                </div>
                <span className="skill-card__rule" />
                <div className="skill-tags">
                  {group.skills.map((skill, skillIndex) => (
                    <span
                      className="skill-tag"
                      key={skill}
                      style={{ '--tag-delay': `${skillIndex * 0.06}s` }}
                    >
                      <CapabilityIcon name={group.icon} />
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section education reveal">
          <div className="section-head">
            <div>
              <span className="kicker">Education</span>
              <h2 className="section-title">Academic foundation.</h2>
            </div>
          </div>

          <div className="education-grid">
            {education.map((item) => (
              <article className="edu-card" key={item.degree}>
                <img src={item.image} alt={`${item.school} logo`} />
                <h3>{item.degree}</h3>
                <p className="edu-meta">
                  {item.school} • {item.location}
                </p>
                <ul>
                  <li>{item.dates}</li>
                  <li>{item.note}</li>
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact reveal">
          <div className="contact-wrap scroll-reveal">
            <div className="contact-copy">
              <span className="kicker">Contact</span>
              <h2 className="section-title">Have something interesting in mind?</h2>
              <p>
                I&apos;m always interested in meaningful projects, creative collaborations and opportunities to build better digital experiences.
              </p>
            </div>

            <div className="contact-cta">
              <ul className="contact-list">
                <li className="contact-item">
                  <a href="mailto:subinmain100@gmail.com">
                    <span className="contact-icon"><ContactIcon name="email" /></span>
                    <span>subinmain100@gmail.com</span>
                  </a>
                </li>
                <li className="contact-item">
                  <a href="https://linkedin.com/in/subinrat" target="_blank" rel="noreferrer">
                    <span className="contact-icon"><ContactIcon name="linkedin" /></span>
                    <span>LinkedIn</span>
                    <span className="contact-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
                <li className="contact-item">
                  <a href="https://github.com/SubinHaku" target="_blank" rel="noreferrer">
                    <span className="contact-icon"><ContactIcon name="github" /></span>
                    <span>GitHub</span>
                    <span className="contact-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
                <li className="contact-item">
                  <a href="https://www.behance.net/gallery/242948817/Inventory-Management-System" target="_blank" rel="noreferrer">
                    <span className="contact-icon"><ContactIcon name="behance" /></span>
                    <span>Behance</span>
                    <span className="contact-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
                <li className="contact-item contact-item--location">
                  <span className="contact-location">
                    <span className="contact-icon"><ContactIcon name="location" /></span>
                    <span>Glasgow, Scotland</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>© 2026 Subin Ratna Tuladhar</div>
        <div className="footer-links">
          <button type="button" className="nav-link" onClick={() => handleNavigate('about')}>About</button>
          <button type="button" className="nav-link" onClick={() => handleNavigate('work')}>Work</button>
          <button type="button" className="nav-link" onClick={() => handleNavigate('contact')}>Contact</button>
        </div>
      </footer>

      <button type="button" className="scroll-top" aria-label="Back to top" onClick={() => handleNavigate('home')}>
        ↑
      </button>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
