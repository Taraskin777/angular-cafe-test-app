import { Component, OnInit } from '@angular/core';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { AddDishModalComponent } from '../../components/add-dish-modal/add-dish-modal.component';
import { DishesService } from 'src/app/core/services/dishes.service';
import { take, switchMap } from 'rxjs';
import { EditDishModalComponent } from '../../components/edit-dish-modal/edit-dish-modal.component';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  dishes$: Observable<Dishes[]> | undefined;
  authorizedUser$: Observable<boolean> | undefined;
  categoryId: string = '';
  foundedDishes$: Observable<Dishes[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService,
    private dishesService: DishesService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.categoryId = String(this.route.snapshot.paramMap.get('categoryId'));
    this.update();
    this.dishes$ = this.dishesService.getDishesFromCategory(this.categoryId);
    this.authService.checkAdminStatus();
    this.authorizedUser$ = this.authService.currentAuth$;
    // this.foundedDishes$ = this.store.select(
    //   state => state.dishes.foundedDishes
    // );
    this.foundedDishes$ = this.store.pipe(
      select(state => state.dishes.foundedDishes),
      map(dishes => dishes || [])
    );
  }

  update() {
    this.dishesService.updateDishes(this.categoryId).pipe(take(1)).subscribe();
  }

  openDialog(dish: Dishes): void {
    this.dialog.open(ModalComponent, {
      data: {
        description: dish.description,
        name: dish.name,
      },
    });
  }

  openDialogForAddDish(): void {
    this.dialog.open(AddDishModalComponent, {
      data: { categoryId: this.categoryId },
    });
  }

  openDialogForEditDish(dish: Dishes): void {
    this.dialog.open(EditDishModalComponent, {
      data: dish,
    });
  }

  deleteDish(dish: Dishes): void {
    if (dish.id) {
      this.dishesService
        .removeDish(dish.id)
        .pipe(
          take(1),
          switchMap(() => this.dishesService.updateDishes(this.categoryId))
        )
        .subscribe();
    }
  }

  trackByDishes(index: number, item: Dishes): string {
    return item.id;
  }
}
