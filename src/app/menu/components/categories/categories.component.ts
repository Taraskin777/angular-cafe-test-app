import { Component, OnInit, DestroyRef } from '@angular/core';
import { Categories } from 'src/app/shared/interfaces/categories';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCatModalComponent } from '../add-cat-modal/add-cat-modal.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditCatModalComponent } from '../edit-cat-modal/edit-cat-modal.component';
import { switchMap } from 'rxjs';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { DishesService } from 'src/app/core/services/dishes.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Categories[]> | undefined;
  authorizedUser$: Observable<boolean> | undefined;
  foundedDishes$: Observable<Dishes[]> | undefined;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private destroyRef: DestroyRef,
    private dishesService: DishesService
  ) {}

  ngOnInit(): void {
    this.authService.checkAdminStatus();
    this.categories$ = this.categoryService.currentCategories$;
    this.update();
    this.authorizedUser$ = this.authService.currentAuth$;
    this.foundedDishes$ = this.dishesService.foundDishes$;
  }

  openDialog(): void {
    this.dialog.open(AddCatModalComponent);
  }

  update() {
    this.categoryService
      .updateCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  openDialogForEdit(category: Categories): void {
    this.dialog.open(EditCatModalComponent, {
      data: category,
    });
  }

  deleteCategory(category: Categories): void {
    this.categoryService
      .removeCategory(category.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => {
          return this.categoryService.updateCategories();
        })
      )
      .subscribe();
  }

  trackByCategory(index: number, item: Categories): string {
    return item.id;
  }

}
