import awardData from './badgeworkAwards.json';
import { badgeworkPhotos } from './badgeworkPhotos.js';

export const handbookUrl = 'https://drive.google.com/file/d/1Y-ODNerGZNOqOA-_qecDnBvdF-bgQ9Hl/view?usp=sharing';

const featuredOrder = ['christian-education', 'first-aid', 'financial-stewardship'];
const priority = (award) => {
  const index = featuredOrder.indexOf(award.id);
  return index === -1 ? featuredOrder.length : index;
};

export const badgeworkAwards = [...awardData]
  .sort((a, b) => priority(a) - priority(b) || Math.min(...a.sourcePages) - Math.min(...b.sourcePages))
  .map((award) => ({ ...award, photos: badgeworkPhotos[award.id] || [] }));
