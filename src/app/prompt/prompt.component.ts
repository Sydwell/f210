import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})


export class PromptComponent implements OnInit {
  alert = false;
  @Input() userSupplied: string; // Becomes an [] attribute in the selector
  @Input() title: string;
  @Output() promptEvent = new EventEmitter<string>(); // Becomes an () attribute in the selector

  // value2Parent = 'Not set';
  constructor() { }

  ngOnInit(): void {
  }

  submitValue(value2View) {
   // this.value2Parent = value2View;
    this.promptEvent.emit(value2View);
    this.alert = true;
  }
  closeAlert() {
    this.alert = false;
  }
}
