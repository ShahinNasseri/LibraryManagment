import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddNewAdminRequest, AdminManagmentApiService } from '@core/api/admin-managment';
import { AlertService, AlertType } from '@core/general/services/alert.service';
import { AutocompleteOffDirective } from '@shared/directives/autocomplete-off.directive';
import { take } from 'rxjs';

const Modules: any[] = [
  MatInputModule,
  MatCheckboxModule,
  MatCardModule,
  MatButtonModule,
  CommonModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatIconModule,
  AutocompleteOffDirective,
];

@Component({
  selector: 'app-admin-managment-save',
  standalone: true,
  imports: [...Modules],
  templateUrl: './admin-managment-save.component.html',
  styleUrl: './admin-managment-save.component.scss',
})
export class AdminManagmentSaveComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() comelete: EventEmitter<any> = new EventEmitter<any>();

  entityForm: FormGroup;

  _adminManagmentApiService = inject(AdminManagmentApiService);
  _alertService = inject(AlertService);
  _dialogRef = inject(MatDialogRef<AdminManagmentSaveComponent>);


  constructor(private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      registerFullName: ['', Validators.required],
      registerEmail: ['', [Validators.required, Validators.email]],
      registerUsername: ['', Validators.required],
      registerPassword: ['', Validators.required],
      isActive: [false],
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

  onSubmit() {
    if (this.entityForm.valid) {
      const sendModel = new AddNewAdminRequest();
      sendModel.email = this.entityForm.get('registerEmail')?.value;
      sendModel.fullName = this.entityForm.get('registerFullName')?.value;
      sendModel.username = this.entityForm.get('registerUsername')?.value;
      sendModel.isActive = this.entityForm.get('isActive')?.value;
      sendModel.password = this.entityForm.get('registerPassword')?.value;
      this._adminManagmentApiService
        .insertAdmin(sendModel)
        .pipe(take(1))
        .subscribe(res => {
          this._alertService.notify(AlertType.success, 'User is Added Successfully');
        });
    }
  }
}
