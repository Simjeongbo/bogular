import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }

  onRegisterSubmit(): any {
    // Confirm passwords
    if (this.password1 !== this.password2) {
      Swal.fire({
        title: '회원가입 실패! ',
        text: '패스워드가 다릅니다. 다시 입력하세요',
        icon: 'error',
        confirmButtonText: '확인',
      });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(this.email)) {
      Swal.fire({
        title: '회원가입 실패! ',
        text: '이메일 주소가 올바르지 않습니다',
        icon: 'error',
        confirmButtonText: '확인',
      });
      return false;
    }

    // 사용자 정보의 JSON 객체 생성
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password1,
    };

    //모든 필드가 입력되었는지 검증
    if (!this.validateService.validateRegister(user)) {
      Swal.fire({
        title: '회원가입 실패!',
        text: '모든 필드를 입력하세요',
        icon: 'error',
        confirmButtonText: '확인',
      });
      return false;
    }
        
    // Register User
    // 서버에 사용자 등록 요청/응답
    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        Swal.fire({
          title: '회원가입 성공! ',
          icon: 'success',
          text: data.msg,
          confirmButtonText: '확인',
        });
        this.router.navigate(['/login']);
      } else {
        Swal.fire({
          title: '회원가입 실패! ',
          text: data.msg,
          icon: 'error',
          confirmButtonText: '확인',
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
