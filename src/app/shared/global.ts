'use strict';
declare const Buffer;

import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

export const sep = '/';
// export const version = '0.43a'; in wild release
// added beforeunload on start
// moved disable = true; in start
// change send to spend
export const version = '0.05';
// fix https://stackoverflow.com/a/50390802/344050

// export const isDesktopDevice: boolean;

// https://stackoverflow.com/a/9039885/344050
export const apple = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
// export const bitcoin = require('bitcoinjs-lib');

export const Nationality = ['', 'Angola', 'Botswana', 'Congo', 'Kenya'
  , 'Lesotho', 'Malawi', 'Mozambique', 'Namibia', 'Nigeria', 'South Africa', 'Swaziland', 'Uganda', 'Zambia', 'Zimbabwe'];
export const MaritalStatus = ['', 'Single', 'Married', 'Divorced', 'Widowed'];
// export const StateOfHealth = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const Province = ['', 'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo'
  , 'Mpumalanga', 'North Cape', 'North West', 'Western Cape'];
  // tslint:disable-next-line:max-line-length
export const Qualifications = ['', 'National Certificate', 'Higher National Certificate', 'National Diploma', 'Higher National Diploma', 'Bachelor Degree'
  , '	Masters Degree', 'Doctoral Degree', 'PhD'];
export const Support = ['', 'Website', 'Validation', 'Certification', 'General'];
// export let descriptors: any;

export const fees = 0.00003;
export const dust = 0.00000547;


// tslint:disable-next-line:max-line-length
export const Loading = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';


// export const favURL = 'http://favour.bquest.co.za/favour/server/fav-api.php'; // must still create
export const favURL = 'https://server.bquest.cash/fav/fav-api.php';
// export const waURL = 'https://server.bquest.cash/nice/bq-web.php';

export const SMS_SERVICE_NO = '27767449983';

export interface JwtJson {
  jwt: string;
}

export let JwtData: JwtJson;

export function setJwtData(newJwt) {
  JwtData = newJwt;
}

export interface CirclesJson {
  id: string;
  name: string;
  owner: string;
  lastName: string;
  can_leaf: boolean;
  root: string;
  description: string;
}

export let circlesData: [CirclesJson];

export function setCirclesData(theCirclesData: [CirclesJson]) {
  circlesData = theCirclesData;
}

export enum questionType {
  single = 1,
  multiple,
  calculated,
  poll,
}

export interface QuestionJson {
  id: number;
  type: questionType;
  circle: CirclesJson;
  details: string;
  active: boolean;
  creator: number;
  checker: number;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  answer6: string;
  number_times_used: number;
  last_used: boolean;
}

export let questionsData: [QuestionJson];

export function setQuestionsData(theQuestionsData: [QuestionJson]) {
  questionsData = theQuestionsData;
}

export interface ManagedJson {
  id: number;
  user_id: number;
  username: string;
  cash_account: string;
  emoji: string;
  public_address: string;
  slp_address: string;
  circles: [number];
  circles_text: [string];
}

export let managedData: [ManagedJson];

export function setManagedData(theManagedData: [ManagedJson]) {
  managedData = theManagedData;
}

const headers = new HttpHeaders({'Content-Type': 'application/json'});

export const apiHeader = {
  headers,
  withCredentials: true,
  logLevel: 'debug',
  target: 'https://localhost:4200',
  changeOrigin: true,
};

//  apiHeader;

export interface FinTekJson {
  id: number;
  codeName: string;
  name: string;
  // level_value: number;
  base: string;
  type: string;
  // oracle: number,
}

export interface LoggedUserJson {
  username: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  publicKey: string;
  studentNo: string;
  emoji: number;
}


export let loginUser: LoggedUserJson =  {
  userId: 1016,
  username: 'Sydwell' ,
  firstName: '',
  email: '',
  emoji: 22,
  lastName: '',
  mobile: '27822007113',
  publicKey: 'bitcoincash:qpf459u0s4rh9nqzyhxacz530u0hz305hullv9e9ue',
  studentNo: '234'
};

