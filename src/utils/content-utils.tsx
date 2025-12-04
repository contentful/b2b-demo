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
  return assets.find((asset) => asset.sys.id === id) || null;
};

export const getLinkedEntry = (
  id: string,
  entries: Array<Entry>
): Entry | null => {
  return entries.find((entry) => entry.sys.id === id) || null;
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
      icon = 'facebook';
      break;
    case 'instagram':
      color = 'darkviolet';
      icon = 'instagram';
      break;
    case 'linkedin':
      color = 'darkblue';
      icon = 'linkedin';
      break;
    case 'twitter':
      color = 'deepskyblue';
      icon = 'twitter';
      break;
    case 'x':
      color = 'black';
      icon = 'x-twitter';
      break;
    case 'youtube':
      color = 'firebrick';
      icon = 'youtube';
      break;
    default:
      color = 'slategray';
      icon = 'arrow-up-right-from-square';
  }

  return [color, icon];
};
