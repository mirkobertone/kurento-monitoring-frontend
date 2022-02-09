export class ServerInfoDTO {
  url: string;
  serverInfo: ServerInfo
}

export class ServerInfo {
  usedMemory: number;
  version: string;
  type: string;
  usedCpu: number;
}
