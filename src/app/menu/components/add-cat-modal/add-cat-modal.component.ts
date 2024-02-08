import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories } from 'src/app/shared/interfaces/categories';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-add-cat-modal',
  templateUrl: './add-cat-modal.component.html',
  styleUrls: ['./add-cat-modal.component.css'],
})
export class AddCatModalComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Categories,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      image: this.fb.control('', [Validators.required]),
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newCategory = {
        name: this.form.value.name,
        image: this.form.value.image,
      };

      this.categoryService
        .addCategory(newCategory)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.form.reset();
            this.dialog.closeAll();
            this.dataService.updateCategories();
          },
          error: error => {
            console.error('Error:', error);
          },
        });
    }
  }
}
