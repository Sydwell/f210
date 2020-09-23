import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, throwError, of } from 'rxjs';
import { map, takeUntil, tap, catchError } from 'rxjs/operators';
import * as Global from './global';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtJson } from './global';
import { CookieService } from 'ngx-cookie-service';
// import { CirclesJson } from './global';
// import * as BITBOXSDK from 'bitbox-sdk/lib/bitbox-sdk';


declare const Buffer;
@Injectable()

/**
 * This service manages the navigation location of our application
 *
 */
export class ApiService {


  /* Subscribe to this field to be notified of changes in the location*/
  // messageSource = new Rx.BehaviorSubject<string>('landing2');
  private currentLocation: string;
  private disableActivatedBtn = true;
  private descriptors: [[string]];
  private loggedInUser: Global.LoggedUserJson;
  // BitBox = new BITBOXSDK.default();

  public constructor(private http: HttpClient, private cookie: CookieService) { }

  public doStartup(): Observable<[Global.CirclesJson]> {
    console.log(' doStartup. ');

    const paramBody = {
      action: 'getCircles'
    };
    // const headers = new HttpHeaders({'Content-Type': 'application/json'}); , { headers, withCredentials: true }
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: any) => {
          console.log(' testing');
          this.cookie.set('madness', 'really');
         // console.log(response[0].name);
         // let loginObj: any;
          try {
            this.descriptors = response;
            console.log(response[5]);
          } catch (objError) {
            console.log('Unable to get cirlces.');
            throw new Error('Unable to get cirlces.');
          }
        }),
        catchError(error => {
           // alert (' ERROR ' + error.error);
            console.log (' doStartup catchError ' + error.error);
            console.dir (error.error);
            return of(false);
        })
    );
  }

  public getDescriptors(): [[string]] {
    return this.descriptors;
  }

  /**
   * doOtpRequest is a singleton service that will access the one and only database
   *
   */
  public doOtpRequest(loginData: Global.LoginJson): Observable<Global.OtpJson> {
    // TODO also check if not login
    const sa =  '27' + loginData.mobileNumber.substr(1);
    console.log('sa ' + sa);
    const paramBody = {
      prop1: sa,
      // mobileNumber: sa,
      action: 'genOTP',
      // date: 'date',
      external: true,
    };
    // const headers = new HttpHeaders({'Content-Type': 'application/json'}); , { headers, withCredentials: true }
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),

        tap((response: Global.OtpJson) => {
           console.log('doOtpRequest testing ' + response.uid);
           console.log(response);
           Global.loginUser.userId = response.uid;
          // do (()=> {
          //   return { response: 'OTP sent as a WhatsApp message!', mobile_no: sa };
          // })
          // console.log(response);
          // let loginObj: Global.OtpRequestResponseJson;
          // try {
          // //  loginObj = JSON.parse(response) as Global.OtpRequestResponseJson;
          //   loginObj = {response: 'OTP sent as a WhatsApp message!', mobile_no: sa};
          // } catch (objError) {
          //   loginObj = {response: 'error: No response', mobile_no: ''};
          // }
          // console.log(" loginObj " + loginObj);
          // //return {response: 'OTP sent as a WhatsApp message!', mobile_no: sa};
        })

      // TODO
      //  catchError(this.handleError)
    );
  }

  /**
   * doLogin is a singleton service that wil access the one and only database
   *
   *
   */
  public doLogin(loginData: Global.LoginJson ): Observable<JwtJson> {
    // TODO also check if not login
    const sa =  '27' + loginData.mobileNumber.substr(1);
    console.log('sa ' + sa);
    const paramBody = {
      action: 'webLogin',
      prop1: Global.loginUser.userId,
      prop2: loginData.otp
     // external: true,
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: JwtJson) => {
          console.log(' Test login');
          // console.log(response);
          // let loginObj: any;
          // try {
          //   loginObj = JSON.parse(response) as Global.LoggedUserJson;
          // } catch (objError) {
          //   throw new Error('Unable to login');
          // }
        }),
        // TODO
          catchError(error => {
            alert (error.error);
            console.log (error);
            return of({jwt: 'login fail'}); // Note API also returns this on failure
          })
    );
  }


  public doGetQuestions(): Observable<[Global.QuestionJson]> {
    // TODO also check if not login

    const paramBody = {
      action: 'getQuestions'
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: [Global.QuestionJson]) => {
          console.log(' testing');
          console.log(response);
          response.forEach((element) => { // Assign the actual circle object
            Global.circlesData.forEach((cir) => {
              if (cir.id === element.circle as unknown ) {
                element.circle = cir;
              }
            });
          });
          // Global.setUserJWT(response);
          //   Global.processJWT(response.jwt);
          //   console.log(Global.tokenInfo);
          //  const hd = new HttpHeaders().set('Authorization', response.jwt);
          // console.log(hd);
          //  Global.setGenericHeader(hd);
        })
      // TODO
      //  catchError(this.handleError)
    );
  }

  public createCircle(parentCircle: number, circleName: string): Observable<string> {
    // TODO also check if not login
    const paramBody = {
      action: 'createCircle'
      , prop1: parentCircle
      , prop2: circleName
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        tap((response: string) => {
          console.log(`createCircle : ${circleName}  parentCircle ${parentCircle} `);
          console.log(response);
          // Global.setUserJWT(response);
          //   Global.processJWT(response.jwt);
          //   console.log(Global.tokenInfo);
          //  const hd = new HttpHeaders().set('Authorization', response.jwt);
          // console.log(hd);
          //  Global.setGenericHeader(hd);
        }),
      // TODO
      //  catchError(this.handleError)
    );
  }

  public createOrEditQuestion(newQuestionParm: Global.QuestionJson, creating: boolean) {
   // const newQuestion = newQuestionParm;
    let theAction = 'editQuestion';
    if (creating) {
      theAction = 'createQuestion';
    }
    console.log('Called ' + creating + ' ' + theAction);
    console.log(newQuestionParm);
    // newQuestion.circle = newQuestion.circle.id as unknown as Global.CirclesJson;
    const paramBody = {
      action: theAction,
      prop1: newQuestionParm,
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: Global.GenericResponseJson) => {
          console.log(' theAction ' + theAction + ' response ' + response.returned);
          console.log(' The question id ' + response.value);
        }),
      // TODO
        catchError(error => {
          alert (error.error);
          console.error(error);
          return of(false);
        })
    );
  }

  public removeQuestion(qId: number) {
    console.log('Called createQuestion ');
    const paramBody = {
      action: 'removeQuestion',
      prop1: qId
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: any) => {
          console.log(' removeQuestion ');
          console.log(response);
        }),
    );
  }

  public makeAvailable(qId: number, circleId: string) {
    console.log(`Called makeAvailable qId ${qId} circleId ${circleId} `);
    const paramBody = {
      action: 'makeAvailable',
      prop1: qId,
      prop2: circleId
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: any) => {
          console.log(' makeAvailable response');
          console.log(response);
        }),
    );
  }

  public doRegistration(registrationData: {any}): Observable<string> {
    // TODO also check if not login

    const paramBody = {
      action: 'register'
      , prop1: registrationData
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: any) => {
          console.log(' testing');
          console.log(response);
          let loginObj: any;
          try {
            loginObj = JSON.parse(response);
          } catch (objError) {
            throw new Error('Unable to register');
          }
        }),
      // TODO
      //  catchError(this.handleError)
    );
  }

  public createFavour(registrationData: {any}): Observable<string> {
    // TODO also check if not login
    console.log(registrationData);
    const paramBody = {
      action: 'createFavour'
      , prop1: registrationData
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: any) => {
          console.log(' testing');
          console.log(response);
          let loginObj: any;
          try {
            loginObj = JSON.parse(response);
          } catch (objError) {
            throw new Error('Unable to createFavour');
          }
        }),
      // TODO
      //  catchError(this.handleError)
    );
  }
  public addUser2Circle(circleData: string, userId: number): Observable<string> {
    // TODO also check if not login
    console.log(` addUser2Circle ${circleData} userId ${userId}`);
    const paramBody = {
      action: 'addUser2Circle'
      , prop1: circleData
      , prop2: userId
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: any) => {
          console.log(' testing');
          console.log(response);
          // let loginObj: any;
          // try {
          //   loginObj = JSON.parse(response);
          // } catch (objError) {
          //   throw new Error('Unable to addUser2Circle');
          // }
        }),
        catchError(error => {
          alert (error.error);
          console.log (error);
          return of(false);
        })
    );
  }

  public removeUserFromCircle(circleData: string, userId: number): Observable<Global.GenericResponseJson> {
    // TODO also check if not login
    // console.log(registrationData);
    const paramBody = {
      action: 'removeUserFromCircle'
      , prop1: circleData
      , prop2: userId
    };
    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: Global.GenericResponseJson) => {
          console.log(' testing');
          console.log(response);
        }),
        catchError(error => {
          alert (error.error);
          console.log (error);
          // const errObj : GenericResponseJson = {};
          // return { returned: 'Error',
          //   value: ''};
          return of ({ returned: 'Error',  value: error.error });
         // return throwError(error);
        })
    );
  }

  public getManagedData(): Observable<[Global.ManagedJson]> {
    const paramBody = {
      action: 'getManagedData'
    };

    return this.http.post(Global.favURL, JSON.stringify(paramBody), Global.apiHeader) // , Global.getGenericHeader()
      .pipe(
        // tap => console.log('getInteractions: ' + data),
        tap((response: [Global.ManagedJson]) => {
          console.log(' testing');
         // console.log(response[0].name);
         // let loginObj: any;
         // response.map();
          try {
           // this.descriptors = response;
            // const re = response.map(x =>  {
            //   x.circles = [4];
            //   return x;
            // });
            // response = re[0];

            console.log(response);
          } catch (objError) {
            throw new Error('Unable to getManagedData.');
          }
        }),
        // TODO
          // catchError(error => {
          //   alert (error.error);
          //   console.log (error);
          //   return of(false);
          // })
    );
  }

  getLoginUser(): Global.LoggedUserJson {
    return this.loggedInUser;
  }

  setLoginUser(log: Global.LoggedUserJson) {
    this.loggedInUser = log;
  }
}


  // /**
  //  * All about satoshis
  //  * @param amount
  //  * @param whereAddress
  //  */
  // public checkEWP(thePin: string, ecn: string): Observable<{ jwt }> {
  //   const sshn = this.generateSSHN(thePin);
  //   const paramBody = {
  //     'action': 'checkEWP'
  //     , 'info': { thePin: sshn, ecn: ecn }
  //   };
