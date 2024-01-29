import { Component, OnInit, DestroyRef } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Categories[] = [];

  constructor(
    private dataService: DataService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.dataService
      .getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (data: Categories[]) => {
          this.categories = data;
        },
        error => {
          console.error(error);
        }
      );
  }

  trackByCategory(index: number, item: Categories): number {
    return item.id;
  }
}
