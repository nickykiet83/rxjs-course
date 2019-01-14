import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { map } from 'rxjs/operators';

import { createHttpObservable } from '../common/util';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses: Course[] = [];

    advancedCourses: Course[] = [];

    constructor() {

    }

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');

        const coures$ = http$
            .pipe(
                map(res => Object.values(res['payload']))
            );

        coures$.subscribe(
            courses => {

                this.beginnerCourses = courses
                    .filter(course => course.category === 'BEGINNER');

                this.advancedCourses = courses
                    .filter(course => course.category === 'ADVANCED');

            },

            // () => {}, --> using noop
            noop,

            () => console.log('completed'),

        );


    }

}
