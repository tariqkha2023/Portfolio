const ACCENTS = ['project-one', 'project-two', 'project-three']

export default function ProjectCard({ project, index = 0 }) {
  const accent = ACCENTS[index % ACCENTS.length]
  const tags = (project.tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  return (
    <article className="project-card">
      <div className={`project-image ${accent}`}>
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} />
        ) : (
          <span>&lt;/&gt;</span>
        )}
      </div>

      <div className="project-content">
        <p className="project-number">
          PROJECT {String(index + 1).padStart(2, '0')}
        </p>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        {tags.length > 0 && (
          <div className="tags">
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}

        {project.link ? (
          <a
            className="project-link"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            View Project →
          </a>
        ) : (
          <span className="project-link">Coming soon</span>
        )}
      </div>
    </article>
  )
}
