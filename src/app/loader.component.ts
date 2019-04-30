import {Component} from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <img src="/assets/images/loading.svg" />
  `,
  styles: [`
      img {
        display: block;
        margin: 250px auto;
      }
    `]
})
export class LoaderComponent {
}

