import axios from '~/lib/axios';
import { searchURL } from '~/lib/constants';
import { SearchResult } from '~/lib/models';
import { parse } from 'node-html-parser';

export const searchManga = async (keyword: string): Promise<SearchResult[]> => {
  try {
    const res = await axios.get(`${searchURL}/${keyword.toLowerCase().replace(' ', '_')}`, {
      responseType: 'document',
    });

    const root = parse(res.request._response);
    return root.querySelectorAll('div.search-story-item').map((a) => {
      const img = a.querySelector('a.item-img img')?.attributes.src;
      const details = a.querySelector('.item-right');
      const attr = details?.querySelector('h3 a.item-title')?.attributes;
      return {
        title: attr?.title ?? '',
        url: attr?.href ?? '',
        cover: img ?? '',
        authors:
          details
            ?.querySelector('span.item-author')
            ?.text.split(',')
            .map((author) => author.trim()) ?? [],
      };
    });
  } catch (err) {
    console.error(err);
    return [
      {
        title: '',
        url: '',
        cover: '',
        authors: [],
      },
    ];
  }
};
