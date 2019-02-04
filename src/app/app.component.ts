import { Component, OnInit } from '@angular/core';

import { Store } from './common/store.service';
import { createHttpObservable } from './common/util';
import { Course } from './model/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private store: Store) {}

    ngOnInit() {
        this.store.init();
    }
}
