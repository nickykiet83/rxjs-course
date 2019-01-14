import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';

import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor() { }

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');

        const coures$ = http$
            .pipe(
                map(res => Object.values(res['payload']))
            );

        coures$.subscribe(
            courses => console.log(courses),

            // () => {}, --> using noop
            noop,

            () => console.log('completed'),

        );

    }

}

