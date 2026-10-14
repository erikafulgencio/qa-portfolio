/**
 * Public site configuration. Everything here ships to the browser, so it must never hold secrets.
 *
 * HubSpot contact form, copied from the form's embed code (HubSpot → Marketing → Forms → Share → Embed):
 *   <script src="{embedScript}" defer></script>
 *   <div class="hs-form-frame" data-region="{region}" data-form-id="{formId}" data-portal-id="{portalId}"></div>
 * The form's fields, styling and CAPTCHA are all managed in HubSpot's form editor.
 */
export const environment = {
  hubspot: {
    embedScript: 'https://js-na2.hsforms.net/forms/embed/247691262.js',
    region: 'na2',
    portalId: '247691262',
    formId: '33284959-3f74-4e50-a920-75e617be1b7d',
  },
};
