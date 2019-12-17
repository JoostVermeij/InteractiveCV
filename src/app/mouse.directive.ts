import { Directive, Input, HostListener } from "@angular/core";
import { CVService} from "./service";
import { HttpClient } from '@angular/common/http';

@Directive({
    selector: '[mouse]'
})
export class MouseDirective {
    
    constructor(private http: HttpClient, private cvService: CVService) { }
    
    @Input('mouse') message: string = "Default message";

    private last: MouseEvent;
    private el: HTMLElement;

    private mouseDown: boolean = false;
    private mouseUp: boolean = false;

    private newClick: boolean = false;

    private clickX: number = 0;
    private clickY: number = 0;

    private posNr: number = 0;
    private posPos: number = 0;

    private minX: number = 0;
    private minY: number = 0;

    @HostListener('mouseup')
    onMouseup(event: MouseEvent) {
        this.mouseDown = false;
        this.mouseUp = true;

        if (this.newClick == true) {
            //console.log("x: " + this.clickX + " - y: " + this.clickY);
            this.newClick = false;
            this.calculatePos(this.clickX, this.clickY);
            //console.log("Nr: " + this.posNr + " - Pos: " + this.posPos);

            /*
            var zet = new Zet();
            zet.zetNr = this.posNr.toString();
            zet.zetPos = this.posPos.toString()
            */

            this.cvService.doeZet(this.posNr.toString(), this.posPos.toString());

        }
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if (this.mouseDown) {
            this.last = event;
            this.clickX = event.offsetX;
            this.clickY = event.offsetY;
        }
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        this.mouseDown = true;
        this.mouseUp = false;
        this.last = event;
        this.newClick = true;
        this.clickX = event.offsetX;
        this.clickY = event.offsetY;
    }

    calculatePos(clX, clY) {

        var dimension = 3;

        var closestX = 0;
        var isX = false;
        var offstX = 0

        closestX = Math.round((clX - 11) / 67)
        offstX = clX - 11 - (closestX * 67);
        if ((offstX >= -10) && (offstX <= 10)) isX = true;

        var closestY = 0;
        var isY = false;
        var offstY = 0

        closestY = Math.round((clY - 11) / 64)
        offstY = clY - 11 - (closestY * 64);
        if ((offstY >= -10) && (offstY <= 10)) isY = true;
        
        var valX = closestX;
        var valY = closestY;

        if (isX && !isY) {
            if (offstX < -10) valX--;
            if (offstY < -10) valY--;
            this.posPos=3;
            if (closestX==dimension) {
                this.posPos = 1;
                valX--;
            }
        }
        if (!isX && isY) {
            if (offstX < -10) valX--;
            if (offstY < -10) valY--;
            this.posPos=0;
            if (closestY==dimension) {
                this.posPos = 2;
                valY--;
            }
        }

        //console.log("X: (" + isX + ") " + closestX + " - " + offstX + " -> "+ valX)
        //console.log("Y: (" + isY + ") "+ closestY  + " - " + offstY + " -> "+ valY)

        this.posNr = valX+((valY)*dimension)+1;
    }

}   