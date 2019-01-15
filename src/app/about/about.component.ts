import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, interval, merge, Observable } from 'rxjs';
import { concat } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
    private result$: Observable<any>;
    constructor() { }

    ngOnInit() {
        const interval1$ = interval(1000);

        const interval2$ = interval1$.pipe(map(val => 10 * val));

        this.result$ = merge(interval1$, interval2$);

        this.result$.subscribe(console.log);

    }

    ngOnDestroy() {
        console.log('destroyed');

        this.result$.subscribe().unsubscribe();
    }

}
