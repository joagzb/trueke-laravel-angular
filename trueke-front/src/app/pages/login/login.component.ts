import { Component, Input, OnInit } from '@angular/core';
import {RegisterComponent} from './components/register/register.component.js';
import {SigninComponent} from './components/signin/signin.component.js';
import {ActivatedRoute, Router} from '@angular/router';
import {routesSchema} from '../../config/routes.schema.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent,SigninComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  registerNew: boolean = false;

  constructor(private router: Router){}

  ngOnInit() {
    this.registerNew = this.router.url.includes(routesSchema.auth.register);
  }

  changeActiveCard(flag: boolean){
    this.registerNew = flag;
  }
}
