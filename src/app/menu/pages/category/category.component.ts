import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { AddDishModalComponent } from '../../components/add-dish-modal/add-dish-modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  dishes$: Observable<Dishes[]> | undefined;
  authorizedUser$: Observable<boolean> | undefined;
  categoryId: number = 0;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));
    this.dataService.updateDishes(this.categoryId);
    // this.dishes$ = this.dataService.getDishesFromCategory(this.categoryId);
    this.dishes$ = this.dataService.currentDishes$;
    this.authService.checkAdminStatus();
    this.authorizedUser$ = this.authService.currentAuth$;
    this.dishes$.subscribe(dishes => {
      console.log('Dishes:', dishes);
    });
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



  trackByDishes(index: number, item: Dishes): number {
    return item.id;
  }
}
