import { Asset, AssetFile, AssetLink, BaseEntry, Entry } from 'contentful';

export const getAssetUrl = (asset: Asset | undefined): string | undefined => {
  if (!asset) return;
  return asset?.fields.file?.url as string;
};

export const getContentType = (entry: BaseEntry): string => {
  return entry.sys.contentType.sys.id;
};

export const getLinkedAsset = (
  id: string,
  assets: Array<Asset>
): Asset | undefined => {
  if (!id) return;
  return assets.find((asset) => asset.sys.id === id);
};

export const getLinkedEntry = (
  id: string,
  entries: Array<Entry>
): Entry | undefined => {
  return entries.find((entry) => entry.sys.id === id);
};
