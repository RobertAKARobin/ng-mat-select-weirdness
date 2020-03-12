import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

export interface IPageOptions {
  offset: number;
  perPage: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {

  firstIndexOfNextPage = 0;
  firstIndexOfPreviousPage = 0;
  lastIndexOfCurrentPage = 0;

  @Input() countMax: number;
  @Input() countMin: number;
  @Input() offset: number;
  @Input() perPage: number;
  @Input() perPageOptions: number[];

  @Output() offsetChange = new EventEmitter<number>();
  @Output() perPageChange = new EventEmitter<number>();

  ngOnChanges(): void {
    this.countMin = (this.countMin || 0);
    this.offset = (this.offset || 0);
    this.perPage = (this.perPage || 10);
    this.perPageOptions = (this.perPageOptions || [10, 20, 50]);

    const expectedFirstIndexOfNextPage = this.offset + this.perPage;
    this.firstIndexOfNextPage = (
      expectedFirstIndexOfNextPage < this.countMax
      ? expectedFirstIndexOfNextPage
      : null
    );

    const expectedFirstIndexOfPreviousPage = Math.max(this.countMin, this.offset - this.perPage);
    this.firstIndexOfPreviousPage = (
      expectedFirstIndexOfPreviousPage === this.offset
      ? null
      : expectedFirstIndexOfPreviousPage
    );

    this.lastIndexOfCurrentPage = Math.min(this.countMax, this.offset + this.perPage);
  }

  goToNextPage() {
    if (this.firstIndexOfNextPage !== null) {
      this.offsetChange.emit(this.firstIndexOfNextPage);
    }
  }

  goToPreviousPage() {
    if (this.firstIndexOfPreviousPage !== null) {
      this.offsetChange.emit(this.firstIndexOfPreviousPage);
    }
  }

  updatePerPage($event: MatSelectChange) {
    this.perPageChange.emit($event.value);
  }
}
