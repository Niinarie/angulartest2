import { RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DigitransitService } from './../services/digitransit.service';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

  private dataInfo: any;
  private stopInfo: any;
  private positionInfo: Array<Object> = [];

  constructor(private digitransit: DigitransitService, private router: Router, private route: ActivatedRoute) {
    //this.router.navigate(['routes']);
   }

      getPositionById = (id: string) => {
    let positionForBus;
    this.digitransit.getPosition(id)
    .subscribe(
      (response: Array<any>) => {
      positionForBus = this.sortPositions(response)
      positionForBus = this.splicePositions(positionForBus);
      console.log(positionForBus);
      return positionForBus;
        });
  }

  splicePositions = (positions: Array<Object>) => {
      positions.length = 1;
      return positions;
  }

  sortPositions = (positions) => {
            var vehicles: Array<Object> = [];
            Object.keys(positions).forEach(function(id){
              Object.keys(positions[id]).forEach(function(it){
                var vehicle = positions[id][it];
                vehicles.push(vehicle);
              });
            });
            return vehicles;
          }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) =>
    this.digitransit.getRoutes(params['stop']))
        .subscribe(
          (res) => {
          this.dataInfo = res.data.stops[0].patterns;
          this.stopInfo = res.data.stops[0];

         for (let i = 0, l = this.dataInfo.length; i < l; i++) {

            this.digitransit.getPosition(this.dataInfo[i].route.gtfsId)
            .subscribe(
            (res) => {
            let positions = this.sortPositions(res);
            positions = this.splicePositions(positions);

            this.dataInfo[i].lat = positions;
            this.dataInfo[i].long = positions;
            console.log(positions);
            });
    }

        // 'HSL:2235N'


        /*  for (let i = 0, l = this.dataInfo.length; i < l; i++) {

            let id = this.dataInfo[i].route.gtfsId;
            this.dataInfo[i].lat = landl.lat;
            this.dataInfo[i].long = landl.long;

          } */
        });

  }
}

