import { Component, Inject, OnDestroy, OnInit, Pipe } from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';
import { ServerInfo } from 'src/app/models/server-info.model';
import { Pipeline } from 'src/app/models/pipelines.model';
import { MonitorService } from 'src/app/services/monitor.service';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  pipeline: Pipeline
}

export class Info {
  url: string;
  serverInfo?: ServerInfo;
  pipelines?: Pipeline[];
}
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  panelOpenState = false;
  error: string;

  connections: Array<Info> = [];

  inputUrl:string = "";

  constructor( 
    private monitorService: MonitorService,
    public dialog: MatDialog
  ) {  }
  
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
    console.log(this.inputUrl);
    this.monitorService.startMonitoring(this.inputUrl);
    this.inputUrl = "";
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
  
  remove(cToRemove: Info) {
    this.monitorService.stopMonitoring(cToRemove.url)
    _.remove(this.connections, c => c.url === cToRemove.url)
  }


  openDialog(pipeline: Pipeline): void {
    const dialogRef = this.dialog.open(DialogReleaseDialog, {
      width: '500px',
      data: { pipeline },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('The dialog was closed', result);
        
      }
    });
  }

}

@Component({
  selector: 'dialog-release-dialog',
  templateUrl: 'dialog-release-dialog.html',
})
export class DialogReleaseDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogReleaseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

