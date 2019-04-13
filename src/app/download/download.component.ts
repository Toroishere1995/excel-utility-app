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
    console.log(myform.value['column-order']);
    this.excelFileService.downloadMergedFile(myform.value['column-order'], this.downloadEvent[0].id,
      this.downloadEvent[1].id).subscribe(
        data => {
          var newBlob = new Blob([data], { type: 'application/vnd.ms-excel' });
          console.log(data);
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
