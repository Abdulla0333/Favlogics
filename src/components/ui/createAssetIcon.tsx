import { AssetIcon } from './AssetIcon'

export function createAssetIcon<const T extends string>(
  icons: Record<T, string>,
  defaultClassName: string,
) {
  return function TypedAssetIcon({
    name,
    className = defaultClassName,
  }: {
    name: T
    className?: string
  }) {
    return <AssetIcon src={icons[name]} className={className} />
  }
}
