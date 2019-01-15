import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, interval, merge, Observable, Subscription } from 'rxjs';
import { concat } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    constructor() { }

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');
        this.sub = http$.subscribe(console.log);

        setTimeout(() => {
            this.sub.unsubscribe();
        }, 0);
    }

    ngOnDestroy() {
        console.log('destroyed');
        this.sub.unsubscribe();
    }

}
