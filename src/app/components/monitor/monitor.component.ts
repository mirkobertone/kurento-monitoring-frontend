import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';
import { ServerInfo } from 'src/app/models/server-info.model';
import { Pipelines } from 'src/app/models/pipelines.model';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit, OnDestroy {
  serverInfoSub: Subscription;
  pipelinesSub: Subscription;

  serverInfo: {[url: string]: ServerInfo};
  pipelines: {[url: string]: Pipelines[]};

  constructor( private monitorService: MonitorService ) {
    this.serverInfo = {};
    this.pipelines = {};
  }
  
  ngOnInit(): void {
    console.log("Monitor Component");
    this.serverInfoSub = this.monitorService.serverInfo.subscribe(info => {
      console.log("INFO", info);
      this.serverInfo[info.url] = info.serverInfo;
    });
  
    this.pipelinesSub = this.monitorService.pipelines.subscribe(pipelines => {
      console.log("Pipelines", pipelines);
      this.pipelines[pipelines.url] = pipelines.pipelines;
    })
  }
  
  start(url = "ws://0.0.0.0:8888/kurento") {
    this.monitorService.startMonitoring(url);
  }

  stop(url = "ws://0.0.0.0:8888/kurento") {
    this.monitorService.stopMonitoring(url);
    delete this.pipelines[url];
    delete this.serverInfo[url]
  }
  
  ngOnDestroy(): void {
    this.serverInfoSub.unsubscribe();
  }
}
