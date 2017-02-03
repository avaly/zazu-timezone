describe('zazu.json', () => {
  it('is valid', () => {
    const zazu = require('../zazu.json');
    expect(zazu).toBeDefined();
    expect(zazu.name).toEqual('zazu-timezone');
    expect(zazu.blocks).toBeDefined();
    expect(zazu.blocks.input).toBeDefined();
    expect(zazu.blocks.output).toBeDefined();
  });
});
