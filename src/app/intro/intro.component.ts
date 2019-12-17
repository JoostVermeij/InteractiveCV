import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../route-animation';
import { CVService } from '../service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  animations: [slideInAnimation]
})
export class IntroComponent implements OnInit {

  constructor(private cvService: CVService, private router: Router) {
    router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        cvService.routerIndex = 0;
      }

    });
  }

  ngOnInit() {

  }


}
