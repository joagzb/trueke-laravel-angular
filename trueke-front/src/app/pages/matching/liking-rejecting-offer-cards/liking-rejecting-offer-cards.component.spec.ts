import { LikingRejectingOfferCardsComponent } from './liking-rejecting-offer-cards.component';
import { OfferService } from '../../../services/offer.service';
import { IOffer } from '../../../models/offer';

describe('LikingRejectingOfferCardsComponent', () => {
  it('emits liked offers when finishLikingAndRejecting is called', () => {
    const component = new LikingRejectingOfferCardsComponent({} as OfferService);
    const liked: IOffer = { id: '1', user: {} as any, post: {} as any, pieces: [], message: '', isLiked: true };
    const notLiked: IOffer = { id: '2', user: {} as any, post: {} as any, pieces: [], message: '', isLiked: false };
    component.viewedOffers = [liked, notLiked];

    let emitted: IOffer[] | undefined;
    component.onFinishLiking.subscribe(offers => (emitted = offers));

    component.finishLikingAndRejecting();

    expect(emitted).toEqual([liked]);
  });
});
