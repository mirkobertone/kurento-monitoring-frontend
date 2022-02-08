import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';
import { ServerInfo } from 'src/app/models/server-info.model';
import { Pipelines } from 'src/app/models/pipelines.model';
import { MonitorService } from 'src/app/services/monitor.service';
import * as _ from 'lodash';
export class Info {
  url?: string;
  serverInfo?: ServerInfo;
  pipelines?: Pipelines[];
}
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  error: string;

  connections: Array<Info> = [];

  url:string = "";

  constructor( private monitorService: MonitorService ) {  }
  
  ngOnInit(): void {
    console.log("Monitor Component");
    this.monitorService.serverInfo.subscribe(info => {
      console.log("INFO", info);
      if(this.checkByUrl(info.url, this.connections) < 0) {
        this.connections.push({
          url: info.url
        })
      }
      const i = this.checkByUrl(info.url, this.connections);
      console.log(info, i);
      this.connections[i].serverInfo = info.serverInfo;
    });
  
    this.monitorService.pipelines.subscribe(pipelines => {
      console.log("Pipelines", pipelines);
      if(this.checkByUrl(pipelines.url, this.connections) < 0) {
        this.connections.push({
          url: pipelines.url
        })
      }
      const i = this.checkByUrl(pipelines.url, this.connections);
      console.log(pipelines, i);
      this.connections[i].pipelines = pipelines.pipelines;
    })

    this.monitorService.error.subscribe((error =>  {
      this.error = error;
      console.log(error);
    }))
  }
  
  startMonitoring() {
    console.log(this.url);
    
    this.monitorService.startMonitoring(this.url);
  }


  public checkByUrl(url: string, array: Array<any>): number {

    const index = array.map((e) => { return e.url; }).indexOf(url);
    return index;
  }
  stop(i: any) {
    console.log(i);
    
    // this.monitorService.stopMonitoring(url);
    // delete this.pipelines[url];
    // delete this.serverInfo[url]
  }
  
  // ngOnDestroy(): void {
  //   this.serverInfoSub.unsubscribe();
  // }

  log() {
    console.log(this.connections);
  }
  

}
