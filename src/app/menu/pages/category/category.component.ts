import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  dishes$: Observable<Dishes[]> | undefined;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dishes$ = this.dataService.getDishesFromCategory(id);
  }

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      data: {
        name: 'Taras',
      },
    });
  }

  trackByDishes(index: number, item: Dishes): number {
    return item.id;
  }
}
