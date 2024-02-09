import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { switchMap, take } from 'rxjs';
import { DishesService } from 'src/app/core/services/dishes.service';
import { DataService } from 'src/app/core/services/data.service';
import { NewDish } from 'src/app/core/services/dishes.service';

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
    private dataService: DataService,
    private dishService: DishesService
  ) {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      image: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newDish = {
        categoryId: this.data.categoryId,
        name: this.form.value.name,
        image: this.form.value.image,
        description: this.form.value.description,
        price: this.form.value.price,
      };

      this.dishService
        .addDish(newDish)
        .pipe(
          switchMap(() => this.dataService.updateDishes(newDish.categoryId)),
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
