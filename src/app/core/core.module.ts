import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthModule } from './auth/auth.module';
import { CoreRoutingModule } from './core-routing.module';
import { MyCounterComponent } from './components/my-counter/my-counter.component';

@NgModule({
  declarations: [HeaderComponent, MyCounterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AuthModule,
    CoreRoutingModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
