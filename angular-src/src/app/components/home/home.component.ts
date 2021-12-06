import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  display='none';
  opacity= 'none'; 
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    
  }

  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
  
  openModal(){
    this.display='block';
  }
  onCloseHandled(){
    this.display='none';
  }

  openModal1(){
    this.opacity= 'block'; 
  }
  onCloseHandled1(){
    this.opacity='none';
  }
}
