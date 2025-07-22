import chroma from 'chroma-js';

const generatePalette = (baseColor) => {
  // Generate analogous and complementary colors
  return chroma.scale([chroma(baseColor).brighten(1), chroma(baseColor).darken(1)])
    .colors(5);
};

export default generatePalette;
