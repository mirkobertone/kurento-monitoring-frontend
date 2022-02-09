export class PipelinesDTO {
  url: string;
  pipelines: Pipeline[]
}

export class Pipeline {
  name: string;
  children: any;
  type: string;
  creationTime: Date;
  id: string;
}
