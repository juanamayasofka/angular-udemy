import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {

public titulo!: string;  
public titulosSubs$!: Subscription;

  constructor(private router: Router) {

     this.titulosSubs$ =  this.getDataRuta()
                            .subscribe( ({ titulo }) => {
                                  this.titulo = titulo;
                                  document.title = titulo;
                            } );
   }
  ngOnDestroy(): void {
    this.titulosSubs$.unsubscribe();
  }


   getDataRuta() {

   return this.router.events
    .pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event:ActivationEnd) => event.snapshot.data ),
    )
   }
}
