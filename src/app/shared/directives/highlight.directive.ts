/**
 * 4. Создание кастомного директивы
 * Задача: Напишите кастомную директиву, которая изменяет стиль элемента на основе его состояния
 * (например, меняет цвет фона на зеленый, если текст имеет определенное значение).
 */

import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight?: boolean;

  private readonly _elm: HTMLElement;

  constructor(
    private renderer: Renderer2,
    _elmRef: ElementRef,
  ) {
    this._elm = _elmRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appHighlight']) {
      this.updateBackgroundColor();
    }
  }

  private updateBackgroundColor() {
    if (this.appHighlight) {
      this.renderer.setStyle(this._elm, 'border-color', 'green');
    } else {
      this.renderer.removeStyle(this._elm, 'border-color');
    }
  }
}
