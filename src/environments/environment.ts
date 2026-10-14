/**
 * Public site configuration. Everything here ships to the browser, so it must never hold secrets.
 *
 * HubSpot (free CRM → Marketing → Forms): create a form with the First name, Email and Message
 * fields, then copy the portal ID (Account ID) and the form GUID from the form's share/embed code.
 * While either value is empty the contact form falls back to opening the visitor's email app.
 */
export const environment = {
  hubspot: {
    portalId: '',
    formGuid: '',
  },
};
