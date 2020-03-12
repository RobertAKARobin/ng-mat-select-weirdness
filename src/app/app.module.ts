import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ViewModule } from './view/view.module';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '**',
    component: ViewComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
