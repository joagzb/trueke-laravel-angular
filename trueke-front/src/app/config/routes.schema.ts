export const routesSchema = {
  home: 'home',
  user: 'user/:userID',
  listings: {
    byUser: 'user/:userID/listings',
    detail: 'listings/:postID/detail',
    new: 'listings/new',
    update: 'listings/:postID/edit',
  },
  pieces: 'user/:userID/pieces',
  exchanges: 'exchanges',
  offers: {
    all: 'listings/:postID/offers',
    byUser: 'user/:userID/offers',
    detail: 'listings/:postID/offers/:offerID/details',
    new: 'listings/:postID/offers/new',
    update: 'listings/:postID/offers/:offerID/edit',
  },
  matching: 'matching/:postID',
  trueke: 'trueke',
  contact: 'contact',
  auth: {
    signin: 'login',
    register: 'register',
  },
  notFound: 'notfound'
};
