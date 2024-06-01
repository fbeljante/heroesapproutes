import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heroes.interface';
import { ListPageComponent } from '../list-page/list-page.component';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public Hero?: Hero;

  constructor(
    private HeroesService: HeroesService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

    ngOnInit(): void {
      this.ActivatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.HeroesService.getHeroById(id)),
      ).subscribe ( hero => {
        if ( !hero ) return this.router.navigate([ '/heroes/list' ]);

        this.Hero = hero;
        return;
      })

    }

    goBack():void {
      this.router.navigateByUrl('/heroes/list');
    }

}
