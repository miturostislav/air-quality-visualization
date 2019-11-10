function matchMediaQuery(mediaQueries: string[]): boolean {
  return window.matchMedia(
    ['only screen', ...mediaQueries.map(res => `(${res})`)].join(' and ')
  ).matches;
}

const mediaQuery = {
  isMediumUp(): boolean {
    return matchMediaQuery([`min-width: ${remCalc(768)}`]);
  }
};

function remCalc(pixels: number): string {
  const { fontSize } = window.getComputedStyle(document.querySelector('body') as HTMLBodyElement);
  return `${pixels / parseFloat(fontSize)}rem`;
}

export default mediaQuery;
