import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Email } from './../email';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  emailForm: FormGroup;
  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter();
  constructor() {}

  ngOnInit() {
    const { subject, from, text, to } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      text: new FormControl(text, [Validators.required]),
      subject: new FormControl(subject, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    } else {
      this.emailSubmit.emit(this.emailForm.value);
    }
  }
}
