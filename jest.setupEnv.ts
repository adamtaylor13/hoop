// istanbul ignore file

beforeAll(() => {
    const { error, warn } = console;
    // @ts-ignore
    global.console = {
        log: jest.fn(),
        warn,
        error,
        clear: jest.fn(),
    };
});
