import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';
import { noop, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { createHttpObservable } from '../common/util';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');

        const coures$: Observable<Course[]> = http$
            .pipe(
                map(res => Object.values(res['payload']))
            );

        this.beginnerCourses$ = this.beginnerCourses$ = coures$
            .pipe(
                map(courses => courses.filter(c => c.category === 'BEGINNER'))
            );

        this.advancedCourses$ = this.beginnerCourses$ = coures$
            .pipe(
                map(courses => courses.filter(c => c.category === 'ADVANCED'))
            );
    }

}
