import React from "react";
import { SvgXml } from "react-native-svg";
export default function SvgComponent({ content, iconStyle }) {
  const svgMarkup = `${content}`;
  const SvgImage = () => <SvgXml xml={svgMarkup} style={iconStyle} />;

  return <SvgImage />;
}
