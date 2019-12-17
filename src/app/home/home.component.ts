import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { Options } from 'ng5-slider';

import { Recept } from '../models/recept';
import { Filter } from '../models/filter';
import { Auteur } from '../models/auteur';
import { Ingredient } from '../models/ingredient';
import { CVService } from '../service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public breakpointObserver: BreakpointObserver, private http: HttpClient, private cvService: CVService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Recept>();

  // Bereidingstijd dingen

  minDuur = 0;
  halfDuur = 90;
  maxDuur = 180;
  minValDuur = this.minDuur;
  maxValDuur = this.maxDuur;

  valueRange: number = 0;
  highValueRange: number = 180;
  optionsRange: Options = {
    floor: 0,
    ceil: 100,
    step: 5
  };

  valueIncl = "";
  valueExcl = "";

  imagePath;
  imagePostFix;

  
  meta_headers = ['duur', 'keuken', 'gang', 'auteur', 'porties'];

  ingr = [];

  // Recepten opgehaald van de database

  displayedColumns: string[] = ['id'];

  // Lijsten van waardes opgehaald uit database
  authors = [];
  courses = [];
  kitchens = [];

  filterIngIncl = [];
  filterIngExcl = [];
  filterArr = [];

  listChkA: Auteur[];

  checkAuthor = []; // Auteur
  checkAuthorAlleGeen = false;
  checkKitchen = []; // Keuken
  checkKitchenAlleGeen = false;
  checkCourse = []; // Gang
  checkCourseAlleGeen = false;

  checkAllergeen = []; // Allergeen
  checkDieet = []; // Dieet

  datacount = 0;

  receptenlijst = [];

  accordionFiltersExpanded = false;

  ngOnInit() {

    this.http.get("http://142.93.226.253:80/getAuteurs")
      .subscribe((res: String[]) => { this.authors = res; });
    this.http.get("http://142.93.226.253:80/getGangen")
      .subscribe((res: String[]) => { this.courses = res; });
    this.http.get("http://142.93.226.253:80/getKeukens")
      .subscribe((res: String[]) => { this.kitchens = res; });
    this.http.get("http://142.93.226.253:80/getMinDuur")
      .subscribe((res: number) => {
        this.minDuur = res;
        this.minValDuur = res;
        this.setNewFloor(res);
      });
    this.http.get("http://142.93.226.253:80/getMaxDuur")
      .subscribe((res: number) => {
        this.maxDuur = res;
        this.maxValDuur = res;
        this.halfDuur = (this.minDuur + ((this.maxDuur - this.minDuur) / 2));

        this.setNewCeil(res);
      });



    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe((state: BreakpointState) => {

      if (state.breakpoints[Breakpoints.XSmall]) { this.imagePostFix = "XS"; }
      if (state.breakpoints[Breakpoints.Small]) { this.imagePostFix = "S"; }
      if (state.breakpoints[Breakpoints.Medium]) { this.imagePostFix = "M"; }
      if (state.breakpoints[Breakpoints.Large]) { this.imagePostFix = "L"; }
      if (state.breakpoints[Breakpoints.XLarge]) { this.imagePostFix = "XL"; }
    });

    this.applyFilters();

  }

  ingrlistNew = [];
  ingrList = [];

  boolIngrFound = false;
  foundN = 0;

  makeList() {

    this.ingrList = [];
    this.cvService.updateDisabledBlist(false);

    // Per recept...
    for (var x = 0; x < this.receptenlijst.length; x++) {

      this.ingrlistNew = this.receptenlijst[x].ingredientenlijst;

      // Neem een voor een de ingredienten...
      for (var y = 0; y < this.ingrlistNew.length; y++) {

        // Controleer voor de opgeslagen ingredienten...
        this.boolIngrFound = false;
        for (var z = 0; z < this.ingrList.length; z++) {
          if (this.ingrList[z].ingrNaam === this.ingrlistNew[y].ingrNaam) {
            this.boolIngrFound = true;
            this.foundN = z;
            break;
          }
        }

        if (this.boolIngrFound == true) {
          this.ingrList[this.foundN].ingrHoeveelheid += this.ingrlistNew[y].ingrHoeveelheid;
        } else {
          this.ingrList.push(this.ingrlistNew[y]);
        }
      }
    }

    console.log(this.ingrList);

    this.cvService.updateDataIngr(this.ingrList);

  }

  chngAuteurAlleGeen() {
    for (var x = 0; x < this.authors.length; x++) {
      this.checkAuthor[x] = this.checkAuthorAlleGeen;
    }
    this.applyFilters();
  }

  chngGangAlleGeen() {
    for (var x = 0; x < this.courses.length; x++) {
      this.checkCourse[x] = this.checkCourseAlleGeen;
    }
    this.applyFilters();
  }

  chngKeukenAlleGeen() {
    for (var x = 0; x < this.kitchens.length; x++) {
      this.checkKitchen[x] = this.checkKitchenAlleGeen;
    }
    this.applyFilters();
  }

  resetFilters() {

    for (var x = 0; x < this.authors.length; x++) {
      this.checkAuthor[x] = false;
    }
    this.checkAuthorAlleGeen = false;
    for (var x = 0; x < this.courses.length; x++) {
      this.checkCourse[x] = false;
    }
    this.checkCourseAlleGeen = false;
    for (var x = 0; x < this.kitchens.length; x++) {
      this.checkKitchen[x] = false;
    }
    this.checkKitchenAlleGeen = false;

    this.checkAllergeen[1] = false;
    this.checkAllergeen[2] = false;
    this.checkAllergeen[3] = false;
    this.checkAllergeen[4] = false;
    this.checkAllergeen[5] = false;

    this.checkDieet[1] = false;
    this.checkDieet[2] = false;

    this.minValDuur = this.minDuur;
    this.maxValDuur = this.maxDuur;

    this.filterIngIncl = [];
    this.filterIngExcl = [];

    this.applyFilters();

    this.cvService.getData().subscribe(dataD => {
      this.dataSource = new MatTableDataSource<Recept>(dataD);
    })

  }

  setNewFloor(newFloor: number): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, this.optionsRange);
    newOptions.floor = newFloor;
    this.optionsRange = newOptions;
  }
  setNewCeil(newCeil: number): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, this.optionsRange);
    newOptions.ceil = newCeil;
    this.optionsRange = newOptions;
  }

  // Pas filters toe bij 
  chngCHK() {
    this.applyFilters();
  }

  chngSlider() {
    this.applyFilters();
  }

  addIngrToFilterIncl() {
    var strIng = this.valueIncl;
    if (this.filterIngIncl.includes(strIng) == false) {
      this.filterIngIncl.push(strIng);
      this.applyFilters();
    }
    this.valueIncl = "";
  }

  removeIngrFilterIncl(obj) {
    for (var x = 0; x < this.filterIngIncl.length; x++) {
      if (this.filterIngIncl[x] === obj) {
        this.filterIngIncl.splice(x, 1);
      }
    }
    this.applyFilters();
  }

  hasAllergy(rcpt: Recept, val: string) {
    var arrAllergy = [];
    arrAllergy = rcpt.allergenen.split(",");
    for (var x = 0; x < arrAllergy.length; x++) {
      arrAllergy[x] = arrAllergy[x].trim();
      if (arrAllergy[x] == val) {
        return true;
      }
    }
    return false;
  }

  capitalizeIngr(str: string) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }

  getAllergyImagePath(val: string) {
    return "./assets/img/a/allergy_" + val + ".jpg";
  }

  getButtonImagePathPlus() {
    return "./assets/img/a/plus.jpg";
  }
  getButtonImagePathMinus() {
    return "./assets/img/a/min.jpg";
  }

  guests = 4;
  guestArr = ['','','',''];

  adjustGuestsPlus() {
    if (this.guests < 13) {
      this.guests++;
      this.guestArr.push('');
    }
  }
  adjustGuestsMinus() {
    if (this.guests > 0) {
      this.guests--;
      this.guestArr.splice(this.guestArr.length-1);
    }
  }

  adjustForGuestSize(hoeveelheid: number, porties: number) {
    console.log(porties);
    var guestInit = porties;
    var guestNew = this.guests;
    var returnHoeveelheid = Math.round((hoeveelheid * guestNew+ 0.00001) * 100) / (guestInit*100);
    return returnHoeveelheid;
  }

  getGuestImagePath() {
    return "../assets/img/a/pp.jpg";
  }
  getImagePath(val: string) {
    return "../assets/img/" + this.imagePostFix + "/SCN_" + this.cvService.pad(val, 4) + ".jpg";;
  }

  addIngrToFilterExcl() {
    var strIng = this.valueExcl;
    if (this.filterIngExcl.includes(strIng) == false) {
      this.filterIngExcl.push(strIng);
      this.applyFilters();
    }
    this.valueExcl = "";
  }
  removeIngrFilterExcl(obj) {
    for (var x = 0; x < this.filterIngExcl.length; x++) {
      if (this.filterIngExcl[x] === obj) {
        this.filterIngExcl.splice(x, 1);
      }
    }
    this.applyFilters();
  }

  chosenRcpt: Recept[];

  // Laat de ingredienten zien van dit recept
  showIngr(rcpt: Recept) {
    this.chosenRcpt = [];
    this.chosenRcpt.push(rcpt);
    this.ingr = rcpt.ingredientenlijst;
    for (var x = 0; x < this.ingr.length; x++) {
      this.ingr[x].ingrNaam = this.capitalizeIngr(this.ingr[x].ingrNaam);
    }
  }

  // Voeg recept toe aan lijst van recepten
  addRcpt(rcpt: Recept) {
    if (this.receptenlijst.includes(rcpt) == false) {
      this.receptenlijst.push(rcpt);
    }
  }

  // Make array of ingredients to include
  getIngrIncl(filtIn) {
    var fltr = new Filter();
    fltr.filterDescr = "ingIncl";
    fltr.filterValue = filtIn;
    this.filterArr.push(fltr);
  }
  addingIncl(ingrIn: string) {
    this.filterIngIncl.push(ingrIn);
  }

  // Make array of ingredients to exclude
  getIngrExcl(filtOut) {
    var fltr = new Filter();
    fltr.filterDescr = "ingExcl";
    fltr.filterValue = filtOut;
    this.filterArr.push(fltr);
  }
  addingExcl(ingrOut: string) {
    this.filterIngExcl.push(ingrOut);
  }

  strFilterAuteur: string;
  strFilterGang: string;
  strFilterKeuken: string;

  // Apply de ingestelde filters
  applyFilters() {

    const headers = new HttpHeaders().set("Content-Type", "application/JSON");
    this.filterArr = [];

    // Haal filters op uit Ingredienten Inclusief
    for (var x = 0; x < this.filterIngIncl.length; x++) {
      this.getIngrIncl(this.filterIngIncl[x]);
    }

    // Haal filters op uit Ingredienten Exclusief
    for (var x = 0; x < this.filterIngExcl.length; x++) {
      this.getIngrExcl(this.filterIngExcl[x]);
    }

    // Haal filters op uit Auteur
    this.strFilterAuteur = "";
    for (var x = 0; x < this.checkAuthor.length; x++) {
      if (this.checkAuthor[x] == true) {
        this.strFilterAuteur += this.authors[x] + ",";
      }
    }
    if (this.strFilterAuteur != "") {
      console.log("Auteur: " + this.strFilterAuteur)
      var fltr = new Filter();
      fltr.filterDescr = "auteurIs";
      fltr.filterValue = this.strFilterAuteur
      this.filterArr.push(fltr);
    }

    // Haal filters op uit Gang
    this.strFilterGang = "";
    for (var x = 0; x < this.checkCourse.length; x++) {
      if (this.checkCourse[x] == true) {
        this.strFilterGang += this.courses[x] + ",";
      }
    }
    if (this.strFilterGang != "") {
      console.log("Gang:" + this.strFilterGang)
      var fltr = new Filter();
      fltr.filterDescr = "gangIs";
      fltr.filterValue = this.strFilterGang
      this.filterArr.push(fltr);
    }

    // Haal filters op uit Keuken
    this.strFilterKeuken = "";
    for (var x = 0; x < this.checkKitchen.length; x++) {
      if (this.checkKitchen[x] == true) {
        this.strFilterKeuken += this.kitchens[x] + ",";
      }
    }
    if (this.strFilterKeuken != "") {
      console.log("Keuken: " + this.strFilterKeuken)
      var fltr = new Filter();
      fltr.filterDescr = "keukenIs";
      fltr.filterValue = this.strFilterKeuken;
      this.filterArr.push(fltr);
    }

    // Haal filters op uit Allergeen
    for (var x = 1; x < 6; x++) {
      if (this.checkAllergeen[x] == true) {
        var fltr = new Filter();
        fltr.filterDescr = "allergeenBevatNiet";
        fltr.filterValue = "a" + x;
        this.filterArr.push(fltr);
      }
    }

    // Haal filters op uit Dieet
    for (var x = 1; x < 3; x++) {
      if (this.checkDieet[x] == true) {
        var fltr = new Filter();
        fltr.filterDescr = "dieetBevat";
        fltr.filterValue = "d" + x;
        this.filterArr.push(fltr);
      }
    }

    // Haal filters op uit minDuur
    if (this.minValDuur != this.minDuur) {
      var fltr = new Filter();
      fltr.filterDescr = "timeMin";
      fltr.filterValue = this.minValDuur.toString();
      this.filterArr.push(fltr);
    }

    // Haal filters op uit maxDuur
    if (this.maxValDuur != this.maxDuur) {
      var fltr = new Filter();
      fltr.filterDescr = "timeMax";
      fltr.filterValue = this.maxValDuur.toString();
      this.filterArr.push(fltr);
    }

    this.http.post("http://142.93.226.253:80/filterList/", this.filterArr, { headers })
      .subscribe((res: Recept[]) => {

        this.cvService.updateData(res);

        this.dataSource = new MatTableDataSource<Recept>(res);

        this.datacount = res.length;
        this.dataSource.paginator = this.paginator;
        this.paginator.length = res.length;

      });




  }




  // ===================
  //    CRUD functions
  // ===================

  getTable() {
    this.http.get("http://142.93.226.253:80/vindRecepten")
      .subscribe((res: Recept[]) => {
        this.cvService.updateData(res);
      });
  }

  filterRecept(val: string) {
    var strIng = val;
    this.http.get("http://142.93.226.253:80/filterRecept/" + strIng)
      .subscribe((res: Recept[]) => {
        this.cvService.updateData(res);
      });
  }

  loadExcel() {
    this.http.get("http://142.93.226.253:80/mappingGetExcel")
      .subscribe((res: Recept[]) => {
        this.cvService.updateData(res);
      });

  }

}

