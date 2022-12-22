import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  submitted = true;
  value: any;
  public isChecked: boolean = false;
  public showPassword = false;
  public showConfirmPassword = false;
  user = []

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  this.createForm();
  }

  public createForm(){
    this.registerForm = this.formBuilder.group({
      confirmPassword: ['', Validators.required],
      title: ['', Validators.required],
      acceptValidators: [false, Validators.required],
      firstName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.required],
      lastName: [null],

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  public passwordText='password';
  public displayPassword(){
    this.showPassword=!this.showPassword
    this.passwordText = this.showPassword ? 'text':'password';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  data: any[] = [];


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.isChecked);
        return;
    }
    else{
    // display form values on success
    console.log(this.registerForm.value);
    this.user.push(this.registerForm.value);
    this.createForm()
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  public bVal: boolean = false;
  onClick(event) {
    this.isChecked = event.target.checked;
      console.log(event)
      console.log(this.isChecked);
      if(event.target.checked){
        console.log(event.target.checked);
        this.registerForm.controls['lastName'].setValidators([Validators.required]); // 5.Set Required Validator
        this.registerForm.controls['lastName'].updateValueAndValidity();
    }else{
      // this.registerForm.controls['lastName'].setValidators([Validators.required]); // 5.Set Required Validator
        this.registerForm.controls['lastName'].removeValidators([Validators.required]);
        this.registerForm.controls['lastName'].updateValueAndValidity();

    }
  }

  // label: string;
  // onChange(isChecked) {
  //   this.value = isChecked;
  //   this.getChange.emit(this.isChecked);
  //   this.onChangeCallback(this.value);
  // }



}
