import { Component, OnInit } from '@angular/core';
import { CVService } from '../service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-speel-quatro',
  templateUrl: './speel-quatro.component.html',
  styleUrls: ['./speel-quatro.component.css']
})
export class SpeelQuatroComponent implements OnInit {

  constructor(private cvService: CVService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //console.log("Navigated to: " + cvService.routerIndex);
        cvService.routerIndex = 5;
      }
    });
  }
  
  ngOnInit() {
    this.cvService.buttonStart();
  }

}