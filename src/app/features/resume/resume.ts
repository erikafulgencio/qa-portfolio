import { ChangeDetectionStrategy, Component } from '@angular/core';

import type { ChartBar, IconName } from '../../content/models';
import { COMPETENCIES, EXPERIENCE_CHART, JOBS } from '../../content/experience';
import { PROFILE } from '../../content/profile';
import { ImagePlaceholder } from '../../shared/image-placeholder';

const LEVEL_LABEL: Record<ChartBar['level'], string> = {
  junior: 'Junior',
  mid: 'Mid-level',
  lead: 'Lead',
};

@Component({
  selector: 'app-resume-page',
  imports: [ImagePlaceholder],
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResumePage {
  protected readonly profile = PROFILE;
  protected readonly chart = EXPERIENCE_CHART;
  protected readonly jobs = JOBS;
  protected readonly competencies = COMPETENCIES;
  protected readonly levels = Object.entries(LEVEL_LABEL) as [ChartBar['level'], string][];
  protected readonly levelLabel = LEVEL_LABEL;

  protected readonly education = {
    degree: 'Bachelor of Science in Computer Studies',
    major: 'Major in Information Technology',
    school: "Pamantasan ng Lungsod ng Maynila · Dean's Lister",
  };

  protected readonly domains: { icon: IconName; label: string }[] = [
    { icon: 'ph-first-aid-kit', label: 'Telemedicine & Health' },
    { icon: 'ph-storefront', label: 'Retail POS, KDS & Kiosks' },
    { icon: 'ph-gas-pump', label: 'Fuel POS with pump integration' },
    { icon: 'ph-chat-circle-dots', label: 'AI chatbot (Web and Mobile)' },
    { icon: 'ph-globe', label: 'CMS & SEO-critical web' },
  ];

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
