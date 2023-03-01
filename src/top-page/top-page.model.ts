import { index, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum eTopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
  @prop()
  count: number;

  @prop()
  junSalary: number;

  @prop()
  midSalary: number;

  @prop()
  senSalary: number;
}

export class AdvantageData {
  @prop()
  title: string;

  @prop()
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TopPageModel extends Base {}
@index({ '$**': 'text' })
export class TopPageModel extends TimeStamps {
  @prop({ enum: eTopLevelCategory })
  firstCategory: eTopLevelCategory;

  @prop()
  secondCategory: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  title: string;

  @prop()
  category: string;

  @prop({ type: () => HhData })
  hh?: HhData;

  @prop({ type: () => [AdvantageData] })
  advantages: AdvantageData[];

  @prop()
  seoText: string;

  @prop()
  tagsTitle: string;

  @prop({ type: () => [String] })
  tags: string[];
}
