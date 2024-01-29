import { Component, OnInit, DestroyRef } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  // categories: Categories[] = [];
  categories$: Observable<Categories[]> | undefined;

  constructor(
    private dataService: DataService
    // private destroyRef: DestroyRef,
  ) {}

  // ngOnInit(): void {
  //   this.dataService
  //     .getData()
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe({
  //       next: (data: Categories[]): void => {
  //         this.categories = data;
  //       },
  //       error: (error: any) => {
  //         console.error(error);
  //       },
  //     });
  // }

  ngOnInit(): void {
    this.categories$ = this.dataService.getData();
  }

  trackByCategory(index: number, item: Categories): number {
    return item.id;
  }
}
