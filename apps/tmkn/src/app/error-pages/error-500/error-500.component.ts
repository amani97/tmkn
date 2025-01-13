import { Component } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-error-500',
    templateUrl: './error-500.component.html',
    styleUrl: './error-500.component.scss',
    standalone: true,
    imports: [RouterLink]
})
export class Error500Component {
  public routes = routes;
}
