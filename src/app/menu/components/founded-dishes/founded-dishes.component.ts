import { Component, OnInit, DestroyRef } from '@angular/core';
import { DishesService } from 'src/app/core/services/dishes.service';
import { Observable } from 'rxjs';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-founded-dishes',
  templateUrl: './founded-dishes.component.html',
  styleUrls: ['./founded-dishes.component.css'],
})
export class FoundedDishesComponent implements OnInit {
  foundedDishes$: Observable<Dishes[]> | undefined;

  constructor(
    public dialog: MatDialog,
    private dishesService: DishesService
  ) {}

  ngOnInit(): void {
    this.foundedDishes$ = this.dishesService.foundDishes$;
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
