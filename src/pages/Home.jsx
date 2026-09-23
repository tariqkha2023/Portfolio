import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ProjectCard from '../components/ProjectCard'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function load() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (!active) return

      if (error) {
        setError(error.message)
      } else {
        setProjects(data ?? [])
      }

      setLoading(false)
    }

    load()

    return () => {
      active = false
    }
  }, [])

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="hero" id="home">
        <div className="hero-text">
          <p className="hello">👋 Hello! I'm</p>

          <h1>
            Tariq <span>Khan</span>
          </h1>

          <h2>Developer &amp; Problem Solver</h2>

          <p className="hero-description">
            I build modern web applications and interactive digital
            experiences with clean design and functional solutions.
          </p>

          <div className="hero-buttons">
            <a href="/#projects" className="btn primary-btn">
              View My Work
            </a>

            <a href="/#contact" className="btn secondary-btn">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-window">
            <div className="window-top">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>

            <div className="code">
              <p>
                <span className="purple">const</span>
                <span className="blue"> developer</span> = {'{'}
              </p>

              <p className="indent">
                name: <span className="green">"Tariq Khan"</span>,
              </p>

              <p className="indent">
                role: <span className="green">"Developer"</span>,
              </p>

              <p className="indent">
                passion: <span className="green">"Building Solutions"</span>
              </p>

              <p>{'};'}</p>
            </div>
          </div>

          <div className="floating-icon icon-one">&lt;/&gt;</div>
          <div className="floating-icon icon-two">{'{ }'}</div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="section" id="about">
        <p className="section-small-title">A little about me</p>
        <h2 className="section-title">Who am I?</h2>

        <div className="about-container">
          <div className="about-number">01</div>

          <div className="about-text">
            <h3>I love turning ideas into applications.</h3>

            <p>
              I'm Tariq Khan, a developer who enjoys learning new
              technologies and creating modern digital experiences.
            </p>

            <p>
              I enjoy solving problems and transforming ideas into clean,
              functional, and user-friendly applications.
            </p>

            <p>
              I'm developing my skills in HTML, CSS, JavaScript, React,
              Python, databases, Git, and other modern technologies.
            </p>

            <a href="/#skills" className="text-link">
              See my skills →
            </a>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="section projects-section" id="projects">
        <p className="section-small-title">Things I've built</p>
        <h2 className="section-title">Featured Projects</h2>

        {loading && (
          <p className="project-status">Loading projects...</p>
        )}

        {error && (
          <p className="project-status">{error}</p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="project-status">
            No projects yet. Log in as the owner to add the first one.
          </p>
        )}

        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="section" id="skills">
        <p className="section-small-title">My toolbox</p>
        <h2 className="section-title">Skills &amp; Technologies</h2>

        <div className="skills-container">
          <div className="skill-card">
            <span>01</span>
            <h3>HTML</h3>
            <p>Structure</p>
          </div>

          <div className="skill-card">
            <span>02</span>
            <h3>CSS</h3>
            <p>Styling</p>
          </div>

          <div className="skill-card">
            <span>03</span>
            <h3>JavaScript</h3>
            <p>Interaction</p>
          </div>

          <div className="skill-card">
            <span>04</span>
            <h3>React</h3>
            <p>Frontend</p>
          </div>

          <div className="skill-card">
            <span>05</span>
            <h3>Python</h3>
            <p>Programming</p>
          </div>

          <div className="skill-card">
            <span>06</span>
            <h3>GitHub</h3>
            <p>Version Control</p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <p className="section-small-title">Get In Touch</p>

          <h2>
            Let's build something
            <span> great together.</span>
          </h2>

          <p className="contact-description">
            Have a question, project idea, or opportunity? Send me a message
            using the form below.
          </p>

          <form
            className="contact-form"
            action="https://formspree.io/f/xbgloney"
            method="POST"
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>

                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="John Smith"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Your Email</label>

                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>

              <input
                type="text"
                id="contact-subject"
                name="subject"
                placeholder="Project inquiry"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>

              <textarea
                id="contact-message"
                name="message"
                rows="6"
                placeholder="Tell me about your project..."
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-submit">
              Send Message →
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <a href="/#home" className="footer-logo">
          TK<span>.</span>
        </a>

        <p>Designed &amp; built by Tariq Khan</p>

        <div className="social-links">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a href="/#contact">Contact</a>
        </div>
      </footer>
    </main>
  )
}
