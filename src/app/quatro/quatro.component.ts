import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../route-animation';
import { CVService } from '../service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-quatro',
  templateUrl: './quatro.component.html',
  styleUrls: ['./quatro.component.css'],
  animations: [ slideInAnimation ]
})
export class QuatroComponent implements OnInit {

  constructor(private cvService: CVService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //console.log("Navigated to: " + cvService.routerIndex);
        cvService.routerIndex = 4;
      }

    });
  }
  ngOnInit() {
    
  }

  gotoSpeelQuatro() {
    //console.log('gotoSpeelQuatro in Quatro');
    this.cvService.gaNaarRouteCV(5);
  }
  

}
