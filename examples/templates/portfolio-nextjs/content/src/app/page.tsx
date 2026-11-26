
"use client";

import { useState } from "react";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "Spring Boot",
  "Docker",
  "Kubernetes",
  "Git",
  "Jenkins",
  "Ansible",
  "Linux",
  "GitHub Actions",
];

const projects = [
  {
    number: "01",
    title: "Cloud Infrastructure Automation",
    category: "DevOps & Cloud",
    description:
      "Infrastructure automation and deployment workflows using modern DevOps tools.",
    technologies: ["Docker", "Ansible", "Linux"],
    link: "https://github.com/",
  },
  {
    number: "02",
    title: "Smart Campus Platform",
    category: "Full Stack Development",
    description:
      "A service platform designed to simplify interactions within a university campus.",
    technologies: ["Java", "Spring Boot", "React"],
    link: "https://github.com/",
  },
  {
    number: "03",
    title: "Kubernetes Deployment",
    category: "Container Orchestration",
    description:
      "Containerized application deployment and orchestration in a multi-node cluster.",
    technologies: ["Kubernetes", "Docker", "YAML"],
    link: "https://github.com/",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main className={darkMode ? "site dark" : "site light"}>
      <header className="navbar">
        <a href="#home" className="logo">
          Portfolio<span>.</span>
        </a>

        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle color theme"
        >
          {darkMode ? "Light mode" : "Dark mode"}
        </button>
      </header>

      <section id="home" className="hero section-container">
        <div className="hero-content">
          <p className="eyebrow">DEVELOPER PORTFOLIO</p>

          <h1>
            Building digital
            <br />
            experiences with
            <br />
            <span>purpose.</span>
          </h1>

          <p className="hero-description">
            I am a software developer interested in building reliable
            applications, automating infrastructure, and exploring cloud
            technologies.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="primary-button">
              Explore my work
            </a>
            <a href="#contact" className="secondary-button">
              Contact me
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-decoration">{"</>"}</div>
          <p className="card-label">CURRENT FOCUS</p>
          <h2>Software Engineering</h2>
          <div className="focus-item">01 / Application Development</div>
          <div className="focus-item">02 / DevOps & Cloud</div>
          <div className="focus-item">03 / Automation</div>
          <div className="availability">
            <span className="availability-dot" />
            Open to opportunities
          </div>
        </div>
      </section>

      <section id="about" className="section-container content-section">
        <p className="eyebrow">01 / ABOUT ME</p>
        <h2 className="section-title">Turning ideas into solutions.</h2>

        <div className="about-grid">
          <p className="about-lead">
            I enjoy combining software development and infrastructure
            engineering to create practical, maintainable solutions.
          </p>

          <div className="about-details">
            <p>
              My interests include modern web development, cloud computing,
              containerization, automation, and continuous integration and
              delivery.
            </p>
            <p>
              I believe in continuous learning, collaboration, and writing
              software that solves real problems.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="section-container content-section">
        <p className="eyebrow">02 / TECHNICAL SKILLS</p>
        <h2 className="section-title">Tools of my trade.</h2>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-item" key={skill}>
              <span className="skill-marker">+</span>
              {skill}
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section-container content-section">
        <p className="eyebrow">03 / SELECTED WORK</p>
        <h2 className="section-title">Projects and experiments.</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-top">
                <span>{project.number}</span>
                <span>{project.category}</span>
              </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="technology-list">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                View project ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-container contact-section">
        <p className="eyebrow">04 / GET IN TOUCH</p>
        <h2>Have a project in mind?</h2>
        <p>
          I am interested in meaningful projects, technical discussions, and
          opportunities to collaborate.
        </p>

        <a href="mailto:hello@example.com" className="primary-button">
          Send me an email
        </a>
      </section>

      <footer className="footer">
        <span>Developer Portfolio</span>
        <span>Built with Next.js and TypeScript</span>
      </footer>
    </main>
  );
}
