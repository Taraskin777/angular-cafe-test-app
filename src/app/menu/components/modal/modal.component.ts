import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(public dialog: MatDialog) { }
  
  // openDialog() {
  //   this.dialog.open(DialogDataExampleDialog, {
  //     data: {
  //       animal: 'panda',
  //     },
  //   });
  // }
}

// @Component({
//   selector: 'dialog-data-example-dialog',
//   templateUrl: 'dialog-data-example-dialog.html',
//   standalone: true,
//   imports: [MatDialogTitle, MatDialogContent],
// })
// export class DialogDataExampleDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }