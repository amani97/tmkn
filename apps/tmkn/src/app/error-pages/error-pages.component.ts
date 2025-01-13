import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-error-pages',
    templateUrl: './error-pages.component.html',
    styleUrl: './error-pages.component.scss',
    standalone: true,
    imports: [RouterOutlet]
})
export class ErrorPagesComponent {

}
