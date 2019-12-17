import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Zet } from './models/zet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './speel-quatro/spelgespeeld_dialog';
import { Router, NavigationEnd } from '@angular/router';
import { Recept } from './models/recept';
import { Ingredient } from './models/ingredient';

@Injectable({
    providedIn: 'root',
})
export class CVService {

    constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { 
        
    }

    routerlinks = ['/intro', 'bio', 'filosofie', 'skills', 'quatro', 'speel_quatro', 'receptipedia', 'home'];
    routerIndex = 0;

    stringOut: String;
    base_url = "http://142.93.226.253";

    scoreSpeler = 0;
    scoreSpel = 0;

    gaNaarRouteCV(val) {
        this.router.navigateByUrl(this.routerlinks[val]);
    }

    gaTerugCV() {
        //console.log("t pre: " + this.routerIndex);
        if (this.routerIndex == 3) this.routerIndex--;
        if (this.routerIndex == 6) this.routerIndex--;
        if (this.routerIndex >= 1) this.routerIndex--;
        //console.log("t post: " + this.routerIndex);
        this.router.navigateByUrl(this.routerlinks[this.routerIndex]);
    }

    gaVooruitCV() {
        //console.log("v pre: " + this.routerIndex);
        if (this.routerIndex == 1) this.routerIndex++;
        if (this.routerIndex == 4) this.routerIndex++;
        if (this.routerIndex <= 6) this.routerIndex++;
        //console.log("v post: " + this.routerIndex);
        this.router.navigateByUrl(this.routerlinks[this.routerIndex]);
    }

    buttonStart() {
        this.http.get(this.base_url + "/startQuatro", { responseType: 'text' })
            .subscribe((res: String) => {
                this.displayField(res);
            });
        this.scoreSpeler = 0;
        this.scoreSpel = 0;

        var arrOut = [];
        arrOut[1] = "> Doe een zet door op een lijn te klikken!";
        arrOut[2] = "0";
        arrOut[3] = "0";

        this.updateLabels(arrOut);

    }



    doeZet(valNr, valPos) {
        const headers = new HttpHeaders().set("Content-Type", "application/JSON");
        var zet = new Zet();
        zet.zetNr = valNr;
        switch (valPos) {
            case "0":
                zet.zetPos = "B";
                break;
            case "1":
                zet.zetPos = "R";
                break;
            case "2":
                zet.zetPos = "O";
                break;
            case "3":
                zet.zetPos = "L";
                break;
        }
        //zet.zetPos = valPos;
        this.http.post(this.base_url + "/doeZet/", zet, { headers })
            .subscribe((res: String[]) => {

                this.displayField(res[0]);

                this.updateLabels(res);

                this.scoreSpeler = Number(res[2]);
                this.scoreSpel = Number(res[3]);

                if (res[1] == "Klaar!") {

                    console.log(this.scoreSpeler + " - " + this.scoreSpel);

                    if (this.scoreSpeler > this.scoreSpel) { this.resultaat = "winst" }
                    if (this.scoreSpeler == this.scoreSpel) { this.resultaat = "gelijkspel" }
                    if (this.scoreSpeler < this.scoreSpel) { this.resultaat = "verlies" }

                    this.openDialog();
                }

            });
    }

    updateLabels(arr) {

        var strHTML = "";
        strHTML += "<span style='color: rgb(5, 175, 179);'>";
        strHTML += this.outputRes(arr[1]);
        strHTML += "</span>";
        document.getElementById("outOut").innerHTML = strHTML;

        strHTML = "";
        strHTML += "<span style='color: rgb(5, 175, 179);'> Score: </span>";
        strHTML += "<span style='color: red;'> Speler : ";
        strHTML += arr[2];
        strHTML += "</span>";

        strHTML += "<span style='color: rgb(5, 175, 179);'> - </span>";

        strHTML += "<span style='color: blue;'>";
        strHTML += arr[3];
        strHTML += " : AI </span>";

        document.getElementById("outScore").innerHTML = strHTML;

    }


    outputRes(val: String) {
        var tmpOut = "";
        var arrOut = [];
        arrOut = val.split("\n");
        for (var i = 0; i < arrOut.length; i++) {
            tmpOut += arrOut[i] + "<br>";
        }
        return tmpOut;
    }

    displayField(strField: String) {
        var arrOutput = this.outputRes(strField).split("");
        document.getElementById("outQ").innerHTML = "";

        for (var i = 0; i < arrOutput.length; i++) {
            switch (arrOutput[i]) {
                case "p":
                    document.getElementById("outQ").innerHTML += "<span style='color: red;'>#</span>";
                    break;
                case "g":
                    document.getElementById("outQ").innerHTML += "<span style='color: blue;'>#</span>";
                    break;
                case "<":
                    document.getElementById("outQ").innerHTML += "<br>"
                    i += 3;
                    break;
                default:
                    document.getElementById("outQ").innerHTML += "<span style='color: rgb(5, 175, 179);'>" + arrOutput[i] + "</span>";
                    break;
            }

        }
    }

    resultaat: string = "";

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '450px',
            data: { resultaat: this.resultaat }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed: ' + result);

            if (result == true) {
                this.buttonStart();
            } else {
                // routing to next page
                this.gaVooruitCV();
            }
        });
    }

    pad(n, width) {
        n = n + '';
        return n.length >= width ? n :
            new Array(width - n.length + 1).join('0') + n;
    }

    dataRcpt2: Recept[];
    private dataRcpt = new Subject<Recept[]>();
    getData() { return this.dataRcpt; }
    updateData(data: Recept[]) { this.dataRcpt.next(data); this.dataRcpt2 = data }

    private disabledBlist = new Subject<boolean>();
    getDisabledBlist() { return this.disabledBlist; }
    updateDisabledBlist(data: boolean) {
        this.disabledBlist.next(data);
    }

    dataIngr2: Ingredient[];
    private dataIngr = new Subject<Ingredient[]>();
    getDataIngr() { return this.dataIngr; }
    updateDataIngr(data: Ingredient[]) {
        //this.dataIngr.next(data);
        this.dataIngr2 = data;
    }
    
}