import { Component, OnInit, Input } from '@angular/core';
import { IUploadResponse } from '../model/IUploadResponse.model';
import { ExcelFileService } from '../service/excel-file.service';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @Input() downloadEvent: IUploadResponse[];
  constructor(private excelFileService: ExcelFileService) { }

  ngOnInit() {
  }

  downloadByOrder(myform) {
    if (this.orderValid(myform.value['column-order'])==false) {

    } else {
      this.excelFileService.downloadMergedFile(myform.value['column-order'], this.downloadEvent[0].id,
        this.downloadEvent[1].id).subscribe(
          data => {
            var newBlob = new Blob([data], { type: 'application/vnd.ms-excel' });
            //   console.log(data);
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(newBlob);
              return;
            }
            const file = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = file;
            link.download = "merged.xlsx";
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
              // For Firefox it is necessary to delay revoking the ObjectURL
              window.URL.revokeObjectURL(file);
              link.remove();
            }, 100);
          },
          err => {
            console.log(err);

          }
        );
    }
  }

  orderValid(columnHeadingOrder: string) {
    //console.log(this.downloadEvent[0].columnHeadings);
    var x: IUploadResponse[] = new Array(2);
    x = this.downloadEvent.slice();

    var columnFile1 = Array.from(x[0].coloumnHeadings);
    var columnFile2 = Array.from(this.downloadEvent[1].coloumnHeadings);

    //console.log(columnFile1);
    //console.log(columnFile2);
    let children = columnFile1.concat(columnFile2);
    //console.log(children.sort().join(','));

    var columns = columnHeadingOrder.split(',');
    //console.log(columns.sort().join(','));
    //console.log(JSON.stringify(children.sort().join('')) === JSON.stringify(columns.sort().join('')));
    return JSON.stringify(children.sort().join('')) === JSON.stringify(columns.sort().join(''));
  }
}
