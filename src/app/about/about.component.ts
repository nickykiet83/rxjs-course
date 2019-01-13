import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, timer, fromEvent } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // ex1: interval: Creates an Observable that emits sequential numbers every specified interval of time, on a specified SchedulerLike.
    // const interval$ = interval(1000);

    // interval$.subscribe(val => console.log(`stream 1 => ${val}`));

    // interval$.subscribe(val => console.log(`stream 2 => ${val}`));

    // ------------

    // ex2: timer : Creates an Observable that starts emitting after an dueTime and emits ever increasing numbers after each period of time thereafter.
    const interval$ = timer(3000, 1000);

    interval$.subscribe(val => console.log(`stream 1 => ${val}`));

    // ex3: fromEvent: Creates an Observable that emits events of a specific type coming from the given event target.
    const click$ = fromEvent(document, 'click');

    click$.subscribe(evt => console.log(evt));

  }

}
