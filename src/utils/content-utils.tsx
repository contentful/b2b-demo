import { ICONS } from '@/components/designSystem';
import { Asset, BaseEntry, Entry } from 'contentful';

export const getAssetUrl = (asset: Asset | null): string | null => {
  if (!asset) return null;
  return asset?.fields.file?.url as string;
};

export const getContentType = (entry: BaseEntry): string => {
  return entry.sys.contentType.sys.id;
};

export const getLinkedAsset = (
  id: string,
  assets: Array<Asset>
): Asset | null => {
  if (!id) return null;
  return assets.find((asset) => asset.sys.id === id);
};

export const getLinkedEntry = (
  id: string,
  entries: Array<Entry>
): Entry | null => {
  return entries.find((entry) => entry.sys.id === id);
};

export const getSocialChannelName = (url: string | null): string | null => {
  if (!url) return null;
  const capturingRegex = /(?:facebook|twitter|instagram|linkedin|youtube)/;
  return '' + url.match(capturingRegex);
};

export const getSocialIcon = (channel: string | null): [string, any] | [] => {
  if (!channel) [];
  let color, icon;

  switch (channel) {
    case 'facebook':
      color = 'royalblue';
      icon = ICONS['facebook'];
      break;
    case 'instagram':
      color = 'darkviolet';
      icon = ICONS['instagram'];
      break;
    case 'linkedin':
      color = 'darkblue';
      icon = ICONS['linkedin'];
      break;
    case 'twitter':
      color = 'deepskyblue';
      icon = ICONS['twitter'];
      break;
    case 'x':
      color = 'black';
      icon = ICONS['x-twitter'];
      break;
    case 'youtube':
      color = 'firebrick';
      icon = ICONS['youtube'];
      break;
    default:
      color = 'slategray';
      icon = ICONS['arrow-up-right-from-square'];
  }

  return [color, icon];
};
