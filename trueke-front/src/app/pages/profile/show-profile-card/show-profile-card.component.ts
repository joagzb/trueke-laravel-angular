import { Component, EventEmitter, Input, Output } from '@angular/core';
import {getUserResponse} from '../../../models/user.js';
import {routesSchema} from '../../../config/routes.schema.js';
import {NavigationService} from '../../../services/navigation.service.js';

@Component({
  selector: 'show-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './show-profile-card.component.html',
  styleUrls: ['./show-profile-card.component.scss']
})
export class ShowProfileCardComponent {
  @Input() user!: getUserResponse;
  @Input() canUpdate = false;
  @Output() showEditProfileTrigger = new EventEmitter<void>();
  userDetails = {
    truekesCount: 0,
    postsCount: 0,
  };

  constructor(private navigationService: NavigationService){}

  onUpdateProfileBtnClick(){
    this.showEditProfileTrigger.emit();
  }

  viewUserListings() {
    const updatedRoute = routesSchema.listings.byUser.replace(':userID', this.user.id.toString());
    this.navigationService.navigateTo(updatedRoute);
  }
}
