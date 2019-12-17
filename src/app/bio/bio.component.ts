import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../route-animation';
import { CVService } from '../service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
  animations: [ slideInAnimation ]
})
export class BioComponent implements OnInit {

  constructor(private cvService: CVService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //console.log("Navigated to: " + cvService.routerIndex);
        cvService.routerIndex = 1;
      }

    });
  }

  ngOnInit() {
    
  }

}
