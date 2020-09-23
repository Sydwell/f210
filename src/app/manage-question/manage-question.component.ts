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
  @ViewChild('showModalAdd', { static: false }) showModalAdd: ElementRef; // #showModalAdd
  @ViewChild('showModalRemove', { static: false }) showModalRemove: ElementRef;

  managed = Global.managedData;
  showKeys = false;
  questionCircles = Global.circlesData;
  questionCircleId = '';
  selectedId = -1;
  realIndex = '';

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

  setUid(newUid: number, i: string) {
    this.selectedId = newUid;
    this.realIndex = i;
    console.log(' this.selectedId ' + this.selectedId);
  }

  // showModalClick(/* i: number, id: number */) {
  //   // this.selectedId = id;
  //   this.showModalButton.nativeElement.click();
  // }

  selectedCircle(theId: string) {
    this.questionCircleId = theId;
    console.log(' this.questionCircleId' + theId);
  }

  submitAddedCircle() {
    this.apiService.addUser2Circle(this.questionCircleId, this.selectedId).subscribe((result) => {
      console.log('result #' + result + '# this.realIndex #' + this.realIndex );
      const circleText2add = this.questionCircles.find(x => x.id === this.questionCircleId).name;
      console.log(this.managed[this.realIndex] );
      console.log(this.managed[this.realIndex].circles_text );
      console.log(' circleText2add ' + circleText2add);
      this.managed[this.realIndex].circles_text.push(circleText2add);
      this.ngOnInit();
      this.showModalAdd.nativeElement.click();
    });
  }

  submitRemoveCircle() {
    this.apiService.removeUserFromCircle(this.questionCircleId, this.selectedId).subscribe((result) => {
      const circleText2remove = this.questionCircles.find(x => x.id === this.questionCircleId).name; //
      console.log(`result #${result}# this.selectedId #${this.selectedId} circleText2remove #${circleText2remove}#`);
      // const tArray = this.managed[this.realIndex].circles_text;
      // this.managed[this.realIndex].circles_text = this.managed[this.realIndex].circles_text.replace(circleText2remove, '');
      this.ngOnInit();
      this.showModalRemove.nativeElement.click();
    }, err => {}, () => {});
  }

}
