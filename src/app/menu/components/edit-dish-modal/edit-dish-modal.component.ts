import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { switchMap, take } from 'rxjs';
import { DishesService } from 'src/app/core/services/dishes.service';
import { NewDish } from 'src/app/core/services/dishes.service';
import { Dishes } from 'src/app/shared/interfaces/dishes';

@Component({
  selector: 'app-edit-dish-modal',
  templateUrl: './edit-dish-modal.component.html',
  styleUrls: ['./edit-dish-modal.component.css'],
})
export class EditDishModalComponent {
  form: FormGroup;
  dish!: NewDish;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Dishes,
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

  ngOnInit(): void {
    this.dishService
      .getDishById(this.data.id)
      .pipe(take(1))
      .subscribe((dish: Dishes) => {
        this.dish = dish;
        this.form.patchValue({
          name: dish.name,
          image: dish.image,
          description: dish.description,
          price: dish.price,
        });
      });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedDish: Dishes = {
        id: this.data.id,
        categoryId: this.data.categoryId,
        name: this.form.value.name,
        image: this.form.value.image,
        description: this.form.value.description,
        price: this.form.value.price,
      };
      this.dishService
        .editDish(updatedDish.id, updatedDish)
        .pipe(
          switchMap(() =>
            this.dishService.updateDishes(updatedDish.categoryId)
          ),
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
