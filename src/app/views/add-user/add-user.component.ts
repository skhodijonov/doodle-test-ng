import {ChangeDetectionStrategy, Component, Inject, OnDestroy} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, Subscription} from 'rxjs';
import {cleanSub} from '../../core/helpers/subscription.helper';
import {HighlightDirective} from '../../shared/directives/highlight.directive';
import {IDataConfig} from '../../core/interfaces/data-config.interface';
import {LocalStorageService} from '../../core/services/data.service';
import {DATA_CONFIG} from '../../app.config';
import {IUser} from '../../core/interfaces/user.interface';

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
    @Inject(DATA_CONFIG) private _dataConfig: IDataConfig,
    private _fb: FormBuilder,
    private _lsService: LocalStorageService,
    private _router: Router,
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
    if (this.userForm?.valid) {
      const data = <IUser[]>this._lsService.getData(this._dataConfig.key) || [];
      data.push(this.userForm.value);
      this._lsService.saveData(this._dataConfig.key, data);
      this._router.navigate([`details/${data.length - 1}`]).catch((e) => console.error(e));
    }
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
