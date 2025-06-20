/* eslint-disable prettier/prettier */
export interface EmailOptions {
  to: string | string[];
  subject: string;
  template: string;
  context?: { [key: string]: any };
  [key: string]: any;
}
