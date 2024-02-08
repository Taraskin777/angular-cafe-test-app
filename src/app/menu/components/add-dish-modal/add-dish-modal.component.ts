import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { take } from 'rxjs';
import { DishesService } from 'src/app/core/services/dishes.service';
import { DataService } from 'src/app/core/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { NewDish } from 'src/app/core/services/dishes.service';

@Component({
  selector: 'app-add-dish-modal',
  templateUrl: './add-dish-modal.component.html',
  styleUrls: ['./add-dish-modal.component.css'],
})
export class AddDishModalComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Dishes,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dataService: DataService,
    private dishService: DishesService,
    private route: ActivatedRoute
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
      const newDish: NewDish = {
        name: this.form.value.name,
        image: this.form.value.image,
        description: this.form.value.description,
        price: this.form.value.price,
        categoryId: Number(this.route.snapshot.paramMap.get('categoryId')),
      };

      this.dishService
        .addDish(newDish)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.form.reset();
            this.dialog.closeAll();
            this.dataService.updateDishes();
          },
          error: error => {
            console.error('Error:', error);
          },
        });
    }
  }
}
