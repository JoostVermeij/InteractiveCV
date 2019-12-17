import { Component, OnInit } from '@angular/core';
import { CVService } from '../service';
import { Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from '../route-animation';

@Component({
  selector: 'app-receptipedia',
  templateUrl: './receptipedia.component.html',
  styleUrls: ['./receptipedia.component.css'],
  animations: [ slideInAnimation ]
})
export class ReceptipediaComponent implements OnInit {

  constructor(private cvService: CVService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //console.log("Navigated to: " + cvService.routerIndex);
        cvService.routerIndex = 6;
      }

    });
  }
  ngOnInit() {
    
  }

  gotoBekijkWebsite() {
    this.cvService.gaNaarRouteCV(7);
  }


}
