import * as packageJSON from '../../package.json';

export const environment = {
  production: false,
  cli: true,
  environmentName: 'dev',
  apiUrl: 'http://localhost:8000/api',
  frontendUrl: 'http://localhost:4200',

  //contact details
  author: {
    name: packageJSON.author.name || 'Joaquin Gonzalez Budino',
    bio: 'Fullstack developer proficient in Angular, Laravel, Node.js, and Flutter. Recognized for delivering quick software solutions and high-quality code through a strong work ethic and commitment, attracting new clients.',
    imageURL: 'https://avatars.githubusercontent.com/u/45859756?v=4',
    socialLinks: {
      portfolioURL: packageJSON.author.url,
      githubURL: packageJSON.author.github,
      linkedinURL: packageJSON.author.linkedin
    },
    techStack: ['Laravel','PHP','Angular','Nodejs','Javascript'],
  }

};
