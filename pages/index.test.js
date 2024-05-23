import { getRandomColor } from './index';

describe('getRandomColor', () => {
  it('should return a valid color class', () => {
    const colors = ['bg-red-600', 'bg-yellow-600', 'bg-green-600', 'bg-blue-600'];
    const randomColor = getRandomColor();
    expect(colors).toContain(randomColor);
  });
});