/**
 * Only the request response
 * As heavy lifting done by asychronous server daemon
 *
 */
export interface OtpJson {
  response: string;
  mobile_no: string;
  uid: number;
}

export interface PaymentRequest {
  amount: number;
  address: string;
  detail: string;
}

export let nonce = '';
export function setNonce(): void {
  if (nonce === '') {
    nonce = Math.floor(Math.random() * 1000000000) + 'MX';
  }
}

export let eMobile: string;
export function setEMobile(newEMobile: string): void {
  eMobile = newEMobile;
}

let genericHeader =  {} as HttpHeaders;

export function setGenericHeader(genHeader: HttpHeaders): void {
  genericHeader = genHeader;
}

export function getGenericHeader(): { headers: HttpHeaders } {
  return { headers: genericHeader };
}

export let finTek: [FinTekJson];

export function setFinTek(theFinTek: [FinTekJson]) {
  finTek = theFinTek;
}

/**
 *  Checks if a variable has a real value
 *
 */
export function anything(variable: any): boolean {
  if (variable === null || variable === undefined) {
    return false;
  }
  if (typeof variable === 'string' && variable === '') {
    return false;
  }
  return true;
}

/**
 * Converts a MySql string to date time
 * Possible improvement for only dates
 *
 */
export function mySql2DateTime(mysqlDateTimeStr: string): Date {
  const a = (mysqlDateTimeStr).split(' ');
  const d = a[0].split('-');
  const t = a[1].split(':');
  return new Date(+d[0], (+d[1] - 1), +d[2], +t[0], +t[1]);
}

export interface SingleJson {
  table: string;
  column: string;
  value: string;
  id: number;
  idColumn: string;
}

export interface HistoryJson {
  spend: string;
  credit: string; // Sent or Received
  target: string;
  // level_value: number;
  date: number;
  amount: number;
  txid: string;
}

export interface LoginJson {
  mobileNumber: string;
  otp: string; // Sent or Received
}

export interface GenericResponseJson {
  returned: string;
  value: string;
}

/**
 * Returns the  url field value
 * If no field supply returns an object with all fields as fields
 *
 */
export function getSearchParams(field?: string) {
  const p = {};
  // location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(s, ki, v) { p[ki] = v; return v; });
  location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (s, ki, v) => { p[ki] = v; return v; });
  return field ? p[field] : p;
}

/**
 *
 * https://stackoverflow.com/a/50767210/344050
 * @export
 *
 */
export function bufferToHex(buffer: any): string {
  return Array
    .from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

interface EnumItem<E> { id: E; name: string; }

export function enumToArray<E>(Enum: string): EnumItem<E>[] {
    return Object.keys(Enum).map(key => ({id: Enum[key], name: key} as EnumItem<E>));
}


const pizza = [128123, 128018, 128021, 128008, 128014, 128004, 128022, 128016, 128042, 128024, 128000, 128007, 128063,
  129415, 128019, 128039, 129414, 129417, 128034, 128013, 128031, 128025, 128012, 129419, 128029, 128030,
  128375, 127803, 127794, 127796, 127797, 127809, 127808, 127815, 127817, 127819, 127820, 127822, 127826,
  127827, 129373, 129381, 129365, 127805, 127798, 127812, 129472, 129370, 129408, 127850, 127874, 127853,
  127968, 128663, 128690, 9973, 9992, 128641, 128640, 8986, 9728, 11088, 127752, 9730, 127880, 127872, 9917,
  9824, 9829, 9830, 9827, 128083, 128081, 127913, 128276, 127925, 127908, 127911, 127928, 127930, 129345,
  128269, 128367, 128161, 128214, 9993, 128230, 9999, 128188, 128203, 9986, 128273, 128274, 128296, 128295,
  9878, 9775, 128681, 128099, 127838];

export function unicode2position(unicode) {
  return pizza.indexOf(unicode);
}

export function position2unicode(index) {
 // return '&#' + pizza[index] + ';';
 return pizza[index];
}
