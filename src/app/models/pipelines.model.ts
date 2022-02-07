export class PipelinesDTO {
  url: string;
  pipelines: Pipelines[]
}

export class Pipelines {
  name: string;
  childrens: any;
  type: string;
  creationTime: Date;
  id: string;
}
