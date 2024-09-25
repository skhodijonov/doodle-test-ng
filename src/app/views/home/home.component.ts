import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {IUser} from '../../core/interfaces/user.interface';
import {ITableConfig} from '../../core/interfaces/table.interface';
import {DATA_CONFIG} from '../../app.config';
import {IDataConfig} from '../../core/interfaces/data-config.interface';
import {LocalStorageService} from '../../core/services/data.service';
import {TableComponent} from '../../shared/components/table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  tableData: IUser[];
  tableConfig: ITableConfig = {
    columns: [
      {key: 'firstName', header: 'First Name', sortable: true, filterable: true},
      {key: 'lastName', header: 'Last Name', sortable: true},
      {key: 'email', header: 'Email', sortable: true},
    ],
    pageSize: 10
  };

  constructor(
    @Inject(DATA_CONFIG) _dataConfig: IDataConfig,
    private _lsService: LocalStorageService,
  ) {
    this.tableData = this._lsService.getData(_dataConfig.key);
  }
}
