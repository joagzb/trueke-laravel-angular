// Static metadata to avoid depending on package.json at runtime

export const environment = {
  production: false,
  cli: true,
  environmentName: 'dev',
  apiUrl: 'http://localhost:8000/api',
  frontendUrl: 'http://localhost:4200',

  // contact details
  author: {
    name: 'Joaquin Gonzalez Budino',
    bio: 'Fullstack developer proficient in Angular, Laravel, Node.js, and Flutter. Recognized for delivering quick software solutions and high-quality code through a strong work ethic and commitment, attracting new clients.',
    imageURL: 'https://avatars.githubusercontent.com/u/45859756?v=4',
    socialLinks: {
      portfolioURL: 'https://joagzb.notion.site/Joaquin-s-Portfolio-a90cb2e35b3b41baa73489b26ffa1461?pvs=4',
      githubURL: 'https://github.com/joagzb',
      linkedinURL: 'http://linkedin.com/in/joaquin-gonzalez-budino'
    },
    techStack: [
      'Laravel',
      'PHP',
      'Angular',
      'Nodejs',
      'Javascript'
    ],
  }

};
