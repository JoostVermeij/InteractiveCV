import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  resultaat: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'spelgespeeld_dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor( public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}