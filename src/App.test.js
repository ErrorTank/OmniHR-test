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

// I Can setup data-testid in order to make the test more accurate and stable in reality.
// This is just a quickest way to make sure things work

describe("Test Tree Directories", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });
  afterAll(() => jest.clearAllMocks());

  it("Should run correctly", async () => {
    //Verify Tree render correctly
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

    //Verify Sub tree render correctly
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

    //Verify Empty text appears when Folder is empty
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

    //Verify Modal appears when clicking on file
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
