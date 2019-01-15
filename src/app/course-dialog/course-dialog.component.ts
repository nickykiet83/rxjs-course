import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { filter, map, mergeMap, concatMap, exhaustMap } from 'rxjs/operators';

import { Course } from '../model/course';
import { fromEvent } from 'rxjs';



@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    course: Course;

    @ViewChild('saveButton') saveButton: ElementRef;

    @ViewChild('searchInput') searchInput: ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });

    }

    ngOnInit() {
        this.form.valueChanges
            .pipe(
                filter(() => this.form.valid),
                // map(values => JSON.stringify(values)),
                concatMap(changes => this.saveCourse(changes)),
                // mergeMap(changes => this.saveCourse(changes))
            )
            .subscribe();
    }

    saveCourse(changes) {
        return fromPromise(fetch(`/api/courses/${this.course.id}`, {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {
                'content-type': 'application/json'
            }
        }));
    }



    ngAfterViewInit() {
        fromEvent(this.saveButton.nativeElement, 'click')
            .pipe(
                exhaustMap(() => this.saveCourse(this.form.value)),
            )
            .subscribe();
    }



    close() {
        this.dialogRef.close();
    }

}
