import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideInAnimation } from '../route-animation';
import { CVService } from '../service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slideInAnimation]
})
export class AppComponent {
  constructor(private router: Router, private cvService: CVService) { }

  title = 'joostvermeij.nl';

  getImagePath() { return "./assets/img/me.png"; }
  getImgFoldPath() { return "./assets/img/corner.jpg"; }
  getImagePathLeft() { return "./assets/img/left.png"; }
  getImagePathRight() { return "./assets/img/right.png"; }
  getImagePathLinkedIn() { return "./assets/img/linkedin.png"; }
  getImagePathGitHub() { return "./assets/img/github.png"; }
  getImagePathMail() { return "./assets/img/mail.png"; }
  gaTerug() {
    this.cvService.gaTerugCV();
  }

  gaVooruit() {
    this.cvService.gaVooruitCV();
  }

  gotoLinkedIn() {
    window.open("https://www.linkedin.com/in/joost-vermeij-aa3681b6/", "_blank");
  }

  gotoGitHub() {
    window.open("https://github.com/JoostVermeij/", "_blank");
  }

  gotoMail() {
    window.open("mailto:joostvermeij@gmail.com"); 
  }

  downloadCV() {
    let link = document.createElement("a");
    link.download = "YCN CV Joost Vermeij";
    link.href = "./assets/YCN CV Joost Vermeij.pdf";
    link.click();
  }

  gotoSpeelQuatro() {
    console.log('gotoSpeelQuatro in App');
  }

}
