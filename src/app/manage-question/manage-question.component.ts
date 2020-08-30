import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as Global from '../shared/global';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.css']
})
export class ManageQuestionComponent implements OnInit {
  @ViewChild('showModalButton', { static: false }) showModalButton: ElementRef;
  managed = Global.managedData;
  showKeys = false;
  questionCircles = Global.circlesData;
  questionCircleId = -1;
  selectedId = -1;
  realIndex = -1;

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getManagedData().subscribe((result) => {
      // console.log(' CCC ');
      this.managed = result;
      Global.setManagedData(result);
      // jQuery(() => {
      //   jQuery('[data-toggle="tooltip"]').tooltip();
      // });
    });
  }

  toggleKeys() {
    this.showKeys = !this.showKeys;
  }

  setUid(newUid: number, i: number) {
    this.selectedId = newUid;
    this.realIndex = i;
    console.log(' this.selectedId ' + this.selectedId);
  }

  showModalClick(/* i: number, id: number */) {
    // this.selectedId = id;
    this.showModalButton.nativeElement.click();
  }

  selectedCircle(theId: number) {
    this.questionCircleId = theId;
    console.log(' this.questionCircleId' + theId);
  }

  submitAddedCircle() {
    this.apiService.addUser2Circle(this.questionCircleId, this.selectedId).subscribe((result) => {
      console.log('result #' + result + '# this.realIndex #' + this.realIndex );
      console.log(this.managed[this.realIndex] );
      console.log(this.managed[this.realIndex].circles_text );
      this.managed[this.realIndex].circles_text.push(result);
    });
  }

  submitRemoveCircle() {
    this.apiService.removeUserFromCircle(this.questionCircleId, this.selectedId).subscribe((result) => {
      console.log('result #' + result + '#');
    });
  }

}
