import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isClicked:boolean = false;
  inc:number = 0;
  left:string = '';
  top:string = '';
  isBoom:boolean = false;
  time:Date = new Date();
  myStr:string;

  handleClick(event:MouseEvent):void {
    console.log(event);
    this.inc++;
  }

  touch(event:MouseEvent):void {
    this.left = event.clientX - 50 + 'px';
    this.top = event.clientY - 50 + 'px';
  }

  boom() {
    this.isBoom = !this.isBoom;
  }

  updateStr(str:string):void {
    this.myStr = str;
  }
}
