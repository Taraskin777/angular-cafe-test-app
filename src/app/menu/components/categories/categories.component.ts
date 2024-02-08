import { Component, OnInit,  DestroyRef} from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { Observable} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCatModalComponent } from '../add-cat-modal/add-cat-modal.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditCatModalComponent } from '../edit-cat-modal/edit-cat-modal.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Categories[]> | undefined;
  authorizedUser$: Observable<boolean> | undefined;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.authService.checkAdminStatus();
    this.dataService.updateCategories();
    this.categories$ = this.dataService.currentCategories$;
    this.authorizedUser$ = this.authService.currentAuth$;
  }

  openDialog(): void {
    this.dialog.open(AddCatModalComponent);
  }

  openDialogForEdit(category: Categories): void {
    this.dialog.open(EditCatModalComponent, {
      data: category,
    });
  }

  deleteCategory(category: Categories): void {
    this.categoryService
      .removeCategory(category.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.dataService.updateCategories();
      });
  }

  trackByCategory(index: number, item: Categories): string {
    return item.id;
  }
}
