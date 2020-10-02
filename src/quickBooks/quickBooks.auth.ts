import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as OAuthClient from 'intuit-oauth';

@Injectable()
export class QuickBooksLogin {
  authClient;
  authUri;
  constructor() {
    this.authClient = new OAuthClient({
      clientId: 'ABCdynxll3VSz2Lz7HRdFefolg82Gf4JbEmtKghZMfYbroUrSl',
      clientSecret: 'kO14uwfVbpkcUcA2PD7zr2wN94Ythto1LzWnIlTT',
      environment: 'sandbox',
      redirectUri: encodeURI('https://4f7b22a7645c.ngrok.io/quickbooks/listen'),
    });

    this.authUri = this.authClient.authorizeUri({
      scope: [
        OAuthClient.scopes.Accounting,
        OAuthClient.scopes.OpenId,
        OAuthClient.scopes.Profile,
      ],
      state: 'testState',
    });
  }

  getToken() {
    return this.authClient.token.getToken();
  }

  async signIn(url: string) {
    let access_token: string;
    await this.authClient
      .createToken(url)
      .then(resp => {
        access_token = JSON.stringify(resp.getJson());
      })
      .catch(function(e) {
        console.error('The error message is :' + e.originalMessage);
        console.error(e.intuit_tid);
        throw new HttpException(e.originalMessage, HttpStatus.BAD_REQUEST);
      });
    return access_token;
  }

  checkToken() {
    if (this.authClient.isAccessTokenValid()) {
      return true;
    } else return false;
  }

  async refreshToken() {
    let access_token: string;
    await this.authClient
      .refresh()
      .then(resp => {
        access_token = JSON.stringify(resp.getJson());
      })
      .catch(function(e) {
        console.error('The error message is :' + e.originalMessage);
        console.error(e.intuit_tid);
        throw new HttpException(e.originalMessage, HttpStatus.BAD_REQUEST);
      });
    return access_token;
  }
}
