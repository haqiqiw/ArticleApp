import StringHelper from '../StringHelper';

describe('Parse ISO String', () => {
  it('should return the string of iso date (2018-05-16T15:30:15+0000 = Wed May 16 2018)', () => {
    expect(StringHelper.parseISOString('2018-05-16T15:30:15+0000')).toMatchSnapshot();
  });

  it('should return null', () => {
    expect(StringHelper.parseISOString('')).toMatchSnapshot();
  });
});