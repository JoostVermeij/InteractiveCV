import { Component, OnInit } from '@angular/core';
import { CVService } from '../service';
import { NavigationEnd, Router } from '@angular/router';
import { slideInAnimation } from '../route-animation';

@Component({
  selector: 'app-filosofie',
  templateUrl: './filosofie.component.html',
  styleUrls: ['./filosofie.component.css'],
  animations: [ slideInAnimation ]
})
export class FilosofieComponent implements OnInit {

  constructor(private cvService: CVService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //console.log("Navigated to: " + cvService.routerIndex);
        cvService.routerIndex = 2;
      }

    });
  }
  ngOnInit() {
    
  }

}
