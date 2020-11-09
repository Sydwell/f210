import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as Global from '../shared/global';
import { PromptComponent } from '../prompt/prompt.component';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-circles',
  templateUrl: './circles.component.html',
  styleUrls: ['./circles.component.css']
})

export class CirclesComponent implements OnInit {
 // @ViewChild(PromptComponent, {read: ElementRef} ) prompt23: PromptComponent;
 // @ViewChild(@ViewChild)
  // @Input(allPrompts);

  circles = Global.circlesData;
  // circleId = -1;
  newCircleName = 'unknown';
  clickedCircleId = -1;
  // what2ask = 'What is name of the new Circle?';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    console.log(' PromptComponent: ', PromptComponent);
  }

    receivePrompt($event, s: string) {
    this.newCircleName = $event;
    const parentLevel = this.clickedCircleId;
    console.log(` receivePrompt Event ${$event} this.clickedCircleId ${this.clickedCircleId}`);
    this.apiService.createCircle(this.clickedCircleId, this.newCircleName).subscribe((result) => {
      console.log(`result #${result}# this.clickedCircleId ${this.clickedCircleId}`);
      // alert (' result ');
    });
  }

  // receiveSubPrompt($event) {
  //   this.newCircleName = $event;
  //   console.log(` Show Sub Prompt Event ${$event}`);
  // }

  setCircleId(event: any, theId: number) {
    console.log(` setCircleId event ` + event + ` id ${theId}`);
    console.log(event.target);
    if (event.target.nodeName === 'BUTTON') {
      this.clickedCircleId = theId;
    } else {
      console.log('Not added ' + event.target.nodeName);
    }
  }

  submitCreateCircle(parentLevel: number, circleName: string) {

  }
}

