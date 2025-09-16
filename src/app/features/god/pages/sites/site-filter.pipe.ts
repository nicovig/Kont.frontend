import { Pipe, PipeTransform } from '@angular/core';
import { Site } from '../../../../models';

@Pipe({ name: 'siteFilter', standalone: true })
export class SiteFilterPipe implements PipeTransform {
  transform(sites: Site[], query: string): Site[] {
    if (!query) return sites;
    const q = query.toLowerCase();
    return sites.filter(s =>
      (s.name?.toLowerCase().includes(q)) ||
      (s.city?.toLowerCase().includes(q)) ||
      (s.address?.toLowerCase().includes(q)) ||
      (s.zipCode?.toLowerCase().includes(q)) ||
      (s.country?.toLowerCase().includes(q))
    );
  }
}


