import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs!: Subscription;

  constructor() {

     /*
        this.retornaIntevarlo()
       .subscribe( console.log )

       igual
        this.retornaIntevarlo()
        .subscribe( (valor) => console.log( valor ) )

    */
    this.intervalSubs = this.retornaIntevarlo()
    .subscribe( console.log )

   }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }



   retornaIntevarlo(): Observable<number> {
    return interval(500)
    .pipe(
       take(10),
       map( valor => valor + 1),
       filter( value => value % 2 === 0)
       
    )
   }

}
