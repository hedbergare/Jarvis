import React from "react";
import { SvgXml } from "react-native-svg";
export default function SvgComponent({ content }) {
  const svgMarkup = `${content}
`;
  const SvgImage = () => <SvgXml xml={svgMarkup} />;

  return <SvgImage />;
}
