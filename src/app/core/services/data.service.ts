/**
 * 5.Создание локального хранилища
 * Задача: Реализуйте функциональность, которая сохраняет данные в локальном хранилище (localStorage) браузера.
 * Данные должны сохраняться между сессиями, и пользователь должен иметь возможность их редактировать.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  clearData(): void {
    localStorage.clear();
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  saveData(key: string, value: any): void {
    if (!value) {
      this.removeData(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}
