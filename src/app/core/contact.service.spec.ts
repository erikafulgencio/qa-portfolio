import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ContactService, HUBSPOT_SUBMIT_URL } from './contact.service';
import type { ContactForm } from './contact-validators';

const form: ContactForm = {
  name: ' Jane Tester ',
  email: 'Jane@Acme.io',
  title: 'QA Lead role',
  message: 'We need someone to rebuild our regression strategy.',
};

describe('ContactService', () => {
  let service: ContactService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContactService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  describe('with HubSpot configured', () => {
    beforeEach(() => (service.config = { portalId: '123', formGuid: 'abc-guid' }));

    it('posts normalized default contact properties to the Forms v3 endpoint', async () => {
      const sent = service.send(form);
      const req = http.expectOne(`${HUBSPOT_SUBMIT_URL}/123/abc-guid`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body.fields).toEqual([
        { objectTypeId: '0-1', name: 'firstname', value: 'Jane Tester' },
        { objectTypeId: '0-1', name: 'email', value: 'jane@acme.io' },
        {
          objectTypeId: '0-1',
          name: 'message',
          value: 'Subject: QA Lead role\n\nWe need someone to rebuild our regression strategy.',
        },
      ]);
      expect(req.request.body.context.pageName).toBeDefined();
      req.flush({ inlineMessage: 'Thanks' });
      await expect(sent).resolves.toBe('sent');
    });

    it('rejects when HubSpot answers with an error', async () => {
      const sent = service.send(form);
      http
        .expectOne(`${HUBSPOT_SUBMIT_URL}/123/abc-guid`)
        .flush({ status: 'error' }, { status: 400, statusText: 'Bad Request' });
      await expect(sent).rejects.toBeTruthy();
    });
  });

  describe('without HubSpot configuration', () => {
    beforeEach(() => (service.config = { portalId: '', formGuid: '' }));

    it('reports that it will fall back to mailto', () => {
      expect(service.usesHubSpot).toBe(false);
    });

    it('builds an encoded mailto link with subject and signed body', () => {
      const href = service.mailtoHref({ ...form, name: 'Jane', email: 'jane@acme.io' });
      expect(
        href.startsWith('mailto:m.erika.fulgencio@gmail.com?subject=QA%20Lead%20role&body='),
      ).toBe(true);
      expect(decodeURIComponent(href.split('body=')[1])).toContain('— Jane (jane@acme.io)');
    });
  });
});
