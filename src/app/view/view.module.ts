import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';

import { ViewComponent } from 'src/app/view/view.component';
import { PaginatorComponent } from 'src/app/paginator/paginator.component';

@NgModule({
  declarations: [
    ViewComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
})
export class ViewModule { }
