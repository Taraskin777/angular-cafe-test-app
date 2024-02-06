import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCatModalComponent } from '../add-cat-modal/add-cat-modal.component';

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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.checkAdminStatus();
    this.categories$ = this.dataService.getData();
    this.authorizedUser$ = this.authService.currentAuth$;
  }

  openDialog(): void {
    this.dialog.open(AddCatModalComponent);
    console.log('Dialog');
  }

  trackByCategory(index: number, item: Categories): number {
    return item.id;
  }
}
