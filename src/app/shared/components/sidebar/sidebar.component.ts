import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public menu: {path: string, label:string}[] = [
    // {
    //   path: '',
    //   label: 'Home Page',
    // },
    // {
    //   path: 'about',
    //   label: 'About'
    // },
    // {
    //   path: 'contact',
    //   label: 'Contact'
    // },
    {
      path: 'countries/by-capital',
      label: 'Por Capital'
    },
    {
      path: 'countries/by-country',
      label: 'Por País'
    },
    {
      path: 'countries/by-region',
      label: 'Por Región'
    },
  ];
}
