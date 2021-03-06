import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PipelinesDTO } from '../models/pipelines.model';
import { ServerInfoDTO } from '../models/server-info.model';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  serverInfo = this.socket.fromEvent<ServerInfoDTO>('serverInfo');
  pipelines = this.socket.fromEvent<PipelinesDTO>('pipelines');

  error = this.socket.fromEvent<string>('app:error');

  constructor( private socket: Socket ) { }

  startMonitoring(url: string) {
    this.socket.emit("monitor:start", { url })
  }

  stopMonitoring(url: string) {
    this.socket.emit("monitor:stop", { url })
  }

  releaseElements(url: string, ids: string[]) {
    this.socket.emit("kurento:release", {url, ids});
  }
}
