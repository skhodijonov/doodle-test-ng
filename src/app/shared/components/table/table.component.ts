/**
 * 1. Создание универсального компонента таблицы
 * Задача: Реализуйте компонент таблицы, который принимает данные и параметры конфигурации через входные свойства.
 * Компонент должен поддерживать сортировку, фильтрацию и пагинацию.
 */

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subscription} from 'rxjs';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {IColumnConfig, ITableConfig} from '../../../core/interfaces/table.interface';
import {cleanSub} from '../../../core/helpers/subscription.helper';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() config: ITableConfig = {pageSize: 10, columns: []};
  searchForm: FormControl;

  displayedData: any[] = [];
  currentPage = 1;
  totalPages = 1;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  filterValue: string = '';
  searchSub?: Subscription;

  constructor(
    private _cd: ChangeDetectorRef,
    private _router: Router,
  ) {
    this.searchForm = new FormControl('');
    this._subscribeToSearch();
  }

  ngOnInit() {
    this.updateDisplayedData();
  }

  onAddNewItemClick() {
    this._router.navigate(['/new-data']).catch((e) => console.error(e));
  }

  updateDisplayedData() {
    let filteredData = this.filterData();
    if (!filteredData) {
      return;
    }
    let sortedData = this.sortData(filteredData);
    this.totalPages = Math.ceil(sortedData.length / this.config.pageSize);
    const startIndex = (this.currentPage - 1) * this.config.pageSize;
    this.displayedData = sortedData.slice(startIndex, startIndex + this.config.pageSize);
  }

  filterData(): any[] {
    if (!this.filterValue || !this.data) {
      return this.data;
    }
    return this.data.filter(item =>
      this.config.columns.some(column =>
        column.filterable &&
        item[column.key].toString().toLowerCase().includes(this.filterValue.toLowerCase())
      )
    );
  }

  sortData(data: any[]): any[] {
    if (!this.sortColumn || !data) {
      return data;
    }
    return [...data].sort((a: any, b: any) => {
      if (a[this.sortColumn] < b[this.sortColumn]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[this.sortColumn] > b[this.sortColumn]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onSort(column: IColumnConfig) {
    if (!column.sortable) return;
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    this.updateDisplayedData();
  }

  onFilter(value: string) {
    this.filterValue = value;
    this.currentPage = 1;
    this.updateDisplayedData();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateDisplayedData();
  }

  ngOnDestroy() {
    cleanSub(this.searchSub);
  }

  private _subscribeToSearch() {
    this.searchSub = this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.onFilter(value);
        this._cd.markForCheck();
      });
  }
}

