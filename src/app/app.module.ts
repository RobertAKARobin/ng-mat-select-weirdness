import { BrowserModule } from '@angular/platform-browser';
import { Component, Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleApiModule, GoogleAuthService, NG_GAPI_CONFIG } from 'ng-gapi';

import { googleClientId } from 'src/environments/.google';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}

@Component({
  selector: 'app-view',
  template: `
  <p>Click below</p>
  <mat-select style="outline: 1px solid #999; width: 300px" [value]="111">
    <mat-option *ngFor="let value of [111, 222, 333]" [value]="value">{{ value }}</mat-option>
  </mat-select>
`
})
export class ViewComponent {}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private googleAuth: GoogleAuthService,
  ) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.googleAuth
      .getAuth()
      .pipe(
        map(() => true),
      );
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    RouterModule.forRoot([
      {
        path: '',
        canActivate: [AuthGuard],
        component: ViewComponent,
      },
    ]),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: {
        client_id: googleClientId,
        discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
        scope: 'profile openid',
      },
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
