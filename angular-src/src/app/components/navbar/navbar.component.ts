import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name: string;
  username: string;
  email: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.name = profile.userNoPW.name;
        this.username = profile.userNoPW.username;
        this.email = profile.userNoPW.email;
      }, (err) => {
        console.log(err);
        return false;
      }
    );
  }
  
  onLogoutClick(): void {
    this.authService.logout();
    Swal.fire({
      title: '로그아웃 성공!',
      icon: 'success',
      confirmButtonText: '확인',
    });
    this.router.navigate(['/']);
  }

  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

}
