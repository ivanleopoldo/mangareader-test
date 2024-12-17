import axios from '~/lib/axios';
import { searchURL } from '~/lib/constants';
import { SearchResultList } from '~/lib/models';
import { parse } from 'node-html-parser';
import { getSearchParam } from '~/lib/utils';

export const MangaService = {
  searchManga: async (keyword: string, pageNumber: number): Promise<SearchResultList | null> => {
    try {
      const res = await axios.get(`${searchURL}/${keyword.toLowerCase().replace(' ', '_')}`, {
        responseType: 'document',
        params: {
          page: pageNumber,
        },
      });

      const root = parse(res.request._response);

      let lastPageNumber = 1;
      let currentPageNumber = 1;

      if (root.querySelector('div.panel-page-number')) {
        lastPageNumber = eval(
          getSearchParam(root.querySelector('a.page-last')?.attributes.href, 'page') ?? '1'
        );
        currentPageNumber = eval(root.querySelectorAll('a.page-blue')[1].text ?? '1');
      }
      const page = root.querySelectorAll('div.search-story-item').map((a) => {
        const imgParent = a.querySelector('a.item-img');
        const img = imgParent?.querySelector('img')?.attributes.src;
        const details = a.querySelector('.item-right');
        const attr = details?.querySelector('h3 a.item-title')?.attributes;
        return {
          id: imgParent?.attributes['data-id'] ?? '',
          title: attr?.title ?? '',
          url: attr?.href ?? '',
          cover: img ?? '',
        };
      });
      return {
        results: page,
        next: currentPageNumber < lastPageNumber ? currentPageNumber + 1 : null,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  getManga: async (url: string) => {
    try {
      const res = await axios.get(url, {
        responseType: 'document',
      });

      const root = parse(res.request._response);
      const detailsDiv = root.querySelector('div.panel-story-info');
      const chaptersDiv = root.querySelector('div.panel-story-chapter-list');

      const img = detailsDiv?.querySelector('img.img-loading')?.attributes.src;
      const description = detailsDiv?.querySelector('div.panel-story-info-description')?.text;

      return {
        cover: img,
        summary: description,
      };
    } catch (err) {}
  },
};
