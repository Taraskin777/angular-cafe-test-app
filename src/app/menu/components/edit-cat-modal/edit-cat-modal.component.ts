import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories } from 'src/app/shared/interfaces/categories';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-edit-cat-modal',
  templateUrl: './edit-cat-modal.component.html',
  styleUrls: ['./edit-cat-modal.component.css'],
})
export class EditCatModalComponent implements OnInit {
  form: FormGroup;
  category!: Categories;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Categories,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      image: this.fb.control('', [Validators.required]),
    });
  }

  getDataFromCategory() {
    this.categoryService
      .getCategory(this.data.id)
      .pipe(take(1))
      .subscribe((category: Categories) => {
        this.category = category;
        this.form.patchValue({
          name: category.name,
          image: category.image,
        });
      });
  }

  ngOnInit(): void {
    this.getDataFromCategory();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
