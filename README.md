Integrating some APIs.

1. Zenefits

   Zenefits provide a key to access the REST API. This key cand be found in: Dashboard -> Company Profile -> Custom Integrations.
   To access the endpoints you need to set the headers: { Authorization: Bearer {apiKey} }
   Zenefits endpoints: https://developers.zenefits.com/docs/overview

2) QuickBooks
   First you need to create an app from intuit developer dashboard: https://developer.intuit.com/app/developer/dashboard. This will generate your Client id and Client secret that you'll need for login. Here you also need to set your callback URL because this is how you receive the access token.

   For login you need to use their own library for JavaScript:
   https://github.com/intuit/oauth-jsclient
   https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0

   Define a GET method to listen on the callback URL to receive the realmId, access_token and refresh id.
   When making calls to get data from API, define the headers : { Authorization: 'Bearer {access_token},accept:'application/json'};
   API endpoints: https://developer.intuit.com/app/developer/qbo/docs/api/accounting/most-commonly-used/companyinfo#query-companyinfo

   Also you can use Intuit OAuth 2.0 Playground which basically simulates authentication process : https://developer.intuit.com/app/developer/playground

3) BambooHR

   To make an idea about this API: https://documentation.bamboohr.com/docs/getting-started.
   To get the API KEY for BambooHR, log in your BambooHR account, click on account icon, top-right corner and press on API KEYS. For authorization you'll need a little bit of extra work.
   a. Create a string which looks like: '{Api Key}:{Any string you want}'
   b. Encode this string in base64.
   c. Set headers: {Authorization: 'Basic {the encoded string}' , Accept: 'application/json'}
   BambooHR API endpoints: https://documentation.bamboohr.com/reference
