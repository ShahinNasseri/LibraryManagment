import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import * as DxDialog from 'devextreme/ui/dialog';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toastr: ToastrService) {}

  public notify(
    type: AlertType = AlertType.success,
    message: string | undefined,
    title: string | undefined = 'Processing request',
    timeOut: number = 3000,
    enableHtml: boolean = false
  ) {
    const CONFIG: Partial<IndividualConfig<any>> = {
      timeOut,
      positionClass: 'toast-bottom-left',
      enableHtml,
      progressBar: true,
    };

    switch (type) {
      case AlertType.success:
        this.toastr.success(message, title, CONFIG);
        break;
      case AlertType.warning:
        this.toastr.warning(message, title, CONFIG);
        break;
      case AlertType.error:
        this.toastr.error(message, title, CONFIG);
        break;
      case AlertType.info:
        this.toastr.info(message, title, CONFIG);
        break;
    }
  }

  public alert(
    type: AlertType = AlertType.warning,
    message: string | undefined,
    title: string = 'Error'
  ) {
    const color: string = 'text-dark';
    const confirmMessage: string = `<h5 class='${color}'>${message}</h5>`;

    DxDialog.custom({
      title,
      messageHtml: confirmMessage,
      buttons: [
        {
          text: 'Okay!',
          type: 'default'
        },
      ],
    }).show();
  }

  public confirm(
    message: string = 'Operation successfully completed',
    title: string = 'Attention',
    // eslint-disable-next-line @typescript-eslint/ban-types
    yesFn: Function = () => {},
    // eslint-disable-next-line @typescript-eslint/ban-types
    noFn: Function = () => {},
    summaryItems: AlertSummaryItem[] = [],
    yesBtnText: string = 'Yes, I am sure',
    noBtnText: string = 'No'
  ): void {
    const confirmMessage: string = `<span class="text-base">${message}</span>`;
    let summaryTable: string = '';
    if (summaryItems.length > 0) {
      summaryTable = this.summaryItemsToTable(summaryItems);
    }

    DxDialog.custom({
      title,
      messageHtml: confirmMessage + summaryTable,
      buttons: [
        {
          text: yesBtnText,
          onClick: () => {
            return true;
          },
          type: 'danger'
        },
        {
          text: noBtnText,
          onClick: () => {
            return false;
          },
          type: 'default'
        },
      ],
    })
      .show()
      .then((result: boolean) => {
        result ? yesFn() : noFn();
      });
  }

  private summaryItemsToTable(items: AlertSummaryItem[]): string {
    let tr: string =
      '<tr><td class="border border-dark px-4 py-1 bg-light text-center" colspan="2">Summary Status</td></tr>';
    items.forEach((element) => {
      if (element.value)
        tr += `<tr>
              <td class='border border-dark px-4 py-1 bg-white'>${element.key}</td>
              <td class='border border-dark px-4 py-1'>${element.value}</td>
            </tr>`;
    });
    return `<table class='my-2 border border-dark table table-fixed m-auto'>${tr}</table>`;
  }
}

export enum AlertType {
  success,
  error,
  warning,
  info,
}

export interface AlertSummaryItem {
  key: string;
  value: string;
  show?: boolean;
}
