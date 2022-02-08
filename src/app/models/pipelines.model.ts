export class PipelinesDTO {
  url: string;
  pipelines: Pipeline[]
}

export class Pipeline {
  name: string;
  childrens: any;
  type: string;
  creationTime: Date;
  id: string;
}
