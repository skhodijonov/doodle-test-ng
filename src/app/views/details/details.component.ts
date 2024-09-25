import {Component, Inject, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {LocalStorageService} from '../../core/services/data.service';
import {DATA_CONFIG} from '../../app.config';
import {IDataConfig} from '../../core/interfaces/data-config.interface';
import {IUser} from '../../core/interfaces/user.interface';
import {cleanSub} from '../../core/helpers/subscription.helper';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnDestroy {
  detailsData?: IUser;
  private readonly _routeSub?: Subscription;

  constructor(
    @Inject(DATA_CONFIG) private _dataConfig: IDataConfig,
    private _lsService: LocalStorageService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._routeSub = this._route.params
      .subscribe((params) => {
        const index = +params['idx'];
        this.detailsData = this._getDataByIndex(index)
        if (!this.detailsData) {
          this._router.navigate(['/not-found']).catch((e) => console.error(e));
        }
      });
  }

  ngOnDestroy() {
    cleanSub(this._routeSub);
  }

  private _getDataByIndex(index: number): any {
    if (isNaN(index)) {
      return null;
    }
    const data = this._lsService.getData(this._dataConfig.key);
    return (data)?.[index];
  }
}
