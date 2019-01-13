import { Observable, noop } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor() { }

    ngOnInit() {

        const http$ = Observable.create(observer => {

            fetch('/api/courses')
                .then(response => {

                    return response.json();

                })
                .then(body => {

                    observer.next(body);

                    observer.complete();

                })
                .catch(err => {

                    observer.error(err);

                });

        });

        http$.subscribe(
            courses => console.log(courses),

            // () => {}, --> using noop
            noop,

            () => console.log('completed'),

        );

    }

}
