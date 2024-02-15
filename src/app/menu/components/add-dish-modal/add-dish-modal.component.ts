import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { switchMap, take } from 'rxjs';
import { DishesService } from 'src/app/core/services/dishes.service';

export interface DialogData {
  categoryId: string;
}

@Component({
  selector: 'app-add-dish-modal',
  templateUrl: './add-dish-modal.component.html',
  styleUrls: ['./add-dish-modal.component.css'],
})
export class AddDishModalComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dishService: DishesService
  ) {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      image: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      price: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^(?!0\d)(?!0$)\d*(\.\d+)?$/),
      ]),
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newDish = {
        categoryId: this.data.categoryId,
        ...this.form.value,
      };

      this.dishService
        .addDish(newDish)
        .pipe(
          switchMap(() => this.dishService.updateDishes(newDish.categoryId)),
          take(1)
        )
        .subscribe({
          next: () => {
            this.form.reset();
            this.dialog.closeAll();
          },
          error: error => {
            console.error('Error:', error);
          },
        });
    }
  }
}
