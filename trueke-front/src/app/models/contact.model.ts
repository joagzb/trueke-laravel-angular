import {environment} from "../../environments/environment.development.js";

export const authorData = {
  social: {
    githubURL: environment.author.socialLinks.githubURL,
    portfolioURL: environment.author.socialLinks.portfolioURL,
    linkedinURL: environment.author.socialLinks.linkedinURL
  },
  imageURL: environment.author.imageURL || 'https://avatars.githubusercontent.com/u/45859756?v=4',
  author: environment.author.name || 'Joaquin Gonzalez Budino',
  bio: environment.author.bio || 'SOFTWARE ENGINEER | Nodejs | Angular | PHP Laravel | AWS | Microservices',
  technologies: environment.author.techStack,
};
