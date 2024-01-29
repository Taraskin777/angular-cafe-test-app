import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  categories: Categories[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.getData().subscribe(
      (data: Categories[]) => {
        this.categories = data;
        this.categories.forEach(category => console.log(category.name));
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  trackByCategory(index: number, item: Categories): number {
    return item.id;
  }
}
