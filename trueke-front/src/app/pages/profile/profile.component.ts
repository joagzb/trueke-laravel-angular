import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service.js';
import { getUserResponse } from '../../models/user.js';
import { ActivatedRoute, Router } from '@angular/router';
import { routesSchema } from '../../config/routes.schema.js';
import { AuthService } from '../../services/auth.service.js';
import { ShowProfileCardComponent } from './show-profile-card/show-profile-card.component.js';
import { EditProfileCardComponent } from './edit-profile-card/edit-profile-card.component.js';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ShowProfileCardComponent, EditProfileCardComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: getUserResponse | undefined;
  canUpdate = false;
  isEditCardShown = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userID = this.activeRoute.snapshot.paramMap.get('userID');

    if (userID) {
      this.fetchUserProfile(Number.parseInt(userID));
    } else {
      this.router.navigate([routesSchema.notFound]);
    }
  }

  private fetchUserProfile(userID: number): void {
    this.canUpdate = this.checkProfileBelongsToCurrentUser(userID);
    this.userService.getByID(userID).subscribe({
      next: (data: getUserResponse) => this.user = data,
      error: (error) => console.log('cant get user',error)
    });
  }

  private checkProfileBelongsToCurrentUser(id: number): boolean {
    return this.authService.currentUser.id === id;
  }

  showEditCard(flag: boolean): void {
    this.isEditCardShown = flag;
  }
}
