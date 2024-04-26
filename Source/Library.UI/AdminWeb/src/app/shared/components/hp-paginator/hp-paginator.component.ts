import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'hp-paginator',
  templateUrl: './hp-paginator.component.html',
  styleUrls: ['./hp-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HpPaginatorComponent {
  @Input() rows: number = 10;
  @Input() first: number = 0;
  @Input() pageLinkSize: number = 5;
  @Input() totalRecords: number = 0;
  @Input() rowsPerPageOptions: number[] = [10, 20, 50];

  @Input() alwaysShow: boolean = true;
  @Input() showPageLinks: boolean = true;
  @Input() showFirstLastIcon: boolean = true;
  @Input() showJumpToPageDropdown: boolean = false;
  @Input() showCurrentPageReport: boolean = false;

  @Output() onPageChange = new EventEmitter();
}
