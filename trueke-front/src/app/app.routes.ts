import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component.js';
import {ContactComponent} from './pages/contact/contact.component.js';
import {MatchingComponent} from './pages/matching/matching.component.js';
import {OfferingComponent} from './pages/offers/offering.component.js';
import {ExchangeComponent} from './pages/exchange/exchange.component.js';
import {ListingsComponent} from './pages/listings/listings.component.js';
import {HomeComponent} from './pages/home/home.component.js';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component.js';
import {routesSchema} from './config/routes.schema.js';
import {isSignedInGuard} from './guards/is-signed-in.guard.js';
import {PiecesComponent} from './pages/pieces/pieces.component.js';
import {NewListingComponent} from './pages/listings/new-listing/new-listing.component.js';
import {ListingDetailsComponent} from './pages/listings/listing-details/listing-details.component.js';
import {ProfileComponent} from './pages/profile/profile.component.js';

export const routes: Routes = [
  {path: '', redirectTo: routesSchema.home, pathMatch: 'full'},
  {path: 'index', redirectTo: routesSchema.home, pathMatch: 'full'},
  {path: routesSchema.home, component: HomeComponent},
  {path: routesSchema.listings.byUser, component: ListingsComponent, canActivate: [isSignedInGuard]},
  {path: routesSchema.listings.detail, component: ListingDetailsComponent},
  {path: routesSchema.listings.new, component: NewListingComponent, canActivate: [isSignedInGuard]},
  {path: routesSchema.listings.update, component: NewListingComponent, canActivate: [isSignedInGuard]},
  {path: routesSchema.pieces, component: PiecesComponent, canActivate: [isSignedInGuard]},
  {path: routesSchema.exchanges, component: ExchangeComponent, canActivate: [isSignedInGuard]},
  {path: routesSchema.offers.byUser, component: OfferingComponent, canActivate: [isSignedInGuard]},
  {path: routesSchema.matching, component: MatchingComponent, canActivate: [isSignedInGuard]},
  {path: routesSchema.user, component: ProfileComponent, canActivate: [isSignedInGuard]},
  {path: routesSchema.contact, component: ContactComponent},
  {path: routesSchema.auth.signin, component: LoginComponent},
  {path: routesSchema.auth.register, component: LoginComponent},
  {path: '**', component: PageNotFoundComponent} // Wildcard route for a 404 page
];
