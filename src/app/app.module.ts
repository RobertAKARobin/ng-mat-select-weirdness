import { Component, Injectable, NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot } from '@angular/router';

import { Observable, of, timer } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { GoogleApiModule, GoogleAuthService, NG_GAPI_CONFIG } from 'ng-gapi';

import { googleClientId } from 'src/environments/.google'; // e.g. 123abcxyz.apps.googleusercontent.com

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}

@Component({
  template: `<button (click)="didClick()">Click me</button>`
})
export class ViewComponent {
  constructor(
    private ngZone: NgZone,
  ) { }

  didClick() {
    this.ngZone.onUnstable.pipe(take(1)).subscribe(() => console.log('unstable'));
    this.ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => console.log('microtask empty'));
    this.ngZone.onStable.pipe(take(1)).subscribe(() => console.log('stable'));
    this.ngZone.onError.pipe(take(1)).subscribe(() => console.log('error'));
  }
}

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private googleAuth: GoogleAuthService,
  ) {
  }

  // This doesn't work :(
  // public canActivate(): Observable<boolean> {
  //   return this.googleAuth.getAuth().pipe(map(() => true));
  // }

  // This does work :)
  public canActivate(): Promise<boolean> {
    return this.googleAuth.getAuth().pipe(map(() => true)).toPromise();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
  ],
  imports: [
    BrowserModule,
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
  bootstrap: [AppComponent],
})
export class AppModule { }
