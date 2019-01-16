import { RxJsLoggingLevel, setRxJsLoggingLevel } from './../common/debug';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, debounce, throttle, throttleTime
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, interval, forkJoin} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { searchLessons } from '../../../server/search-lessons.route';
import { debug } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {
    courseId: string;
    course$: Observable<Course>;

    lessons$: Observable<Lesson[]>;

    @ViewChild('searchInput') input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];

        const course$ = createHttpObservable(`/api/courses/${this.courseId}`);

        const lessons$ = this.loadLesson();

        forkJoin(course$, lessons$)
            .pipe(
                tap(([course, lessons]) => {
                    console.log(course);
                    console.log(lessons);
                })
            )
            .subscribe();
    }

    loadLesson(search = ''): Observable<Lesson[]> {
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
            .pipe(
                map(res =>  res['payload'])
            );
    }

    ngAfterViewInit() {
        fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                throttleTime(500)
            );
    }

}
