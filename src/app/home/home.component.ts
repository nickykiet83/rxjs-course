import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';
import { noop, Observable, of, throwError } from 'rxjs';
import { map, shareReplay, tap, catchError, finalize } from 'rxjs/operators';

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
                catchError(err => {
                    console.error('Error occured', err);

                    return throwError(err);
                }),
                finalize(() => {

                    console.log('Finalize executed...');

                }),
                tap(() => console.log('HTTP Request executed!')),
                map(res => Object.values(res['payload'])),
                shareReplay(),
            );

        this.beginnerCourses$ = coures$
            .pipe(
                map(courses => courses.filter(c => c.category === 'BEGINNER'))
            );

        this.advancedCourses$ = coures$
            .pipe(
                map(courses => courses.filter(c => c.category === 'ADVANCED'))
            );
    }

}
