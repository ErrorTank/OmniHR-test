import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "./App";

const MOCK_DATA_1 = {
  id: "root",
  entries: [
    {
      name: "directory",
      type: "directory",
    },

    {
      name: "file.js",
      type: "file",
    },
  ],
};

const MOCK_DATA_2 = {
  id: "directory",
  entries: [
    {
      name: "directory2",
      type: "directory",
    },

    {
      name: "file2.js",
      type: "file2",
    },
  ],
};
const MOCK_DATA_3 = {
  id: "directory2",
  entries: [],
};
const MOCK_DATA_4 = {
  id: "file",
  contents: "Test content",
};
describe("Test Tree Directories", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });
  afterAll(() => jest.clearAllMocks());

  it("Should run correctly", async () => {
    global.fetch.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA_1),
      });
    });
    render(<App />);

    const directory = await screen.findByText(MOCK_DATA_1.entries[0].name);
    const file = await screen.findByText(MOCK_DATA_1.entries[1].name);
    expect(directory).toBeInTheDocument();
    expect(file).toBeInTheDocument();
    global.fetch.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA_2),
      });
    });
    fireEvent.click(directory);
    const directory2 = await within(directory.parentNode).findByText(
      MOCK_DATA_2.entries[0].name
    );
    expect(directory2).toBeInTheDocument();
    global.fetch.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA_3),
      });
    });
    fireEvent.click(directory2);
    const emptyText = await within(directory2.parentNode).findByText(
      "Directory is empty."
    );
    expect(emptyText).toBeInTheDocument();
    global.fetch.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA_4),
      });
    });
    fireEvent.click(file);
    const modalText = await screen.findByText(MOCK_DATA_4.contents);
    expect(modalText).toBeInTheDocument();
  });
});
