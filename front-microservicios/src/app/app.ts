import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  isAuthRoute = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        const url = event.urlAfterRedirects;

        this.isAuthRoute =
          url.startsWith('/login') ||
          url.startsWith('/registro');

      });
  }
}
