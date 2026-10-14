/**
 * Public site configuration. Everything here ships to the browser, so it must never hold secrets.
 *
 * HubSpot form that receives contact messages (HubSpot → Marketing → Forms). The IDs come from the
 * form's embed code: data-portal-id and data-form-id. The form's CAPTCHA must be turned off
 * (form → Options/Settings), otherwise HubSpot rejects submissions from the site's own form.
 * Leave either value empty to fall back to opening the visitor's email app.
 */
export const environment = {
  hubspot: {
    portalId: '247691262',
    formGuid: '33284959-3f74-4e50-a920-75e617be1b7d',
  },
};
