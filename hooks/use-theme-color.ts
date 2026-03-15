/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  const theme = useColorScheme() ?? 'dark';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Map common color names to our colors
    const colorMap: { [key: string]: string } = {
      background: colors.bg,
      text: colors.text,
      tint: colors.accent,
      tabIconDefault: colors.text3,
      tabIconSelected: colors.accent,
    };
    return colorMap[colorName] || colors.text;
  }
}
