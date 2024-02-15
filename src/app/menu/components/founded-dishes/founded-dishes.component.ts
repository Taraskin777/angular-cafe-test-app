import { Component, OnInit, DestroyRef } from '@angular/core';
import { DishesService } from 'src/app/core/services/dishes.service';
import { Observable } from 'rxjs';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { foundedDishes } from 'src/app/store/dishes.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-founded-dishes',
  templateUrl: './founded-dishes.component.html',
  styleUrls: ['./founded-dishes.component.css'],
})
export class FoundedDishesComponent implements OnInit {
  foundedDishes$: Observable<Dishes[]> | undefined;

  constructor(
    public dialog: MatDialog,
    private dishesService: DishesService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.foundedDishes$ = this.store.select(
    //   state => state.dishes.foundedDishes
    // );
    this.foundedDishes$ = this.store.pipe(
      select(state => state.dishes.foundedDishes),
      map(dishes => dishes || [])
    );
  }

  openDialog(dish: Dishes): void {
    this.dialog.open(ModalComponent, {
      data: {
        description: dish.description,
        name: dish.name,
      },
    });
  }

  trackByDishes(index: number, item: Dishes): string {
    return item.id;
  }
}
