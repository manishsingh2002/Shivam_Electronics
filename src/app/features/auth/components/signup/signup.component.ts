import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(private auth: AuthService) {}

  public signupdetails = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: '',
  };

  signUp() {
    this.auth.signUp(this.signupdetails).subscribe((response: any) => {
      console.log(response);
    });
  }
}
