import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, Subscription} from 'rxjs';
import {cleanSub} from '../../core/helpers/subscription.helper';
import {HighlightDirective} from '../../shared/directives/highlight.directive';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HighlightDirective,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent implements OnDestroy {
  userForm: FormGroup;
  validationMessage?: string;

  private _changesSub?: Subscription;

  constructor(
    private _fb: FormBuilder,
  ) {
    this.userForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.email],
      age: ['', Validators.min(0)]
    });
    this._subscribeToNameChanges();
  }

  onSubmit() {
  }

  /**
   * 3. Создание формы с отложенной валидацией
   * Задача: Реализуйте форму, где валидация выполняется не сразу,
   * а после определенного времени (например, 500 мс) после последнего изменения в поле ввода.
   * Используйте debounceTime для оптимизации.
   */
  private _subscribeToNameChanges() {
    const firstNameControl = this.userForm.get('firstName');
    if (!firstNameControl) {
      return;
    }
    this._changesSub = firstNameControl?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        if (firstNameControl?.invalid && (firstNameControl.dirty || firstNameControl.touched)) {
          if (firstNameControl.errors?.['required']) {
            this.validationMessage = 'First Name is required';
          } else if (firstNameControl.errors?.['minlength']) {
            this.validationMessage = 'First Name must be at least 3 characters long';
          }
        } else {
          this.validationMessage = '';
        }
      });
  }

  ngOnDestroy() {
    cleanSub(this._changesSub);
  }
}
