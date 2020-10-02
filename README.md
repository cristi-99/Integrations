Integrating some APIs.

1. Zenefits

2) QuickBooks
   First you need to create an app from intuit developer dashboard: https://developer.intuit.com/app/developer/dashboard. This will generate your Client id and Client secret that you'll need for login. Here you also need to set your callback URL because this is how you receive the access token.

   For login you need to use their own library for JavaScript:
   https://github.com/intuit/oauth-jsclient
   https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0

   Define a GET method to listen on the callback URL to receive the realmId, access_token and refresh id.
   When making calls to get data from API, define the headers : { Authorization: 'Bearer {access_token},accept:'application/json'};
   API endpoints: https://developer.intuit.com/app/developer/qbo/docs/api/accounting/most-commonly-used/companyinfo#query-companyinfo
